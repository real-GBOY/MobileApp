/** @format */

import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}>
			<Tabs.Screen
				name='home/index'
				options={{
					title: "Home",
				}}
			/>
			<Tabs.Screen
				name='explore/index'
				options={{
					title: "Explore",
				}}
			/>
		</Tabs>
	);
}
