import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BottomNavigation() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("generate")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="qr-code-outline" size={20} color="#FDB623" />
        </View>
        <Text style={styles.navLabel}>{t("generate")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => navigation.navigate("scanner")}
        activeOpacity={0.85}
      >
        <View style={styles.centerInner}>
          <Image
            source={require("../assets/images/footercenter1.png")}
            style={{ width: 32, height: 32 }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("history")}
        activeOpacity={0.7}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="time-outline" size={20} color="#FDB623" />
        </View>
        <Text style={styles.navLabel}>{t("history")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 72,
    backgroundColor: "#141414",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#222222",
    paddingBottom: Platform.OS === "ios" ? 8 : 0,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrap: {
    width: 42,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(253,182,35,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
  },
  navLabel: {
    color: "#FDB623",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  centerButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FDB623",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#FDB623",
    shadowOpacity: 0.55,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 12,
  },
  centerInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FDB623",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
  },
});
