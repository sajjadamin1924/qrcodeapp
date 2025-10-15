import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScreenLayout from '../../components/QRCodeScreenLayout'; // 👈 Import shared layout
import { useQRCodeHistory } from '../hooks/UseQRCodeHistory';

export default function EmailScreen() {
  const [email, setEmail] = useState('');
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { saveCreateToHistory } = useQRCodeHistory();

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
    <QRCodeScreenLayout
      title={t('email')}
      iconSource={require('../../assets/images/email.png')}
    >
      {/* Input Field */}
      <Text style={styles.label}>{t('email')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enterEmail')}
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t('generateQrCode')}</Text>
      </TouchableOpacity>

      {/* QR Preview */}
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
