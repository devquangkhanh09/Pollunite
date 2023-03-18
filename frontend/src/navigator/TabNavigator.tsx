import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationOptions,
} from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventScreen from "../screens/EventScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReportScreen from "../screens/ReportScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TabNavigatorParamList } from "./types";
const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();
const Stack = createNativeStackNavigator();

const tabOptions: MaterialBottomTabNavigationOptions = {
  tabBarColor: "#1D192B",
};
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      activeColor="#1D192B"
      inactiveColor="#1d192b25"
      barStyle={{ backgroundColor: "#E8DEF8" }}
      screenOptions={tabOptions}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#1d192b25",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarLabel: "Events",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="calendar" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarLabel: "Report",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="alarm-plus" color={color} size={26} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
