import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScreenLayout from '../../components/QRCodeScreenLayout'; // 👈 Import shared layout
import { useQRCodeHistory } from '../hooks/UseQRCodeHistory';

export default function TelephoneQRCodeScreen() {
  const { t } = useTranslation();
  const [number, setNumber] = useState('');
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { saveCreateToHistory } = useQRCodeHistory();

  const handleGenerateQRCode = () => {
    if (!number.trim()) {
      Alert.alert(t('Error'), t('Please enter a valid phone number'));
      return;
    }

    const value = `tel:${number.trim()}`;
    setQrValue(value);
    saveCreateToHistory(value);
    navigation.navigate('openFile', { scannedData: value });
  };

  return (
    <QRCodeScreenLayout
      title={t('phone')}
      iconSource={require('../../assets/images/phone.png')}
    >
      {/* Input Field */}
      <Text style={styles.label}>{t('phoneNumber')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enterPhonePlaceholder')}
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={number}
        onChangeText={setNumber}
      />

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t('generateQrCode')}</Text>
      </TouchableOpacity>

      {/* QR Preview */}
      {qrValue && (
        <View style={styles.qrSection}>
          <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
          <Text style={styles.qrLabel}>{t('scanToCall')}</Text>
        </View>
      )}
    </QRCodeScreenLayout>
  );
}

const styles = {
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
};
