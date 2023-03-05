import { View } from "react-native";

export default function Hamburger() {
  return (
    <View className="space-y-2 flex justify-center">
      <View className="w-8 h-1 bg-black"></View>
      <View className="w-8 h-1 bg-black"></View>
      <View className="w-8 h-1 bg-black"></View>
    </View>
  );
}
