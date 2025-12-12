/** @format */

import { MAIN_COLORS } from "@/styles/colors";

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

