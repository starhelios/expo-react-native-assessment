import { useEffect, useState } from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getToken } from "./src/store";
import HomeScreen from "./src/pages/home";
import LoginScreen from "./src/pages/login";
// import SplashScreen from 'react-native-splash-screen'
import SplashScreen from "./src/pages/splash";

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = await getToken();
      if (token) {
        navigationRef.navigate("Home");
      } else {
        navigationRef.navigate("Login");
      }
      setIsLoading(false);
    };
    init();
  }, [navigationRef]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {isLoading && <SplashScreen />}
    </>
  );
}
