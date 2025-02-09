import { View, StyleSheet, Text, TouchableOpacity, Alert, Pressable } from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from '@expo/vector-icons/Entypo';

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete:() => void;
  onToggleComplete:() => void;
};

export function ShoppingListItem({ name, isCompleted, onDelete, onToggleComplete }: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => onDelete(),
          style: "destructive",
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
    );
  };
  return (
    <Pressable
      onPress={onToggleComplete}
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedItemContainer : undefined,
      ]}
    >
      <View style={styles.checkRow}>
        <Entypo 
          name={isCompleted ? "check" : "circle"} 
          size={24} 
          color={isCompleted ? theme.colorGray : theme.colorCerulean} />
        <Text
          numberOfLines={1}
          style={[
            styles.itemText,
            isCompleted ? styles.completedItemText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={handleDelete}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGray : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completedItemContainer: {
    backgroundColor: theme.colorLightGray,
    borderBottomColor: theme.colorGray,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
    flex: 1,
  },
  completedItemText: {
    textDecorationLine: "line-through",
    color: theme.colorGray,
  },
  checkRow: {
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  }
});
