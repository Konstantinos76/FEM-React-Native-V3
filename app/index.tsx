// import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, Text, ScrollView, FlatList } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  
  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {id: new Date().toTimeString(), name: value},
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };
  
  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
  } 

  return (
    <FlatList
      data={shoppingList}
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
        />
      )}
    />
  );
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
