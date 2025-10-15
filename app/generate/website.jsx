import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import QRCodeScreenLayout from "../../components/QRCodeScreenLayout"; // 👈 Shared layout
import { useQRCodeHistory } from "../hooks/UseQRCodeHistory";

export default function WebsiteQRCodeScreen() {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { saveCreateToHistory } = useQRCodeHistory();

  const handleGenerateQRCode = () => {
    if (!url.trim()) {
      Alert.alert(t("Error"), t("Please enter a valid website URL"));
      return;
    }

    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    setQrValue(formattedUrl);
    saveCreateToHistory(formattedUrl);
    navigation.navigate("openFile", { scannedData: formattedUrl });
  };

  return (
    <QRCodeScreenLayout
      title={t("website")}
      iconSource={require("../../assets/images/website.png")}
    >
      {/* Input Field */}
      <Text style={styles.label}>{t("websiteURL")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterWebsitePlaceholder")}
        placeholderTextColor="#999"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        keyboardType="url"
      />

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t("generateQrCode")}</Text>
      </TouchableOpacity>

      {/* QR Preview */}
      {qrValue && (
        <View style={styles.qrSection}>
          <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
          <Text style={styles.qrLabel}>{t("scanToVisitWebsite")}</Text>
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
