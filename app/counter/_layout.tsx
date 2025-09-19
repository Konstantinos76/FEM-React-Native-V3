import { Link, Stack } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import Fontisto from '@expo/vector-icons/Fontisto';

import { theme } from "../../theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Counter",
          headerRight: () => {
            return (
              <Link href="/counter/history" asChild>
                <Pressable hitSlop={20}>
                  <Text>History</Text>
                </Pressable>
              </Link>
            );
          },
        }}
      />
      <Stack.Screen
        name="history"
        options={{
          title: "History",
        }}
      />
    </Stack>
  );
}