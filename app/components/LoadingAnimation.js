import { MotiView } from "moti";
import * as React from "react";
import { StyleSheet } from "react-native";

const size = 100;

const LoadingAnimation = () => {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 0,
        shadowOpacity: 0,
      }}
      animate={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        borderWidth: size / 10,
        shadowOpacity: 0.1,
      }}
      transition={{
        type: "timing",
        duration: 1000,
        loop: true,
      }}
      style={styles.loading}
    />
  );
};
const styles = StyleSheet.create({
  loading: {
    backgroundColor: "#fff",
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: size / 10,
    borderColor: "#09A9E0",
    shadowColor: "09A9E0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
export default LoadingAnimation;
