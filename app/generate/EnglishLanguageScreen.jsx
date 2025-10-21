import { useNavigation } from "@react-navigation/native";
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

const englishVariants = [
  { id: "enUS", name: "English (US)", flag: "🇺🇸" },
  { id: "enGB", name: "English (UK)", flag: "🇬🇧" },
  { id: "enAU", name: "English (Australia)", flag: "🇦🇺" },
  { id: "enCA", name: "English (Canada)", flag: "🇨🇦" },
  { id: "enIN", name: "English (India)", flag: "🇮🇳" },
  { id: "enZA", name: "English (South Africa)", flag: "🇿🇦" },
];

export default function EnglishLanguageScreen() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleSelect = (langId) => {
    setSelected(langId);
    i18n.changeLanguage(langId, (err) => {
      if (err) {
        console.error("Error changing language:", err);
      } else {
        console.log("Language changed to:", langId);
        navigation.navigate("Permission");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("selectEnglishVariant")}</Text>

      <FlatList
        data={englishVariants}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E", // Match TextQRCodeScreen.js and LanguageScreen.js
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#FFFFFF", // Match TextQRCodeScreen.js
    fontWeight: "bold",
    marginBottom: 40,
  },
  listContainer: {
    paddingBottom: 100,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDB623", 
    borderRadius: 8, 
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    elevation: 4,
  },
  selectedListItem: {
    borderColor: "#FFFFFF", 
    borderWidth: 2,
    backgroundColor: "#1DB954",
    shadowColor: "#FDB623",
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
    color: "#FFFFFF", 
    fontSize: 15, 
    marginLeft: 12,
  },
  selectedLangText: {
    color: "#FFFFFF", 
    fontWeight: "bold", 
  },
});