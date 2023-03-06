//navigator config
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();


import { List, DetailItem, PostItem } from '../screens/ListPage';
export default function ListPageStack({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#07114F" },
      }}
    >
      <Stack.Screen name='PostItem' component={PostItem} options={{ title: 'Post new Item' }} />
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailItem"
        component={DetailItem}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
}
