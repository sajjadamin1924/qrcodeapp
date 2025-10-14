import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // 👈 import hook
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation(); // 👈 use hook
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState("back");
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState("off");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>{t("requestingCamera")}</Text>; // 👈 translated
  }
  if (hasPermission === false) {
    return <Text>{t("noCamera")}</Text>; // 👈 translated
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("openFile")}>
          <Ionicons name="images-outline" size={28} color="white" />
        </TouchableOpacity>

        {/* Flash toggle */}
        <TouchableOpacity
          onPress={() => setFlash((f) => (f === "off" ? "on" : "off"))}
        >
          <Ionicons
            name={flash === "off" ? "flash-off" : "flash"}
            size={28}
            color={flash === "off" ? "gray" : "yellow"}
          />
        </TouchableOpacity>

        {/* Switch camera */}
        <TouchableOpacity onPress={() => setType(type === "back" ? "front" : "back")}>
          <Ionicons name="camera-reverse-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Camera */}
      <CameraView
        style={styles.camera}
        facing={type}
        zoom={zoom}
        enableTorch={flash === "on"}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={({ data }) => {
          if (data) {
            navigation.navigate("openFile", { scannedData: data });
          }
        }}
      >
        <Image
          source={require("../assets/images/homescan.png")}
          style={styles.qrImage}
        />
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderText}>-</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={zoom}
            onValueChange={setZoom}
            thumbTintColor="#FFD700"
            minimumTrackTintColor="#FFFFFF"
          />
          <Text style={styles.sliderText}>+</Text>
        </View>
      </CameraView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate("generate")}
          >
            <Ionicons name="qr-code-outline" size={22} color="white" />
            <Text style={styles.footerText}>{t("generate")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate("history")}
          >
            <Ionicons name="time-outline" size={22} color="white" />
            <Text style={styles.footerText}>{t("history")}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => navigation.navigate("scanner")}
        >
          <Image
            source={require("../assets/images/footercenter1.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  header: {
    marginTop: 40,
    marginHorizontal: 20,
    backgroundColor: "#444",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderText: {
    color: "white",
    fontSize: 28,
    fontWeight: "medium",
  },
  footer: {
    height: 80, // enough space for floating button
    backgroundColor: "#333",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    borderRadius: 10,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",

  },

  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between", // left & right edges
    width: "100%",
    paddingHorizontal: 30, // spacing from edges
  },

  footerButton: {
    alignItems: "center",
  },

  footerText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },

  centerButton: {
    position: "absolute",
    top: -25, // move half above the footer
    alignSelf: "center",
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 50,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10,
  },

  qrImage: {
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },
});
