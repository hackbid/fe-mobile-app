import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, StyleSheet } from 'react-native';
import Hamburger from './Hamburger';

export default function HeaderList({ toggleBottomNavigationView }) {
    return (
        <LinearGradient
            // Button Linear Gradient
            colors={['#FFAA04', '#FEC72C']}
            className='h-16 px-8 py-2 flex-row justify-between items-center rounded-b-3xl '>
            <View className='flex-row'>
                <Hamburger toggleBottomNavigationView={toggleBottomNavigationView} />
                <Text style={styles.auctionText} className='text-2xl'>
                    AUCTION LIST
                </Text>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    auctionText: {
        color: '#302F2E',
        fontWeight: '700',
        textAlign: 'center',
        flex: 1,
    },
});
