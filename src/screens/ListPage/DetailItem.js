import { useEffect, useState } from 'react';
import { Image, Text, useWindowDimensions, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import CarouselShow from './components/Carousel';
import { useDispatch } from 'react-redux';
import { fetchItemById } from '../../store/actions/actionCreator';
import Rupiah from '../../helpers/Rupiah';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
const { height, width } = Dimensions.get('window');
export default function DetailItem({ route }) {
    const { id, name } = route.params;
    const dispatch = useDispatch();
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    console.log(item);
    useEffect(() => {
        dispatch(fetchItemById(id))
            .then((res) => {
                setItem(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {isLoading ? (
                <LoadingOverlay visible={isLoading} message='fetching data' />
            ) : (
                <>
                    <View className='' style={{ height: height * 0.3, width: width }}>
                        <CarouselShow images={item.images} />
                    </View>
                    <LinearGradient
                        // Button Linear Gradient
                        colors={['#FFAA04', '#FEC72C']}
                        className='h-16 px-8 py-2 flex-row justify-between items-center'>
                        <View>
                            <Text className='text-[#1D1D1D] text-[14px]'>Start Bid Price</Text>
                            <Text className='text-[#1D1D1D] font-bold text-[18px]'>{Rupiah(item?.startPrice)}</Text>
                        </View>
                        <View className='items-end'>
                            <Text className='text-[#1D1D1D] text-[14px]'>Date</Text>
                            <Text className='text-[#1D1D1D] font-bold text-[18px]'>{item?.startDate}</Text>
                        </View>
                    </LinearGradient>
                    <View className='w-[85%]  mt-5 mx-auto'>
                        <Text className='text-[#1D1D1D] font-semibold text-[22px]'>{item?.name}</Text>
                        <View className='flex-row gap-1 items-center'>
                            <Text className='text-[#1D1D1D] font-light italic text-[14px]'>Posted by:</Text>
                            <Text className='text-[#1D1D1D] font-semibold italic text-[14px]'>{item?.seller.username}</Text>
                        </View>
                    </View>
                    <View className='w-[85%] mt-2 mx-auto bg-[#EAEAEA] p-3 rounded-lg'>
                        <View className='mb-2'>
                            <Text className='text-[#1D1D1D] text-[15px] font-semibold'>Catogory</Text>
                            <Text className='text-[#1D1D1D] font-light text-[15px]'>TEST TEST</Text>
                        </View>
                        <Text className='text-[#1D1D1D] text-[15px] font-semibold'>Description</Text>
                        <Text className='text-[#1D1D1D] font-light text-[15px]'>
                            {item?.description} {item?.description}
                        </Text>
                    </View>
                    <View className='h-1 bg-[#E2E2E2] my-4' />
                    <View className='mx-auto w-[40%] mb-4'>
                        <Text className='text-[#1D1D1D] text-[18px] text-center font-bold'>Bidding Session</Text>
                        <View className='flex-row justify-center'>
                            <View className='items-center mt-1 mx-1 bg-[#26CD2D] p-2 rounded-lg'>
                                <Text className='text-[15px] text-[#F5F5F5] '>Start Hour</Text>
                                <Text className='text-white font-extrabold text-[25px]'>{item?.startHour}:00</Text>
                            </View>
                            <View className='items-center mt-1 mx-1 bg-[#E13636] p-2 rounded-lg'>
                                <Text className='text-[15px] text-[#F5F5F5] '>End Hour</Text>
                                <Text className='text-white font-extrabold text-[25px]'>{item?.endHour}:00</Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: '#F5F5F5',
    },
    textName: {
        fontWeight: '900',
        fontSize: 20,
        marginVertical: 20,
    },
    textInfo: {
        fontWeight: '500',
        fontSize: 20,
    },
    textDescription: {
        fontWeight: '300',
        marginTop: 15,
        color: '#302F2E',
    },
    footer: {
        width: width * 0.9,
        height: height * 0.1,
        borderRadius: 30,
        position: 'absolute',
        bottom: '8%',
    },
});
