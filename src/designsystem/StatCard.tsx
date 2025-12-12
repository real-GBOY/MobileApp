/** @format */

import CalendarXmarkCircle from "@/components/icons/calendar-xmark-circle";
import { useTheme } from "@/contexts/ThemeProvider";
import { SPACING } from "@/styles/spacing";
import { TYPOGRAPHY } from "@/styles/typography";
import { getFontFamily } from "@/utils/fonts";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

export type StatusLevel = "low" | "medium" | "high";

export interface StatCardProps {
	title: string;
	value?: string;
	customValue?: React.ReactNode;
	status?: StatusLevel;
	statusLabel?: string;
	icon?: React.ReactNode;
	iconColor?: string;
	iconBgColor?: string;
	style?: ViewStyle;
}

const StatusIndicator = ({ level }: { level: StatusLevel }) => {
	const { colors } = useTheme();

	const getBarColors = () => {
		switch (level) {
			case "low":
				return [
					colors.success,
					colors["bg-weak"],
					colors["bg-weak"],
				];
			case "medium":
				return [
					"#ffc197", // orange-300
					colors.warning,
					colors["bg-weak"],
				];
			case "high":
				return [
					colors.danger,
					colors.danger,
					colors.danger,
				];
			default:
				return [
					colors["bg-weak"],
					colors["bg-weak"],
					colors["bg-weak"],
				];
		}
	};

	const barColors = getBarColors();
	const barHeights = [4, 8, 12];

	return (
		<View style={styles.statusBars}>
			{barColors.map((color, index) => (
				<View
					key={index}
					style={[
						styles.statusBar,
						{
							backgroundColor: color,
							height: barHeights[index],
						},
					]}
				/>
			))}
		</View>
	);
};

export const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	customValue,
	status,
	statusLabel,
	icon,
	iconColor,
	iconBgColor,
	style,
}) => {
	const { colors } = useTheme();

	const getStatusLabel = () => {
		if (statusLabel) return statusLabel;
		if (status) return status.charAt(0).toUpperCase() + status.slice(1);
		return "";
	};

	const defaultIconColor = iconColor || colors.danger;
	const defaultIconBgColor = iconBgColor || colors["danger-light"];

	const showStatusBadge = status !== undefined;

	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: colors.background,
					borderColor: colors.border,
					shadowColor: "#000",
				},
				style,
			]}
		>
			{/* Top Row: Icon + Title */}
			<View style={styles.topRow}>
				<View
					style={[
						styles.iconContainer,
						{
							backgroundColor: defaultIconBgColor,
							borderColor: colors.border,
						},
					]}
				>
					{icon || (
						<CalendarXmarkCircle
							size={20}
							color={defaultIconColor}
						/>
					)}
				</View>
				<Text
					style={[
						styles.title,
						{
							color: colors["text-sub"],
							fontFamily: getFontFamily("medium"),
						},
					]}
					numberOfLines={1}
				>
					{title}
				</Text>
			</View>

			{/* Bottom Row: Value + Status Badge */}
			<View style={styles.bottomRow}>
				{customValue ? (
					customValue
				) : (
					<Text
						style={[
							styles.value,
							{
								color: colors["text-strong"],
								fontFamily: getFontFamily("medium"),
							},
						]}
						numberOfLines={1}
					>
						{value}
					</Text>
				)}
				{showStatusBadge && (
					<View
						style={[
							styles.statusBadge,
							{
								backgroundColor: colors["bg-weak"],
								borderColor: colors.border,
							},
						]}
					>
						<Text
							style={[
								styles.statusLabel,
								{
									color: colors["text-sub"],
									fontFamily: getFontFamily("medium"),
								},
							]}
							numberOfLines={1}
						>
							{getStatusLabel()}
						</Text>
						<StatusIndicator level={status} />
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		borderRadius: 16,
		borderWidth: 1,
		padding: SPACING.sm + 4, // 12px
		gap: SPACING.sm + 4, // 12px
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.03,
		shadowRadius: 2,
		elevation: 1, // Android shadow
	},
	topRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.sm,
		width: "100%",
	},
	iconContainer: {
		padding: 6,
		borderRadius: 10,
		borderWidth: 1,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.03,
		shadowRadius: 2,
		elevation: 1,
	},
	title: {
		flex: 1,
		fontSize: TYPOGRAPHY.fontSize.sm,
		lineHeight: 20,
		letterSpacing: -0.176,
	},
	bottomRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: SPACING.sm,
		width: "100%",
	},
	value: {
		flex: 1,
		fontSize: TYPOGRAPHY.fontSize.lg,
		lineHeight: 24,
		letterSpacing: -0.27,
	},
	statusBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 8,
		borderWidth: 0.5,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.08,
		shadowRadius: 2,
		elevation: 1,
	},
	statusLabel: {
		fontSize: TYPOGRAPHY.fontSize.xs,
		lineHeight: 16,
	},
	statusBars: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 2,
	},
	statusBar: {
		width: 2,
		borderRadius: 999,
	},
});

export default StatCard;

