import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from '@react-navigation/native';
import * as React from "react";
import {
  Alert,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const ShowQRCodeScreen = () => {
const route = useRoute();
const navigation = useNavigation();
const { qrValue } = route.params || {};
const value = qrValue || 'No data received';

  // Handle sharing
  const handleShare = async () => {
    try {
      await Share.share({
        message: value,
      });
    } catch (error) {
      Alert.alert("Error", "Unable to share the QR code.");
    }
  };

  // Handle saving
  const handleSave = async () => {
    const newEntry = {
      id: Date.now().toString(),
      url: value,
      date: new Date().toLocaleString(),
      type: "create",
    };

    const saved = await AsyncStorage.getItem("qrHistory");
    const parsed = saved ? JSON.parse(saved) : [];
    const updated = [newEntry, ...parsed];

    await AsyncStorage.setItem("qrHistory", JSON.stringify(updated));
    Alert.alert("Saved!", "QR Code saved to history.");
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.png")} // 👈 use your background
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
          <Text style={styles.title}>Show QR Code</Text>
        </View>

        {/* Data Section */}
        <View style={styles.resultCard}>
          <Text style={styles.dataType}>Data</Text>
          <Text style={styles.url}>{value}</Text>
        </View>

        {/* QR Code */}
        <View style={styles.qrImageContainer}>
          <QRCode value={value} size={200} color="#000" backgroundColor="#fff" />
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.actionWrapper}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.actionText}>Share</Text>
          </View>

          <View style={styles.actionWrapper}>
            <TouchableOpacity style={styles.actionButton} onPress={handleSave}>
              <Ionicons name="save-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.actionText}>Save</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate("Generate", { screen: "Generate" })}
          >
            <Ionicons name="qr-code-outline" size={22} color="white" />
            <Text style={styles.footerText}>Generate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.centerButton}>
            <Ionicons name="scan-outline" size={30} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate("history")}
          >
            <Ionicons name="time-outline" size={22} color="white" />
            <Text style={styles.footerText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(30,30,30,0.6)", // 👈 dark overlay for readability
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
    marginBottom: 30,
  },
  dataType: { fontSize: 16, fontWeight: "600", color: "#fff", marginBottom: 10 },
  url: { color: "#fff", fontSize: 14, marginBottom: 20 },
  qrImageContainer: { alignItems: "center", justifyContent: "center", marginBottom: 20 },
  actions: { flexDirection: "row", justifyContent: "space-around", marginBottom: 40 },
  actionWrapper: { alignItems: "center" },
  actionButton: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  actionText: { marginTop: 6, fontWeight: "600", color: "#fff", fontSize: 14 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 10,
    paddingTop: 40,
    marginTop: 60,
    position: "relative",
  },
  footerButton: { alignItems: "center" },
  footerText: { color: "white", fontSize: 14, marginTop: 5 },
  centerButton: {
    position: "absolute",
    top: -35,
    alignSelf: "center",
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 50,
    elevation: 10,
  },
});

export default ShowQRCodeScreen;
