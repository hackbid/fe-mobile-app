import { Dimensions, View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
export default function BiddingList({ navigation }) {
    let dataCard = [];

    for (let a = 1; a <= 10; a++) {
        dataCard.push({
            name: 'jam tangan antik',
            countEnd: '20 menit',
            startBid: 10000,
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Zeitstempel_01.jpg/462px-Zeitstempel_01.jpg',
        });
    }

    return (
        <View style={styles.container}>
            <View className=' bg-[#FFFDF5]0 rounded-b-3xl flex flex-row'>
                <View className='mx-2 mt-2 mr-3'>
                    <Foundation name='list' size={30} color='black' />
                </View>
                <View>
                    <Text className='text-lg text-slate-700  font-bold'>Today's auction</Text>
                    <Text className=' text-3xl font-bold text-gray-700'>05 Maret 2023</Text>
                </View>
            </View>
            <ScrollView className='m-2 mb-24' showsVerticalScrollIndicator={false}>
                {dataCard &&
                    dataCard.map((e, i) => {
                        return (
                            <View style={{ height: height / 5 }} className='bg-slate-200 rounded-lg  m-3' key={i}>
                                <View className='flex flex-row'>
                                    <Image
                                        style={{ width: width / 3, height: height / 5 }}
                                        className=' object-fill rounded-lg'
                                        source={{
                                            uri: e.image,
                                        }}
                                    />
                                    <View className='m-2'>
                                        <Text className='font-bold text-red-600'>Today</Text>

                                        <Text className='font-semibold'>Product : {e.name}</Text>
                                        <Text className='font-semibold'>
                                            Count End :<Text className='text-yellow-800 rounded-lg'>{e.countEnd}</Text>
                                        </Text>
                                        <Text className='font-semibold'>
                                            Start Bidding : <Text className='text-green-700'>{e.startBid}</Text>{' '}
                                        </Text>
                                        <Pressable
                                            className='w-1/2'
                                            onPress={() => {
                                                navigation.navigate('BiddingRoom', { roomId: { i } });
                                            }}>
                                            <Text className='mt-3 bg-red-600 text-center text-white p-1 rounded-lg font-semibold'>Bid Now</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFDF5',
        height: height,
        width: width,
    },
});
