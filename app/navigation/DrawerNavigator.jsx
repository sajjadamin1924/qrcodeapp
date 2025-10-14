import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Import your screens
import HomeScreen from '@/components/HomeScreen';
import GenerateQrScreen from '../generate/Generate';
import HistoryScreen from '../generate/history';
import ScannerScreen from '../generate/scanner';
import SettingsScreen from '../generate/settings';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { t } = useTranslation(); // 👈 translation hook

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#1E1E1E' },
        headerTintColor: '#FFD700',
        drawerStyle: {
          backgroundColor: '#1E1E1E',
          width: 240,
        },
        drawerActiveTintColor: '#FFD700',
        drawerInactiveTintColor: '#ccc',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('drawerHome'),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Generate"
        component={GenerateQrScreen}
        options={{
          title: t('drawerGenerate'),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          title: t('drawerScanner'),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="scan-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: t('drawerHistory'),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="time-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('drawerSettings'),
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
