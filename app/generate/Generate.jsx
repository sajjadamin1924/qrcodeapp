import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  { id: "1",  label: "Text",      icon: require("../../assets/icons/text.png"),      route: "text" },
  { id: "2",  label: "Website",   icon: require("../../assets/icons/website.png"),   route: "website" },
  { id: "3",  label: "Wi-Fi",     icon: require("../../assets/icons/wifi.png"),      route: "wifi" },
  { id: "4",  label: "Event",     icon: require("../../assets/icons/event.png"),     route: "event" },
  { id: "5",  label: "Contact",   icon: require("../../assets/icons/contact.png"),   route: "contact" },
  { id: "6",  label: "Business",  icon: require("../../assets/icons/business.png"),  route: "business" },
  { id: "7",  label: "Location",  icon: require("../../assets/icons/location.png"),  route: "location" },
  { id: "8",  label: "WhatsApp",  icon: require("../../assets/icons/whatsapp.png"),  route: "whatsapp" },
  { id: "9",  label: "Email",     icon: require("../../assets/icons/email.png"),     route: "email" },
  { id: "10", label: "Twitter",   icon: require("../../assets/icons/twitter.png"),   route: "twitter" },
  { id: "11", label: "Instagram", icon: require("../../assets/icons/instagram.png"), route: "instagram" },
  { id: "12", label: "Telephone", icon: require("../../assets/icons/phone.png"),     route: "telephone" },
];

const { width } = Dimensions.get("window");
const COLS = 3;
const CARD_SIZE = (width - 40 - (COLS - 1) * 12) / COLS;

export default function GenerateQrScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const renderItem = ({ item }) => {
    const translationKey = item.label.toLowerCase() === "wi-fi" ? "wifi" : item.label.toLowerCase();
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.route)}
        activeOpacity={0.75}
      >
        <View style={styles.cardInner}>
          <View style={styles.iconWrap}>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text style={styles.label} numberOfLines={1}>{t(translationKey)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>QR MAKER</Text>
          <Text style={styles.title}>{t("generate")}</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn} onPress={() => navigation.navigate("history")}>
          <Ionicons name="time-outline" size={20} color="#FDB623" />
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      <FlatList
        data={qrOptions}
        keyExtractor={(item) => item.id}
        numColumns={COLS}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
  },
  headerSub: {
    color: "#FDB623",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  historyBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(253,182,35,0.1)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#1A1A1A",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE + 8,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222222",
  },
  cardInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(253,182,35,0.1)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#CCCCCC",
    letterSpacing: 0.3,
    textAlign: "center",
  },
});
