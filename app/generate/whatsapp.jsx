import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import QRCodeScreenLayout from "../../components/QRCodeScreenLayout"; // 👈 Shared layout
import { useQRCodeHistory } from "../hooks/UseQRCodeHistory";

export default function WhatsAppQRCodeScreen() {
  const { t } = useTranslation();
  const [number, setNumber] = useState("");
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { saveCreateToHistory } = useQRCodeHistory();

  const handleGenerateQRCode = () => {
    if (!number.trim()) {
      Alert.alert(t("error"), t("whatsapp_number_required"));
      return;
    }

    const value = `https://wa.me/${number.trim()}`;
    setQrValue(value);
    saveCreateToHistory(value);
    navigation.navigate("openFile", { scannedData: value });
  };

  return (
    <QRCodeScreenLayout
      title={t("whatsapp")}
      iconSource={require("../../assets/images/whatsapp.png")}
    >
      {/* Input Field */}
      <Text style={styles.label}>{t("whatsapp_number")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enter_whatsapp_number")}
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={number}
        onChangeText={setNumber}
      />

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t("generate_qr")}</Text>
      </TouchableOpacity>

      {/* QR Preview */}
      {qrValue && (
        <View style={styles.qrWrapper}>
          <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
          <Text style={styles.qrText}>{t("scan_to_open_whatsapp")}</Text>
        </View>
      )}
    </QRCodeScreenLayout>
  );
}

const styles = {
  label: { color: "#B3B3B3", fontSize: 15, marginBottom: 8 },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
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
  buttonText: { color: "#1E1E1E", fontWeight: "700", fontSize: 16 },
  qrWrapper: { marginTop: 40, alignItems: "center" },
  qrText: { marginTop: 12, color: "#fff", fontSize: 16 },
};
