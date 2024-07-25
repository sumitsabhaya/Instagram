import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../Screen/dashboard/Search";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import UserProfile from "../Screen/dashboard/UserProfile";
import Reel from "../Screen/dashboard/Reel";
import AddPost from "../Screen/dashboard/AddPost";
import Dashboard from "../Screen/dashboard/dashboard";

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#00000070",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="home" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reel"
        component={Reel}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="slow-motion-video" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
