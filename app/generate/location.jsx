import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LocationQRCodeScreen() {
  const [location, setLocation] = useState(null);
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation();
  const { t } = useTranslation();

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('permissionDenied'), t('locationPermissionAlert'));
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    })();
  }, []);

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
    } catch (error) {
      console.error('Error saving created QR:', error);
    }
  };

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
          <Text style={styles.title}>{t('location')}</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Image
              source={require('../../assets/images/location.png')}
              style={{ width: 50, height: 50 }}
            />
          </View>

          <Text style={styles.label}>{t('currentLocation')}</Text>
          <Text style={styles.locationText}>
            {location
              ? `${t('latitude')}: ${location.latitude.toFixed(6)}\n${t('longitude')}: ${location.longitude.toFixed(6)}`
              : t('fetchingLocation')}
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
            <Text style={styles.buttonText}>{t('generateQrCode')}</Text>
          </TouchableOpacity>
        </View>

        {/* QR Preview */}
        {qrValue && (
          <View style={styles.qrWrapper}>
            <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
            <Text style={styles.qrText}>{t('scanThisQr')}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(30,30,30,0.6)",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
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
  label: { color: '#ccc', fontSize: 14, marginBottom: 10, textAlign: 'center' },
  locationText: { color: '#fff', textAlign: 'center', marginBottom: 20 },
  button: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: '#F7A000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#1E1E1E', fontWeight: 'bold', fontSize: 16 },
  qrWrapper: { marginTop: 40, alignItems: 'center', justifyContent: 'center' },
  qrText: { marginTop: 12, color: '#fff', fontSize: 16 },
});
