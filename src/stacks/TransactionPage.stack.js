//navigator config
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//importing screens
import { TransactionPage } from '../screens/TransactionPage/index';

export default function TransactionPageStack({ navigation, route }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#07114F' },
            }}>
            <Stack.Screen name='TransactionPage' component={TransactionPage} options={{ headerShown: true, title: 'Transaction' }} />
        </Stack.Navigator>
    );
}
