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

const EmailScreen = () => {
  const [email, setEmail] = useState('');
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  const saveCreateToHistory = async (data) => {
    try {
      const saved = await AsyncStorage.getItem('qrHistory');
      const history = saved ? JSON.parse(saved) : [];

      const newItem = {
        id: uuid.v4().toString(),
        url: data,
        date: new Date().toLocaleString(),
        type: 'create',
      };

      const newHistory = [newItem, ...history];
      await AsyncStorage.setItem('qrHistory', JSON.stringify(newHistory));
      Alert.alert(t('Success'), t('QR Code generated and saved to history!'));
    } catch (error) {
      Alert.alert(t('Error'), t('Failed to save QR code.'));
    }
  };

  const handleGenerateQRCode = () => {
    if (!email.trim()) {
      Alert.alert(t('Error'), t('Please enter a valid email'));
      return;
    }
    const value = email.trim();
    setQrValue(value);
    saveCreateToHistory(value);
    navigation.navigate('openFile', { scannedData: value });
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={34} color="#F7A000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('email')}</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Image
              source={require('../../assets/images/email.png')}
              style={{ width: 60, height: 60 }}
            />
          </View>

          <Text style={styles.label}>{t('email')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('enterEmail')}
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
            <Text style={styles.buttonText}>{t('generateQrCode')}</Text>
          </TouchableOpacity>
        </View>

        {/* QR Code Section */}
        {qrValue && (
          <View style={styles.qrSection}>
            <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
            <Text style={styles.qrLabel}>{t('scanThisQr')}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    width: 42,
    height: 42,
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 24,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#F7A000',
    elevation: 6,
  },
  iconBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#F7A000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1E1E1E',
    fontWeight: '700',
    fontSize: 16,
  },
  qrSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  qrLabel: {
    marginTop: 12,
    color: '#fff',
    fontSize: 16,
  },
});
