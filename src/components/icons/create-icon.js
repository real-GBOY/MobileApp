/** @format */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { input, editor } = require("@inquirer/prompts");

// Get project root (3 levels up from this script: src/components/icons -> src/components -> src -> root)
const projectRoot = path.resolve(__dirname, "../../..");
const rawIconsDir = path.join(projectRoot, "src/assets/raw-icons");
const iconsOutputDir = path.join(projectRoot, "src/components/icons");

function toKebabCase(s) {
  return s
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
    .replace(/[^a-zA-Z0-9-]/g, "-") // Replace non-alphanumeric with hyphens
    .toLowerCase()
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
}

function toPascalCase(s) {
  return s
    .replace(/\.[^/.]+$/, "") // Remove extension
    .split(/[-_]/) // Split on hyphens or underscores
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

async function run() {
  try {
    // Ensure raw-icons directory exists
    if (!fs.existsSync(rawIconsDir)) {
      fs.mkdirSync(rawIconsDir, { recursive: true });
      console.log(`✅ Created directory: ${rawIconsDir}`);
    }

    // Prompt for icon name
    const nameArg = await input({
      message: "Icon filename (kebab-case, without extension):",
      default: "",
    });

    if (!nameArg) {
      console.error("❌ A name is required.");
      process.exit(1);
    }

    // Normalize the name to kebab-case
    const baseName = toKebabCase(nameArg);
    const svgFileName = `${baseName}.svg`;
    const svgFilePath = path.join(rawIconsDir, svgFileName);

    // Check if file already exists
    if (fs.existsSync(svgFilePath)) {
      const overwrite = await input({
        message: `File ${svgFileName} already exists. Overwrite? (y/n):`,
        default: "n",
      });
      if (overwrite.toLowerCase() !== "y") {
        console.log("❌ Cancelled.");
        process.exit(0);
      }
    }

    // Prompt for SVG content
    const svg = await editor({
      message: "Paste the full SVG content in the editor, save and close to continue:",
      default: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Paste your SVG paths here -->
</svg>`,
    });

    // Validate SVG content
    const svgMatch = svg.match(/<svg([^>]*)>([\s\S]*?)<\/svg>/i);
    if (!svgMatch) {
      console.error("❌ Could not find <svg> ... </svg> in the pasted content.");
      process.exit(1);
    }

    // Clean up SVG: ensure proper formatting
    let cleanedSvg = svg.trim();
    
    // Ensure SVG has proper attributes
    if (!cleanedSvg.includes('xmlns="http://www.w3.org/2000/svg"')) {
      cleanedSvg = cleanedSvg.replace(
        /<svg([^>]*)>/i,
        '<svg$1 xmlns="http://www.w3.org/2000/svg">'
      );
    }

    // Write SVG file to raw-icons directory
    fs.writeFileSync(svgFilePath, cleanedSvg, "utf8");
    console.log(`✅ Saved SVG to: ${svgFilePath}`);

    // Run SVGR to generate React Native component
    console.log("\n🔄 Generating React Native component with SVGR...");
    try {
      execSync(
        `pnpm run icons:generate`,
        {
          cwd: projectRoot,
          stdio: "inherit",
        }
      );
      console.log("✅ Component generated successfully!");
    } catch (error) {
      console.error("❌ Error generating component:", error.message);
      console.log("\n💡 You can manually run: pnpm run icons:generate");
      process.exit(1);
    }

    // Generate/update index.ts
    console.log("\n🔄 Updating index.ts...");
    try {
      execSync(
        `pnpm run icons:index`,
        {
          cwd: projectRoot,
          stdio: "inherit",
        }
      );
      console.log("✅ Index updated successfully!");
    } catch (error) {
      console.error("❌ Error updating index:", error.message);
      console.log("\n💡 You can manually run: pnpm run icons:index");
    }

    // Get component name for display
    const componentName = toPascalCase(baseName);
    const componentPath = path.join(iconsOutputDir, `${baseName}.tsx`);

    console.log("\n✨ Icon creation complete!");
    console.log(`\n📁 Files created:`);
    console.log(`   - SVG: ${svgFilePath}`);
    console.log(`   - Component: ${componentPath}`);
    console.log(`\n📦 Usage:`);
    console.log(`   import { ${componentName} } from "@/components/icons";`);
    console.log(`   <${componentName} size={24} color="#000" />`);
    console.log(`   <${componentName} size={24} color="#000" rtl={isRTL} />`);
  } catch (err) {
    console.error("❌ Error:", err.message || err);
    process.exit(1);
  }
}

run();
