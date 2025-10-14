import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Image, ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/MaterialIcons';

const QRCodeScreen = () => {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState(null);
  const navigation = useNavigation(); // Type if needed

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
    if (!text.trim()) {
      alert('Please enter some text');
      return;
    }
    const value = text.trim();
    setQrValue(value);
    saveCreateToHistory(value);

    navigation.navigate('openFile', { scannedData: value });

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
        <Text style={styles.title}>Text</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Image
            source={require('../../assets/images/Vector.png')}
            style={{ width: 50, height: 50 }}
          />
        </View>

        <Text style={styles.label}>Text</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text"
          placeholderTextColor="#999"
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity style={styles.button} onPress={handleGenerateQRCode}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
      </View>

      {/* QR Preview */}
      {qrValue && (
        <View style={styles.qrWrapper}>
          <QRCode value={qrValue} size={200} color="#000" backgroundColor="#fff" />
          <Text style={styles.qrText}>Scan this QR</Text>
        </View>
      )}
    </View>
  </ImageBackground>
);


};

export default QRCodeScreen;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    padding: 20,          // applies padding inside without breaking bg
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,        // push content below status bar instead of SafeAreaView
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
  },
  buttonText: { color: '#1E1E1E', fontWeight: 'bold', fontSize: 16 },
  qrWrapper: { marginTop: 40, alignItems: 'center' },
  qrText: { marginTop: 12, color: '#fff', fontSize: 16 },
});


