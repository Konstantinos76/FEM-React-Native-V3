import { Link, Stack } from "expo-router";
import { Pressable, Text } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
                                <Pressable hitSlop={40}>
                                    <FontAwesome name="history" size={24} color={theme.colorGray} />
                                </Pressable>
                            </Link>
                        )
                    },
                }}
            />
            <Stack.Screen
                name="history"
                options={{
                    title: "History"
                }}
            />
        </Stack>
    )
}