import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
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
  const navigation = useNavigation(); // use a type if you have a TypeScript type for your stack

  const [form, setForm] = useState({
    name: '',
    start: '',
    end: '',
    location: '',
    description: '',
  });
  const [qrValue, setQrValue] = useState(null);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

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
      alert('Please enter event name and start/end dates');
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
      style={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={34} color="#F7A000" />
          </TouchableOpacity>
          <Text style={styles.title}>Event</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Image
                source={require('../../assets/images/event.png')}
                style={{ width: 50, height: 50 }}
              />
            </View>

            <Text style={styles.label}>Event Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              placeholderTextColor="#999"
              value={form.name}
              onChangeText={(v) => handleChange('name', v)}
            />

            <Text style={styles.label}>Start Date and Time</Text>
            <TextInput
              style={styles.input}
              placeholder="12 Dec 2023, 10:00 AM"
              placeholderTextColor="#999"
              value={form.start}
              onChangeText={(v) => handleChange('start', v)}
            />

            <Text style={styles.label}>End Date and Time</Text>
            <TextInput
              style={styles.input}
              placeholder="12 Dec 2023, 12:00 PM"
              placeholderTextColor="#999"
              value={form.end}
              onChangeText={(v) => handleChange('end', v)}
            />

            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter location"
              placeholderTextColor="#999"
              value={form.location}
              onChangeText={(v) => handleChange('location', v)}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              placeholderTextColor="#999"
              value={form.description}
              onChangeText={(v) => handleChange('description', v)}
            />

            <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
              <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>

            {qrValue && (
              <View style={styles.qrWrapper}>
                <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
                <Text style={styles.qrText}>Scan to add event</Text>
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
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
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
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
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
  label: { color: '#ccc', fontSize: 14, marginBottom: 5, marginTop: 10 },
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
    marginTop: 10,
  },
  buttonText: { color: '#1E1E1E', fontWeight: 'bold', fontSize: 16 },
  qrWrapper: { marginTop: 30, alignItems: 'center', justifyContent: 'center' },
  qrText: { marginTop: 12, color: '#fff', fontSize: 16 },
});
