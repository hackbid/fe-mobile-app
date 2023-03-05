//navigator config
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//importing screen
import { AccountPage, TopUpPage, MutationPage } from '../screens/AccountPage/index';

export default function AccountPageStack({ navigation, route }) {
    return (
        <Stack.Navigator screenOptions={{ headerTintColor: 'white', headerStyle: { backgroundColor: '#07114F' } }}>
            <Stack.Screen name='AccountPage' component={AccountPage} options={{ headerShown: false }} />
            <Stack.Screen name='TopUpPage' component={TopUpPage} options={({ route }) => ({ title: `Top Up for ${route.params.username}` })} />
            <Stack.Screen
                name='MutationPage'
                component={MutationPage}
                options={({ route }) => ({ title: `Mutation for ${route.params.username}` })}
            />
        </Stack.Navigator>
    );
}
