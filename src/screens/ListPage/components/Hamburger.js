import { TouchableOpacity, View } from 'react-native';

export default function Hamburger({ toggleBottomNavigationView }) {
    return (
        <TouchableOpacity onPress={toggleBottomNavigationView} className='space-y-1 flex justify-center'>
            <View className='w-8 h-1 bg-[#07114F]'></View>
            <View className='w-8 h-1 bg-[#07114F]'></View>
            <View className='w-8 h-1 bg-[#07114F]'></View>
        </TouchableOpacity>
    );
}
