import React from "react";
import { GraphCoin, Home, Login } from "../components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();

  const LogoTitle = ({ img }) => {
    return (
      <Image
        style={{ width: 30, height: 30, marginTop: 10, marginBottom: 10 }}
        source={{ uri: img }}
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ route }) => ({
          title: `Welcome ${route.params.name}`,
          headerBackVisible: false,
        })}
      />

      <Stack.Screen
        name="GraphCoin"
        component={GraphCoin}
        options={({ route }) => ({
          title: `${route.params.coin.id.toUpperCase()}`,
          /* headerBackVisible: false, */
          headerRight: (props) => (
            <LogoTitle {...props} img={route.params.image} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
