import * as React from 'react';
import {Text, View, Image, Platform} from 'react-native';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import styles from '../../../Screens/Home/style/style'
import HomeStackScreen from '../../../Screens/Home';
import AccountsStackScreen from '../../../Screens/Accounts/index.tsx'
import GivingStackScreen from "../../../Screens/Giving/index";
import PaymentsStackScreen from "../../../Screens/Payments/index";
import CardsStackScreen from "../../../Screens/Cards/index";

import {BlurView} from '@react-native-community/blur';

export default function TabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          height: Platform.OS === "ios" ? 100 : 80,
          borderTopColor: '#666666',
          backgroundColor: Platform.OS === "ios" ? "transparent" : "#DA67B6",
        },
        tabBarComponent: (props) => (
          <BlurView style={styles.blurView} tint='dark' intensity={100} >
            <BottomTabBar {...props} />
          </BlurView>
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tapBarElements}>
              <Image
                source={require("../../../Assets/Images/home.png")}
                resizeMode="contain"
                style={{ tintColor: focused ? "#C81A7C" : "black" }}
              />
              <Text
                style={{ color: focused ? "#C81A7C" : "black", fontSize: 12 }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tapBarElements}>
              <Image
                source={require("../../../Assets/Images/accounts.png")}
                resizeMode="contain"
                style={{ tintColor: focused ? "#C81A7C" : "black" }}
              />
              <Text
                style={{ color: focused ? "#C81A7C" : "black", fontSize: 12 }}
              >
                Accounts
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Giving"
        component={GivingStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tapBarElements}>
              <Image
                source={require("../../../Assets/Images/giving.png")}
                resizeMode="contain"
                style={{ tintColor: focused ? "#C81A7C" : "black" }}
              />
              <Text
                style={{ color: focused ? "#C81A7C" : "black", fontSize: 12 }}
              >
                Giving
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tapBarElements}>
              <Image
                source={require("../../../Assets/Images/payment.png")}
                resizeMode="contain"
                style={{ tintColor: focused ? "#C81A7C" : "black" }}
              />
              <Text
                style={{ color: focused ? "#C81A7C" : "black", fontSize: 12 }}
              >
                Payments
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cards"
        component={CardsStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tapBarElements}>
              <Image
                source={require("../../../Assets/Images/cards.png")}
                resizeMode="contain"
                style={{ tintColor: focused ? "#C81A7C" : "black" }}
              />
              <Text
                style={{ color: focused ? "#C81A7C" : "black", fontSize: 12 }}
              >
                Cards
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
