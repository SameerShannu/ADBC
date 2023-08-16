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

const Stack = createStackNavigator();

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  enableScreens();

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
