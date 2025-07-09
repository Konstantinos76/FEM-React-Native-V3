import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useState } from "react";

export default function CounterScreen() {
  const [secondsElapsed, setsecondsElapsed] = useState(0);
  
  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      console.log("Permission: ", result);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I am a notification from your app!"
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 5,
        },
      });
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Unable to schedule notification",
          "Enable the notification permission for this app in settings",
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Schedule Notification</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Counter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colorBlack,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    letterSpacing: 2,
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  text: {
    fontSize: 24,
  },
});
