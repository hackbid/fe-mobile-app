import { View, Text, Pressable, Image } from "react-native";
import { Foundation } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function BiddingList({ navigation }) {
  let dataCard = [];

  for (let a = 1; a <= 10; a++) {
    dataCard.push({
      name: "jam tangan antik",
      countEnd: "20 menit",
      startBid: 10000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zeitstempel_01.jpg/462px-Zeitstempel_01.jpg",
    });
  }

  return (
    <View>
      <View className=" bg-yellow-500 p-5 rounded-b-3xl flex flex-row">
        <View className="mx-2 mt-2 mr-3">
          <Foundation name="list" size={30} color="black" />
        </View>
        <View>
          <Text className="text-lg text-slate-700  font-bold">
            Today's auction
          </Text>
          <Text className=" text-3xl font-bold text-gray-700">
            05 Maret 2023
          </Text>
        </View>
      </View>
      <ScrollView className="m-2 mb-24" showsVerticalScrollIndicator={false}>
        {dataCard &&
          dataCard.map((e, i) => {
            return (
              <View className="bg-slate-200 rounded-lg  m-3" key={i}>
                <View className="flex flex-row">
                  <Image
                    className=" object-fill h-28 w-28 rounded-lg"
                    source={{
                      uri: e.image,
                    }}
                  />
                  <View className="m-2">
                    <Text className="font-bold text-red-600">Today</Text>

                    <Text className="font-semibold">Product : {e.name}</Text>
                    <Text className="font-semibold">
                      Count End :
                      <Text className="text-yellow-800 rounded-lg">
                        {e.countEnd}
                      </Text>
                    </Text>
                    <Text className="font-semibold">
                      Start Bidding :{" "}
                      <Text className="text-green-700">{e.startBid}</Text>{" "}
                    </Text>
                    <Pressable
                      className="w-1/2"
                      onPress={() => {
                        navigation.navigate("BiddingRoom", { roomId: { i } });
                      }}
                    >
                      <Text className="mt-3 bg-red-600 text-center text-white p-1 rounded-lg font-semibold">
                        Bid Now
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}
