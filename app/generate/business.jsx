import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
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

const QRCodeBusiness = () => {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [qrValue, setQrValue] = useState(null);

  const navigation = useNavigation(); // use a type if you have a TypeScript type for your stack

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
      alert("Please enter a company name");
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
          <Text style={styles.title}>Business</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/images/business.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>

            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter company name"
              placeholderTextColor="#999"
              value={companyName}
              onChangeText={setCompanyName}
            />

            <Text style={styles.label}>Industry</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g food / agency"
              placeholderTextColor="#999"
              value={industry}
              onChangeText={setIndustry}
            />

            <View style={styles.row}>
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter phone"
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
            </View>

            <Text style={styles.label}>Website</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter website"
              placeholderTextColor="#999"
              value={website}
              onChangeText={setWebsite}
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter address"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
            />

            <View style={styles.row}>
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>City</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter city"
                  placeholderTextColor="#999"
                  value={city}
                  onChangeText={setCity}
                />
              </View>
              <View style={styles.halfInputBox}>
                <Text style={styles.label}>Country</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter country"
                  placeholderTextColor="#999"
                  value={country}
                  onChangeText={setCountry}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleGenerateQRCode}
            >
              <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>

            {qrValue && (
              <View style={styles.qrWrapper}>
                <QRCode
                  value={qrValue}
                  size={200}
                  color="#000"
                  backgroundColor="#fff"
                />
                <Text style={styles.qrText}>Scan to save business contact</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default QRCodeBusiness;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
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
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInputBox: { flex: 1, marginRight: 10 },
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
