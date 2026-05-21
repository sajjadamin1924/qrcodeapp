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
import QRCodeScreenLayout from '../../components/QRCodeScreenLayout'; // 👈 Shared layout
import { useQRCodeHistory } from '../hooks/UseQRCodeHistory';

export default function QRCodeEvent() {
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

  const { saveCreateToHistory } = useQRCodeHistory();

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleGenerateQRCode = () => {
    if (!form.name.trim() || !form.start.trim() || !form.end.trim()) {
      Alert.alert(t('error'), t('event_dates_required'));
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
    <QRCodeScreenLayout
      title={t('event')}
      iconSource={require('../../assets/images/event.png')}
    >
      {/* Event Name */}
      <Text style={styles.label}>{t('event_name')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enter_event_name')}
        placeholderTextColor="#999"
        value={form.name}
        onChangeText={(v) => handleChange('name', v)}
      />

      {/* Start Date */}
      <Text style={styles.label}>{t('start_date_time')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enter_start_date_time')}
        placeholderTextColor="#999"
        value={form.start}
        onChangeText={(v) => handleChange('start', v)}
      />

      {/* End Date */}
      <Text style={styles.label}>{t('end_date_time')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enter_end_date_time')}
        placeholderTextColor="#999"
        value={form.end}
        onChangeText={(v) => handleChange('end', v)}
      />

      {/* Location */}
      <Text style={styles.label}>{t('location')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('enter_location')}
        placeholderTextColor="#999"
        value={form.location}
        onChangeText={(v) => handleChange('location', v)}
      />

      {/* Description */}
      <Text style={styles.label}>{t('description')}</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
        placeholder={t('enter_description')}
        placeholderTextColor="#999"
        value={form.description}
        multiline
        onChangeText={(v) => handleChange('description', v)}
      />

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
        <Text style={styles.buttonText}>{t('generate_qr')}</Text>
      </TouchableOpacity>

      {/* QR Code Preview */}
      {qrValue && (
        <View style={styles.qrSection}>
          <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
          <Text style={styles.qrLabel}>{t('scan_to_add_event')}</Text>
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
