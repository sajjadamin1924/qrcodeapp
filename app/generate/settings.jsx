import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const SettingsScreen = () => {
  const router = useRouter();
  const [vibrateEnabled, setVibrateEnabled] = useState(true);
  const [beepEnabled, setBeepEnabled] = useState(false);

  const handleRateUs = () => Alert.alert('Rate Us', 'Redirecting to store...');
  const handlePrivacy = () => Alert.alert('Privacy Policy', 'Opening privacy policy...');
  const handleShare = () => Alert.alert('Share', 'Sharing the app...');

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#FFD700" />
      </TouchableOpacity>

      {/* Settings Header */}
      <Text style={styles.sectionHeader}>Settings</Text>

      {/* Vibrate Toggle */}
      <View style={styles.settingCard}>
        <View style={styles.settingTextContainer}>
          <MaterialCommunityIcons name="vibrate" size={24} color="#fff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.settingTitle}>Vibrate</Text>
            <Text style={styles.settingSubtitle}>Vibration when scan is done.</Text>
          </View>
        </View>
        <Switch
          value={vibrateEnabled}
          onValueChange={() => setVibrateEnabled(!vibrateEnabled)}
          thumbColor={vibrateEnabled ? '#FFD700' : '#777'}
          trackColor={{ true: '#FFD70055', false: '#555' }}
        />
      </View>

      {/* Beep Toggle */}
      <View style={styles.settingCard}>
        <View style={styles.settingTextContainer}>
          <Ionicons name="volume-high-outline" size={24} color="#fff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.settingTitle}>Beep</Text>
            <Text style={styles.settingSubtitle}>Beep when scan is done.</Text>
          </View>
        </View>
        <Switch
          value={beepEnabled}
          onValueChange={() => setBeepEnabled(!beepEnabled)}
          thumbColor={beepEnabled ? '#FFD700' : '#777'}
          trackColor={{ true: '#FFD70055', false: '#555' }}
        />
      </View>

      {/* Support Section */}
      <Text style={styles.sectionHeader}>Support</Text>

      <TouchableOpacity style={styles.supportCard} onPress={handleRateUs}>
        <View style={styles.settingTextContainer}>
          <Ionicons name="star-outline" size={24} color="#fff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.settingTitle}>Rate Us</Text>
            <Text style={styles.settingSubtitle}>Your best reward to us.</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.supportCard} onPress={handlePrivacy}>
        <View style={styles.settingTextContainer}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#fff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.settingTitle}>Privacy Policy</Text>
            <Text style={styles.settingSubtitle}>Follow our policies that benefits you.</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.supportCard} onPress={handleShare}>
        <View style={styles.settingTextContainer}>
          <Ionicons name="share-social-outline" size={24} color="#fff" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.settingTitle}>Share</Text>
            <Text style={styles.settingSubtitle}>Share app with others.</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: '#2a2a2a',
    padding: 10,
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    color: '#FFD700',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  settingCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  settingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  settingSubtitle: {
    color: '#aaa',
    fontSize: 12,
  },
  supportCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
});
