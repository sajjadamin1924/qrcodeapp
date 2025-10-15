import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import QRCodeScreenLayout from "../../components/QRCodeScreenLayout"; // 👈 Shared layout
import { useQRCodeHistory } from "../hooks/UseQRCodeHistory";

export default function TwitterQRCodeScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { saveCreateToHistory } = useQRCodeHistory();

  const handleGenerateQRCode = () => {
    if (!username.trim()) {
      Alert.alert(t("Error"), t("Please enter a valid Twitter username"));
      return;
    }

    const value = `https://twitter.com/${username.trim()}`;
    setQrValue(value);
    saveCreateToHistory(value);
    navigation.navigate("openFile", { scannedData: value });
  };

  return (
    <QRCodeScreenLayout
      title={t("twitter")}
      iconSource={require("../../assets/images/Vector.png")}
    >
      {/* Input Field */}
      <Text style={styles.label}>{t("username")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterTwitterUsername")}
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t("generateQrCode")}</Text>
      </TouchableOpacity>

      {/* QR Preview */}
      {qrValue && (
        <View style={styles.qrSection}>
          <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
          <Text style={styles.qrLabel}>{t("scanToOpenTwitter")}</Text>
        </View>
      )}
    </QRCodeScreenLayout>
  );
}

const styles = {
  label: {
    color: "#B3B3B3",
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#FDB623",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#1E1E1E",
    fontWeight: "700",
    fontSize: 16,
  },
  qrSection: {
    marginTop: 40,
    alignItems: "center",
  },
  qrLabel: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },
};
