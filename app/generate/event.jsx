import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QRCodeEvent = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    start: '',
    end: '',
    location: '',
    description: '',
  });
  const [qrValue, setQrValue] = useState(null);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

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
      console.error('Error saving Event QR:', error);
    }
  };

  const handleGenerateQRCode = () => {
    if (!form.name.trim() || !form.start.trim() || !form.end.trim()) {
      Alert.alert(t('Error'), t('Please enter event name and start/end dates'));
      return;
    }

    const vEvent = `BEGIN:VEVENT
SUMMARY:${form.name}
DTSTART:${form.start}
DTEND:${form.end}
LOCATION:${form.location}
DESCRIPTION:${form.description}
END:VEVENT`;

    setQrValue(vEvent);
    saveCreateToHistory(vEvent);
    navigation.navigate('openFile', { scannedData: vEvent });
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
          <Text style={styles.headerTitle}>{t('event')}</Text>
        </View>

        {/* Scrollable Form */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Image
                source={require('../../assets/images/event.png')}
                style={{ width: 60, height: 60 }}
              />
            </View>

            <Text style={styles.label}>{t('eventName')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('enterEventName')}
              placeholderTextColor="#999"
              value={form.name}
              onChangeText={(v) => handleChange('name', v)}
            />

            <Text style={styles.label}>{t('startDateTime')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('enterStartDateTime')}
              placeholderTextColor="#999"
              value={form.start}
              onChangeText={(v) => handleChange('start', v)}
            />

            <Text style={styles.label}>{t('endDateTime')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('enterEndDateTime')}
              placeholderTextColor="#999"
              value={form.end}
              onChangeText={(v) => handleChange('end', v)}
            />

            <Text style={styles.label}>{t('location')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('enterLocation')}
              placeholderTextColor="#999"
              value={form.location}
              onChangeText={(v) => handleChange('location', v)}
            />

            <Text style={styles.label}>{t('description')}</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
              placeholder={t('enterDescription')}
              placeholderTextColor="#999"
              value={form.description}
              multiline
              onChangeText={(v) => handleChange('description', v)}
            />

            <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
              <Text style={styles.buttonText}>{t('generateQrCode')}</Text>
            </TouchableOpacity>

            {qrValue && (
              <View style={styles.qrSection}>
                <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
                <Text style={styles.qrLabel}>{t('scanToAddEvent')}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default QRCodeEvent;

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
