import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "./stores/rootReducer";
import CustomDrawer from "./navigation/CustomDrawer";
import OnboardingScreen from "./app/screens/OnboardingScreen";
import { getItem } from "./app/utils/asyncStorage";

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  enableScreens();

  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    checkIfAleadyOnboarding();
  }, []);

  const checkIfAleadyOnboarding = async () => {
    let onboarded = await getItem("onboarded");
    if (onboarded == 1) {
    } else {
      setShowOnboarding(true);
    }
  };

  if (showOnboarding) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="light" translucent={true} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"OnboardingScreen"}
          >
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={CustomDrawer}
              options={{
                screenProps: {
                  selectedTab: "All Categories",
                  setSelectedTab: () => {
                    "MainScreenWrapper";
                  },
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="light" translucent={true} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"Home"}
          >
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={CustomDrawer}
              options={{
                screenProps: {
                  selectedTab: "All Categories",
                  setSelectedTab: () => {
                    "MainScreenWrapper";
                  },
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
