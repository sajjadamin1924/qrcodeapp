import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import i18n from "../i18n";

const languages = [
  { id: "enUS", name: "English (US)", flag: "🇺🇸" },
  { id: "enGB", name: "English (UK)", flag: "🇬🇧" },
  { id: "urUR", name: "Urdu", flag: "🇵🇰" },
  { id: "frFR", name: "French", flag: "🇫🇷" },
  { id: "deDE", name: "German", flag: "🇩🇪" },
  { id: "jaJP", name: "Japanese", flag: "🇯🇵" },
  { id: "koKR", name: "Korean", flag: "🇰🇷" },
  { id: "ptPT", name: "Portuguese", flag: "🇵🇹" },
  { id: "esES", name: "Spanish", flag: "🇪🇸" },
  { id: "arAR", name: "Arabic", flag: "🇸🇦" },
  { id: "zhCN", name: "Chinese", flag: "🇨🇳" },
  { id: "itIT", name: "Italian", flag: "🇮🇹" },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleSelect = (langId) => {
    setSelected(langId);
    i18n.changeLanguage(langId);
  };

  const handleContinue = () => {
    if (selected) {
      navigation.navigate("Permission");
    }
  };

  return (
    <LinearGradient
      colors={["#0f0f1f", "#141432", "#1a1a40"]}
      style={styles.container}
    >
      <Text style={styles.title}>{t("selectLanguage")}</Text>

      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.listItem,
              selected === item.id && styles.selectedListItem,
            ]}
            onPress={() => handleSelect(item.id)}
            activeOpacity={0.8}
          >
            <View style={styles.flagContainer}>
              <Text style={styles.flag}>{item.flag}</Text>
            </View>
            <Text
              style={[
                styles.langText,
                selected === item.id && styles.selectedLangText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {selected && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>{t("continue")}</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  listContainer: {
    paddingBottom: 100,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1f3f",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    elevation: 4,
  },
  selectedListItem: {
    borderColor: "#00f0ff",
    borderWidth: 2,
    backgroundColor: "#22224f",
    shadowColor: "#00f0ff",
    shadowOpacity: 0.6,
  },
  flagContainer: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  flag: {
    fontSize: 28,
  },
  langText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 12,
  },
  selectedLangText: {
    color: "#00f0ff",
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#00f0ff",
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 20,
    marginHorizontal: 60,
    elevation: 6,
  },
  continueText: {
    color: "#000",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
