import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Linking, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { scannedData, barcodeType } = route.params || {};
  const scannedUrl = scannedData || t("no_data");

  const isURL      = scannedUrl.startsWith("http://") || scannedUrl.startsWith("https://");
  const isBarcode  = !!barcodeType && barcodeType !== "QR Code" && barcodeType !== "Aztec" && barcodeType !== "PDF417" && barcodeType !== "Data Matrix";
  const codeLabel  = barcodeType ?? (isURL ? "URL" : "TEXT");
  const webUrl     = isURL ? scannedUrl : `https://www.google.com/search?q=${encodeURIComponent(scannedUrl)}`;

  const handleCopy = async () => {
    await Clipboard.setStringAsync(scannedUrl);
    Alert.alert(t("copied_title"), t("copied_message"));
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: scannedUrl });
    } catch {
      Alert.alert(t("error_title"), t("error_message"));
    }
  };

  const handleOpenWeb = async () => {
    try {
      await Linking.openURL(webUrl);
    } catch {
      Alert.alert("Error", "Failed to open browser.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FDB623" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Result</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Result type badge */}
        <View style={styles.typeBadge}>
          <Ionicons
            name={isURL ? "globe-outline" : barcodeType ? "barcode-outline" : "text-outline"}
            size={14}
            color="#FDB623"
          />
          <Text style={styles.typeBadgeText}>{codeLabel}</Text>
        </View>

        {/* Result card */}
        <View style={styles.resultCard}>
          <View style={styles.resultIconRow}>
            <View style={styles.resultIconWrap}>
              <Ionicons name="scan-outline" size={22} color="#FDB623" />
            </View>
            <View style={styles.resultMeta}>
              <Text style={styles.resultMetaLabel}>{t("data_type")}</Text>
              <Text style={styles.resultMetaDate}>{new Date().toLocaleString()}</Text>
            </View>
          </View>

          <View style={styles.resultDivider} />

          <Text style={styles.resultUrl}>{scannedUrl}</Text>

          {/* View as QR */}
          <TouchableOpacity
            style={styles.viewQrBtn}
            onPress={() => navigation.navigate("showqr", { qrValue: scannedUrl })}
            activeOpacity={0.8}
          >
            <Ionicons name="qr-code-outline" size={15} color="#FDB623" />
            <Text style={styles.viewQrText}>{t("show_qr")}</Text>
          </TouchableOpacity>
        </View>

        {/* Open in Web — full-width button shown for all results */}
        <TouchableOpacity style={styles.webBtn} onPress={handleOpenWeb} activeOpacity={0.85}>
          <Ionicons
            name={isURL ? "open-outline" : isBarcode ? "search-outline" : "globe-outline"}
            size={18}
            color="#0A0A0A"
          />
          <Text style={styles.webBtnText}>
            {isURL ? t("open_in_browser") : isBarcode ? "Search barcode on Web" : "Search on Web"}
          </Text>
        </TouchableOpacity>

        {/* Share + Copy */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare} activeOpacity={0.85}>
            <Ionicons name="share-social-outline" size={20} color="#0A0A0A" />
            <Text style={styles.actionBtnText}>{t("share")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnOutline} onPress={handleCopy} activeOpacity={0.85}>
            <Ionicons name="copy-outline" size={20} color="#FDB623" />
            <Text style={styles.actionBtnTextOutline}>{t("copy")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomNavigation />
    </SafeAreaView>
  );
}

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
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 100,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "rgba(253,182,35,0.1)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.25)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 16,
  },
  typeBadgeText: {
    color: "#FDB623",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  resultCard: {
    backgroundColor: "#141414",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#222222",
    marginBottom: 24,
  },
  resultIconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  resultIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "rgba(253,182,35,0.1)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  resultMeta: { flex: 1 },
  resultMetaLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  resultMetaDate: {
    color: "#4A4A4A",
    fontSize: 11,
  },
  resultDivider: {
    height: 1,
    backgroundColor: "#1E1E1E",
    marginBottom: 16,
  },
  resultUrl: {
    color: "#CCCCCC",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  viewQrBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
  },
  viewQrText: {
    color: "#FDB623",
    fontSize: 13,
    fontWeight: "600",
  },
  webBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FDB623",
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#FDB623",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  webBtnText: {
    color: "#0A0A0A",
    fontSize: 15,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
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
  actionBtnText: {
    color: "#0A0A0A",
    fontSize: 14,
    fontWeight: "700",
  },
  actionBtnOutline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#FDB623",
  },
  actionBtnTextOutline: {
    color: "#FDB623",
    fontSize: 14,
    fontWeight: "700",
  },
});
