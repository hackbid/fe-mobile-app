import { Text, View } from "react-native";

export default function DetailItem({ route }) {
  const { item } = route.params;
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
}
