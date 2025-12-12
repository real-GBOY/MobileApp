<!-- @format -->

# Design System Rules

This file defines the rules and structure for the design system used in this Expo mobile application. It is intended to guide the implementation of Figma designs and ensure consistency across the codebase.

## 1. Token Definitions

- **Location:** `global.css` and `tailwind.config.js`
- **Format:** NativeWind (Tailwind CSS for React Native) with utility classes.
- **Structure:**
  - **Colors:** Defined in `src/styles/colors.ts` and extended via Tailwind config. Use semantic color names (e.g., `bg-primary`, `text-strong`, `bg-background`).
  - **Typography:**
    - Font Family: Use system fonts or custom fonts loaded via `expo-font`.
    - Text Styles: Applied via NativeWind utility classes (e.g., `text-sm`, `font-medium`, `leading-5`).
  - **Spacing & Radius:** Standard Tailwind spacing scale + custom radius utilities (`rounded-lg`, `rounded-full`, etc.).
- **Transformation:** NativeWind handles the conversion of Tailwind classes to React Native styles.

## 2. Component Library

- **Location:** `src/designsystem/` and `src/components/`
- **Architecture:** Functional React Native components using TypeScript.
- **Pattern:**
  - **Design System Primitives:** Found in `src/designsystem/` (e.g., `Button.tsx`, `Modal.tsx`). These are reusable, low-level UI building blocks built with React Native components.
  - **Feature Components:** Found in `src/components/` (e.g., `ui/`). These compose primitives into feature-specific UIs.
- **Documentation:** Components are documented via their implementation and usage within screens.

## 3. Frameworks & Libraries

- **UI Framework:** React Native (v0.81+) with React (v19+) and TypeScript.
- **Styling:** NativeWind (Tailwind CSS for React Native) using utility classes.
- **Build System:** Expo (~54.0).
- **Routing:** Expo Router (file-based routing in `app/` directory).
- **State Management:** React Context API (`src/contexts/`) or local state with hooks.
- **Animation:** React Native Reanimated (`react-native-reanimated`) for animations.
- **Icons:** Custom SVG icons via `react-native-svg` or `@expo/vector-icons`.

## 4. Asset Management

- **Storage:**
  - **Static Assets:** `assets/` directory (images, fonts).
  - **Remote Assets:** Images loaded via `expo-image` component or `Image` from `react-native`.
- **Referencing:**
  - Fonts: Loaded via `expo-font` and registered in app initialization.
  - Images: Use `<Image>` from `react-native` or `<Image>` from `expo-image` for better performance.
  - Icons: Use custom SVG components from `src/Icons/` or `@expo/vector-icons`.

## 5. Icon System

- **Location:** `src/Icons/`
- **Format:** React Native components returning SVG elements via `react-native-svg`.
- **Import Strategy:** Named imports from `src/Icons/index.ts` (e.g., `import { SelectBoxCircleFill } from "@/Icons";`).
- **Naming Convention:** PascalCase (e.g., `SelectBoxCircleFill`, `ArrowRightSLine`).
- **RTL Support:** Directional icons accept an `isRTL` prop to handle rotation/flipping (e.g., `arrow-left-s-line`).
- **Props:** Icons accept standard React Native View props and can be styled via className (NativeWind).

## 6. Styling Approach

- **Methodology:** Utility-first CSS using NativeWind (Tailwind CSS for React Native).
- **Global Styles:** Defined in `global.css` (imported in root layout).
- **Responsiveness:** Use React Native's `Dimensions` API or platform-specific code for responsive behavior. Avoid web-style breakpoints.
- **DarkMode:** Supported via Expo's `userInterfaceStyle` and system preferences. Use conditional styling or theme context.
- **Safe Areas:** Always use `react-native-safe-area-context` for safe area handling (e.g., `SafeAreaView`, `useSafeAreaInsets`).
- **Conventions:**
  - Use `gap-*`, `p-*`, `m-*` for spacing.
  - Use semantic color names via Tailwind classes (e.g., `bg-primary` instead of hex codes).
  - Avoid arbitrary values (`w-[35px]`) if a standard utility exists (`w-9`).
  - Use `flex-1` for flexible layouts instead of fixed widths.
  - **Clean Code:** Avoid unnecessary utility classes like `shrink-0`, `grow-0`, or `flex-shrink-0` unless strictly required for layout stability. Default flex behavior is often sufficient.
  - Use `className` prop for NativeWind styles (not `style` prop unless necessary for dynamic values).

## 7. React Native Components

- **Core Components:** Use React Native primitives:
  - `View` instead of `div`
  - `Text` instead of `p`, `span`, `h1-h6`
  - `ScrollView` or `FlatList` for scrollable content
  - `TouchableOpacity`, `Pressable`, or `TouchableHighlight` for interactive elements
  - `Image` from `react-native` or `expo-image` for images
- **Platform-Specific:** Use `Platform.select()` or platform-specific files (e.g., `Component.ios.tsx`, `Component.android.tsx`) when needed.

## 8. Project Structure

- **Root:** Project root with `app/` and `src/` directories.
- **Key Directories:**
  - `app/`: Expo Router file-based routes (e.g., `app/(tabs)/home/index.tsx`).
  - `src/components/`: Feature-specific UI components (e.g., `ui/`).
  - `src/designsystem/`: Generic, reusable UI components.
  - `src/contexts/`: React Context providers.
  - `src/hooks/`: Custom React hooks (e.g., `useColorScheme`, `useThemeColor`).
  - `src/navigation/`: Navigation configuration (if needed beyond Expo Router).
  - `src/store/`: State management (if using Redux/Zustand).
  - `src/styles/`: Style definitions (colors, theme).
  - `src/Icons/`: Custom icon components.
  - `assets/`: Static assets (images, fonts).

## 9. Mobile-Specific Considerations

- **Safe Areas:** Always account for device safe areas (notches, status bars) using `react-native-safe-area-context`.
- **Platform Differences:** Handle iOS/Android differences using `Platform.select()` or platform-specific files.
- **Performance:** Use `FlatList` for long lists, optimize images with `expo-image`, use `React.memo` for expensive components.
- **Gestures:** Use `react-native-gesture-handler` for advanced gestures.
- **Haptics:** Use `expo-haptics` for tactile feedback.
- **Status Bar:** Use `expo-status-bar` for status bar styling.

## Automation & Implementation Rules (Figma to Code)

1.  **Analyze First:** Identify reusable patterns in the Figma design.
2.  **Check Existing:** Look in `src/designsystem` and `src/Icons` before creating new things.
3.  **Extract:** Create new files for complex sub-components (e.g., `TimeTimeline.tsx`).
4.  **Typing:** Define interfaces in a `types.ts` file for the feature.
5.  **Layout:** Use flexbox for layouts. Avoid fixed pixel widths for containers; use relative units or `flex-1`.
6.  **Styling:** Map Figma properties to existing Tailwind semantic classes (e.g., Figma "Primary Blue" -> `bg-primary`).
7.  **Imports:** ALWAYS use the `@` alias for imports (e.g., `@/components/...`).
8.  **Components:** Use React Native components (`View`, `Text`, `ScrollView`, etc.) instead of HTML elements.
9.  **Safe Areas:** Wrap screens with `SafeAreaView` or use `useSafeAreaInsets` hook.
10. **Images:** Use `expo-image` for better performance and caching.
11. **Icons:** Prefer custom SVG icons from `src/Icons/` over icon fonts.
