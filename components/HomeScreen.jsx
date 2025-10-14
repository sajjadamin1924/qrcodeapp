import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraView } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "../components/BottomNavigation";
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState("back");
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState("off");

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

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
  });

  if (hasPermission === null) {
    return <Text>{t("requestingCamera")}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{t("noCamera")}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Full-screen camera */}
      <CameraView
        style={styles.camera}
        facing={type}
        zoom={zoom}
        enableTorch={flash === "on"}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={({ data }) => {
          if (data) {
            navigation.navigate("openFile", { scannedData: data });
          }
        }}
      />

      {/* Overlay content */}
      <SafeAreaView style={styles.overlayContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate("openFile")}>
            <Ionicons name="images-outline" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setFlash((f) => (f === "off" ? "on" : "off"))}
          >
            <Ionicons
              name={flash === "off" ? "flash-off" : "flash"}
              size={28}
              color={flash === "off" ? "gray" : "#FFD700"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType(type === "back" ? "front" : "back")}
          >
            <Ionicons name="camera-reverse-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Scanning box */}
        <View style={styles.overlay}>
          <View style={styles.scanBox}>
            <Animated.View
              style={[styles.scanLine, { transform: [{ translateY }] }]}
            />
          </View>
        </View>

        {/* Zoom Slider */}
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

        {/* Footer */}
        <BottomNavigation />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#FFD700",
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  scanLine: {
    width: "100%",
    height: 3,
    backgroundColor: "#FFD700",
    opacity: 0.9,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderText: {
    color: "white",
    fontSize: 28,
  },
});
