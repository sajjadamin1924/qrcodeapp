import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import QRCodeScreenLayout from "../../components/QRCodeScreenLayout";
import { useQRCodeHistory } from "../hooks/UseQRCodeHistory";

export default function BusinessScreen() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [qrValue, setQrValue] = useState(null);

  const { t } = useTranslation();
  const navigation = useNavigation();
  const { saveCreateToHistory } = useQRCodeHistory();

  const handleGenerateQRCode = () => {
    if (!companyName.trim()) {
      Alert.alert(t("error"), t("enterCompanyNameAlert"));
      return;
    }

    const vCard = `BEGIN:VCARD
VERSION:3.0
ORG:${companyName}
TITLE:${industry}
TEL:${phone}
EMAIL:${email}
URL:${website}
ADR:${address};${city};${country}
END:VCARD`;

    setQrValue(vCard);
    saveCreateToHistory(vCard);
    navigation.navigate("openFile", { scannedData: vCard });
  };

  return (
    <QRCodeScreenLayout
      title={t("business")}
      iconSource={require("../../assets/images/business.png")}
    >
      {/* Inputs */}
      <Text style={styles.label}>{t("companyName")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterCompanyName")}
        placeholderTextColor="#999"
        value={companyName}
        onChangeText={setCompanyName}
      />

      <Text style={styles.label}>{t("industry")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterIndustry")}
        placeholderTextColor="#999"
        value={industry}
        onChangeText={setIndustry}
      />

      <Text style={styles.label}>{t("phone")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterPhone")}
        placeholderTextColor="#999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>{t("email")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterEmail")}
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>{t("website")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterWebsite")}
        placeholderTextColor="#999"
        value={website}
        onChangeText={setWebsite}
      />

      <Text style={styles.label}>{t("address")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterAddress")}
        placeholderTextColor="#999"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>{t("city")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterCity")}
        placeholderTextColor="#999"
        value={city}
        onChangeText={setCity}
      />

      <Text style={styles.label}>{t("country")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("enterCountry")}
        placeholderTextColor="#999"
        value={country}
        onChangeText={setCountry}
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t("generateQrCode")}</Text>
      </TouchableOpacity>

      {qrValue && (
        <View style={styles.qrWrapper}>
          <QRCode value={qrValue} size={200} color="#1E1E1E" backgroundColor="#FFF" />
          <Text style={styles.qrText}>{t("scanToSaveContact")}</Text>
        </View>
      )}
    </QRCodeScreenLayout>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 18,
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
});
