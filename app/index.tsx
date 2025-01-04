// import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, ScrollView } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { useState } from "react";

const initilalList = [
  {id: '1', name: 'Coffee'},
  {id: '2', name: 'Tea'},
  {id: '3', name: 'Sugar'},
  {id: '4', name: 'Cheese'},
];

export default function App() {
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState(initilalList);
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

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
      stickyHeaderIndices={[0]}
    >
      <TextInput 
        placeholder="E.g. Coffee" 
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        returnKeyType={"done"}
        onSubmitEditing={handleSubmit}
      />
      {shoppingList.map((item) => (
        <ShoppingListItem key={item.id} name={item.name}/>
      ))}
    </ScrollView>
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
  }
});
