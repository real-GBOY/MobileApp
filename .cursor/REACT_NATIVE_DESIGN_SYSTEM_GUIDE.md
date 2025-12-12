/** @format */

# React Native Design System Guide

This guide explains how to use the same design system methodology in React Native that we use in the web application.

## Overview

The design system follows a **token-based approach** where:
1. **Color constants** are defined in `COLORS.ts` (light/dark themes)
2. **Theme provider** manages the current theme state
3. **Design tokens** are provided to components via context
4. **Components** use semantic color names instead of hardcoded values

## Architecture Comparison

### Web (Current Implementation)

```
COLORS.ts (constants)
    ↓
ThemeProvider (manages theme state)
    ↓
ColorsProvider (sets CSS variables on document.documentElement)
    ↓
index.css (Tailwind maps CSS variables to utility classes)
    ↓
Components (use Tailwind classes: bg-primary, text-text-strong)
```

### React Native (Implementation)

```
COLORS.ts (same constants - shared)
    ↓
ThemeProvider (manages theme state - React Native version)
    ↓
ThemeContext (provides colors object directly)
    ↓
useTheme hook (returns colors object)
    ↓
Components (use colors from hook: colors.primary, colors.textStrong)
```

## File Structure

```
src/
├── services/
│   ├── constants/
│   │   └── COLORS.ts (shared with web)
│   └── contexts/
│       ├── ThemeProvider.tsx (React Native version)
│       └── useTheme.ts (hook to access theme)
├── designSystem/
│   └── [components] (React Native components)
└── [your app components]
```

## Step-by-Step Implementation

### 1. Color Constants (Shared)

The `COLORS.ts` file is **shared** between web and React Native. It defines the color tokens:

```typescript
// src/services/constants/COLORS.ts
export const MAIN_COLORS = {
   light: {
      primary: "#7d52f4",
      "primary-dark": "#6b45e0",
      background: "#ffffff",
      "text-strong": "#171717",
      "text-sub": "#5C5C5C",
      // ... all other colors
   },
   dark: {
      primary: "#7d52f4",
      "primary-dark": "#6b45e0",
      background: "#0F0F1B",
      "text-strong": "#ffffff",
      // ... all other colors
   },
};
```

### 2. Theme Provider (React Native)

The React Native theme provider provides colors directly (no CSS variables):

```typescript
// src/services/contexts/ThemeProvider.native.tsx
import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { MAIN_COLORS } from "../constants/COLORS";

type ThemeType = "light" | "dark" | "system";
type Colors = typeof MAIN_COLORS.light;

type ThemeContextType = {
   theme: ThemeType;
   setTheme: (theme: ThemeType) => void;
   isDark: boolean;
   colors: Colors; // Direct access to colors object
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
   const [theme, setTheme] = useState<ThemeType>("light");
   
   const isDark = useMemo(() => theme === "dark", [theme]);
   
   const colors = useMemo(() => {
      return isDark ? MAIN_COLORS.dark : MAIN_COLORS.light;
   }, [isDark]);

   const value = { theme, setTheme, isDark, colors };
   
   return (
      <ThemeContext.Provider value={value}>
         {children}
      </ThemeContext.Provider>
   );
};

export const useTheme = () => {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useTheme must be used within a ThemeProvider");
   }
   return context;
};
```

### 3. Using the Theme in Components

#### Method 1: Direct Color Access

```typescript
// src/components/Button.native.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/services/contexts/ThemeProvider";

type ButtonProps = {
   variant?: "primary" | "secondary" | "danger";
   children: React.ReactNode;
   onPress: () => void;
};

export function Button({ 
   variant = "primary", 
   children, 
   onPress 
}: ButtonProps) {
   const { colors } = useTheme();
   
   const buttonStyle = [
      styles.button,
      variant === "primary" && { backgroundColor: colors.primary },
      variant === "secondary" && { backgroundColor: colors.background, borderColor: colors.border },
      variant === "danger" && { backgroundColor: colors.danger },
   ];
   
   const textStyle = [
      styles.text,
      variant === "primary" && { color: colors["text-main"] },
      variant === "secondary" && { color: colors["text-strong"] },
      variant === "danger" && { color: "#ffffff" },
   ];
   
   return (
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
         <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
   },
   text: {
      fontSize: 14,
      fontWeight: "500",
   },
});
```

#### Method 2: Using StyleSheet.create with Theme

```typescript
// src/components/Card.native.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@/services/contexts/ThemeProvider";

type CardProps = {
   children: React.ReactNode;
   title?: string;
};

export function Card({ children, title }: CardProps) {
   const { colors } = useTheme();
   
   const dynamicStyles = {
      card: {
         backgroundColor: colors.background,
         borderColor: colors.border,
      },
      title: {
         color: colors["text-strong"],
      },
      content: {
         color: colors["text-sub"],
      },
   };
   
   return (
      <View style={[styles.card, dynamicStyles.card]}>
         {title && (
            <Text style={[styles.title, dynamicStyles.title]}>
               {title}
            </Text>
         )}
         <View style={styles.content}>
            {children}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   card: {
      borderRadius: 8,
      borderWidth: 1,
      padding: 16,
      margin: 8,
   },
   title: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
   },
   content: {
      // Content styles
   },
});
```

### 4. Helper Functions (Optional)

Create utility functions for common patterns:

