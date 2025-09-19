import { Text, View, StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { PersistedCountdownState, countdownStorageKey } from "./"; 
import { getFromStorage} from "../../utils/storage";
import { format } from "date-fns";
import { theme } from "../../theme";

const fullDateFormat = "LLL d yyyy, h:mm aaa";

export default function HistoryScreen() {
  const [countdownState, setCountdownState] = useState<PersistedCountdownState>();

  useEffect(() => {
      const fetchCountdown = async () => {
        const data = await getFromStorage(countdownStorageKey);
        setCountdownState(data);
      };
      fetchCountdown();
    }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainer}
      data = {countdownState?.completedAtTimestamps}
      renderItem={props => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>{format(props.item, fullDateFormat)}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>No History yet!</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
   marginTop: 12,
  },
  listItem: {
    backgroundColor: theme.colorLightGray,
    marginHorizontal: 8,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 18,
  }, 
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 18,
  },
  text: {
    fontSize: 24,
  },
});
