import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../i18n";

const languages = [
  { id: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { id: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { id: "urUR", name: "Urdu", nativeName: "اردو", flag: "🇵🇰" },
  { id: "frFR", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { id: "deDE", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { id: "jaJP", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { id: "koKR", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { id: "ptPT", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { id: "esES", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { id: "zhCN", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { id: "itIT", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleSelect = (langId) => {
    setSelected(langId);
    if (langId === "en") {
      navigation.navigate("EnglishLanguageScreen");
    } else if (langId === "ar") {
      navigation.navigate("ArabicLanguageScreen");
    } else {
      i18n.changeLanguage(langId, (err) => {
        if (!err) navigation.navigate("Permission");
      });
    }
  };

  return (
    <LinearGradient colors={["#0A0A0A", "#0F0F0F", "#0A0A0A"]} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>STEP 1 OF 2</Text>
          </View>
          <Text style={styles.title}>{t("select_language")}</Text>
          <Text style={styles.subtitle}>Choose your preferred language</Text>
        </View>

        <FlatList
          data={languages}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const isSelected = selected === item.id;
            return (
              <TouchableOpacity
                style={[styles.langCard, isSelected && styles.langCardSelected]}
                onPress={() => handleSelect(item.id)}
                activeOpacity={0.75}
              >
                <Text style={styles.flag}>{item.flag}</Text>
                <View style={styles.langInfo}>
                  <Text style={[styles.langName, isSelected && styles.langNameSelected]}>
                    {item.name}
                  </Text>
                  <Text style={styles.nativeName}>{item.nativeName}</Text>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  header: {
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerBadge: {
    backgroundColor: "rgba(253,182,35,0.12)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  headerBadgeText: {
    color: "#FDB623",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: "#6A6A6A",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  langCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141414",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#222222",
  },
  langCardSelected: {
    borderColor: "#FDB623",
    backgroundColor: "rgba(253,182,35,0.07)",
  },
  flag: {
    fontSize: 26,
    marginRight: 14,
  },
  langInfo: {
    flex: 1,
  },
  langName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  langNameSelected: {
    color: "#FDB623",
  },
  nativeName: {
    color: "#5A5A5A",
    fontSize: 12,
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#3A3A3A",
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#FDB623",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FDB623",
  },
});
