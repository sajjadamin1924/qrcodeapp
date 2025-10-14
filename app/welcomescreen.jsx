import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: 1,
    title: "Welcome to QR Maker",
    subtitle: "Create, scan & manage your QR codes easily.",
    image: require("../assets/images/intro.png"),
  },
  {
    id: 2,
    title: "Generate Instantly",
    subtitle: "Create QR codes for text, Wi-Fi, links & more.",
    image: require("../assets/images/intro2.png"),
  },
  {
    id: 3,
    title: "Scan Securely",
    subtitle: "Fast and private QR scanning experience.",
    image: require("../assets/images/splashiconlight.png"),
  },
  {
    id: 4,
    title: "Organize History",
    subtitle: "Track all your scanned and created codes.",
    image: require("../assets/images/splashicondark.png"),
  },
  {
    id: 5,
    title: "Customize Your Style",
    subtitle: "Add colors, logos, and patterns to your codes.",
    image: require("../assets/images/welcomecenter.png"),
  },
  {
    id: 6,
    title: "Get Started",
    subtitle: "Ready to create your first QR code?",
    image: require("../assets/images/intro.png"),
  },
];

export default function WelcomeCarousel() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (activeIndex === slides.length - 1) {
      navigation.navigate("Language"); // ✅ Make sure 'Language' matches your Stack.Screen name
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        ref={swiperRef}
        onIndexChanged={(index) => setActiveIndex(index)}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
      >
        {slides.map((slide) => (
          <View key={slide.id} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {activeIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2D",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.6,
    height: height * 0.35,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    color: "#FDB623",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  dot: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  activeDot: {
    backgroundColor: "#FDB623",
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 4,
  },
  nextButton: {
    backgroundColor: "#FDB623",
    paddingVertical: 15,
    marginHorizontal: 30,
    marginBottom: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
