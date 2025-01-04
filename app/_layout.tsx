import { Tabs } from "expo-router";
import { theme } from "../theme";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function Layout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: theme.colorCerulean}}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Shoping List",
          tabBarIcon: ({color, size}) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}
        />
      <Tabs.Screen 
        name="counter" 
        options={{ 
          title: "Counter",
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="clockcircle" size={size} color={color} />
          ),
        }} 
        />
      <Tabs.Screen 
        name="idea" 
        options={{ 
          title: "Idea" ,
          tabBarIcon: ({color, size}) => (
            <Entypo name="light-bulb" size={size} color={color} />
          ),
        }} 
        />
    </Tabs>
  );
}
