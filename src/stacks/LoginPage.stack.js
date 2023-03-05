//navigator config
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
const Stack = createNativeStackNavigator();

//importing screen
import { IntroPage, LoginPage, RegisterPage } from '../screens/AuthPage';

export default function HomePageStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='LoginPage' component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen
                name='RegisterPage'
                component={RegisterPage}
                options={{ title: 'Register', headerTintColor: 'white', headerStyle: { backgroundColor: '#07114F' } }}
            />
        </Stack.Navigator>
    );
}
