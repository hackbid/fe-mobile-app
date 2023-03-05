import { FlatList, View } from "react-native";
import { data } from "./data";
import CardAuction from "./CardAuction";

export default function CardContainer({ children }) {
  return (
    <View className="flex items-center mt-20">
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
