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
  View
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function QRCodeBusiness() {
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
      console.error("Error saving Business QR:", error);
    }
  };

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
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />

      <SafeAreaView style={styles.overlay} edges={["left", "right", "bottom"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-left" size={28} color="#FFD700" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("business")}</Text>
          <View style={{ width: 30 }} /> {/* Spacer for symmetry */}
        </View>

        {/* Scrollable Form */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Image
              source={require("../../assets/images/business.png")}
              style={styles.icon}
            />

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

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>{t("phone")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterPhone")}
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>{t("email")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterEmail")}
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>

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

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>{t("city")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterCity")}
                  placeholderTextColor="#999"
                  value={city}
                  onChangeText={setCity}
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>{t("country")}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={t("enterCountry")}
                  placeholderTextColor="#999"
                  value={country}
                  onChangeText={setCountry}
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

            {/* QR Preview */}
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
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: "#2a2a2a",
    padding: 8,
    borderRadius: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 3,
    borderLeftColor: "#FFD700",
    marginTop: 20,
  },
  icon: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  label: { color: "#ccc", fontSize: 14, marginBottom: 5 },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  halfInput: { flex: 1 },
  button: {
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 16 },
  qrWrapper: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  qrText: { marginTop: 10, color: "#fff", fontSize: 16 },
});
