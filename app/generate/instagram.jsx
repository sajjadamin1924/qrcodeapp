import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScreenLayout from '../../components/QRCodeScreenLayout';
import { useQRCodeHistory } from '../hooks/UseQRCodeHistory';

export default function InstagramScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [qrValue, setQrValue] = useState(null);

  const { saveCreateToHistory } = useQRCodeHistory();

  const handleGenerateQRCode = () => {
    if (!username.trim()) {
      Alert.alert(t('Error'), t('Please enter a valid Instagram username'));
      return;
    }

    const value = `https://instagram.com/${username.trim()}`;
    setQrValue(value);
    saveCreateToHistory(value);
    navigation.navigate('openFile', { scannedData: value });
  };

  return (
    <QRCodeScreenLayout
      title={t('instagram')}
      iconSource={require('../../assets/images/insta.png')}
    >
      <Text style={styles.label}>{t('username')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enterInstagramUsername')}
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t('generateQrCode')}</Text>
      </TouchableOpacity>

      {qrValue && (
        <View style={styles.qrSection}>
          <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
          <Text style={styles.qrLabel}>{t('scanThisQr')}</Text>
        </View>
      )}
    </QRCodeScreenLayout>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#FDB623',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
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
