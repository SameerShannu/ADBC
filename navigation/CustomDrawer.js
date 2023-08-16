import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import { connect, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import {
  setSelectedTab,
  setDrawerAnimationValue,
} from "../stores/tab/tabActions";
import MainScreen from "../app/screens/MainScreen";
import MainScreenWrapper from "../app/screens/MainScreenWrapper";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 40,
        marginBottom: 10,
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: isFocused ? "white" : null,
        paddingLeft: isFocused ? 20 : 0,
      }}
      onPress={onPress}
    >
      <Animated.Image
        source={icon}
        style={{
          width: 30,
          height: 30,
          resizeMode: "contain",
        }}
      />
      <Animated.Text
        style={{
          textAlign: "center",
          fontSize: 18,
          marginLeft: 20,
          color: isFocused ? "#1B48AF" : "#fff",
        }}
      >
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({
  navigation,
  selectedTab,
  setSelectedTab,
  progress,
}) => {
  const scale = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, []);

  useEffect(() => {
    scale.value = withSpring(1, { duration: 15000 });
  }, []);

  return (
    <LinearGradient
      colors={["#286ca9", "#584a97", "#7d1d84"]}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView
        scrollEnabled={false}
        contentContainerStyle={{
          flex: 1,
          width: "100%",
        }}
      >
        <View
          style={{
            flex: 1,
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          {/* Close */}

          <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.closeDrawer()}
            >
              <Ionicons name="close" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Profile of ADBC */}

          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
            }}
            onPress={() => console.log("ADBC Telugu")}
          >
            <Image
              source={require("../assets/icon.png")}
              style={{ width: 50, height: 50, resizeMode: "contain" }}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                ADBC Telugu
              </Text>
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontSize: 12,
                }}
              >
                www.adbctelugu.com
              </Text>
            </View>
          </View>

          {/* Margin (line) */}

          <View
            style={{
              marginTop: 20,
              backgroundColor: "#fff",
              width: "80%",
              height: 1,
            }}
          />

          {/* Categories */}

          <View style={{ marginTop: 20 }}>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"All Categories"}
                icon={require("../app/asserts/categoriesImages/news.png")}
                isFocused={selectedTab == "MainScreen"}
                onPress={() => {
                  setSelectedTab("MainScreen");
                  navigation.navigate("MainScreen");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"National News"}
                icon={require("../app/asserts/categoriesImages/nation.png")}
                isFocused={selectedTab == "National"}
                onPress={() => {
                  setSelectedTab("National");
                  navigation.navigate("National");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"International News"}
                icon={require("../app/asserts/categoriesImages/international.png")}
                isFocused={selectedTab == "International"}
                onPress={() => {
                  setSelectedTab("International");
                  navigation.navigate("International");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"Telangana"}
                icon={require("../app/asserts/categoriesImages/ts.png")}
                isFocused={selectedTab == "Telangana"}
                onPress={() => {
                  setSelectedTab("Telangana");
                  navigation.navigate("Telangana");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"Andhra Pradesh"}
                icon={require("../app/asserts/categoriesImages/ap.png")}
                isFocused={selectedTab == "AndhraPradesh"}
                onPress={() => {
                  setSelectedTab("AndhraPradesh");
                  navigation.navigate("AndhraPradesh");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"Politics"}
                icon={require("../app/asserts/categoriesImages/politics.png")}
                isFocused={selectedTab == "Politics"}
                onPress={() => {
                  setSelectedTab("Politics");
                  navigation.navigate("Politics");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"Cinema"}
                icon={require("../app/asserts/categoriesImages/cinema.png")}
                isFocused={selectedTab == "Cinema"}
                onPress={() => {
                  setSelectedTab("Cinema");
                  navigation.navigate("Cinema");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"Business"}
                icon={require("../app/asserts/categoriesImages/business.png")}
                isFocused={selectedTab == "Business"}
                onPress={() => {
                  setSelectedTab("Business");
                  navigation.navigate("Business");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"Sports"}
                icon={require("../app/asserts/categoriesImages/sports.png")}
                isFocused={selectedTab == "Sports"}
                onPress={() => {
                  setSelectedTab("Sports");
                  navigation.navigate("Sports");
                }}
              />
            </Animated.View>
            <Animated.View
              style={[
                { width: "100%", height: 20, marginBottom: 30 },
                reanimatedStyle,
              ]}
            >
              <CustomDrawerItem
                label={"Technology"}
                icon={require("../app/asserts/categoriesImages/technology.png")}
                isFocused={selectedTab == "Technology"}
                onPress={() => {
                  setSelectedTab("Technology");
                  navigation.navigate("Technology");
                }}
              />
            </Animated.View>
          </View>
        </View>
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#286ca9", "#584a97", "#7d1d84"]}
        style={{ flex: 1 }}
      >
        <Drawer.Navigator
          screenOptions={{
            drawerType: "slide",
            overlayColor: "transparent",
            drawerActiveBackgroundColor: "transparent",
            drawerInactiveBackgroundColor: "transparent",
            swipeEdgeWidth:
              (Platform.OS === "android" && 180) ||
              (Platform.OS === "ios" && 180),
            headerShown: false,
            sceneContainerStyle: {
              backgroundColor: "transparent",
            },
          }}
          drawerStyle={{
            flex: 1,
            width: "65%",
            paddingRight: 20,
            backgroundColor: "transparent",
          }}
          initialRouteName="MainScreenWrapper"
          drawerContent={(props) => {
            setTimeout(() => {
              setProgress(props.progress);
            }, 0);

            return (
              <CustomDrawerContent
                navigation={props.navigation}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                progress={props.progress}
              />
            );
          }}
        >
          <Drawer.Screen
            name="MainScreen"
            options={{
              title: "",
            }}
          >
            {(props) => <MainScreenWrapper {...props} category={""} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="National"
            options={{
              title: "",
            }}
          >
            {(props) => <MainScreenWrapper {...props} category={"national"} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="International"
            options={{
              title: "",
            }}
          >
            {(props) => (
              <MainScreenWrapper {...props} category={"international"} />
            )}
          </Drawer.Screen>
          <Drawer.Screen
            name="AndhraPradesh"
            options={{
              title: "",
            }}
          >
            {(props) => (
              <MainScreenWrapper {...props} category={"andhra-pradesh"} />
            )}
          </Drawer.Screen>
          <Drawer.Screen
            name="Telangana"
            options={{
              title: "",
            }}
          >
            {(props) => <MainScreenWrapper {...props} category={"telangana"} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Politics"
            options={{
              title: "",
            }}
          >
            {(props) => <MainScreenWrapper {...props} category={"politics"} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Cinema"
            options={{
              title: "",
            }}
          >
            {(props) => <MainScreenWrapper {...props} category={"cinema"} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Business"
            options={{
              title: "",
            }}
          >
            {(props) => <MainScreenWrapper {...props} category={"business"} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Sports"
            options={{
              title: "",
            }}
          >
            {(props) => <MainScreenWrapper {...props} category={"sports"} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Technology"
            options={{
              title: "",
            }}
          >
            {(props) => (
              <MainScreenWrapper {...props} category={"Technology"} />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
      </LinearGradient>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab || "MainScreen",
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: (selectedTab) => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
