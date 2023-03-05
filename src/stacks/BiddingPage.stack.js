//navigator config
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { BiddingList, BiddingRoom } from '../screens/BiddingPage/index';

export default function BiddingPage({ navigation, route }) {
    return (
        <Stack.Navigator screenOptions={{ headerTintColor: 'white', headerStyle: { backgroundColor: '#07114F' } }}>
            <Stack.Screen name='BiddingList' component={BiddingList} options={{ headerShown: false }} />
            <Stack.Screen name='BiddingRoom' component={BiddingRoom} options={{ title: 'Auction Room' }} />
        </Stack.Navigator>
    );
}
