//navigator config
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//importing screen
import { HomePage } from '../screens/HomePage';

export default function HomePageStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
