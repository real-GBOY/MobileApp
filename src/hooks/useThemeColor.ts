/** @format */

import { useTheme } from "@/contexts/ThemeProvider";

/**
 * @deprecated Use `useTheme()` hook instead for better theme support
 * This hook is kept for backward compatibility
 */
export function useThemeColor(
	props: { color?: string },
	colorName: keyof ReturnType<typeof useTheme>["colors"]
) {
	const { colors } = useTheme();
	return props.color ?? colors[colorName];
}
