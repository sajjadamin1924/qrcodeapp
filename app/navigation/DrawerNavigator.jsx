import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "@/components/HomeScreen";
import GenerateQrScreen from "../generate/Generate";
import HistoryScreen from "../generate/history";
import ScannerScreen from "../generate/scanner";
import SettingsScreen from "../generate/settings";

const Drawer = createDrawerNavigator();

function DrawerHeader() {
  return (
    <View style={styles.drawerHeader}>
      <View style={styles.logoWrap}>
        <Ionicons name="qr-code" size={28} color="#FDB623" />
      </View>
      <View>
        <Text style={styles.appName}>QR Maker</Text>
        <Text style={styles.appTagline}>Create · Scan · Manage</Text>
      </View>
    </View>
  );
}

export default function DrawerNavigator() {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} t={t} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawer,
        drawerActiveTintColor: "#FDB623",
        drawerInactiveTintColor: "#6A6A6A",
        drawerActiveBackgroundColor: "rgba(253,182,35,0.1)",
        drawerItemStyle: styles.drawerItem,
        drawerLabelStyle: styles.drawerLabel,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t("nav_home"),
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Generate"
        component={GenerateQrScreen}
        options={{
          title: t("nav_generate"),
          drawerIcon: ({ color }) => <Ionicons name="qr-code-outline" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          title: t("nav_scanner"),
          drawerIcon: ({ color }) => <Ionicons name="scan-outline" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="history"
        component={HistoryScreen}
        options={{
          title: t("nav_history"),
          drawerIcon: ({ color }) => <Ionicons name="time-outline" size={20} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t("nav_settings"),
          drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={20} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent({ state, descriptors, navigation, t }) {
  return (
    <SafeAreaView style={styles.drawerContent}>
      <DrawerHeader />

      <View style={styles.divider} />

      <View style={styles.navItems}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;
          const icon = options.drawerIcon;

          return (
            <TouchableOpacity
              key={route.key}
              style={[styles.navItem, isFocused && styles.navItemActive]}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.75}
            >
              <View style={styles.navItemRow}>
                {icon && icon({ color: isFocused ? "#FDB623" : "#6A6A6A", size: 20 })}
                <Text style={[styles.navLabel, isFocused && styles.navLabelActive]}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.drawerFooter}>
        <Text style={styles.footerText}>QR Maker v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#0D0D0D",
    width: 260,
    borderRightWidth: 1,
    borderRightColor: "#1A1A1A",
  },
  drawerContent: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  drawerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  logoWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(253,182,35,0.12)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  appTagline: {
    color: "#4A4A4A",
    fontSize: 11,
    marginTop: 1,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: "#1A1A1A",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  navItems: {
    flex: 1,
    paddingHorizontal: 12,
  },
  navItem: {
    borderRadius: 12,
    marginBottom: 4,
    overflow: "hidden",
  },
  navItemActive: {
    backgroundColor: "rgba(253,182,35,0.1)",
  },
  navItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
  },
  navLabel: {
    color: "#6A6A6A",
    fontSize: 15,
    fontWeight: "600",
  },
  navLabelActive: {
    color: "#FDB623",
  },
  drawerItem: {
    borderRadius: 12,
    marginHorizontal: 0,
    marginVertical: 2,
  },
  drawerLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  drawerFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  footerText: {
    color: "#2A2A2A",
    fontSize: 12,
  },
});
