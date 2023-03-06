import { Text, View, StyleSheet } from 'react-native';
import Hamburger from './Hamburger';

export default function HeaderList({ toggleBottomNavigationView }) {
    return (
        <View className=' bg-[#FFFDF5]0 p-6 rounded-b-3xl '>
            <View className='flex-row'>
                <Hamburger toggleBottomNavigationView={toggleBottomNavigationView} />
                <Text style={styles.auctionText} className='text-2xl'>
                    AUCTION LIST
                </Text>
            </View>
        </View>
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
