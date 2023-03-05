import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableNativeFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TypeWriter from "react-native-typewriter";

export default function CardAuction({ item, index }) {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();
  return (
    <View
      className="m-2 rounded-md"
      style={{
        height: height / 4,
        width: width / 2.3,
        backgroundColor: "#E5E5E5",
      }}
    >
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate("DetailItem", { item });
        }}
      >
        <View style={styles.container}>
          <View style={styles.headerText}>
            <Text style={styles.textTitle}>{item.name}</Text>
            <Text style={styles.textComingSoon}>COMING SOON </Text>
          </View>
          <View style={styles.bottomText}>
            <Text style={styles.textDescription}>
              {item.description.substring(0, 50)}...
            </Text>
            <Text style={styles.textDate} className="text-right">
              {item.date}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "10%",
    flex: 1,
  },
  headerText: {
    flex: 1,
  },
  textTitle: {
    fontWeight: "700",
  },
  textComingSoon: {
    fontWeight: "700",
    color: "#0F721F",
  },
  bottomText: {
    flex: 2,
  },
  textDescription: {
    flex: 4,
  },
  textDate: {
    flex: 1,
    fontWeight: "400",
  },
});
