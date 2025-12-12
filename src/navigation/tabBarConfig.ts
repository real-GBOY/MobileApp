/** @format */

import { MAIN_COLORS } from "@/styles/colors";
import { getFontFamily } from "@/utils/fonts";

export const getTabBarConfig = (isRTL?: boolean) => ({
	label: {
		fontSize: 12,
		fontWeight: "400" as const,
		fontFamily: getFontFamily("regular", isRTL),
		lineHeight: 16,
		marginTop: 6,
	},
	labelActive: {
		fontSize: 12,
		fontWeight: "500" as const,
		fontFamily: getFontFamily("medium", isRTL),
		lineHeight: 16,
		marginTop: 6,
	},
	icon: {
		size: 24,
	},
	avatar: {
		size: 24,
		borderRadius: 12,
	},
	item: {
		gap: 6,
	},
	bar: {
		height: 64,
		paddingTop: 12,
	},
});

export const getTabBarColors = (theme: "light" | "dark" = "light") => {
	const colors = MAIN_COLORS[theme];
	return {
		background: colors.background,
		border: colors.border,
		activeIcon: colors.primary,
		inactiveIcon: (colors as any)["icon-sub"],
		activeText: theme === "light" ? (colors as any)["text-strong"] : colors["text-main"],
		inactiveText: theme === "light" ? (colors as any)["text-soft"] : (colors as any)["faded"],
		avatarBg: (colors as any)["bg-weak"],
	};
};
