/** @format */

import { Colors } from "@/styles/colors";

export function useThemeColor(
	props: { color?: string },
	colorName: keyof typeof Colors
) {
	return props.color ?? Colors[colorName];
}
