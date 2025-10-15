import { useNavigation, useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, Image, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FullScreenResultLayout from "../components/FullScreenLayout";
import BottomNavigation from "@/components/BottomNavigation";

export default function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { scannedData } = route.params || {};
  const scannedUrl = scannedData || "No data found";

  const handleCopy = () => {
    Clipboard.setStringAsync(scannedUrl);
    Alert.alert("Copied", "Data copied to clipboard");
  };

  const handleShare = async () => {
    try {
      await Share.share({ message: scannedUrl });
    } catch (error) {
      Alert.alert("Error", "Unable to share");
    }
  };

  return (
    <FullScreenResultLayout>
      {/* Result Card */}
      <View style={styles.resultCard}>
        <Image source={require("../assets/images/qricon.png")} style={styles.qrIcon} />
        <Text style={styles.dataType}>Data</Text>
        <Text style={styles.timestamp}>{new Date().toLocaleString()}</Text>
        <Text style={styles.url}>{scannedUrl}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("showqr", { qrValue: scannedUrl })}>
          <Text style={styles.showQR}>Show QR Code</Text>
        </TouchableOpacity>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Image source={require("../assets/images/share.png")} style={styles.actionIcon} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
          <Image source={require("../assets/images/copy.png")} style={styles.actionIcon} />
          <Text style={styles.actionText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <BottomNavigation />
    </FullScreenResultLayout>
  );
}

const styles = StyleSheet.create({
  resultCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 14,
    padding: 24,
    marginBottom: 40,
    alignItems: "start",
  },
  qrIcon: { width: 40, height: 40, marginBottom: 10 },
  dataType: { fontSize: 16, fontWeight: "600", color: "#fff", marginBottom: 4 },
  timestamp: { fontSize: 12, color: "#aaa", marginBottom: 10 },
  url: { color: "#fff", fontSize: 14, textAlign: "start", marginBottom: 10 },
  showQR: { color: "#FDB623", fontSize: 14, alignItems:"center" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    backgroundColor: "#FDB623",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: 100,
  },
  actionIcon: { width: 24, height: 24, marginBottom: 6 },
  actionText: { color: "#1E1E1E", fontWeight: "600", fontSize: 14 },
});
