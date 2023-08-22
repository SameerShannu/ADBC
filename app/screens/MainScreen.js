import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  Platform,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoadingAnimation from "../components/LoadingAnimation";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";

export default function MainScreen({ category, navigation }) {
  const [isLoading, setisLoading] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pan] = useState(new Animated.ValueXY());
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [page, setPage] = useState(1); // New state to track the current page
  const [iconColor, setIconColor] = useState("#1B48AF");

  const handleIconPress = () => {
    // Changing the icon color when pressed
    const newColor = iconColor === "#1B48AF" ? "tomato" : "#1B48AF";
    setIconColor(newColor);
  };

  useEffect(() => {
    fetchArticles();

    Dimensions.addEventListener("change", handleScreenResize);
    return () => {
      Dimensions.removeEventListener("change", handleScreenResize);
    };
  }, []);

  const fetchArticles = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        "https://shortnews.adbctelugu.com/wp-json/adbc/v1/posts?category=" +
          category
      );
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      setArticles((prevArticles) => [...prevArticles, ...data]);
      setisLoading(false);
    } catch (error) {
      // Handle the error appropriately (e.g., show an error message)
      console.error(error);
    }
  };

  const handleScreenResize = () => {
    setScreenWidth(Dimensions.get("window").width);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Allow swiping only if gesture is vertical and exceeds a certain threshold
      const { dx, dy } = gestureState;
      return Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 5;
    },
    onPanResponderMove: Animated.event([null, { dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (_, gestureState) => {
      const { dy } = gestureState;
      if (dy < -120 && currentIndex < articles.length - 1) {
        // Swipe up, move to the next article
        setCurrentIndex((prevIndex) => prevIndex + 1);
        Animated.timing(pan, {
          toValue: { x: 0, y: -screenWidth },
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({ x: 0, y: 0 });
        });
      } else if (dy > 120 && currentIndex > 0) {
        // Swipe down, move to the previous article
        setCurrentIndex((prevIndex) => prevIndex - 1);
        Animated.timing(pan, {
          toValue: { x: 0, y: screenWidth },
          duration: 400,
          useNativeDriver: false,
        }).start(() => {
          pan.setValue({ x: 0, y: 0 });
        });
      } else {
        // Not enough swipe distance, reset to the current article
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedStyle = {
    transform: pan.getTranslateTransform(),
  };

  // Here we set the sharing logic for the articles

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
        const result = await Sharing.shareAsync(snapshotImg, {
          mimeType: "image/png",
        });
        // Check the result and handle accordingly if needed
      } catch (error) {
        console.error("Error sharing snapshot:", error);
      }
    } else {
      console.log("Image not loaded:");
    }
  };

  const renderArticles = () => {
    return articles.map((article, index) => {
      const { title, featured_image, excerpt } = article;
      const isActive = index === currentIndex;
      const top = isActive ? 0 : screenWidth + 50;

      // Calculate the bottom position of the article
      const bottom = top + screenWidth;

      // Hide the last article on top of other articles
      const isLastArticleVisible =
        index === articles.length - 1 && currentIndex !== index;

      const articleStyle = isActive
        ? styles.activeArticle
        : [styles.inactiveArticle, { top: bottom }];

      return (
        <Animated.View
          key={index}
          style={[
            styles.articleContainer,
            articleStyle,
            isActive && animatedStyle,
          ]}
          {...panResponder.panHandlers}
        >
          {!isLastArticleVisible && (
            <>
              <Image source={{ uri: featured_image }} style={styles.image} />
              <View style={styles.contentHolder}>
                <Text style={styles.title}>{title}</Text>
                <Text numberOfLines={9} style={styles.excerpt}>
                  {excerpt}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "absolute",
                    bottom: 30,
                    right: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={handleIconPress}>
                      <AntDesign
                        style={{ marginRight: 5 }}
                        name="like1"
                        size={30}
                        color={iconColor}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginRight: 10,
                        justifyContent: "center",
                        alignItems: "baseline",
                      }}
                    >
                      {Math.floor(Math.random() * 23) + 11}
                    </Text>
                    <TouchableOpacity onPress={snapshot}>
                      <MaterialCommunityIcons
                        name="share"
                        size={35}
                        color="#1B48AF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
        </Animated.View>
      );
    });
  };

  return (
    <View
      ref={viewToSnapshotRef}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFF",
      }}
    >
      {/* The hamburger icon in the header */}
      <View
        style={{
          position: "absolute",
          top: Platform.OS === "ios" ? 60 : 40,
          left: 20,
          zIndex: 1,
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={35} color="#FFF" />
        </TouchableOpacity>
      </View>
      {isLoading ? <LoadingAnimation /> : renderArticles()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
  },
  articleContainer: {
    flex: 1,
    // backgroundColor: "#1B48AF",
    backgroundColor: "#fff",
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: Platform.OS === "ios" ? "46.2%" : "49%",
    resizeMode: "contain",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  contentHolder: {
    flex: 1,
    marginTop: "-7%",
    width: "95%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 10,
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  excerpt: {
    textAlign: "justify",
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
  },
});
