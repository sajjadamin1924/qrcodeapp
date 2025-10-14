import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ImageBackground,
  Linking,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const ShowQRCodeScreen = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const { qrValue } = route.params || {};
  const value = qrValue || "No data received";

  // ✅ Share QR
  const handleShare = async () => {
    try {
      await Share.share({ message: value });
    } catch (error) {
      Alert.alert("Error", t("errorShare"));
    }
  };

  // ✅ Save QR (prevent duplicates)
  const handleSave = async () => {
    try {
      const saved = await AsyncStorage.getItem("qrHistory");
      const parsed = saved ? JSON.parse(saved) : [];
      const alreadyExists = parsed.some((item) => item.url === value);
      if (alreadyExists) return;

      const newEntry = {
        id: Date.now().toString(),
        url: value,
        date: new Date().toLocaleString(),
        type: "create",
      };

      const updated = [newEntry, ...parsed];
      await AsyncStorage.setItem("qrHistory", JSON.stringify(updated));
    } catch (error) {
      console.error("Error saving QR:", error);
    }
  };

  // ✅ Open in browser if URL
  const handleOpenInBrowser = async () => {
    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      Alert.alert(t("invalidUrl"), t("thisIsNotAValidUrl"));
      return;
    }
    const supported = await Linking.canOpenURL(value);
    if (supported) {
      await Linking.openURL(value);
    } else {
      Alert.alert(t("error"), t("cannotOpenUrl"));
    }
  };

  const isURL = value.startsWith("http://") || value.startsWith("https://");

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={20} color="#FFD700" />
          </TouchableOpacity>
          <Text style={styles.title}>{t("title")}</Text>
        </View>

        {/* Data Section */}
        <View style={styles.resultCard}>
          <Text style={styles.dataType}>{t("dataLabel")}</Text>
          <Text style={styles.url}>{value}</Text>
        </View>

        {/* ✅ Open in Browser (above QR) */}
        {isURL && (
          <View style={styles.centeredAction}>
            <TouchableOpacity
              style={styles.openButton}
              onPress={handleOpenInBrowser}
            >
              <Ionicons name="open-outline" size={26} color="#000" />
            </TouchableOpacity>
            <Text style={styles.openLabel}>{t("openInBrowser")}</Text>
          </View>
        )}

        {/* QR Code */}
        <View style={styles.qrImageContainer}>
          <QRCode value={value} size={200} color="#000" backgroundColor="#fff" />
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <View style={styles.actionWrapper}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.actionText}>{t("share")}</Text>
          </View>

          <View style={styles.actionWrapper}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <Ionicons name="save-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.actionText}>{t("save")}</Text>
          </View>
        </View>

        {/* Footer */}
        <BottomNavigation />
      </View>
    </ImageBackground>
  );
};

export default ShowQRCodeScreen;

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(30,30,30,0.6)",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  backButton: {
    backgroundColor: "#2a2a2a",
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  title: { fontSize: 22, color: "#fff", fontWeight: "600" },
  resultCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  dataType: { fontSize: 16, fontWeight: "600", color: "#fff", marginBottom: 10 },
  url: { color: "#fff", fontSize: 14, marginBottom: 10 },

  // ✅ Browser open button styles
  centeredAction: {
    alignItems: "center",
    marginBottom: 10,
  },
  openButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 12,
  },
  openLabel: {
    marginTop: 6,
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  qrImageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 40,
  },
  actionWrapper: { alignItems: "center" },
  actionButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  actionText: { marginTop: 6, fontWeight: "600", color: "#fff", fontSize: 14 },
});
