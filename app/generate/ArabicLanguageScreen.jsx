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

const arabicVariants = [
  { countryId: "SA", name: "العربية (المملكة العربية السعودية)", flag: "🇸🇦" },
  { countryId: "EG", name: "العربية (مصر)", flag: "🇪🇬" },
  { countryId: "AE", name: "العربية (الإمارات العربية المتحدة)", flag: "🇦🇪" },
  { countryId: "MA", name: "العربية (المغرب)", flag: "🇲🇦" },
  { countryId: "DZ", name: "العربية (الجزائر)", flag: "🇩🇿" },
];

export default function ArabicLanguageScreen() {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleSelect = (countryId) => {
    setSelected(countryId);
    i18n.changeLanguage("ar", (err) => {
      if (err) {
        console.error("Error changing language to ar:", err);
      } else {
        console.log("Language changed to: ar");
        navigation.navigate("Permission");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("selectArabicVariant")}</Text>

      <FlatList
        data={arabicVariants}
        keyExtractor={(item) => item.countryId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.listItem,
              selected === item.countryId && styles.selectedListItem,
            ]}
            onPress={() => handleSelect(item.countryId)}
            activeOpacity={0.8}
          >
            <View style={styles.flagContainer}>
              <Text style={styles.flag}>{item.flag}</Text>
            </View>
            <Text
              style={[
                styles.langText,
                selected === item.countryId && styles.selectedLangText,
                styles.arabicText,
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
    backgroundColor: "#1E1E1E", 
    paddingHorizontal: 24,
    paddingTop: 80,
    direction: "rtl",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    color: "#FFFFFF", 
    fontWeight: "bold",
    marginBottom: 40,
    fontFamily: "Amiri-Regular",
    direction: "rtl",
  },
  listContainer: {
    paddingBottom: 100,
  },
  listItem: {
    flexDirection: "row-reverse", 
    alignItems: "center",
    backgroundColor: "#FDB623", 
    borderRadius: 8, 
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 15,
    elevation: 4,
  },
  selectedListItem: {
    borderColor: "#FDB623", 
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
    marginRight: 12,
  },
  arabicText: {
    fontFamily: "Amiri-Regular",
    textAlign: "right",
  },
  selectedLangText: {
    color: "#FFFFFF",
    fontWeight: "bold", 
  },
});