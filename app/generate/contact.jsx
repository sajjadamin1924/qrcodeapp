import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialIcons";

const QRCodeContact = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

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

  const saveCreateToHistory = async (data) => {
    try {
      const saved = await AsyncStorage.getItem("qrHistory");
      const history = saved ? JSON.parse(saved) : [];

      const newItem = {
        id: uuid.v4().toString(),
        url: data,
        date: new Date().toLocaleString(),
        type: "create",
      };

      const newHistory = [newItem, ...history];
      await AsyncStorage.setItem("qrHistory", JSON.stringify(newHistory));
    } catch (error) {
      console.error("Error saving Contact QR:", error);
    }
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
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={34} color="#F7A000" />
          </TouchableOpacity>
          <Text style={styles.title}>{t("contact")}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/images/contact.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>

            {/* Input Fields */}
            <View style={styles.row}>
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>{t("firstName")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterFirstName")}
                  placeholderTextColor="#999"
                  value={form.firstName}
                  onChangeText={(v) => handleChange("firstName", v)}
                />
              </View>
              <View style={styles.halfInputBox}>
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
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>{t("company")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterCompany")}
                  placeholderTextColor="#999"
                  value={form.company}
                  onChangeText={(v) => handleChange("company", v)}
                />
              </View>
              <View style={styles.halfInputBox}>
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
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>{t("phone")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterPhone")}
                  placeholderTextColor="#999"
                  value={form.phone}
                  onChangeText={(v) => handleChange("phone", v)}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>{t("email")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterEmail")}
                  placeholderTextColor="#999"
                  value={form.email}
                  onChangeText={(v) => handleChange("email", v)}
                  keyboardType="email-address"
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
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>{t("city")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterCity")}
                  placeholderTextColor="#999"
                  value={form.city}
                  onChangeText={(v) => handleChange("city", v)}
                />
              </View>
              <View style={styles.halfInputBox}>
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

            {/* Generate Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleGenerateQRCode}
            >
              <Text style={styles.buttonText}>{t("generateQrCode")}</Text>
            </TouchableOpacity>

            {qrValue && (
              <View style={styles.qrWrapper}>
                <QRCode
                  value={qrValue}
                  size={200}
                  color="#000"
                  backgroundColor="#fff"
                />
                <Text style={styles.qrText}>{t("scanToSaveContact")}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default QRCodeContact;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)", // dark overlay for readability
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 20,
    paddingTop: 30,
    elevation: 8,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#F7A000",
  },
  iconBox: { alignItems: "center", marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInputBox: { flex: 1, marginRight: 10 },
  label: { color: "#ccc", fontSize: 14, marginBottom: 5 },
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
    backgroundColor: "#F7A000",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#1E1E1E", fontWeight: "bold", fontSize: 16 },
  qrWrapper: { marginTop: 30, alignItems: "center", justifyContent: "center" },
  qrText: { marginTop: 12, color: "#fff", fontSize: 16 },
});
