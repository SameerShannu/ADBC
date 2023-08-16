import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import { captureRef } from "react-native-view-shot";
import { useRef, useState } from "react";

import * as Sharing from "expo-sharing";

// npx expo install react-native-view-shot

export default function Test() {
  const viewToSnapshotRef = useRef();
  const [snapshotImg, setSnapshotImg] = useState();
  const [isProcessing, setIsProcessing] = useState(false);

  const snapshot = async () => {
    setIsProcessing(true);
    const result = await captureRef(viewToSnapshotRef);
    console.log(result);
    setSnapshotImg(result);
    setIsProcessing(false);
    shareSnapshot();
  };
  const shareSnapshot = async () => {
    if (snapshotImg) {
      try {
        const result = await Sharing.shareAsync(snapshotImg);
        // Check the result and handle accordingly if needed
      } catch (error) {
        console.error("Error sharing snapshot:", error);
      }
    } else {
      console.log("Image not loaded:");
    }
  };

  return (
    <View style={styles.container}>
      <View ref={viewToSnapshotRef} style={styles.snapshot}>
        <Text>Contact Details</Text>
        <Text>Names: James Smith</Text>
        <Text>Phone: 555-5555</Text>
      </View>
      <Button title="Take Snapshot" onPress={snapshot} />
      {snapshotImg && <Text>Snapshot Preview:</Text>}
      {snapshotImg && (
        <Image
          resizeMode="contain"
          style={styles.snapshotImg}
          source={{ uri: snapshotImg }}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  snapshot: {
    borderColor: "#000000",
    borderWidth: 2,
    backgroundColor: "#00ffff",
    margin: 16,
    padding: 16,
  },
  snapshotImg: {
    width: 400,
    height: 200,
    margin: 16,
  },
});
