/** @format */

const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "../src/components/icons");
const indexPath = path.join(iconsDir, "index.ts");

// Read all .tsx files in the icons directory
const files = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith(".tsx") && file !== "index.ts")
  .map((file) => file.replace(".tsx", ""));

// Generate export statements
const exports = files
  .map((file) => {
    // Convert kebab-case or snake_case to PascalCase for component name
    const componentName = file
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    return `export { default as ${componentName} } from "./${file}";`;
  })
  .join("\n");

// Write the index file
const content = `/** @format */

// Auto-generated file - do not edit manually
// Run: pnpm run icons:index

${exports}
`;

fs.writeFileSync(indexPath, content, "utf8");
console.log(`✅ Generated ${indexPath} with ${files.length} icon exports`);

