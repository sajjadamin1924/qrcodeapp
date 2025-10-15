import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QRCodeScreenLayout({ title, iconSource, children }) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
        <Text style={styles.title}>{title}</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Scrollable Body */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Card Container */}
        <View style={styles.card}>
          {iconSource && (
            <Image source={iconSource} style={styles.icon} />
          )}
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  title: {
    color: "#FDB623",
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 10,
    padding: 24,
    borderLeftWidth: 3,
    borderLeftColor: "#FDB623",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    width: 55,
    height: 55,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 25,
  },
});
