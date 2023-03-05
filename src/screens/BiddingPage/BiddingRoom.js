import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BiddingRoom({ route, navigation }) {
  const { roomId } = route.params;
  return (
    <View>
      <View
        className="bg-slate-300 mt-3 mx-7 py-5 px-5 h-32"
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View style={{ width: 120 }}>
          <Text
            className="text-gray-700 text-2xl font-bold"
            style={{ lineHeight: 35 }}
          >
            Image Carousel
          </Text>
        </View>
        <View>
          <Text
            className="text-slate-50 text-xs font-semibold bg-blue-800 px-4 py-2"
            style={{ borderRadius: 12 }}
          >
            Detail item
          </Text>
        </View>
      </View>
      <View
        className="text-slate-50 text-xs font-normal bg-yellow-300 py-3 mx-20 px-4"
        style={{
          borderRadius: 15,
          top: -40,
          borderWidth: 2,
          borderColor: "white",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text className="text-gray-700">Bid terakhir:</Text>
        <Text className="text-gray-700 text-center text-2xl py-1 font-bold">
          Rp. 25.000,-
        </Text>
        <Text className="text-gray-700 text-center">(mashayyik)</Text>
      </View>
      <ScrollView
        className="text-slate-50 text-xs font-normal bg-slate-200 py-2 mx-8 px-4 h-80"
        showsVerticalScrollIndicator={false}
        style={{ borderRadius: 15, overflow: "hidden", top: -30 }}
      >
        <View className="my-2">
          <Text className="text-slate-50 mb-2"> user 1</Text>
          <Text
            className="text-slate-50 bg-slate-400 py-3 px-3 w-60"
            style={{ borderRadius: 10 }}
          >
            isi chat yang dikirim user
          </Text>
        </View>
        <View className="my-2">
          <Text className="text-slate-50 mb-2"> user 1</Text>
          <Text
            className="text-slate-50 bg-slate-400 py-3 px-3 w-60"
            style={{ borderRadius: 10 }}
          >
            isi chat yang dikirim user
          </Text>
        </View>
        <View className="my-2">
          <Text className="text-slate-50 mb-2"> user 1</Text>
          <Text
            className="text-slate-50 bg-slate-400 py-3 px-3 w-60"
            style={{ borderRadius: 10 }}
          >
            isi chat yang dikirim user
          </Text>
        </View>
        <View className="my-2 self-end">
          <Text className="text-slate-50 mb-2 text-right"> user 1</Text>
          <Text
            className="text-slate-50 bg-blue-800 py-3 px-3 w-60 text-right"
            style={{ borderRadius: 10 }}
          >
            isi chat yang dikirim user
          </Text>
        </View>
        <View className="my-2">
          <Text className="text-slate-50 mb-2"> user 1</Text>
          <Text
            className="text-slate-50 bg-slate-400 py-3 px-3 w-60"
            style={{ borderRadius: 10 }}
          >
            isi chat yang dikirim user
          </Text>
        </View>
      </ScrollView>
      <View
        className="my-2 mx-auto "
        style={{ flexDirection: "row", top: -20 }}
      >
        <TextInput
          className="text-slate-300 font-semibold bg-white border-2 border-black py-1 px-3 w-4/6 rounded-xl"
          style={{ borderRadius: 5 }}
          placeholder={"masukan pesan"}
        />
        <Pressable className="bg-blue-800 mx-1 p-3 px-4 rounded-lg">
          <Ionicons
            name="arrow-forward-circle-outline"
            size={25}
            color="white"
          />
        </Pressable>
      </View>
      <View
        className="bg-yellow-400 w-5/6 p-3 mx-auto rounded-xl"
        style={{ top: -20 }}
      >
        <Text className="text-center font-bold text-lg text-gray-600">
          Request Bid
        </Text>
      </View>
    </View>
  );
}
