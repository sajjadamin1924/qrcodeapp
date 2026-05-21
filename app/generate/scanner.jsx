import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Camera, CameraView } from "expo-camera";
import * as Haptics from "expo-haptics";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import { loadSettings } from "../hooks/useSettings";

const ALL_TYPES = [
  "qr", "aztec", "pdf417", "datamatrix",
  "ean13", "ean8", "upc_a", "upc_e",
  "code128", "code39", "code93", "codabar", "itf14",
];

const TYPE_LABELS = {
  qr: "QR Code", aztec: "Aztec", pdf417: "PDF417", datamatrix: "Data Matrix",
  ean13: "EAN-13", ean8: "EAN-8", upc_a: "UPC-A", upc_e: "UPC-E",
  code128: "Code 128", code39: "Code 39", code93: "Code 93",
  codabar: "Codabar", itf14: "ITF-14",
};

const FORMAT_BADGES = ["QR", "EAN-13", "Code 128", "UPC-A", "Code 39", "Aztec"];

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned]     = useState(false);
  const [cameraType, setCameraType] = useState("back");
  const [flash, setFlash]         = useState("off");
  const [settings, setSettings]   = useState({ vibrate: true, beep: false });
  const navigation = useNavigation();
  const { t } = useTranslation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(({ status }) =>
      setHasPermission(status === "granted")
    );
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, { toValue: 1, duration: 1800, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(animation, { toValue: 0, duration: 1800, easing: Easing.linear, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useFocusEffect(useCallback(() => {
    loadSettings().then(setSettings);
    setScanned(false);
  }, []));

  const triggerFeedback = () => {
    if (settings.vibrate) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    if (settings.beep) {
      Platform.OS === "ios"
        ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        : Vibration.vibrate([0, 80, 60, 80]);
    }
  };

  const saveScanToHistory = async (data, codeType) => {
    try {
      const saved   = await AsyncStorage.getItem("qrHistory");
      const history = saved ? JSON.parse(saved) : [];
      const newItem = {
        id:       uuid.v4().toString(),
        url:      data,
        date:     new Date().toLocaleString(),
        type:     "scan",
        codeType,
      };
      await AsyncStorage.setItem("qrHistory", JSON.stringify([newItem, ...history]));
    } catch {}
  };

  const handleScanned = ({ data, type }) => {
    if (scanned) return;
    setScanned(true);
    if (!data) return;
    triggerFeedback();
    saveScanToHistory(data, type);
    navigation.navigate("openFile", {
      scannedData:  data,
      barcodeType:  TYPE_LABELS[type] ?? type,
    });
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 236],
  });

  if (hasPermission === null) return (
    <View style={styles.centered}>
      <Text style={styles.centeredText}>{t("requesting_camera")}</Text>
    </View>
  );
  if (hasPermission === false) return (
    <View style={styles.centered}>
      <Ionicons name="camera-off-outline" size={48} color="#FDB623" />
      <Text style={styles.centeredText}>{t("no_camera")}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={cameraType}
        enableTorch={flash === "on"}
        barcodeScannerSettings={{ barcodeTypes: ALL_TYPES }}
        onBarcodeScanned={scanned ? undefined : handleScanned}
      />

      <SafeAreaView style={styles.overlay}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <View style={styles.topTitle}>
            <Ionicons name="scan-outline" size={13} color="#FDB623" />
            <Text style={styles.topTitleText}>SCANNER</Text>
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity
              style={[styles.topBtn, flash === "on" && styles.topBtnActive]}
              onPress={() => setFlash(flash === "off" ? "on" : "off")}
            >
              <Ionicons name={flash === "on" ? "flash" : "flash-off"} size={22} color={flash === "on" ? "#FDB623" : "#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topBtn}
              onPress={() => setCameraType(cameraType === "back" ? "front" : "back")}
            >
              <Ionicons name="camera-reverse-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scan frame */}
        <View style={styles.scanArea}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
            <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
          </View>

          <Text style={styles.scanHint}>Align QR code or barcode within the frame</Text>

          {/* Supported formats */}
          <View style={styles.formatsRow}>
            {FORMAT_BADGES.map(f => (
              <View key={f} style={styles.formatBadge}>
                <Text style={styles.formatBadgeText}>{f}</Text>
              </View>
            ))}
            <View style={styles.formatBadge}>
              <Text style={styles.formatBadgeText}>+more</Text>
            </View>
          </View>
        </View>

        {scanned && (
          <TouchableOpacity style={styles.scanAgainBtn} onPress={() => setScanned(false)}>
            <Ionicons name="refresh-outline" size={16} color="#0A0A0A" />
            <Text style={styles.scanAgainText}>{t("scan_again")}</Text>
          </TouchableOpacity>
        )}

        <BottomNavigation />
      </SafeAreaView>
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: "#000" },
  centered:     { flex: 1, backgroundColor: "#0A0A0A", justifyContent: "center", alignItems: "center", gap: 16 },
  centeredText: { color: "#9A9A9A", fontSize: 16 },
  overlay:      { ...StyleSheet.absoluteFillObject, justifyContent: "space-between" },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  topTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(253,182,35,0.15)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.3)",
  },
  topTitleText: { color: "#FDB623", fontSize: 11, fontWeight: "700", letterSpacing: 2 },
  topRight:     { flexDirection: "row", gap: 8 },
  topBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center", alignItems: "center",
  },
  topBtnActive: {
    backgroundColor: "rgba(253,182,35,0.2)",
    borderWidth: 1, borderColor: "rgba(253,182,35,0.4)",
  },

  scanArea:  { flex: 1, justifyContent: "center", alignItems: "center" },
  scanFrame: {
    width: 260,
    height: 260,
    position: "relative",
    overflow: "hidden",
  },
  corner: { position: "absolute", width: 26, height: 26, borderColor: "#FDB623", borderWidth: 3 },
  cornerTL: { top: 0,    left: 0,  borderRightWidth: 0,  borderBottomWidth: 0, borderTopLeftRadius: 8 },
  cornerTR: { top: 0,    right: 0, borderLeftWidth: 0,   borderBottomWidth: 0, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0,  borderRightWidth: 0,  borderTopWidth: 0,   borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0,   borderTopWidth: 0,   borderBottomRightRadius: 8 },
  scanLine: {
    position: "absolute",
    left: 0, right: 0, height: 2,
    backgroundColor: "#FDB623",
    shadowColor: "#FDB623", shadowOpacity: 0.9, shadowRadius: 6,
  },

  scanHint: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 18, letterSpacing: 0.3 },

  formatsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    paddingHorizontal: 24,
  },
  formatBadge: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.2)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  formatBadgeText: { color: "#FDB623", fontSize: 9, fontWeight: "600" },

  scanAgainBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "center",
    marginBottom: 100,
    backgroundColor: "#FDB623",
    paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#FDB623", shadowOpacity: 0.4, shadowRadius: 10, elevation: 6,
  },
  scanAgainText: { fontSize: 15, fontWeight: "700", color: "#0A0A0A" },
});
