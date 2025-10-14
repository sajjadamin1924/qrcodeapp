import BottomNavigation from '@/components/BottomNavigation';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HistoryScreen() {
  const [selectedTab, setSelectedTab] = useState('scan');
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    const loadHistory = async () => {
      const saved = await AsyncStorage.getItem('qrHistory');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    };
    loadHistory();
  }, []);

  const saveHistory = async (newHistory) => {
    setHistory(newHistory);
    await AsyncStorage.setItem('qrHistory', JSON.stringify(newHistory));
  };

  const deleteItem = (id) => {
    const updated = history.filter((item) => item.id !== id);
    saveHistory(updated);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t("History")}</Text>
         
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'scan' && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab('scan')}
          >
            <Text
              style={
                selectedTab === 'scan' ? styles.tabTextActive : styles.tabText
              }
            >
              {t("Scan")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === 'create' && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab('create')}
          >
            <Text
              style={
                selectedTab === 'create' ? styles.tabTextActive : styles.tabText
              }
            >
              {t("Create")}
            </Text>
          </TouchableOpacity>
        </View>

        {/* History List */}
        <FlatList
          data={history.filter((item) => item.type === selectedTab)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Image
                source={require('../../assets/images/qricon.png')}
                style={styles.qrIcon}
              />
              <View style={styles.listText}>
                <Text style={styles.url} numberOfLines={1}>
                  {item.url}
                </Text>
                <Text style={styles.type}>{item.type.toUpperCase()}</Text>
              </View>
              <View style={styles.listRight}>
                <Text style={styles.date}>{item.date}</Text>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                  <Ionicons name="trash" size={20} color="#FFD700" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Footer */}
      <BottomNavigation />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, color: '#fff', fontWeight: '600' },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
  },
  tabButtonActive: { backgroundColor: '#FFD700' },
  tabText: { color: '#fff', fontSize: 16 },
  tabTextActive: { color: '#000', fontWeight: '600', fontSize: 16 },
  list: { paddingBottom: 100 },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  qrIcon: { width: 40, height: 40, marginRight: 15 },
  listText: { flex: 1 },
  url: { color: '#fff', fontSize: 16, fontWeight: '500' },
  type: { color: '#aaa', fontSize: 12 },
  listRight: { alignItems: 'flex-end' },
  date: { color: '#aaa', fontSize: 12, marginBottom: 5 },
  
});
