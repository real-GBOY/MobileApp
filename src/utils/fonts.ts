/** @format */

import { I18nManager } from "react-native";

/**
 * Get the appropriate font family based on language/RTL
 * @param weight - Font weight (regular, medium, semibold, bold)
 * @param isRTL - Optional RTL flag, defaults to I18nManager.isRTL
 * @returns Font family name
 */
export function getFontFamily(
	weight: "regular" | "medium" | "semibold" | "bold" = "regular",
	isRTL?: boolean
): string {
	const rtl = isRTL ?? I18nManager.isRTL;

	if (rtl) {
		// Arabic - Use Tajawal
		switch (weight) {
			case "regular":
				return "Tajawal-Regular";
			case "medium":
				return "Tajawal-Medium";
			case "semibold":
				return "Tajawal-Bold";
			case "bold":
				return "Tajawal-ExtraBold";
			default:
				return "Tajawal-Regular";
		}
	} else {
		// English - Use SF-Pro Rounded
		switch (weight) {
			case "regular":
				return "SF-Pro-Rounded-Regular";
			case "medium":
				return "SF-Pro-Rounded-Medium";
			case "semibold":
				return "SF-Pro-Rounded-Semibold";
			case "bold":
				return "SF-Pro-Rounded-Bold";
			default:
				return "SF-Pro-Rounded-Regular";
		}
	}
}

/**
 * Font configuration for different languages
 */
export const FONT_CONFIG = {
	english: {
		regular: "SF-Pro-Rounded-Regular",
		medium: "SF-Pro-Rounded-Medium",
		semibold: "SF-Pro-Rounded-Semibold",
		bold: "SF-Pro-Rounded-Bold",
		light: "SF-Pro-Rounded-Light",
		thin: "SF-Pro-Rounded-Thin",
		ultralight: "SF-Pro-Rounded-Ultralight",
		heavy: "SF-Pro-Rounded-Heavy",
		black: "SF-Pro-Rounded-Black",
	},
	arabic: {
		regular: "Tajawal-Regular",
		medium: "Tajawal-Medium",
		semibold: "Tajawal-Bold",
		bold: "Tajawal-ExtraBold",
		light: "Tajawal-Light",
		extralight: "Tajawal-ExtraLight",
		black: "Tajawal-Black",
	},
};

