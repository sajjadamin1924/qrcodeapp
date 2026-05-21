import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const ActionBtn = ({ icon, label, onPress, variant = "gold" }) => (
  <TouchableOpacity style={[styles.actionBtn, variant === "outline" && styles.actionBtnOutline]} onPress={onPress} activeOpacity={0.8}>
    <Ionicons name={icon} size={20} color={variant === "gold" ? "#0A0A0A" : "#FDB623"} />
    <Text style={[styles.actionBtnText, variant === "outline" && styles.actionBtnTextOutline]}>{label}</Text>
  </TouchableOpacity>
);

const ShowQRCodeScreen = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { qrValue } = route.params || {};
  const value = qrValue || "No data received";

  const handleShare = async () => {
    try {
      await Share.share({ message: value });
    } catch {
      Alert.alert("Error", t("error_share"));
    }
  };

  const handleSave = async () => {
    try {
      const saved = await AsyncStorage.getItem("qrHistory");
      const parsed = saved ? JSON.parse(saved) : [];
      if (parsed.some((item) => item.url === value)) return;
      const updated = [{ id: Date.now().toString(), url: value, date: new Date().toLocaleString(), type: "create" }, ...parsed];
      await AsyncStorage.setItem("qrHistory", JSON.stringify(updated));
      Alert.alert("Saved", "QR code saved to history.");
    } catch {
      console.error("Error saving QR");
    }
  };

  const isURL = value.startsWith("http://") || value.startsWith("https://");
  const handleOpenInBrowser = async () => {
    if (!isURL) { Alert.alert(t("invalid_url"), t("invalid_url_message")); return; }
    const supported = await Linking.canOpenURL(value);
    if (supported) await Linking.openURL(value);
    else Alert.alert(t("error"), t("cannot_open_url"));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FDB623" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>QR Code</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* QR card */}
        <View style={styles.qrCard}>
          <View style={styles.qrInner}>
            <QRCode value={value} size={200} color="#0A0A0A" backgroundColor="#FFFFFF" />
          </View>
          <View style={styles.qrDivider} />
          <Text style={styles.qrValue} numberOfLines={2}>{value}</Text>
        </View>

        {/* Open in browser */}
        {isURL && (
          <TouchableOpacity style={styles.browserBtn} onPress={handleOpenInBrowser} activeOpacity={0.8}>
            <Ionicons name="open-outline" size={16} color="#FDB623" />
            <Text style={styles.browserBtnText}>{t("open_in_browser")}</Text>
          </TouchableOpacity>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <ActionBtn icon="share-social-outline" label={t("share")} onPress={handleShare} variant="gold" />
          <ActionBtn icon="bookmark-outline" label={t("save")} onPress={handleSave} variant="outline" />
        </View>
      </View>

      <BottomNavigation />
    </SafeAreaView>
  );
};

export default ShowQRCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100,
    alignItems: "center",
  },
  qrCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    width: "100%",
    shadowColor: "#FDB623",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    marginBottom: 20,
  },
  qrInner: {
    padding: 4,
  },
  qrDivider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    width: "100%",
    marginVertical: 16,
  },
  qrValue: {
    color: "#333333",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  browserBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(253,182,35,0.1)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.25)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },
  browserBtnText: {
    color: "#FDB623",
    fontSize: 13,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FDB623",
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: "#FDB623",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  actionBtnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#FDB623",
    shadowOpacity: 0,
    elevation: 0,
  },
  actionBtnText: {
    color: "#0A0A0A",
    fontSize: 14,
    fontWeight: "700",
  },
  actionBtnTextOutline: {
    color: "#FDB623",
  },
});
