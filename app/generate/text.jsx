import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import QRCodeScreenLayout from "../../components/QRCodeScreenLayout";
import { useQRCodeHistory } from "../hooks/UseQRCodeHistory";

export default function TextQRCodeScreen() {
  const [text, setText] = useState("");
  const [qrValue, setQrValue] = useState(null);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { saveCreateToHistory } = useQRCodeHistory();

  const handleGenerateQRCode = () => {
    if (!text.trim()) {
      Alert.alert(t("error"), t("enterSomeTextAlert"));
      return;
    }

    const value = text.trim();
    setQrValue(value);
    saveCreateToHistory(value);
    navigation.navigate("openFile", { scannedData: value });
  };

  return (
    <QRCodeScreenLayout
      title={t("text")}
      iconSource={require("../../assets/images/vector.png")}
    >
      <Text style={styles.label}>{t("enterText")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterText")}
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t("generateQrCode")}</Text>
      </TouchableOpacity>

      {qrValue && (
        <View style={styles.qrWrapper}>
          <QRCode value={qrValue} size={200} color="#1E1E1E" backgroundColor="#FFF" />
          <Text style={styles.qrText}>{t("scanThisQr")}</Text>
        </View>
      )}
    </QRCodeScreenLayout>
  );
}

const styles = {
  label: {
    color: "#B3B3B3",
    fontSize: 15,
    marginBottom: 6,
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
    backgroundColor: "#FDB623",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 16,
  },
  qrWrapper: {
    marginTop: 40,
    alignItems: "center",
  },
  qrText: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: 10,
  },
};
