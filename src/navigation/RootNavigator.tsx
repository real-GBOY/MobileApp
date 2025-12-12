/** @format */

import { useLoadFonts } from "@/hooks/useLoadFonts";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

export default function RootNavigator() {
	const { fontsLoaded } = useLoadFonts();

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<ThemeProvider value={DefaultTheme}>
				<Stack>
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				</Stack>
				<StatusBar style='auto' />
			</ThemeProvider>
		</SafeAreaProvider>
	);
}

