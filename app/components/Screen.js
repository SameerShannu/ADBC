import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

function Screen({ children, style }) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

export default Screen;
