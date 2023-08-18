import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";

import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

import MainScreenWrapper from "./MainScreenWrapper";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("Home");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: "#286ca9",
            image: (
              <LottieView
                style={styles.lottie}
                source={require("../asserts/animations/slide1.json")}
                autoPlay
                loop
              />
            ),
            title: "Stay Ahead with ADBC",
            subtitle: "Stay informed with instant, up-to-the-minute news.",
          },
          {
            backgroundColor: "#584a97",
            image: (
              <LottieView
                style={styles.lottie}
                source={require("../asserts/animations/slide2.json")}
                autoPlay
                loop
              />
            ),
            title: "Quick Bites of Knowledge",
            subtitle:
              "Experience news in a whole new way – concise, impactful, and ready to fuel your day.",
          },
          {
            backgroundColor: "#7d1d84",
            image: (
              <LottieView
                style={styles.lottie}
                source={require("../asserts/animations/slide3.json")}
                autoPlay
                loop
              />
            ),
            title: "Empower Your News Experience",
            subtitle:
              "Take charge of your updates, dive into trends, and get connected with ADBC Telugu.",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: width,
    height: width,
  },
  doneButton: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
});
