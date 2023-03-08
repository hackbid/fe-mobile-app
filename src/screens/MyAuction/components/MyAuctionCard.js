import { useWindowDimensions, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Capitalize from '../../../helpers/Capitalize';

const MyAuctionCard = ({ item }) => {
    const { height, width } = useWindowDimensions();
    return (
        <View className='w-[100%] mx-auto my-1'>
            <View>
                <View>
                    <View className='rounded-lg bg-white shadow-lg flex-row justify-between items-center' style={{ height: height / 8 }}>
                        <View className='px-6 w-full'>
                            <View className='flex-row justify-between'>
                                <Text className='font-bold text-xl text-slate-600'>{item.name}</Text>
                                <View className='flex-row items-center gap-x-2 mb-2'>
                                    <Text className='text-gray-400 text-xs'>{item.startDate}</Text>
                                    <Text className='inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-800 w-[screen]'>
                                        {Capitalize(item.status)}
                                    </Text>
                                </View>
                            </View>
                            <Text numberOfLines={3} className='text-gray-400 mt-2 text-sm'>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MyAuctionCard;
