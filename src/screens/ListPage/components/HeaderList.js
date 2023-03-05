import { Text, View, StyleSheet } from "react-native";
import Hamburger from "./Hamburger";

export default function HeaderList() {
  return (
    <View className=" bg-yellow-500 p-6 rounded-b-3xl ">
      <View className="flex-row">
        <Hamburger />
        <Text style={styles.auctionText} className="text-2xl">
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
    flex: 1,
  },
});
