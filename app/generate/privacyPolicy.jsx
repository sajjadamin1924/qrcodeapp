import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionBody}>{children}</Text>
  </View>
);

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="#FDB623" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro card */}
        <View style={styles.introCard}>
          <View style={styles.introIconWrap}>
            <Ionicons name="shield-checkmark" size={28} color="#FDB623" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.introTitle}>Your Privacy Matters</Text>
            <Text style={styles.introSub}>Last updated: May 2026</Text>
          </View>
        </View>

        <Text style={styles.intro}>
          QR Maker is designed with privacy as a core principle. We do not collect, store, or share
          any personal data. Everything stays on your device.
        </Text>

        <Section title="1. Information We Collect">
          We do not collect any personal information. QR Maker operates entirely offline and locally
          on your device. No data is transmitted to external servers.
        </Section>

        <Section title="2. Camera Access">
          Camera access is used solely to scan QR codes in real time. We do not capture, store, or
          upload any photographs or video recordings. The camera feed is processed on-device only.
        </Section>

        <Section title="3. Gallery / Photo Library Access">
          Gallery access is used only when you choose to scan a QR code from an image you select.
          We do not access, copy, or upload any other photos or files from your device.
        </Section>

        <Section title="4. Location Data">
          Location access is used only when you explicitly choose to generate a location-based QR
          code. Location data is embedded in the QR code you create and is never transmitted to us
          or any third party.
        </Section>

        <Section title="5. QR Code History">
          Your scan and generation history is stored exclusively in your device's local storage
          (AsyncStorage). This data never leaves your device and is completely under your control.
          You can delete individual items or clear history at any time.
        </Section>

        <Section title="6. Notifications">
          Notification permission is optional and is used only to deliver scan result alerts on
          your device. We do not send marketing notifications or share notification data.
        </Section>

        <Section title="7. Third-Party Services">
          QR Maker does not integrate with any analytics, advertising, or crash-reporting services.
          There are no third-party SDKs that collect user data embedded in this application.
        </Section>

        <Section title="8. Children's Privacy">
          QR Maker does not knowingly collect any information from children under the age of 13.
          The app contains no features that require account creation or personal data input.
        </Section>

        <Section title="9. Data Security">
          Since all data is stored locally on your device, it is protected by your device's
          built-in security measures such as encryption and screen lock. We strongly recommend
          keeping your device software up to date.
        </Section>

        <Section title="10. Changes to This Policy">
          We may update this Privacy Policy from time to time. We will notify you of any significant
          changes by updating the date at the top of this page. Continued use of the app after
          changes constitutes acceptance of the updated policy.
        </Section>

        <Section title="11. Contact Us">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
          {"\n\n"}support@qrmaker.app
        </Section>

        <View style={styles.footer}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#3A3A3A" />
          <Text style={styles.footerText}>QR Maker — Privacy First</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#141414",
    borderWidth: 1,
    borderColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  introCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(253,182,35,0.08)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.2)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    gap: 14,
  },
  introIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(253,182,35,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  introTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  introSub: {
    color: "#5A5A5A",
    fontSize: 12,
  },
  intro: {
    color: "#8A8A8A",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FDB623",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  sectionBody: {
    color: "#8A8A8A",
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  footerText: {
    color: "#3A3A3A",
    fontSize: 12,
  },
});
