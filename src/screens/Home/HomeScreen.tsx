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
import { getFontFamily } from "@/utils/fonts";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
   Dimensions,
   Platform,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from "react-native";
import {
   SafeAreaView,
   useSafeAreaInsets,
} from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - SPACING.md * 2 - SPACING.md) / 2; // Screen width - padding - gap, divided by 2

export default function HomeScreen() {
   const { colors } = useTheme();
   const insets = useSafeAreaInsets();

   return (
      <>
         <StatusBar
            style="light"
            backgroundColor={colors["primary-dark"]}
            translucent={false}
         />
         {Platform.OS === "ios" && (
            <View
               style={[
                  styles.statusBarBackground,
                  {
                     backgroundColor: colors["primary-dark"],
                     height: insets.top,
                  },
               ]}
            />
         )}
         <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}
            edges={["left", "right", "bottom"]}>
            <ScrollView
               style={styles.scrollView}
               contentContainerStyle={styles.content}>
               <Text
                  style={[
                     styles.sectionTitle,
                     {
                        color: colors["text-strong"],
                        fontFamily: getFontFamily("medium"),
                     },
                  ]}
                  numberOfLines={1}>
                  Your Stats
               </Text>
               <View style={styles.cardsGrid}>
                  <StatCard
                     title="Absence Days"
                     value="18/30"
                     status="medium"
                     statusLabel="Medium"
                     icon={
                        <CalendarXmarkCircle size={20} color={colors.danger} />
                     }
                     iconColor={colors.danger}
                     iconBgColor={colors["danger-light"]}
                     style={styles.card}
                  />
                  <StatCard
                     title="Overtime"
                     value="26.5 Hours"
                     icon={
                        <AlarmDollar size={20} color={colors["success-dark"]} />
                     }
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
                     customValue={
                        <View
                           style={[
                              styles.contractBadge,
                              {
                                 backgroundColor: colors["bg-weak"],
                                 borderColor: colors.border,
                              },
                           ]}>
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
                                    fontFamily: getFontFamily("medium"),
                                 },
                              ]}
                              numberOfLines={1}>
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
   statusBarBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
   },
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
      width: CARD_WIDTH,
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
