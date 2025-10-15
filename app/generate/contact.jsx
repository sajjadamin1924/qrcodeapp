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

export default function QRCodeContact() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { saveCreateToHistory } = useQRCodeHistory();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    job: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    city: "",
    country: "",
  });

  const [qrValue, setQrValue] = useState(null);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleGenerateQRCode = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      Alert.alert(t("pleaseEnterFirstAndLastName"));
      return;
    }

    const vCard = `BEGIN:VCARD
VERSION:3.0
N:${form.lastName};${form.firstName};;;
FN:${form.firstName} ${form.lastName}
ORG:${form.company}
TITLE:${form.job}
TEL:${form.phone}
EMAIL:${form.email}
URL:${form.website}
ADR:${form.address};${form.city};${form.country}
END:VCARD`;

    setQrValue(vCard);
    saveCreateToHistory(vCard);
    navigation.navigate("openFile", { scannedData: vCard });
  };

  return (
    <QRCodeScreenLayout
      title={t("contact")}
      iconSource={require("../../assets/images/contact.png")}
    >
      {/* Form Fields */}
      <View style={{ marginBottom: 20 }}>
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("firstName")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterFirstName")}
              placeholderTextColor="#999"
              value={form.firstName}
              onChangeText={(v) => handleChange("firstName", v)}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("lastName")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterLastName")}
              placeholderTextColor="#999"
              value={form.lastName}
              onChangeText={(v) => handleChange("lastName", v)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("company")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterCompany")}
              placeholderTextColor="#999"
              value={form.company}
              onChangeText={(v) => handleChange("company", v)}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("job")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterJob")}
              placeholderTextColor="#999"
              value={form.job}
              onChangeText={(v) => handleChange("job", v)}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("phone")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterPhone")}
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(v) => handleChange("phone", v)}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("email")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterEmail")}
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={form.email}
              onChangeText={(v) => handleChange("email", v)}
            />
          </View>
        </View>

        <Text style={styles.label}>{t("website")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("enterWebsite")}
          placeholderTextColor="#999"
          value={form.website}
          onChangeText={(v) => handleChange("website", v)}
        />

        <Text style={styles.label}>{t("address")}</Text>
        <TextInput
          style={styles.input}
          placeholder={t("enterAddress")}
          placeholderTextColor="#999"
          value={form.address}
          onChangeText={(v) => handleChange("address", v)}
        />

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("city")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterCity")}
              placeholderTextColor="#999"
              value={form.city}
              onChangeText={(v) => handleChange("city", v)}
            />
          </View>
          <View style={styles.halfInput}>
            <Text style={styles.label}>{t("country")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterCountry")}
              placeholderTextColor="#999"
              value={form.country}
              onChangeText={(v) => handleChange("country", v)}
            />
          </View>
        </View>
      </View>

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t("generateQrCode")}</Text>
      </TouchableOpacity>

      {/* QR Display */}
      {qrValue && (
        <View style={styles.qrWrapper}>
          <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
          <Text style={styles.qrText}>{t("scanToSaveContact")}</Text>
        </View>
      )}
    </QRCodeScreenLayout>
  );
}

const styles = {
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    width: "50%",
    alignSelf: "center",
    backgroundColor: "#FDB623",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 16,
  },
  qrWrapper: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  qrText: {
    marginTop: 12,
    color: "#fff",
    fontSize: 16,
  },
};
