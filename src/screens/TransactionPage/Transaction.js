import { View, Text, ScrollView, Image, Pressable } from "react-native";

export default function Transaction() {
  let data = [];
  for (let a = 0; a < 10; a++) {
    data.push({
      name: "Sutarjo",
      category: "Art",
      resi: "WEX23i64957736t52789",
      noted: "Press the recipe button when you received the item",
      priceBid: 300000,
      deliveriCost: 65000,
    });
  }
  return (
    <ScrollView className="bg-slate-200">
      {data.map((e, index) => {
        return (
          <View className="my-2 bg-white p-2 m-2 rounded-lg" key={index}>
            <View className="flex flex-row ">
              <Text className="font-bold text-xl text-slate-600 flex-1">
                Nama Seller
              </Text>
              <Text className="flex-1 text-lg text-right w-1/5 px-2 text-red-500 font-bold rounded-lg">
                Art
              </Text>
            </View>
            <View className="flex flex-row py-2">
              <Image
                className="object-fill h-20 w-20 rounded-md border-2"
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zeitstempel_01.jpg/462px-Zeitstempel_01.jpg",
                }}
              />
              <View className="px-2">
                <Text className="font-bold text-gray-800 text-lg">
                  Jam Tangan Jadul Antik
                </Text>
                <Text>Your Resi : WEX23i64957736t52789</Text>
                <Text className="font-semibold text-gray-500">Note :</Text>
                <Text className="font-semibold text-gray-500">
                  Press the recipe button when you received the item
                </Text>
              </View>
            </View>
            <View>
              <Text className="font-bold text-center text-gray-800">Total</Text>
              <View className=" border-b border-t border-slate-300">
                <Text className="text-right">Price Bid : Rp 300.000</Text>
                <Text className="text-right">Delivery Cost : Rp 65.000 </Text>
              </View>
              <View>
                <Text className="text-right font-bold">
                  Summary : <Text className="text-red-600">Rp 365.000</Text>
                </Text>
              </View>
            </View>
            <Pressable className="bg-yellow-500 w-1/2 mx-auto rounded-lg p-2 mt-2">
              <Text className="text-center font-bold text-white">
                Receive Confirmation
              </Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}
