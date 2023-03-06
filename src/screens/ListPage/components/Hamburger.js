import { TouchableOpacity, View } from 'react-native';

export default function Hamburger({ toggleBottomNavigationView }) {
    return (
        <TouchableOpacity onPress={toggleBottomNavigationView} className='space-y-2 flex justify-center'>
            <View className='w-8 h-1 bg-black'></View>
            <View className='w-8 h-1 bg-black'></View>
            <View className='w-8 h-1 bg-black'></View>
        </TouchableOpacity>
    );
}
