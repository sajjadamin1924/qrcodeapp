import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WhatsAppQRCodeScreen = () => {
  const [number, setNumber] = useState('');
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const saveToHistory = async (data) => {
    try {
      const saved = await AsyncStorage.getItem('qrHistory');
      const history = saved ? JSON.parse(saved) : [];

      const newItem = {
        id: uuid.v4().toString(),
        url: data,
        date: new Date().toLocaleString(),
        type: 'whatsapp',
      };

      const newHistory = [newItem, ...history];
      await AsyncStorage.setItem('qrHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving WhatsApp QR:', error);
    }
  };

  const handleGenerateQRCode = () => {
    if (!number.trim()) {
      Alert.alert(t('error'), t('enterWhatsAppAlert'));
      return;
    }

    const value = `https://wa.me/${number.trim()}`;
    setQrValue(value);
    saveToHistory(value);
    navigation.navigate('openFile', { scannedData: value });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={34} color="#F7A000" />
          </TouchableOpacity>
          <Text style={styles.title}>{t('whatsapp')}</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Image
              source={require('../../assets/images/whatsapp.png')}
              style={{ width: 50, height: 50 }}
            />
          </View>

          <Text style={styles.label}>{t('whatsappNumber')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('enterWhatsAppPlaceholder')}
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            value={number}
            onChangeText={setNumber}
          />

          <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
            <Text style={styles.buttonText}>{t('generateQRCode')}</Text>
          </TouchableOpacity>

          {qrValue && (
            <View style={styles.qrWrapper}>
              <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
              <Text style={styles.qrText}>{t('scanToOpenWhatsApp')}</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default WhatsAppQRCodeScreen;

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30,30,30,0.6)',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 40, marginBottom: 40 },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 20,
    paddingTop: 30,
    elevation: 8,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#F7A000',
  },
  iconBox: { alignItems: 'center', marginBottom: 20 },
  label: { color: '#ccc', fontSize: 14, marginBottom: 5 },
  input: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    width: '50%',
    alignSelf: 'center',
    backgroundColor: '#F7A000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { color: '#1E1E1E', fontWeight: 'bold', fontSize: 16 },
  qrWrapper: { marginTop: 20, alignItems: 'center', justifyContent: 'center' },
  qrText: { marginTop: 12, color: '#fff', fontSize: 16 },
});
