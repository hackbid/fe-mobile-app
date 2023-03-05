import { View, Text, Pressable } from "react-native";

export default function BiddingList({ navigation }) {
  return (
    <View>
      <View className=" bg-yellow-500 p-6 rounded-b-3xl">
        <View>
          <Text className="text-lg text-slate-700  font-bold">
            Today's auction
          </Text>
          <Text className=" text-lg">05 Maret 2023</Text>
        </View>
      </View>
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
