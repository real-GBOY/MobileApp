<!-- @format -->

# Cursor Instructions

## Project Overview

This is an Expo mobile application using React Native + TypeScript with NativeWind (Tailwind CSS for React Native) for styling.

## Code Style & Standards

### Import Paths

- **ALWAYS use `@/` path aliases** instead of relative imports
- ✅ Correct: `import Button from "@/designSystem/Button"`
- ❌ Wrong: `import Button from "../../../../designSystem/Button"`

### TypeScript

- No `any` types - use proper typing
- Use type-safe function signatures
- Export types when they might be reused

### React Native Components

- Use functional components with hooks
- Use `forwardRef` for components that need ref access
- Props should be properly typed with TypeScript interfaces
- Use the `/** @format */` comment at the top of each file
- Use React Native primitives: `View`, `Text`, `ScrollView`, `FlatList`, `Image`, `Pressable`, etc.
- Never use HTML elements (`div`, `p`, `span`, etc.) - use React Native equivalents

### Styling

- Use NativeWind (Tailwind CSS) classes via `className` prop - avoid inline `style` prop unless necessary for dynamic values
- Use recommended Tailwind classes (e.g., `rounded-lg` instead of `rounded-[8px]`)
- Check `src/styles/colors.ts` and `global.css` for available design system colors
- Use React Native components (`View`, `Text`, `ScrollView`, etc.) instead of HTML elements
- Don't install Tailwind plugins without confirmation

### Color System (`src/styles/colors.ts`)

- **Location:** `src/styles/colors.ts` - Centralized color definitions
- **CRITICAL: Always use design system colors, NEVER hardcoded colors**
  - ✅ Correct: Use `Colors.background`, `Colors.text`, or Tailwind classes mapped to these colors
  - ❌ Wrong: `bg-white`, `bg-[#FFFFFF]`, `text-[#171717]`, hardcoded hex values
- **Usage Patterns:**

  **1. Direct Import (for inline styles or dynamic values):**

  ```tsx
  import { Colors } from "@/styles/colors";

  export default function Component() {
  	return (
  		<View style={{ backgroundColor: Colors.background }}>
  			<Text style={{ color: Colors.text }}>Content</Text>
  		</View>
  	);
  }
  ```

  **2. NativeWind Classes (preferred for static styling):**

  ```tsx
  // Map colors.ts values to Tailwind config, then use:
  <View className='bg-background'>
  	<Text className='text-text'>Content</Text>
  </View>
  ```

- **Available Colors from `colors.ts`:**

  - `Colors.text` - Primary text color (`#11181C`)
  - `Colors.background` - Background color (`#fff`)
  - `Colors.tint` - Primary accent/tint color (`#0a7ea4`)
  - `Colors.icon` - Icon color (`#687076`)
  - `Colors.tabIconDefault` - Default tab icon color (`#687076`)
  - `Colors.tabIconSelected` - Selected tab icon color (`#0a7ea4`)

- **Adding New Colors:**

  1. Add the color to `src/styles/colors.ts` with a semantic name
  2. Update `tailwind.config.js` to map the color if using NativeWind classes
  3. Use the color via import or Tailwind class

- **Dark Mode Support:**
  - Extend `Colors` object with dark mode variants when needed
  - Use theme context or conditional logic for dark mode colors
  - Example structure:
    ```tsx
    export const Colors = {
    	text: "#11181C",
    	textDark: "#FFFFFF",
    	background: "#fff",
    	backgroundDark: "#000",
    	// ... other colors
    };
    ```

### Design System

- Reuse existing components from `@/designSystem/`
- Follow the existing checkbox, button, and modal patterns
- Primary color accent: `#7d52f4`

### Safe Area Context Usage

- **ALWAYS use safe area context** for screens and components that need to respect device safe areas (notches, status bars, home indicators)
- Wrap root layout with `SafeAreaProvider` from `react-native-safe-area-context`
- Use `SafeAreaView` component for full-screen layouts:

  ```tsx
  import { SafeAreaView } from "react-native-safe-area-context";

  export default function Screen() {
  	return (
  		<SafeAreaView className='flex-1 bg-background'>
  			{/* Your content */}
  		</SafeAreaView>
  	);
  }
  ```

- Use `useSafeAreaInsets` hook for custom spacing:

  ```tsx
  import { useSafeAreaInsets } from "react-native-safe-area-context";

  export default function Screen() {
  	const insets = useSafeAreaInsets();
  	return (
  		<View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
  			{/* Your content */}
  		</View>
  	);
  }
  ```

- **When to use SafeAreaView:**
  - ✅ Full-screen screens/pages
  - ✅ Modals and overlays
  - ✅ Components that extend to screen edges
- **When to use useSafeAreaInsets:**
  - ✅ Custom headers/footers
  - ✅ Floating action buttons
  - ✅ Custom spacing that needs to respect safe areas
- **Edge cases:**
  - Use `edges` prop to control which edges to apply safe area: `edges={['top', 'bottom']}`
  - For tab bars, Expo Router handles safe areas automatically
  - For scrollable content, apply safe area padding to the container, not the ScrollView

### File Organization

- Routes/screens go in `app/` directory (Expo Router file-based routing)
- Components go in `src/components/`
- Reusable design system components in `src/designsystem/`
- Icons in `src/Icons/`
- Hooks in `src/hooks/`
- Contexts in `src/contexts/`
- Styles in `src/styles/`
- Navigation config in `src/navigation/` (if needed beyond Expo Router)

### Icons

- Use the custom icon creation script: `node create-icon.js`
- Icons accept `active` and `size` props
- Import from `@/Icons`

### Forms & Data Tables

- Use `react-hook-form` for forms with validation
- For lists, use `FlatList` from React Native for performance
- Follow existing patterns in the codebase

### Code Quality

- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks or utility functions
- Use semantic React Native components
- Optimize performance: use `React.memo` for expensive components, `FlatList` for long lists

## Don't Do

- Don't add new dependencies without asking
- Don't use inline `style` prop unless necessary for dynamic values (prefer `className` with NativeWind)
- Don't use hardcoded Tailwind arbitrary values when a standard class exists (e.g., use `rounded-lg` not `rounded-[8px]`)
- Don't use `any` type
- Don't use relative imports when `@/` aliases are available
- Don't create duplicate components - check design system first
- **Don't use hardcoded colors** - always import and use colors from `src/styles/colors.ts` (e.g., `Colors.background`, `Colors.text`)
- **Don't use `bg-white`, `text-black`, etc.** - use `Colors.background`, `Colors.text` or mapped Tailwind classes for dark mode compatibility
- **Don't hardcode hex values** - use the centralized `Colors` object from `@/styles/colors`
- **Don't forget safe areas** - always wrap screens with `SafeAreaView` or use `useSafeAreaInsets`
- **Don't use HTML elements** - use React Native components (`View` not `div`, `Text` not `p`)
- **Don't use web-specific APIs** - use React Native equivalents (e.g., `Dimensions` API, `Platform.select()`)

## Figma Integration

- When working with Figma designs, match the exact spacing, colors, and layout
- Use the Figma MCP tools to fetch design specifications