```typescript
// src/services/theme/themeHelpers.ts
import { MAIN_COLORS } from "../constants/COLORS";

export type ColorKey = keyof typeof MAIN_COLORS.light;

/**
 * Get color value from theme
 * Handles kebab-case keys like "text-strong" -> colors["text-strong"]
 */
export function getColor(
   colors: typeof MAIN_COLORS.light,
   key: ColorKey
): string {
   return colors[key];
}

/**
 * Get color with opacity
 */
export function getColorWithOpacity(
   colors: typeof MAIN_COLORS.light,
   key: ColorKey,
   opacity: number
): string {
   const color = colors[key];
   
   // Handle hex colors
   if (color.startsWith("#")) {
      const hex = color.slice(1);
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
   }
   
   // Handle rgba colors
   if (color.startsWith("rgba")) {
      return color.replace(/[\d.]+\)$/g, `${opacity})`);
   }
   
   return color;
}
```

### 5. Typography System

For typography, create a similar token system:

```typescript
// src/services/constants/TYPOGRAPHY.ts
export const TYPOGRAPHY = {
   fontFamily: {
      base: "SF-Pro-Rounded", // iOS
      android: "sans-serif", // Android fallback
   },
   fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      "2xl": 24,
      "3xl": 30,
   },
   fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
   },
   lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
   },
};
```

Usage:

```typescript
import { TYPOGRAPHY } from "@/services/constants/TYPOGRAPHY";

const textStyle = {
   fontFamily: TYPOGRAPHY.fontFamily.base,
   fontSize: TYPOGRAPHY.fontSize.base,
   fontWeight: TYPOGRAPHY.fontWeight.medium,
   lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.normal,
};
```

### 6. Spacing System

```typescript
// src/services/constants/SPACING.ts
export const SPACING = {
   xs: 4,
   sm: 8,
   md: 16,
   lg: 24,
   xl: 32,
   "2xl": 48,
   "3xl": 64,
};
```

Usage:

```typescript
import { SPACING } from "@/services/constants/SPACING";

const containerStyle = {
   padding: SPACING.md,
   marginBottom: SPACING.lg,
   gap: SPACING.sm,
};
```

## Best Practices

### ✅ DO

1. **Always use theme colors** from `useTheme()` hook
   ```typescript
   const { colors } = useTheme();
   backgroundColor: colors.primary
   ```

2. **Use semantic color names**
   ```typescript
   // ✅ Good
   color: colors["text-strong"]
   backgroundColor: colors.background
   
   // ❌ Bad
   color: "#171717"
   backgroundColor: "#ffffff"
   ```

3. **Create reusable styled components**
   ```typescript
   // src/designSystem/ThemedView.tsx
   export function ThemedView({ style, ...props }) {
      const { colors } = useTheme();
      return (
         <View 
            style={[{ backgroundColor: colors.background }, style]} 
            {...props} 
         />
      );
   }
   ```

4. **Use StyleSheet.create for static styles**
   ```typescript
   const styles = StyleSheet.create({
      container: {
         borderRadius: 8,
         padding: 16,
      },
   });
   ```

5. **Combine static and dynamic styles**
   ```typescript
   <View style={[styles.container, { backgroundColor: colors.background }]} />
   ```

### ❌ DON'T

1. **Never hardcode colors**
   ```typescript
   // ❌ Bad
   backgroundColor: "#7d52f4"
   color: "white"
   ```

2. **Don't use inline styles for everything**
   ```typescript
   // ❌ Bad - hard to maintain
   <View style={{ padding: 16, margin: 8, backgroundColor: colors.background }} />
   
   // ✅ Good
   <View style={[styles.container, { backgroundColor: colors.background }]} />
   ```

3. **Don't access colors outside theme context**
   ```typescript
   // ❌ Bad
   const color = MAIN_COLORS.light.primary;
   
   // ✅ Good
   const { colors } = useTheme();
   const color = colors.primary;
   ```

## Migration Checklist

When converting a web component to React Native:

- [ ] Replace Tailwind classes with StyleSheet
- [ ] Replace `bg-*` classes with `backgroundColor: colors.*`
- [ ] Replace `text-*` classes with `color: colors.*`
- [ ] Replace `border-*` classes with `borderColor: colors.*`
- [ ] Replace spacing utilities (`p-*`, `m-*`, `gap-*`) with spacing constants
- [ ] Replace `rounded-*` with `borderRadius` values
- [ ] Update component props (e.g., `onClick` → `onPress`)
- [ ] Test with both light and dark themes
- [ ] Ensure RTL support if needed

## Example: Complete Component Migration

### Web Version
```tsx
// Button.tsx (Web)
function Button({ variant = "primary", children, ...props }) {
   return (
      <button
         className={`
            px-3 py-2 rounded-lg
            ${variant === "primary" ? "bg-primary text-text-main" : ""}
            ${variant === "danger" ? "bg-danger text-white" : ""}
         `}
         {...props}
      >
         {children}
      </button>
   );
}
```

### React Native Version
```tsx
// Button.native.tsx
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/services/contexts/ThemeProvider";

function Button({ variant = "primary", children, onPress }) {
   const { colors } = useTheme();
   
   const buttonStyle = [
      styles.button,
      variant === "primary" && { backgroundColor: colors.primary },
      variant === "danger" && { backgroundColor: colors.danger },
   ];
   
   const textStyle = [
      styles.text,
      variant === "primary" && { color: colors["text-main"] },
      variant === "danger" && { color: "#ffffff" },
   ];
   
   return (
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
         <Text style={textStyle}>{children}</Text>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
   },
   text: {
      fontSize: 14,
      fontWeight: "500",
   },
});
```

## Summary

The React Native design system follows the **exact same methodology** as the web version:

1. **Same color constants** (`COLORS.ts`)
2. **Same theme management** (ThemeProvider pattern)
3. **Same semantic naming** (primary, text-strong, etc.)
4. **Same principles** (no hardcoded colors, theme-aware)

The only difference is the **implementation layer**:
- Web: CSS variables + Tailwind classes
- React Native: Theme context + StyleSheet

This ensures **consistency** across platforms while respecting each platform's constraints.

