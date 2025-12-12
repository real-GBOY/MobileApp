/** @format */

import { ChatText, House, MemoListCheckClock } from "@/components/icons";
import { getTabBarColors, getTabBarConfig } from "@/navigation/tabBarConfig";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { I18nManager, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Avatar image URL from Figma
const avatarImage =
	"https://www.figma.com/api/mcp/asset/44e7fdf8-1984-4896-bbab-d9dce94159fb";

export default function TabLayout() {
	const insets = useSafeAreaInsets();
	const bottomPadding = Math.max(insets.bottom, 8);
	const colors = getTabBarColors("light");
	const isRTL = I18nManager.isRTL;
	const config = getTabBarConfig(isRTL);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: colors.background,
					borderTopWidth: 1,
					borderTopColor: colors.border,
					height: config.bar.height + bottomPadding,
					paddingBottom: bottomPadding,
					paddingTop: config.bar.paddingTop,
					elevation: 0,
					shadowOpacity: 0,
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
				},
				tabBarActiveTintColor: colors.activeText,
				tabBarInactiveTintColor: colors.inactiveText,
				tabBarLabelStyle: config.label,
				tabBarItemStyle: {
					gap: config.item.gap,
				},
			}}>
			<Tabs.Screen
				name='home/index'
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<House
							size={config.icon.size}
							color={focused ? colors.activeIcon : colors.inactiveIcon}
						/>
					),
					tabBarLabelStyle: config.labelActive,
				}}
			/>
			<Tabs.Screen
				name='my-requests/index'
				options={{
					title: "My Requests",
					tabBarIcon: ({ focused }) => (
						<MemoListCheckClock
							size={config.icon.size}
							color={focused ? colors.activeIcon : colors.inactiveIcon}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='messages/index'
				options={{
					title: "Messages",
					tabBarIcon: ({ focused }) => (
						<ChatText
							size={config.icon.size}
							color={focused ? colors.activeIcon : colors.inactiveIcon}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='profile/index'
				options={{
					title: "Profile",
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								width: config.avatar.size,
								height: config.avatar.size,
								borderRadius: config.avatar.borderRadius,
								backgroundColor: colors.avatarBg,
								overflow: "hidden",
							}}>
							<Image
								source={{ uri: avatarImage }}
								style={{
									width: config.avatar.size,
									height: config.avatar.size,
								}}
								contentFit='cover'
							/>
						</View>
					),
				}}
			/>
		</Tabs>
	);
}
