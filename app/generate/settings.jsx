import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Share, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadSettings, saveSettings } from "../hooks/useSettings";

const SettingRow = ({ icon, iconLib, title, subtitle, right }) => (
  <View style={styles.row}>
    <View style={styles.rowIcon}>
      {iconLib === "material" ? (
        <MaterialCommunityIcons name={icon} size={20} color="#FDB623" />
      ) : (
        <Ionicons name={icon} size={20} color="#FDB623" />
      )}
    </View>
    <View style={styles.rowText}>
      <Text style={styles.rowTitle}>{title}</Text>
      {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
    </View>
    {right}
  </View>
);

export default function SettingsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [vibrate, setVibrate] = useState(true);
  const [beep, setBeep] = useState(false);

  useEffect(() => {
    loadSettings().then((s) => {
      setVibrate(s.vibrate);
      setBeep(s.beep);
    });
  }, []);

  const handleVibrate = async (value) => {
    setVibrate(value);
    await saveSettings({ vibrate: value, beep });
  };

  const handleBeep = async (value) => {
    setBeep(value);
    await saveSettings({ vibrate, beep: value });
  };

  const handleRateUs = () => Alert.alert(t("rate_us"), t("redirecting_to_store"));

  const handleShare = async () => {
    try {
      await Share.share({ message: "Check out QR Maker — create and scan QR codes instantly!" });
    } catch {}
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>QR MAKER</Text>
        <Text style={styles.title}>{t("settings")}</Text>
      </View>

      {/* Scan Feedback */}
      <Text style={styles.sectionLabel}>SCAN FEEDBACK</Text>
      <View style={styles.card}>
        <SettingRow
          icon="vibrate"
          iconLib="material"
          title={t("vibrate")}
          subtitle={t("vibration_when_scan_done")}
          right={
            <Switch
              value={vibrate}
              onValueChange={handleVibrate}
              thumbColor={vibrate ? "#FDB623" : "#3A3A3A"}
              trackColor={{ true: "rgba(253,182,35,0.35)", false: "#2A2A2A" }}
            />
          }
        />
        <View style={styles.separator} />
        <SettingRow
          icon="volume-high-outline"
          title={t("beep")}
          subtitle={t("beep_when_scan_done")}
          right={
            <Switch
              value={beep}
              onValueChange={handleBeep}
              thumbColor={beep ? "#FDB623" : "#3A3A3A"}
              trackColor={{ true: "rgba(253,182,35,0.35)", false: "#2A2A2A" }}
            />
          }
        />
      </View>

      {/* Support */}
      <Text style={styles.sectionLabel}>SUPPORT</Text>
      <View style={styles.card}>
        <TouchableOpacity onPress={handleRateUs} activeOpacity={0.7}>
          <SettingRow
            icon="star-outline"
            title={t("rate_us")}
            subtitle={t("your_best_reward")}
            right={<Ionicons name="chevron-forward" size={16} color="#3A3A3A" />}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          onPress={() => navigation.navigate("privacyPolicy")}
          activeOpacity={0.7}
        >
          <SettingRow
            icon="shield-checkmark-outline"
            title={t("privacy_policy")}
            subtitle="Read our privacy policy"
            right={<Ionicons name="chevron-forward" size={16} color="#3A3A3A" />}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity onPress={handleShare} activeOpacity={0.7}>
          <SettingRow
            icon="share-social-outline"
            title={t("share")}
            subtitle={t("share_app")}
            right={<Ionicons name="chevron-forward" size={16} color="#3A3A3A" />}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>QR Maker v1.0.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerSub: {
    color: "#FDB623",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  sectionLabel: {
    color: "#3A3A3A",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
    marginLeft: 4,
  },
  card: {
    backgroundColor: "#141414",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1E1E1E",
    marginBottom: 24,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "rgba(253,182,35,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  rowText: { flex: 1 },
  rowTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  rowSubtitle: {
    color: "#5A5A5A",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#1E1E1E",
    marginLeft: 70,
  },
  version: {
    color: "#2A2A2A",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
});
