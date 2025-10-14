import { useNavigation } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PermissionScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [galleryGranted, setGalleryGranted] = useState(false);
  const [notificationGranted, setNotificationGranted] = useState(false);

  useEffect(() => {
    if (cameraPermission?.granted && galleryGranted && notificationGranted) {
      navigation.navigate("MainApp");
    }
  }, [cameraPermission, galleryGranted, notificationGranted]);

  const requestGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setGalleryGranted(status === "granted");
  };

  const requestNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setNotificationGranted(status === "granted");
  };

  return (
    <LinearGradient colors={["#0f0f0f", "#1a1a1a", "#222"]} style={styles.container}>
      <Image source={require("../../assets/images/permission.png")} style={styles.image} />
      <Text style={styles.title}>{t("permissionsTitle")}</Text>
      <Text style={styles.subtitle}>{t("permissionsSubtitle")}</Text>

      <TouchableOpacity
        style={[styles.button, cameraPermission?.granted && styles.buttonGranted]}
        onPress={() => requestCameraPermission()}
      >
        <Text style={styles.buttonText}>
          {cameraPermission?.granted ? t("cameraGranted") : t("grantCamera")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, galleryGranted && styles.buttonGranted]}
        onPress={requestGallery}
      >
        <Text style={styles.buttonText}>
          {galleryGranted ? t("galleryGranted") : t("grantGallery")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, notificationGranted && styles.buttonGranted]}
        onPress={requestNotifications}
      >
        <Text style={styles.buttonText}>
          {notificationGranted ? t("notificationsGranted") : t("grantNotifications")}
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "#888", fontSize: 13 }}>{t("redirectInfo")}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  image: { width: 200, height: 200, resizeMode: "contain", marginBottom: 20 },
  title: { fontSize: 26, color: "#fff", fontWeight: "bold", marginBottom: 8 },
  subtitle: { color: "#aaa", textAlign: "center", marginBottom: 30, fontSize: 15 },
  button: {
    backgroundColor: "#FDB623",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonGranted: { backgroundColor: "#1DB954" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
