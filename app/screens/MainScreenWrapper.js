import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

import { useDrawerProgress } from "@react-navigation/drawer";

import MainScreen from "./MainScreen";

const MainScreenWrapper = ({ ...props }) => {
  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);
    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 40]);
    return {
      transform: [{ scale }],
      borderRadius,
    };
  });

  return (
    <Animated.View style={[styles.container, viewStyles]}>
      <MainScreen {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreenWrapper;
