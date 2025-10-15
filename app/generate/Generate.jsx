import BottomNavigation from "@/components/BottomNavigation";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  const { t } = useTranslation();

  const renderItem = ({ item }) => {
    const translationKey =
      item.label.toLowerCase() === "wi-fi" ? "wifi" : item.label.toLowerCase();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          let route = item.label.toLowerCase();
          if (item.label === "Wi-Fi") route = "wifi";
          navigation.navigate(route);
        }}
      >
        <Image source={item.icon} style={styles.icon} />
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>{t(translationKey)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{t("generate")}</Text>
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
      <BottomNavigation />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const cardSize = width / 3 - 24;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", // fixed dark background
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  grid: { paddingBottom: 100 },
  card: {
    width: cardSize,
    height: cardSize,
    marginBottom: 25,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FDB623",
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 56,
    height: 56,
    resizeMode: "contain",
  },
  labelWrapper: {
    position: "absolute",
    bottom: -12,
    alignSelf: "center",
    backgroundColor: "#FDB623",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
});
