import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import i18n from "../i18n";

const languages = [
  { id: "en", name: "English", flag: "🇬🇧" },
  { id: "ur", name: "Urdu", flag: "🇵🇰" },
  { id: "ar", name: "Arabic", flag: "🇸🇦" },
];

export default function LanguageScreen() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleSelect = (langId) => {
    setSelected(langId);
    i18n.changeLanguage(langId); // 👈 This changes the app language immediately
  };

  const handleContinue = () => {
    if (selected) {
      navigation.navigate("Permission");
    }
  };

  return (
    <LinearGradient colors={["#0f0f1f", "#141432", "#1a1a40"]} style={styles.container}>
      <Text style={styles.title}>{t("selectLanguage")}</Text>

      <FlatList
        data={languages}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selected === item.id && styles.selectedCard,
            ]}
            onPress={() => handleSelect(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.langText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {selected && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>{t("continue")}</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#1f1f3f",
    borderRadius: 20,
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
    elevation: 10,
    shadowColor: "#00f0ff",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    transform: [{ rotateY: "8deg" }],
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#00f0ff",
    shadowColor: "#00ffff",
    shadowOpacity: 0.8,
    transform: [{ scale: 1.05 }, { rotateY: "0deg" }],
  },
  flag: {
    fontSize: 40,
  },
  langText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  continueButton: {
    backgroundColor: "#00f0ff",
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 30,
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
