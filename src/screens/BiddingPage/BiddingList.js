import { View, Text, Pressable } from "react-native";

export default function BiddingList({ navigation }) {
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate("BiddingRoom", { roomId: 1 });
        }}
      >
        <Text>Ini list</Text>
      </Pressable>
    </View>
  );
}
