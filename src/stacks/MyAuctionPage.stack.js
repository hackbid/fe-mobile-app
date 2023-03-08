//navigator config
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { MyAuction, PostItem } from '../screens/MyAuction/index';
export default function TransactionPageStack({ navigation, route }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#07114F' },
            }}>
            <Stack.Screen name='MyAuction' component={MyAuction} options={{ headerShown: true }} />
            <Stack.Screen name='PostItem' component={PostItem} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}
