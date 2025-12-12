/** @format */

import {
    AlarmDollar,
    AlarmXmarkCircle,
    CalendarXmarkCircle,
    WalletClock,
} from "@/components/icons";
import { useTheme } from "@/contexts/ThemeProvider";
import { StatCard } from "@/designsystem";
import { SPACING } from "@/styles/spacing";
import { TYPOGRAPHY } from "@/styles/typography";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	const { colors } = useTheme();

	return (
		<>
			<StatusBar
				style="light"
				backgroundColor={colors["primary-dark"]}
				translucent={false}
			/>
			<SafeAreaView
				style={[styles.container, { backgroundColor: colors.background }]}
				edges={["top", "left", "right"]}
			>
				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.content}
				>
					<Text
						style={[
							styles.sectionTitle,
							{
								color: colors["text-strong"],
								fontFamily: TYPOGRAPHY.fontFamily.medium,
							},
						]}
					>
						Your Stats
					</Text>
					<View style={styles.cardsGrid}>
						<StatCard
							title="Absence Days"
							value="18/30"
							status="medium"
							statusLabel="Medium"
							icon={<CalendarXmarkCircle size={20} color={colors.danger} />}
							iconColor={colors.danger}
							iconBgColor={colors["danger-light"]}
							style={styles.card}
						/>
						<StatCard
							title="Overtime"
							value="26.5 Hours"
							icon={<AlarmDollar size={20} color={colors["success-dark"]} />}
							iconColor={colors["success-dark"]}
							iconBgColor="#e0faec"
							style={styles.card}
						/>
						<StatCard
							title="Late Arrivals"
							value="7 Times"
							icon={
								<AlarmXmarkCircle size={20} color={colors.warning} />
							}
							iconColor={colors.warning}
							iconBgColor="#fff4eb"
							style={styles.card}
						/>
						<StatCard
							title="Contract Status"
							value=""
							customValue={
								<View
									style={[
										styles.contractBadge,
										{
											backgroundColor: colors["bg-weak"],
											borderColor: colors.border,
										},
									]}
								>
									<View
										style={[
											styles.dot,
											{ backgroundColor: colors.warning },
										]}
									/>
									<Text
										style={[
											styles.contractText,
											{
												color: colors["text-sub"],
												fontFamily: TYPOGRAPHY.fontFamily.medium,
											},
										]}
									>
										Ends in 42 Days
									</Text>
								</View>
							}
							icon={<WalletClock size={20} color={colors.highlighted} />}
							iconColor={colors.highlighted}
							iconBgColor="#ffe5f2"
							style={styles.card}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	content: {
		padding: SPACING.md,
		gap: SPACING.md,
	},
	sectionTitle: {
		fontSize: TYPOGRAPHY.fontSize.xl,
		lineHeight: 28,
		marginBottom: SPACING.xs,
	},
	cardsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.md,
	},
	card: {
		width: "47%", // Approximately 2 columns with gap
	},
	contractBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
		paddingLeft: SPACING.xs,
		paddingRight: SPACING.sm,
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
	dot: {
		width: 16,
		height: 16,
		borderRadius: 8,
	},
	contractText: {
		fontSize: TYPOGRAPHY.fontSize.xs,
		lineHeight: 16,
	},
});

