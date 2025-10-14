import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";

const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraType, setCameraType] = useState("back");
  const [flash, setFlash] = useState("off");
  const navigation = useNavigation();
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
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const saveScanToHistory = async (data) => {
    try {
      const saved = await AsyncStorage.getItem("qrHistory");
      const history = saved ? JSON.parse(saved) : [];
      const newItem = {
        id: uuid.v4().toString(),
        url: data,
        date: new Date().toLocaleString(),
        type: "scan",
      };
      await AsyncStorage.setItem("qrHistory", JSON.stringify([newItem, ...history]));
    } catch (error) {
      console.error("Error saving scan history:", error);
    }
  };

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) return;
    setScanned(true);

    if (!data) {
      Alert.alert("Error", "No data found in scanned QR code.");
      return;
    }

    saveScanToHistory(data);
    navigation.navigate("openFile", { scannedData: data });
  };

  // 🖼️ Pick image from gallery and try to detect QR
  const pickImageFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Gallery access is needed to scan from images.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        const barcode = await BarCodeScanner.scanFromURLAsync(asset.uri);

        if (barcode.length > 0) {
          const data = barcode[0].data;
          saveScanToHistory(data);
          navigation.navigate("openFile", { scannedData: data });
        } else {
          Alert.alert("No QR Found", "No QR code detected in the selected image.");
        }
      }
    } catch (error) {
      console.error("Gallery Scan Error:", error);
      Alert.alert("Error", "Failed to scan image from gallery.");
    }
  };

  if (hasPermission === null) {
    return <Text style={styles.infoText}>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.infoText}>No access to camera</Text>;
  }

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
  });

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ flex: 1 }}
        facing={cameraType}
        enableTorch={flash === "on"}
      />

      {/* ⚡ Green scan box */}
      <View style={styles.overlay}>
        <View style={styles.scanBox}>
          <Animated.View style={[styles.scanLine, { transform: [{ translateY }] }]} />
        </View>
      </View>

      {/* 🔘 Controls (Flash, Camera switch, Gallery) */}
      <View style={styles.topControls}>
        <TouchableOpacity
          onPress={() => setFlash(flash === "off" ? "on" : "off")}
          style={styles.iconButton}
        >
          <Ionicons
            name={flash === "on" ? "flash" : "flash-off"}
            size={26}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCameraType(cameraType === "back" ? "front" : "back")}
          style={styles.iconButton}
        >
          <Ionicons name="camera-reverse-outline" size={26} color="white" />
        </TouchableOpacity>

        {/* 🖼️ Gallery icon */}
        <TouchableOpacity onPress={pickImageFromGallery} style={styles.iconButton}>
          <Ionicons name="images-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {/* 🔘 Scan Again */}
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Scan Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    backgroundColor: "#000",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 250,
    height: 250,
    borderColor: "#00FF00",
    borderWidth: 3,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  scanLine: {
    width: "100%",
    height: 3,
    backgroundColor: "#00FF00",
    opacity: 0.8,
  },
  topControls: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    gap: 15,
  },
  iconButton: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 50,
  },
  button: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#FDB623",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ScannerScreen;
