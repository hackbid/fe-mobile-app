import {
  Image,
  Text,
  useWindowDimensions,
  View,
  StyleSheet,
} from "react-native";
import { flex } from "nativewind/dist/postcss/to-react-native/properties/flex";

export default function DetailItem({ route }) {
  const { item } = route.params;
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
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
        <Text style={styles.textDescription}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: "5%",
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
});
