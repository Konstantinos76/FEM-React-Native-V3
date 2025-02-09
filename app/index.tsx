// import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Text, ScrollView, FlatList } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  
  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {
          id: new Date().toTimeString(), 
          name: value, 
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };
  
  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
  };
  
  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp
          ? undefined
          : Date.now(),
        }      
      }
      return item;
    });
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty!</Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput 
            placeholder="E.g. Coffee" 
            style={styles.textInput}
            value={value}
            onChangeText={setValue}
            returnKeyType={"done"}
            onSubmitEditing={handleSubmit}
        />
      }
      renderItem={({item}) => (
        <ShoppingListItem 
          name={item.name} 
          onDelete={() => handleDelete(item.id)} 
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAtTimestamp)}
        />
      )}
    />
  );
}

function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    // If both items have been completed, compare their timestamps
    // This uses the form numbers.sort((a, b) => b - a) for descending order
    // When a positive number is returned, the item with the larger timestamp (more recent completion) comes first
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }
    // If only the first item has been completed
    // A positive number is returned
    // The first item should come after the second
    // The completed item goes under the uncompleted one
    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }
    // If only the second item has been completed
    // A negative number is returned
    // The first item should come before the second
     // The uncompleted item goes before the completed one
    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    // If both items are uncompleted, compare their lastUpdatedTimestamp
    // This uses the form numbers.sort((a, b) => b - a) for descending order
    // When a positive number is returned, the item with the larger timestamp (most recent update) comes first
    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 24,
  },
  contentContainerStyle: {
    paddingBottom: 24,
  },
  textInput: {
    backgroundColor: theme.colorWhite,
    borderColor: theme.colorLightGray,
    borderWidth: 2,
    padding: 12,
    margin: 12,
    fontSize: 16,
    borderRadius: 8,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding:20,
    marginVertical: 18,
  },
});
