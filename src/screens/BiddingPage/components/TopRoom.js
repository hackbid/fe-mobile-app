import { useEffect } from 'react';
import { Pressable, Text, View, Dimensions } from 'react-native';
import Rupiah from '../../../helpers/Rupiah';
import CarouselShowInRoom from './CarouselShowInRoom';

const { width, height } = Dimensions.get('window');
export default function TopRoom({ item, navigation, winner }) {
    return (
        <View>
            <View
                className='bg-slate-300 overflow-hidden mt-3 mx-7 py-5 px-5'
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius: 10,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    height: height * 0.17,
                }}>
                <View className='relative z-20 -left-6 -top-5 h-36'>
                    <CarouselShowInRoom images={item?.images} />
                </View>
                <View className='relative z-50 -left-[150px] top-2 '>
                    <Pressable
                        onPress={() => {
                            navigation.navigate('ListPageStack', { screen: 'DetailItem', params: { id: item?.id, name: item?.name } });
                        }}>
                        <Text className='text-slate-50 text-xs font-semibold bg-[#07114f] px-4 py-2' style={{ borderRadius: 12 }}>
                            Detail item
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View
                className='text-slate-50 bg-yellow-300 py-1 mx-20 px-4'
                style={{
                    borderRadius: 15,
                    top: -50,
                    borderWidth: 2,
                    borderColor: 'white',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                <Text className='text-gray-700 text-[11px]'>Last Bid :</Text>
                <Text className='text-gray-700 text-center text-[20px] font-bold'>{Rupiah(winner.amountBid)}</Text>
                <Text className='text-gray-700 text-[11px] text-center'>({winner.username})</Text>
            </View>
        </View>
    );
}
