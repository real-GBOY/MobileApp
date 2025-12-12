/** @format */

import { Platform } from "react-native";

export const TYPOGRAPHY = {
	fontFamily: {
		base: Platform.select({
			ios: "SF-Pro-Rounded-Regular",
			android: "sans-serif",
			default: "sans-serif",
		}),
		medium: Platform.select({
			ios: "SF-Pro-Rounded-Medium",
			android: "sans-serif-medium",
			default: "sans-serif",
		}),
		semibold: Platform.select({
			ios: "SF-Pro-Rounded-Semibold",
			android: "sans-serif-medium",
			default: "sans-serif",
		}),
		bold: Platform.select({
			ios: "SF-Pro-Rounded-Bold",
			android: "sans-serif",
			default: "sans-serif",
		}),
	},
	fontSize: {
		xs: 12,
		sm: 14,
		base: 16,
		lg: 18,
		xl: 20,
		"2xl": 24,
		"3xl": 30,
		"4xl": 36,
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

