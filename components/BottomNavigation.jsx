import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BottomNavigation() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View style={styles.footer}>
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("generate")}
        >
          <Ionicons name="qr-code-outline" size={22} color="white" />
          <Text style={styles.footerText}>{t("generate")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate("history")}
        >
          <Ionicons name="time-outline" size={22} color="white" />
          <Text style={styles.footerText}>{t("history")}</Text>
        </TouchableOpacity>
      </View>

      {/* Center Button */}
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => navigation.navigate("scanner")}
      >
        <Image
          source={require("../assets/images/footercenter1.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 80,
    backgroundColor: "#333",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#555",
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
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10,
  },
});
