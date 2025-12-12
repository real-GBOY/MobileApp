/** @format */

import { MAIN_COLORS } from "@/styles/colors";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type ThemeType = "light" | "dark" | "system";
type Colors = typeof MAIN_COLORS.light;

type ThemeContextType = {
	theme: ThemeType;
	setTheme: (theme: ThemeType) => void;
	isDark: boolean;
	colors: Colors; // Direct access to colors object
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<ThemeType>("light");

	const isDark = useMemo(() => theme === "dark", [theme]);

	const colors = useMemo(() => {
		return isDark ? MAIN_COLORS.dark : MAIN_COLORS.light;
	}, [isDark]);

	const value = { theme, setTheme, isDark, colors };

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

