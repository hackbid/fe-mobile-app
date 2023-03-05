import { FlatList, Text, useWindowDimensions, View } from "react-native";
import CardAuction from "./components/CardAuction";

import { data } from "./components/data";

export default function List() {
  return (
    <View className="flex items-center">
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
