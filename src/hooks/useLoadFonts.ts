/** @format */

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export const SF_PRO_FONTS = {
	"SF-Pro-Rounded-Ultralight": require("../../assets/images/fonts/SF-Pro-Rounded-Ultralight.otf"),
	"SF-Pro-Rounded-Thin": require("../../assets/images/fonts/SF-Pro-Rounded-Thin.otf"),
	"SF-Pro-Rounded-Light": require("../../assets/images/fonts/SF-Pro-Rounded-Light.otf"),
	"SF-Pro-Rounded-Regular": require("../../assets/images/fonts/SF-Pro-Rounded-Regular.otf"),
	"SF-Pro-Rounded-Medium": require("../../assets/images/fonts/SF-Pro-Rounded-Medium.otf"),
	"SF-Pro-Rounded-Semibold": require("../../assets/images/fonts/SF-Pro-Rounded-Semibold.otf"),
	"SF-Pro-Rounded-Bold": require("../../assets/images/fonts/SF-Pro-Rounded-Bold.otf"),
	"SF-Pro-Rounded-Heavy": require("../../assets/images/fonts/SF-Pro-Rounded-Heavy.otf"),
	"SF-Pro-Rounded-Black": require("../../assets/images/fonts/SF-Pro-Rounded-Black.otf"),
};

export const TAJAWAL_FONTS = {
	"Tajawal-ExtraLight": require("../../assets/images/fonts/Tajawal-ExtraLight.ttf"),
	"Tajawal-Light": require("../../assets/images/fonts/Tajawal-Light.ttf"),
	"Tajawal-Regular": require("../../assets/images/fonts/Tajawal-Regular.ttf"),
	"Tajawal-Medium": require("../../assets/images/fonts/Tajawal-Medium.ttf"),
	"Tajawal-Bold": require("../../assets/images/fonts/Tajawal-Bold.ttf"),
	"Tajawal-ExtraBold": require("../../assets/images/fonts/Tajawal-ExtraBold.ttf"),
	"Tajawal-Black": require("../../assets/images/fonts/Tajawal-Black.ttf"),
};

// Combine all fonts
const ALL_FONTS = {
	...SF_PRO_FONTS,
	...TAJAWAL_FONTS,
};

export function useLoadFonts() {
	const [fontsLoaded, fontError] = useFonts(ALL_FONTS);

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	return { fontsLoaded, fontError };
}

