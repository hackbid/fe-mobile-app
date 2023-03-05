import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMutation } from '../../store/actions/actionCreator';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Mutation({ route, navigation }) {
    const { UserId } = route.params;
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.user.user);
    const [mutations, setMutations] = useState([]);
    useEffect(() => {
        dispatch(fetchMutation(UserId)).then((data) => {
            setMutations(data);
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <ImageBackground style={styles.card} source={require('../../../assets/mutationcard.png')}>
                <View className='relative -left-20 top-4'>
                    <Text className='text-lg font-bold'>{userLogin?.username}</Text>
                    <Text className='text-[15px]'>{userLogin?.balance}</Text>
                </View>
            </ImageBackground>
            <View className='w-[80%] mx-auto'>
                <Text className='text-lg text-center font-bold my-1'>Mutations</Text>
                {mutations.map((mutation) => {
                    return (
                        <View key={mutation?.id} className='flex-row gap-20 pl-10 py-5'>
                            <View className=''>
                                <Text>DD/MM/YY</Text>
                                {mutation?.status === 'credit' ? (
                                    <Text className='text-green-500 text-[15px] font-normal'>{mutation?.status}</Text>
                                ) : (
                                    <Text className='text-red-500 text-[15px] font-normal'>{mutation?.status}</Text>
                                )}
                            </View>
                            <View>
                                {mutation?.status === 'credit' ? (
                                    <Text className='text-green-500 text-[15px] font-normal'>+Rp. {mutation?.transaction}</Text>
                                ) : (
                                    <Text className='text-red-500 text-[15px] font-normal'>-Rp. {mutation?.transaction}</Text>
                                )}
                                <Text className='text-[15px]'>Rp. {mutation?.initialBalance}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: '#fefce8',
    },
    card: {
        height: height * 0.35,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
