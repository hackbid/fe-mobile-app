import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMyAuction } from "../../store/actions/actionCreator";
import MyAuctionCard from "./components/MyAuctionCard";

export default function MyAuction({ navigation, route }) {
  const { user } = useSelector((state) => state.user);
  const [auctionList, setAuctionList] = useState([]);
  const dispatch = useDispatch();

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    dispatch(getMyAuction(user.id)).then((res) => {
      console.log(res);
      setAuctionList(res);
    });
  }, []);

  return (
    <View>
      <View className="w-[90%] mx-auto mt-4">
        <Text className="text-2xl font-extrabold text-gray-700">
          My Auction
        </Text>
      </View>
      <View className="w-[90%] mx-auto mt-4">
        {auctionList.map((item) => {
          return <MyAuctionCard key={item.id} item={item} />;
        })}
      </View>
      <TouchableOpacity
        className="bg-blue-800 mx-1 p-3 px-4 rounded-lg my-2 w-[90%] mx-auto mt-4"
        onPress={() => {
          navigation.navigate("PostItem");
        }}
      >
        <Text className="text-center text-white">Add new Item</Text>
      </TouchableOpacity>
    </View>
  );
}
