import BottomNavigation from '@/components/BottomNavigation';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { useTranslation } from 'react-i18next'; // 👈 Import hook
import {
  Alert,
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation(); // 👈 useTranslation hook

  const { scannedData } = route.params || {};
  const scannedUrl = scannedData || t('noData'); // dynamic translation

  const handleCopy = () => {
    Clipboard.setStringAsync(scannedUrl);
    Alert.alert(t('copiedTitle'), t('copiedMessage'));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: scannedUrl,
      });
    } catch (error) {
      Alert.alert(t('errorTitle'), t('errorMessage'));
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#FFD700" />
          </TouchableOpacity>
          <Text style={styles.title}>{t('titleresult')}</Text>
        </View>

        {/* Result Card */}
        <View style={styles.resultCard}>
          <Image source={require('../assets/images/qricon.png')} style={styles.qrIcon} />
          <View style={styles.resultInfo}>
            <Text style={styles.dataType}>{t('dataType')}</Text>
            <Text style={styles.timestamp}>{new Date().toLocaleString()}</Text>
          </View>
          <Text style={styles.url}>{scannedUrl}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('showqr', { qrValue: scannedUrl })}
          >
            <Text style={styles.showQR}>{t('showQR')}</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <View style={styles.actionWrapper}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Image source={require('../assets/images/share.png')} style={styles.actionIcon} />
            </TouchableOpacity>
            <Text style={styles.actionText}>{t('share')}</Text>
          </View>

          <View style={styles.actionWrapper}>
            <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
              <Image source={require('../assets/images/copy.png')} style={styles.actionIcon} />
            </TouchableOpacity>
            <Text style={styles.actionText}>{t('copy')}</Text>
          </View>
        </View>

        {/* Footer */}
        <BottomNavigation />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(30,30,30,0.6)',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#2a2a2a',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    elevation: 5,
  },
  qrIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  resultInfo: {
    marginBottom: 10,
  },
  dataType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  url: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
  },
  showQR: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  actionWrapper: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  actionText: {
    marginTop: 6,
    fontWeight: '600',
    color: '#fff',
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
});
