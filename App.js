import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppRegistry } from 'react-native';
//importing Stacks
import {
    HomePageStack,
    LoginPageStack,
    AccountPageStack,
    BiddingPageStack,
    ListPageStack,
    TransactionPageStack,
    MyAuctionPageStack,
} from './src/stacks/index';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store';
import Toast from 'react-native-toast-message';
import { fetchItems, fetchItemsToday } from './src/store/actions/actionCreator';
import { useEffect } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function MainApp() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let iconColor = focused ? '#FEC72C' : 'white';
                    if (route.name === 'HomePageStack') {
                        iconName = 'home';
                    }
                    if (route.name === 'BiddingPageStack') {
                        iconName = 'today';
                    }
                    if (route.name === 'ListPageStack') {
                        iconName = 'ios-list-circle';
                    }
                    if (route.name === 'TransactionPageStack') {
                        iconName = 'cart';
                    }
                    if (route.name === 'MyAuctionPageStack') {
                        iconName = 'cart';
                    }
                    if (route.name === 'AccountPageStack') {
                        iconName = 'ios-person';
                    }
                    return <Ionicons name={iconName} size={25} color={iconColor} />;
                },
                tabBarInactiveTintColor: 'white',
                headerShown: false,
                tabBarActiveTintColor: '#FEC72C',
                tabBarStyle: {
                    backgroundColor: '#07114F',
                },
            })}>
            <Tab.Screen name='HomePageStack' component={HomePageStack} options={{ title: 'HOME' }} />
            <Tab.Screen name='BiddingPageStack' component={BiddingPageStack} options={{ title: 'TODAY' }} />
            <Tab.Screen name='ListPageStack' component={ListPageStack} options={{ title: 'AUCTION' }} />
            <Tab.Screen name='TransactionPageStack' component={TransactionPageStack} options={{ title: 'CART' }} />
            <Tab.Screen name='MyAuctionPageStack' component={MyAuctionPageStack} options={{ title: 'MY AUCTION' }} />
            <Tab.Screen name='AccountPageStack' component={AccountPageStack} options={{ title: 'ACCOUNT' }} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name='LoginPageStack' component={LoginPageStack} options={{ headerShown: false }} />
                        <Stack.Screen name='MainApp' component={MainApp} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
                <Toast />
            </SafeAreaView>
        </Provider>
    );
}
AppRegistry.registerComponent('App', () => App);
