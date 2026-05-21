import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PermissionItem = ({ icon, title, subtitle, granted, onPress }) => (
  <TouchableOpacity
    style={[styles.permCard, granted && styles.permCardGranted]}
    onPress={onPress}
    activeOpacity={granted ? 1 : 0.75}
    disabled={granted}
  >
    <View style={[styles.permIconWrap, granted && styles.permIconGranted]}>
      <Ionicons name={icon} size={22} color={granted ? "#34C759" : "#FDB623"} />
    </View>
    <View style={styles.permText}>
      <Text style={styles.permTitle}>{title}</Text>
      <Text style={styles.permSubtitle}>{subtitle}</Text>
    </View>
    <View style={[styles.permStatus, granted && styles.permStatusGranted]}>
      <Ionicons
        name={granted ? "checkmark" : "chevron-forward"}
        size={16}
        color={granted ? "#34C759" : "#5A5A5A"}
      />
    </View>
  </TouchableOpacity>
);

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

  const allGranted = cameraPermission?.granted && galleryGranted && notificationGranted;

  return (
    <LinearGradient colors={["#0A0A0A", "#0F0F0F", "#0A0A0A"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          {/* Top illustration */}
          <View style={styles.imageWrap}>
            <View style={styles.imageGlow} />
            <Image
              source={require("../../assets/images/permission.png")}
              style={styles.image}
            />
          </View>

          {/* Header */}
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>STEP 2 OF 2</Text>
          </View>
          <Text style={styles.title}>{t("permissions_title")}</Text>
          <Text style={styles.subtitle}>{t("permissions_subtitle")}</Text>

          {/* Permission cards */}
          <View style={styles.cards}>
            <PermissionItem
              icon="camera-outline"
              title={t("grant_camera")}
              subtitle="Required for scanning QR codes"
              granted={!!cameraPermission?.granted}
              onPress={requestCameraPermission}
            />
            <PermissionItem
              icon="images-outline"
              title={t("grant_gallery")}
              subtitle="Required to scan from images"
              granted={galleryGranted}
              onPress={requestGallery}
            />
            <PermissionItem
              icon="notifications-outline"
              title={t("grant_notifications")}
              subtitle="Get scan result alerts"
              granted={notificationGranted}
              onPress={requestNotifications}
            />
          </View>

          <Text style={styles.hint}>{t("redirect_info")}</Text>

          {allGranted && (
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => navigation.navigate("MainApp")}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#FDB623", "#E6A010"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.continueGradient}
              >
                <Text style={styles.continueBtnText}>Continue</Text>
                <Ionicons name="arrow-forward" size={18} color="#0A0A0A" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    position: "relative",
  },
  imageGlow: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(253,182,35,0.08)",
    shadowColor: "#FDB623",
    shadowOpacity: 0.3,
    shadowRadius: 40,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  headerBadge: {
    backgroundColor: "rgba(253,182,35,0.12)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 14,
  },
  headerBadgeText: {
    color: "#FDB623",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6A6A6A",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 28,
  },
  cards: {
    width: "100%",
    gap: 10,
    marginBottom: 16,
  },
  permCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141414",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#222222",
  },
  permCardGranted: {
    borderColor: "rgba(52,199,89,0.3)",
    backgroundColor: "rgba(52,199,89,0.05)",
  },
  permIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(253,182,35,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  permIconGranted: {
    backgroundColor: "rgba(52,199,89,0.1)",
  },
  permText: { flex: 1 },
  permTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  permSubtitle: {
    color: "#5A5A5A",
    fontSize: 12,
  },
  permStatus: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  permStatusGranted: {
    backgroundColor: "rgba(52,199,89,0.12)",
  },
  hint: {
    color: "#3A3A3A",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  continueBtn: {
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#FDB623",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  continueGradient: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  continueBtnText: {
    color: "#0A0A0A",
    fontSize: 16,
    fontWeight: "800",
  },
});
