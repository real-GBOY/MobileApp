/** @format */

import { ChatText, House, MemoListCheckClock } from "@/components/icons";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Avatar image URL from Figma
const avatarImage =
	"https://www.figma.com/api/mcp/asset/44e7fdf8-1984-4896-bbab-d9dce94159fb";

export default function TabLayout() {
	const insets = useSafeAreaInsets();
	const bottomPadding = Math.max(insets.bottom, 8);

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "#ffffff",
					borderTopWidth: 1,
					borderTopColor: "#e5e7eb",
					height: 64 + bottomPadding,
					paddingBottom: bottomPadding,
					paddingTop: 12,
					elevation: 0,
					shadowOpacity: 0,
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
				},
				tabBarActiveTintColor: "#171717",
				tabBarInactiveTintColor: "#a3a3a3",
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "400",
					lineHeight: 16,
					marginTop: 6,
				},
				tabBarItemStyle: {
					gap: 6,
				},
			}}>
			<Tabs.Screen
				name='home/index'
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<House
							size={24}
							color={focused ? "#335cff" : "#5c5c5c"}
						/>
					),
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: "500",
						lineHeight: 16,
						marginTop: 6,
					},
				}}
			/>
			<Tabs.Screen
				name='my-requests/index'
				options={{
					title: "My Requests",
					tabBarIcon: ({ focused }) => (
						<MemoListCheckClock
							size={24}
							color={focused ? "#335cff" : "#5c5c5c"}
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
							size={24}
							color={focused ? "#335cff" : "#5c5c5c"}
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
								width: 24,
								height: 24,
								borderRadius: 12,
								backgroundColor: "#e1e4ea",
								overflow: "hidden",
							}}>
							<Image
								source={{ uri: avatarImage }}
								style={{
									width: 24,
									height: 24,
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
