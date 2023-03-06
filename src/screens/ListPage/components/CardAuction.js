import { StyleSheet, View, Text, useWindowDimensions, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TypeWriter from 'react-native-typewriter';

export default function CardAuction({ item, index }) {
    const { name, description, startDate, status, startPrice, multiple } = item;
    const navigation = useNavigation();
    const { height, width } = useWindowDimensions();
    return (
        <View
            className='m-2 rounded-md'
            style={{
                height: height / 4,
                width: width / 2.3,
                backgroundColor: '#F3F3F3',
                borderColor: 'rgba(7, 17, 79, 0.8)',
                borderWidth: 0.5,

                shadowColor: '#000',
                shadowOffset: {
                    width: 2,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
            }}>
            <TouchableNativeFeedback
                onPress={() => {
                    navigation.navigate('DetailItem', {
                        id: item.id,
                        name: item.name,
                    });
                }}>
                <View className='flex p-4'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-[14px] font-bold'>{name.slice(0, 10) + ' ...'} </Text>
                        {status === 'posted' ? (
                            <Text className='text-blue-600 text-[11px] font-bold'>{status.toUpperCase()}</Text>
                        ) : status === 'active' ? (
                            <Text className='text-green-700 text-[11px] font-bold'>{status.toUpperCase()}</Text>
                        ) : status === 'close' ? (
                            <Text className='text-red-700 text-[11px] font-bold'>{status.toUpperCase()}</Text>
                        ) : (
                            <Text className='text-gray-700 text-[11px] font-bold'>{status.toUpperCase()}</Text>
                        )}
                    </View>
                    <View className='flex flex-col justify-between mt-2' style={{ height: height * 0.16 }}>
                        <View>
                            <Text className='text-[11px]' numberOfLines={3}>
                                {description}
                            </Text>
                        </View>
                        <View className='px-2 py-1 rounded-md bg-[#FEC72C]/20 '>
                            <View className='flex-row justify-between'>
                                <Text className='text-gray-600 text-[10px]'>Start Bid</Text>
                                <Text className='text-gray-600 text-[10px]'>Multiply Bid</Text>
                            </View>
                            <View className='flex-row justify-between '>
                                <Text className='text-[#07114F] font-bold text-[11px]'>Rp.{startPrice}</Text>
                                <Text className='text-[#07114F] font-semibold text-[11px]'>Rp.{multiple}</Text>
                            </View>
                        </View>
                        <Text className='flex-end text-right' style={styles.textDate}>
                            {startDate}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: '10%',
        flex: 1,
    },
    headerText: {
        flex: 1,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: '700',
    },
    bottomText: {
        flex: 2,
    },
    textDescription: {
        flex: 4,
    },
    textDate: {
        fontWeight: '500',
    },
});
