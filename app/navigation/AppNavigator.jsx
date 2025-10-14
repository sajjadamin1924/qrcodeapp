import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import QRCodeBusiness from '../generate/business';
import QRCodeContact from '../generate/contact';
import EmailScreen from '../generate/email';
import QRCodeEvent from '../generate/event';
import GenerateQrScreen from '../generate/Generate';
import HistoryScreen from '../generate/history';
import InstagramQRCodeScreen from '../generate/instagram';
import LanguageScreen from '../generate/languageScreen';
import PermissionScreen from '../generate/permissionScreen';
import ScannerScreen from '../generate/scanner';
import SettingsScreen from '../generate/settings';
import TelephoneQRCodeScreen from '../generate/telephone';
import QRCodeScreen from '../generate/text';
import TwitterQRCodeScreen from '../generate/twitter';
import QRCodeWebsite from '../generate/website';
import WhatsAppQRCodeScreen from '../generate/whatsapp';
import QRCodeWifi from '../generate/wifi';
import ResultScreen from '../openFile';
import ShowQRCodeScreen from '../showqr';
import WelcomeScreen from '../welcomescreen';
import DrawerNavigator from './DrawerNavigator';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Permission" component={PermissionScreen} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
        <Stack.Screen name="generate" component={GenerateQrScreen} />
        <Stack.Screen name="history" component={HistoryScreen} />
        <Stack.Screen name="business" component={QRCodeBusiness} />
        <Stack.Screen name="contact" component={QRCodeContact} />
        <Stack.Screen name="email" component={EmailScreen} />
        <Stack.Screen name="event" component={QRCodeEvent} />
        <Stack.Screen name="instagram" component={InstagramQRCodeScreen} />
        <Stack.Screen name="scanner" component={ScannerScreen} />
        <Stack.Screen name="setting" component={SettingsScreen} />
        <Stack.Screen name="telephone" component={TelephoneQRCodeScreen} />
        <Stack.Screen name="text" component={QRCodeScreen} />
        <Stack.Screen name="twitter" component={TwitterQRCodeScreen} />
        <Stack.Screen name="website" component={QRCodeWebsite} />
        <Stack.Screen name="whatsapp" component={WhatsAppQRCodeScreen} />
        <Stack.Screen name="wifi" component={QRCodeWifi} />
        <Stack.Screen name="showqr" component={ShowQRCodeScreen} />
        <Stack.Screen name="openFile" component={ResultScreen} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
