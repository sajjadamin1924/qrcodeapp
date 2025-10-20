import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import QRCodeBusiness from '../generate/business';
import QRCodeContact from '../generate/contact';
import EmailScreen from '../generate/email';
import QRCodeEvent from '../generate/event';
import GenerateQrScreen from '../generate/Generate';
import HistoryScreen from '../generate/history';
import InstagramQRCodeScreen from '../generate/instagram';
import LanguageScreen from '../generate/languageScreen';
import LocationScreen from '../generate/location';
import PermissionScreen from '../generate/permissionScreen';
import QRDetails from '../generate/QRDetails';
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
import WelcomeScreen from '../welcomescreen';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          
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
        <Stack.Screen name="text" component={TextQRCodeScreen} />
        <Stack.Screen name="twitter" component={TwitterQRCodeScreen} />
        <Stack.Screen name="website" component={QRCodeWebsite} />
        <Stack.Screen name="whatsapp" component={WhatsAppQRCodeScreen} />
        <Stack.Screen name="wifi" component={QRCodeWifi} />
        <Stack.Screen name="showqr" component={ShowQRCodeScreen} />
        <Stack.Screen name="openFile" component={ResultScreen} />
        <Stack.Screen name="location" component={LocationScreen} />
        <Stack.Screen name="QRDetails" component={QRDetails} />

      </Stack.Navigator>
   
  );
};

export default AppNavigator;
