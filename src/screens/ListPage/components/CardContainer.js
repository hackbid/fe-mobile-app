import { FlatList, View } from "react-native";
import { data } from "./data";
import CardAuction from "./CardAuction";

export default function CardContainer({}) {
  return (
    <View className="flex items-center mb-20 mt-10">
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => {
          return <CardAuction item={item} />;
        }}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
