import { useWindowDimensions, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Capitalize from "../../../helpers/Capitalize";

const MyAuctionCard = ({ item }) => {
  const { height, width } = useWindowDimensions();
  return (
    <View className="w-[100%] mx-auto my-1">
      <View>
        <View>
          <View
            className="rounded-lg bg-white shadow-lg flex-row justify-between items-center"
            style={{ height: height / 8 }}
          >
            <View className="px-6 ">
              <View className="flex-row items-center gap-x-2 mb-2">
                <Text className="text-gray-400 text-xs">{item.startDate}</Text>
                <Text className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-800 w-[screen]">
                  {Capitalize(item.status)}
                </Text>
              </View>
              <Text className="font-bold text-xl text-slate-600">
                {item.name}
              </Text>
              <Text className="text-gray-400 text-sm">{item.description}</Text>
            </View>
            <Ionicons
              name="card"
              size={height / 20}
              color={"grey"}
              style={{ padding: height / 100 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyAuctionCard;
