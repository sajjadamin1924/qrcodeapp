import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { useTranslation } from 'react-i18next';

// Import your screens
import HomeScreen from '@/components/HomeScreen';
import QRCodeBusiness from '../generate/business';
import QRCodeContact from '../generate/contact';
import EmailScreen from '../generate/email';
import QRCodeEvent from '../generate/event';
import GenerateQrScreen from '../generate/Generate';
import HistoryScreen from '../generate/history';
import InstagramQRCodeScreen from '../generate/instagram';
import LocationScreen from '../generate/location';
import ScannerScreen from '../generate/scanner';
import SettingsScreen from '../generate/settings';
import TelephoneQRCodeScreen from '../generate/telephone';
import TextQRCodeScreen from '../generate/text';
import TwitterQRCodeScreen from '../generate/twitter';
import QRCodeWebsite from '../generate/website';
import WhatsAppQRCodeScreen from '../generate/whatsapp';
import QRCodeWifi from '../generate/wifi';
import ResultScreen from '../openFile';
import ShowQRCodeScreen from '../showqr';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#1E1E1E' },
        headerTintColor: '#FFD700',
        drawerStyle: { backgroundColor: '#1E1E1E', width: 240 },
        drawerActiveTintColor: '#FFD700',
        drawerInactiveTintColor: '#ccc',
      }}
    >
      {/* Main Screens */}
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t('drawerHome'),
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Generate"
        component={GenerateQrScreen}
        options={{
          title: t('drawerGenerate'),
          drawerIcon: ({ color, size }) => <Ionicons name="qr-code-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          title: t('drawerScanner'),
          drawerIcon: ({ color, size }) => <Ionicons name="scan-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="history"
        component={HistoryScreen}
        options={{
          title: t('drawerHistory'),
           headerShown: false,
          
          drawerIcon: ({ color, size }) => <Ionicons name="time-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t('drawerSettings'),
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" color={color} size={size} />,
        }}
      />

      {/* Additional QR Screens */}
      <Drawer.Screen
        name="Business"
        component={QRCodeBusiness}
        options={{
          title: t('drawerBusiness'),
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="briefcase-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={QRCodeContact}
        options={{
          title: t('drawerContact'),
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Email"
        component={EmailScreen}
        options={{
          title: t('drawerEmail'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="mail-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Event"
        component={QRCodeEvent}
        options={{
          title: t('drawerEvent'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Instagram"
        component={InstagramQRCodeScreen}
        options={{
          title: t('drawerInstagram'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="logo-instagram" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Telephone"
        component={TelephoneQRCodeScreen}
        options={{
          title: t('drawerTelephone'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="call-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Text"
        component={TextQRCodeScreen}
        options={{
          title: t('drawerText'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="text-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Twitter"
        component={TwitterQRCodeScreen}
        options={{
          title: t('drawerTwitter'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="logo-twitter" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Website"
        component={QRCodeWebsite}
        options={{
          title: t('drawerWebsite'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="globe-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="WhatsApp"
        component={WhatsAppQRCodeScreen}
        options={{
          title: t('drawerWhatsApp'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="logo-whatsapp" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="WiFi"
        component={QRCodeWifi}
        options={{
          title: t('drawerWiFi'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="wifi-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="ShowQR"
        component={ShowQRCodeScreen}
        options={{
          title: t('drawerShowQR'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="eye-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="OpenFile"
        component={ResultScreen}
        options={{
          title: t('drawerOpenFile'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="document-outline" color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Location"
        component={LocationScreen}
        options={{
          title: t('drawerLocation'),
          headerShown:false,
          drawerIcon: ({ color, size }) => <Ionicons name="location-outline" color={color} size={size} />,
        }}
      />
    </Drawer.Navigator>
  );
}
