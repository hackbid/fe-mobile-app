import {
  Image,
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Screen } from "react-native-screens";
import TypeWriter from "react-native-typewriter";

const { height, width } = Dimensions.get("window");
export default function DetailItem({ route }) {
  const { item } = route.params;
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ScrollView className="mb-[30%]" showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: item.imageUrl }}
          style={{
            width: width * 0.9,
            aspectRatio: 1,
            backgroundColor: "black",
            marginTop: 20,
            marginRight: 30,
            borderRadius: 20,
          }}
        />
        <Text style={styles.textName}>
          {item.name} #00{item.id}
        </Text>
        <View>
          <Text style={styles.textInfo}>Product Info</Text>
          <Text className="italic" style={styles.textDescription}>
            {item.description}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View className=" bg-[#07114f] py-2 rounded-2xl flex items-center text-white mt-4">
          <Text className="font-bold text-white text-xl">
            Place Your Bid At
          </Text>
          <TypeWriter typing={1}>
            <Text className="text-white my-3">{item.date}</Text>
          </TypeWriter>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "5%",
    height: height * 0.9,
  },
  textName: {
    fontWeight: "900",
    fontSize: 20,
    marginVertical: 20,
  },
  textInfo: {
    fontWeight: "500",
    fontSize: 20,
  },
  textDescription: {
    fontWeight: "300",
    marginTop: 15,
    color: "#302F2E",
  },
  footer: {
    width: width * 0.9,
    height: height * 0.1,
    borderRadius: 30,
    position: "absolute",
    bottom: "8%",
  },
});
