import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Welcome to QR Maker",
    subtitle: "Create, scan & manage your QR codes with ease.",
    image: require("../assets/images/intro.png"),
    accent: "#FDB623",
  },
  {
    id: 2,
    title: "Generate Instantly",
    subtitle: "Create QR codes for text, Wi-Fi, links & more.",
    image: require("../assets/images/intro2.png"),
    accent: "#FFD060",
  },
  {
    id: 3,
    title: "Scan Securely",
    subtitle: "Fast and private QR scanning experience.",
    image: require("../assets/images/splashiconlight.png"),
    accent: "#FDB623",
  },
  {
    id: 4,
    title: "Organize History",
    subtitle: "Track all your scanned and created codes.",
    image: require("../assets/images/splashicondark.png"),
    accent: "#FFD060",
  },
  {
    id: 5,
    title: "Customize Your Style",
    subtitle: "Add colors, logos, and patterns to your codes.",
    image: require("../assets/images/welcomecenter.png"),
    accent: "#FDB623",
  },
  {
    id: 6,
    title: "Get Started",
    subtitle: "Ready to create your first QR code?",
    image: require("../assets/images/intro.png"),
    accent: "#FFD060",
  },
];

export default function WelcomeCarousel() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      navigation.navigate("Language");
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  const handleSkip = () => {
    navigation.navigate("Language");
  };

  return (
    <LinearGradient colors={["#0A0A0A", "#111111", "#0A0A0A"]} style={styles.container}>
      {/* Skip */}
      {activeIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip} activeOpacity={0.7}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <Swiper
        loop={false}
        ref={swiperRef}
        onIndexChanged={(index) => setActiveIndex(index)}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        paginationStyle={styles.pagination}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            {/* Image glow */}
            <View style={styles.imageContainer}>
              <View style={[styles.imageGlow, { shadowColor: slide.accent }]} />
              <Image source={slide.image} style={styles.image} />
            </View>

            {/* Badge */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{slide.id} / {slides.length}</Text>
            </View>

            <Text style={[styles.title, { color: slide.accent }]}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext} activeOpacity={0.85}>
        <LinearGradient
          colors={["#FDB623", "#E6A010"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.nextGradient}
        >
          <Text style={styles.nextButtonText}>
            {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipBtn: {
    position: "absolute",
    top: 52,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(253,182,35,0.12)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.3)",
  },
  skipText: {
    color: "#FDB623",
    fontSize: 13,
    fontWeight: "600",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 100,
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  imageGlow: {
    position: "absolute",
    width: width * 0.55,
    height: width * 0.55,
    borderRadius: (width * 0.55) / 2,
    shadowOpacity: 0.35,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 0 },
  },
  image: {
    width: width * 0.55,
    height: height * 0.28,
    resizeMode: "contain",
  },
  badge: {
    backgroundColor: "rgba(253,182,35,0.12)",
    borderWidth: 1,
    borderColor: "rgba(253,182,35,0.25)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 18,
  },
  badgeText: {
    color: "#FDB623",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subtitle: {
    color: "#8A8A8A",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  pagination: {
    bottom: 110,
  },
  dot: {
    backgroundColor: "#2A2A2A",
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 4,
  },
  activeDot: {
    backgroundColor: "#FDB623",
    width: 22,
    height: 6,
    borderRadius: 3,
    margin: 4,
  },
  nextButton: {
    position: "absolute",
    bottom: 40,
    left: 32,
    right: 32,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#FDB623",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  nextGradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 16,
  },
  nextButtonText: {
    color: "#0A0A0A",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
