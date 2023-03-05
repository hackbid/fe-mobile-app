import { Text, View, StyleSheet } from "react-native";

export default function HeaderList() {
  return (
    <View className=" bg-yellow-500 p-6 rounded-b-3xl">
      <View>
        <Text
          style={styles.auctionText}
          className="text-lg text-slate-700  font-bold"
        >
          AUCTION LIST
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  auctionText: {
    color: "#302F2E",
    fontWeight: "700",
    textAlign: "center",
  },
});
