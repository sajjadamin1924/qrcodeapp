import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next"; // ✅ import i18n hook
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const qrOptions = [
  { id: "1", label: "Text", icon: require("../../assets/icons/text.png") },
  { id: "2", label: "Website", icon: require("../../assets/icons/website.png") },
  { id: "3", label: "Wi-Fi", icon: require("../../assets/icons/wifi.png") },
  { id: "4", label: "Event", icon: require("../../assets/icons/event.png") },
  { id: "5", label: "Contact", icon: require("../../assets/icons/contact.png") },
  { id: "6", label: "Business", icon: require("../../assets/icons/business.png") },
  { id: "7", label: "Location", icon: require("../../assets/icons/location.png") },
  { id: "8", label: "WhatsApp", icon: require("../../assets/icons/whatsapp.png") },
  { id: "9", label: "Email", icon: require("../../assets/icons/email.png") },
  { id: "10", label: "Twitter", icon: require("../../assets/icons/twitter.png") },
  { id: "11", label: "Instagram", icon: require("../../assets/icons/instagram.png") },
  { id: "12", label: "Telephone", icon: require("../../assets/icons/phone.png") },
];

export default function GenerateQrScreen() {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation(); // ✅ translation hook

  const scheme = useColorScheme();
  const backgroundColor = scheme === "dark" ? "#121212" : "#FDFDFD";
  const cardColor = scheme === "dark" ? "#1E1E1E" : "#FFFFFF";
  const accent = "#FDB623";
  const textColor = scheme === "dark" ? "#FFFFFF" : "#000000";

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColor, borderColor: accent }]}
      onPress={() => {
        if (item.label.toLowerCase() === "location") return;

        let route = item.label.toLowerCase();
        if (item.label === "Wi-Fi") route = "wifi";
        navigation.navigate(route);
      }}
    >
      <Image source={item.icon} style={styles.icon} />
      <View style={styles.labelWrapper}>
        <Text style={[styles.label, { color: textColor }]}>{t(item.label.toLowerCase())}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>{t("generate")}</Text>
      </View>

      {/* Grid */}
      <FlatList
        data={qrOptions}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("generate")}>
            <Ionicons name="qr-code-outline" size={22} color="white" />
            <Text style={styles.footerText}>{t("Generate")}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate("history")}>
            <Ionicons name="time-outline" size={22} color="white" />
            <Text style={styles.footerText}>{t("History")}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.centerButton} onPress={() => navigation.navigate("scanner")}>
          <Image
            source={require("../../assets/images/footercenter1.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const cardSize = width / 3 - 24;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  grid: { paddingBottom: 100 },
  card: {
    width: cardSize,
    height: cardSize,
    marginBottom: 25,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: 56, height: 56, resizeMode: "contain" },
  labelWrapper: {
    position: "absolute",
    bottom: -12,
    alignSelf: "center",
    backgroundColor: "#FDB623",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: { fontSize: 13, fontWeight: "600" },
  footer: {
    height: 70,
    backgroundColor: "#333",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    borderRadius: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 30,
  },
  footerButton: {
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  centerButton: {
    position: "absolute",
    top: -25,
    alignSelf: "center",
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 50,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10,
  },
});
