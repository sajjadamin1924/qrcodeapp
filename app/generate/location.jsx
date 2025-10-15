import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScreenLayout from '../../components/QRCodeScreenLayout';
import { useQRCodeHistory } from '../hooks/UseQRCodeHistory';

export default function LocationQRCodeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [location, setLocation] = useState(null);
  const [qrValue, setQrValue] = useState(null);

  const { saveCreateToHistory } = useQRCodeHistory();

  // Get current location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('permissionDenied'), t('locationPermissionAlert'));
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

  const handleGenerateQRCode = () => {
    if (!location) {
      Alert.alert(t('errorTitle'), t('locationNotFound'));
      return;
    }
    const value = `geo:${location.latitude},${location.longitude}`;
    setQrValue(value);
    saveCreateToHistory(value);
    navigation.navigate('openFile', { scannedData: value });
  };

  return (
    <QRCodeScreenLayout
      title={t('location')}
      iconSource={require('../../assets/images/location.png')}
    >
      <Text style={styles.label}>{t('currentLocation')}</Text>
      <Text style={styles.locationText}>
        {location
          ? `${t('latitude')}: ${location.latitude.toFixed(6)}\n${t('longitude')}: ${location.longitude.toFixed(6)}`
          : t('fetchingLocation')}
      </Text>

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
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  locationText: {
    color: '#fff',
    textAlign: 'center',
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
    fontWeight: 'bold',
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
