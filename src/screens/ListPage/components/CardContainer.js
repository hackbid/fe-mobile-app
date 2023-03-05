import { FlatList, View } from "react-native";
import { data } from "./data";
import CardAuction from "./CardAuction";

export default function CardContainer({}) {
  return (
    <View className="flex items-center my-20">
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => {
          return <CardAuction item={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
