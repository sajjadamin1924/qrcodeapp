import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Camera, CameraView } from "expo-camera";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import jpeg from "jpeg-js";
import jsQR from "jsqr";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
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
import UPNG from "upng-js";
import BottomNavigation from "../components/BottomNavigation";
import { loadSettings } from "../app/hooks/useSettings";

const ALL_TYPES = [
  "qr", "aztec", "pdf417", "datamatrix",
  "ean13", "ean8", "upc_a", "upc_e",
  "code128", "code39", "code93", "codabar", "itf14",
];
const TYPE_LABELS = {
  qr: "QR Code", aztec: "Aztec", pdf417: "PDF417", datamatrix: "Data Matrix",
  ean13: "EAN-13", ean8: "EAN-8", upc_a: "UPC-A", upc_e: "UPC-E",
  code128: "Code 128", code39: "Code 39", code93: "Code 93", codabar: "Codabar", itf14: "ITF-14",
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState("back");
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState("off");
  const [settings, setSettings] = useState({ vibrate: true, beep: false });
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Reload settings every time this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadSettings().then(setSettings);
    }, [])
  );

  const triggerFeedback = (currentSettings) => {
    if (currentSettings.vibrate) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    if (currentSettings.beep) {
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      } else {
        Vibration.vibrate([0, 80, 60, 80]);
      }
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(t("permission_denied") || "Permission denied");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        base64: true,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];
      if (!asset.base64) {
        Alert.alert("Error", "Could not read image data.");
        return;
      }

      const binaryString = atob(asset.base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      let width, height, rgbaData;
      const isPNG = bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
      const isJPEG = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;

      if (isPNG) {
        const img = UPNG.decode(bytes.buffer);
        width = img.width;
        height = img.height;
        rgbaData = new Uint8ClampedArray(UPNG.toRGBA8(img)[0]);
      } else if (isJPEG) {
        const img = jpeg.decode(bytes, { useTArray: true });
        width = img.width;
        height = img.height;
        rgbaData = new Uint8ClampedArray(img.data.buffer);
      } else {
        Alert.alert("Unsupported format", "Please select a JPEG or PNG image.");
        return;
      }

      const code = jsQR(rgbaData, width, height);
      if (code?.data) {
        navigation.navigate("openFile", { scannedData: code.data });
      } else {
        Alert.alert(t("no_qr_found") || "No QR code found in this image.");
      }
    } catch (error) {
      console.error("Gallery QR scan error:", error);
      Alert.alert("Error", "Failed to scan QR code from image.");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text style={styles.infoText}>{t("requesting_camera")}</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Ionicons name="camera-off-outline" size={48} color="#FDB623" />
        <Text style={styles.infoText}>{t("no_camera")}</Text>
      </View>
    );
  }

  const translateY = animation.interpolate({ inputRange: [0, 1], outputRange: [0, 236] });

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing={type}
        zoom={zoom}
        enableTorch={flash === "on"}
        barcodeScannerSettings={{ barcodeTypes: ALL_TYPES }}
        onBarcodeScanned={({ data, type: codeType }) => {
          if (data) {
            triggerFeedback(settings);
            navigation.navigate("openFile", {
              scannedData: data,
              barcodeType: TYPE_LABELS[codeType] ?? codeType,
            });
          }
        }}
      />

      <SafeAreaView style={styles.overlay}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBtn} onPress={pickImageFromGallery} activeOpacity={0.8}>
            <Ionicons name="image-outline" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={styles.topTitle}>
            <Text style={styles.topTitleText}>SCAN</Text>
          </View>
          <View style={styles.topRight}>
            <TouchableOpacity
              style={[styles.topBtn, flash === "on" && styles.topBtnActive]}
              onPress={() => setFlash(flash === "off" ? "on" : "off")}
              activeOpacity={0.8}
            >
              <Ionicons name={flash === "on" ? "flash" : "flash-off"} size={22} color={flash === "on" ? "#FDB623" : "#fff"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topBtn}
              onPress={() => setType(type === "back" ? "front" : "back")}
              activeOpacity={0.8}
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

          {/* Format badges */}
          <View style={styles.formatsRow}>
            {["QR", "EAN-13", "Code 128", "UPC-A", "Code 39", "+more"].map(f => (
              <View key={f} style={styles.formatBadge}>
                <Text style={styles.formatBadgeText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Zoom slider */}
          <View style={styles.sliderRow}>
            <TouchableOpacity onPress={() => setZoom((z) => Math.max(0, z - 0.1))}>
              <Text style={styles.zoomBtn}>−</Text>
            </TouchableOpacity>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              step={0.05}
              value={zoom}
              onValueChange={setZoom}
              thumbTintColor="#FDB623"
              minimumTrackTintColor="#FDB623"
              maximumTrackTintColor="rgba(255,255,255,0.2)"
            />
            <TouchableOpacity onPress={() => setZoom((z) => Math.min(1, z + 0.1))}>
              <Text style={styles.zoomBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <BottomNavigation />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  centered: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  infoText: { color: "#9A9A9A", fontSize: 16 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  topTitle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(253,182,35,0.15)",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.3)",
  },
  topTitleText: {
    color: "#FDB623",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
  },
  topRight: {
    flexDirection: "row",
    gap: 8,
  },
  topBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  topBtnActive: {
    backgroundColor: "rgba(253,182,35,0.2)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.4)",
  },
  scanArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 260,
    height: 260,
    position: "relative",
    overflow: "hidden",
  },
  corner: {
    position: "absolute",
    width: 28,
    height: 28,
    borderColor: "#FDB623",
    borderWidth: 3,
  },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#FDB623",
    shadowColor: "#FDB623",
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  scanHint: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginTop: 20,
    letterSpacing: 0.3,
  },
  formatsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  formatBadge: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.2)",
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  formatBadgeText: { color: "#FDB623", fontSize: 9, fontWeight: "600" },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
    paddingHorizontal: 32,
    width: "100%",
  },
  slider: { flex: 1, marginHorizontal: 8 },
  zoomBtn: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
    paddingHorizontal: 8,
  },
});
