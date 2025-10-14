import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import uuid from "react-native-uuid";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function TwitterQRCodeScreen() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [qrValue, setQrValue] = useState(null);
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
      console.error("Error saving Twitter QR:", error);
    }
  };

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
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={34} color="#F7A000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t("twitter")}</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Image
                source={require("../../assets/images/Vector.png")}
                style={styles.icon}
              />
            </View>

            <Text style={styles.label}>{t("username")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("enterTwitterUsername")}
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
              <Text style={styles.buttonText}>{t("generateQrCode")}</Text>
            </TouchableOpacity>
          </View>

          {qrValue && (
            <View style={styles.qrWrapper}>
              <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
              <Text style={styles.qrText}>{t("scanToOpenTwitter")}</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    width: 42,
    height: 42,
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
  },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 14,
    padding: 24,
    elevation: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#F7A000",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  iconBox: {
    alignItems: "center",
    marginBottom: 25,
  },
  icon: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  label: {
    color: "#ccc",
    fontSize: 15,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    fontSize: 15,
    marginBottom: 25,
  },
  button: {
    backgroundColor: "#F7A000",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    alignSelf: "center",
    width: "55%",
  },
  buttonText: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 16,
  },
  qrWrapper: {
    marginTop: 50,
    alignItems: "center",
  },
  qrText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});
