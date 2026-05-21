import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import QRCodeScreenLayout from "../../components/QRCodeScreenLayout";
import { useQRCodeHistory } from "../hooks/UseQRCodeHistory";

export default function TwitterQRCodeScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { saveCreateToHistory } = useQRCodeHistory();

  const handleGenerateQRCode = () => {
    if (!username.trim()) {
      Alert.alert(t("error"), t("twitter_username_required"));
      return;
    }
    const value = `https://twitter.com/${username.trim()}`;
    setQrValue(value);
    saveCreateToHistory(value);
    navigation.navigate("openFile", { scannedData: value });
  };

  return (
    <QRCodeScreenLayout title={t("twitter")} iconSource={require("../../assets/images/Vector.png")}>
      <Text style={styles.label}>{t("username")}</Text>
      <View style={styles.inputRow}>
        <Text style={styles.prefix}>@</Text>
        <TextInput
          style={styles.input}
          placeholder={t("enter_twitter_username")}
          placeholderTextColor="#3A3A3A"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode} activeOpacity={0.85}>
        <Text style={styles.buttonText}>{t("generate_qr")}</Text>
      </TouchableOpacity>

      {qrValue && (
        <View style={styles.qrWrapper}>
          <View style={styles.qrCard}>
            <QRCode value={qrValue} size={180} color="#0A0A0A" backgroundColor="#FFFFFF" />
          </View>
          <Text style={styles.qrText}>{t("scan_to_open_twitter")}</Text>
        </View>
      )}
    </QRCodeScreenLayout>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#6A6A6A",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A0A0A",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderRadius: 14,
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  prefix: {
    color: "#FDB623",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    color: "#FFFFFF",
    fontSize: 15,
  },
  button: {
    backgroundColor: "#FDB623",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#FDB623",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: "#0A0A0A",
    fontWeight: "800",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  qrWrapper: {
    marginTop: 32,
    alignItems: "center",
  },
  qrCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#FDB623",
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 12,
  },
  qrText: {
    color: "#5A5A5A",
    fontSize: 13,
    fontWeight: "500",
  },
});
