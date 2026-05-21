import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const typeIcon = (type) => (type === "scan" ? "scan-outline" : "qr-code-outline");
const typeColor = (type) => (type === "scan" ? "#FDB623" : "#34C759");

export default function HistoryScreen() {
  const [selectedTab, setSelectedTab] = useState("scan");
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    const loadHistory = async () => {
      const saved = await AsyncStorage.getItem("qrHistory");
      if (saved) setHistory(JSON.parse(saved));
    };
    loadHistory();
  }, []);

  const saveHistory = async (newHistory) => {
    setHistory(newHistory);
    await AsyncStorage.setItem("qrHistory", JSON.stringify(newHistory));
  };

  const deleteItem = (id) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistory(updated);
  };

  const filtered = history.filter((item) => item.type === selectedTab);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>QR MAKER</Text>
          <Text style={styles.title}>{t("history")}</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filtered.length}</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrap}>
        <View style={styles.tabs}>
          {["scan", "create"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabActive]}
              onPress={() => setSelectedTab(tab)}
              activeOpacity={0.75}
            >
              <Ionicons
                name={typeIcon(tab)}
                size={15}
                color={selectedTab === tab ? "#0A0A0A" : "#6A6A6A"}
                style={{ marginRight: 5 }}
              />
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {t(tab === "scan" ? "scan_tab" : "create_tab")}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* List */}
      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name={typeIcon(selectedTab)} size={36} color="#3A3A3A" />
          </View>
          <Text style={styles.emptyTitle}>
            {t(selectedTab === "scan" ? "no_scan_history" : "no_create_history")}
          </Text>
          <Text style={styles.emptySubtitle}>
            {t(selectedTab === "scan" ? "scan_history_hint" : "create_history_hint")}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => navigation.navigate("QRDetails", { item })}
              activeOpacity={0.75}
            >
              <View style={[styles.itemIcon, { backgroundColor: `${typeColor(item.type)}15` }]}>
                <Ionicons name={typeIcon(item.type)} size={20} color={typeColor(item.type)} />
              </View>
              <View style={styles.itemText}>
                <Text style={styles.itemUrl} numberOfLines={1}>{item.url}</Text>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteItem(item.id)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="trash-outline" size={16} color="#3A3A3A" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}

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
  },
  countBadge: {
    backgroundColor: "rgba(253,182,35,0.12)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.25)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  countText: {
    color: "#FDB623",
    fontSize: 14,
    fontWeight: "700",
  },
  tabsWrap: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#141414",
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: "#222222",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#FDB623",
  },
  tabText: {
    color: "#6A6A6A",
    fontSize: 14,
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#0A0A0A",
    fontWeight: "700",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    color: "#4A4A4A",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  emptySubtitle: {
    color: "#3A3A3A",
    fontSize: 13,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#141414",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1E1E1E",
  },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  itemText: { flex: 1 },
  itemUrl: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
  },
  itemDate: {
    color: "#4A4A4A",
    fontSize: 11,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
});
