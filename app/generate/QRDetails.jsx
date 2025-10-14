import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import uuid from 'react-native-uuid';

export default function QRDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { item } = route.params || {};
  const [isSaved, setIsSaved] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    if (item?.url?.includes('BEGIN:VCARD')) {
      const parsed = parseVCard(item.url);
      setParsedData(parsed);
    }
  }, [item]);

  useEffect(() => {
    const checkIfSaved = async () => {
      const saved = await AsyncStorage.getItem('qrHistory');
      const history = saved ? JSON.parse(saved) : [];
      const exists = history.some((h) => h.url === item?.url);
      setIsSaved(exists);
    };
    if (item) checkIfSaved();
  }, [item]);

  const handleSave = async () => {
    try {
      const saved = await AsyncStorage.getItem('qrHistory');
      const history = saved ? JSON.parse(saved) : [];

      const exists = history.some((h) => h.url === item.url);
      if (exists) return; // avoid duplicates silently

      const newEntry = {
        id: uuid.v4().toString(),
        url: item.url,
        date: item.date || new Date().toLocaleString(),
        type: item.type || 'create',
      };

      const updated = [newEntry, ...history];
      await AsyncStorage.setItem('qrHistory', JSON.stringify(updated));
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving QR:', error);
    }
  };

  // 🔍 Parse vCard content into readable fields
  const parseVCard = (data) => {
    const lines = data.split('\n');
    const result = {};
    lines.forEach((line) => {
      if (line.startsWith('FN:')) result.fullName = line.replace('FN:', '').trim();
      if (line.startsWith('ORG:')) result.company = line.replace('ORG:', '').trim();
      if (line.startsWith('TITLE:')) result.job = line.replace('TITLE:', '').trim();
      if (line.startsWith('TEL:')) result.phone = line.replace('TEL:', '').trim();
      if (line.startsWith('EMAIL:')) result.email = line.replace('EMAIL:', '').trim();
      if (line.startsWith('URL:')) result.website = line.replace('URL:', '').trim();
      if (line.startsWith('ADR:'))
        result.address = line.replace('ADR:', '').trim().replace(/;/g, ', ');
    });
    return result;
  };

  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{t('noDataFound')}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#FFD700" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('drawerQRDetails')}</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <View style={styles.card}>
            <QRCode value={item.url} size={220} color="#000" backgroundColor="#fff" />

            <View style={styles.details}>
              <Text style={styles.label}>{t('type')}:</Text>
              <Text style={styles.value}>{item.type?.toUpperCase()}</Text>

              <Text style={styles.label}>{t('date')}:</Text>
              <Text style={styles.value}>{item.date}</Text>

              <Text style={styles.label}>{t('content')}:</Text>
              {parsedData ? (
                <>
                  {parsedData.fullName && (
                    <Text style={styles.value}>👤 {parsedData.fullName}</Text>
                  )}
                  {parsedData.company && (
                    <Text style={styles.value}>🏢 {parsedData.company}</Text>
                  )}
                  {parsedData.job && <Text style={styles.value}>💼 {parsedData.job}</Text>}
                  {parsedData.phone && (
                    <Text style={styles.value}>📞 {parsedData.phone}</Text>
                  )}
                  {parsedData.email && (
                    <Text style={styles.value}>📧 {parsedData.email}</Text>
                  )}
                  {parsedData.website && (
                    <Text style={styles.value}>🌐 {parsedData.website}</Text>
                  )}
                  {parsedData.address && (
                    <Text style={styles.value}>📍 {parsedData.address}</Text>
                  )}
                </>
              ) : (
                <Text style={styles.value} numberOfLines={3}>
                  {item.url}
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.saveButton, isSaved && styles.savedButton]}
              onPress={handleSave}
              disabled={isSaved}
            >
              <Text style={styles.saveButtonText}>
                {isSaved ? t('saved') : t('save')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30,30,30,0.6)',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#2A2A2A',
    padding: 8,
    borderRadius: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    elevation: 6,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFD700',
  },
  details: {
    marginTop: 25,
    width: '100%',
  },
  label: { color: '#aaa', fontSize: 14, marginTop: 8 },
  value: { color: '#fff', fontSize: 16, marginTop: 2 },
  saveButton: {
    marginTop: 25,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  savedButton: {
    backgroundColor: '#777',
  },
  saveButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#fff', fontSize: 18 },
});
