import { Text, View, ScrollView, Dimensions, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategory, fetchUserLogin } from '../../store/actions/actionCreator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TypeWriter from 'react-native-typewriter';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function HomePage({ navigation }) {
    const categories = useSelector((state) => state.apps.categories);
    const userLogin = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkLogin = async () => {
            const UserId = await AsyncStorage.getItem('id');
            if (UserId) {
                dispatch(fetchCategory());
                dispatch(fetchUserLogin(UserId));
            } else {
                navigation.navigate('LoginPageStack');
            }
        };
        checkLogin();
    }, []);
    const product = [
        {
            id: 1,
            image: require('./banner/2.png'),
        },
        {
            id: 2,
            image: require('./banner/3.png'),
        },
        {
            id: 3,
            image: require('./banner/1.png'),
        },
        {
            id: 4,
            image: require('./banner/4.png'),
        },
    ];
    return (
        <ScrollView style={{ flex: 1, height: height, width: width }} className='bg-[#FFFDF5]'>
            <StatusBar backgroundColor={'#07114F'} />
            <ImageBackground source={require('../../../assets/banner.png')} style={{ width: width, height: height * 0.28 }} resizeMode='cover'>
                <View className='my-16 ml-10'>
                    <View className='flex flex-row'>
                        <Text className='text-2xl font-normal text-gray-100 bg-[#07114F] rounded-l-xl pl-3 pr-1'>hack</Text>
                        <Text className='text-3xl font-bold text-gray-900 bg-gray-100 rounded-r-xl pl-1 pr-3'>BID</Text>
                    </View>
                    <Text className='text-[15px] mx-2 my-1 font-light text-gray-900'>bidding everywhere</Text>
                </View>
            </ImageBackground>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('AccountPage');
                }}
                activeOpacity={0.9}
                style={styled.infoContainer}
                className='bg-white mx-auto rounded-2xl'>
                <View className='flex'>
                    <View className='flex-1'>
                        <Text className='text-[12px]'>Welcome Back,</Text>
                        <Text className='text-[15px] font-bold'>{userLogin?.username}</Text>
                    </View>
                    <View className='flex-initial flex-row items-center gap-2'>
                        <FontAwesome5 name='money-check' size={15} color='green' />
                        <Text className='font-semibold'>Rp. {userLogin?.balance}</Text>
                    </View>
                </View>
                <View>
                    <Image
                        style={styled.image}
                        source={{
                            uri: userLogin?.imageProfile,
                        }}
                    />
                </View>
            </TouchableOpacity>
            <FlatList
                className='relative -top-12'
                horizontal
                showsHorizontalScrollIndicator={false}
                data={product}
                keyExtractor={product.id}
                renderItem={({ item }) => {
                    return (
                        <View style={styled.banner}>
                            <Image source={item.image} style={{ width: width * 0.9, height: height * 0.22, marginHorizontal: 7, borderRadius: 10 }} />
                        </View>
                    );
                }}
            />
            <View className='relative -top-10 my-3 h-2 w-full mx-auto bg-gray-200/50' />
            <Text className='relative -top-9 mx-auto font-bold'>Categories</Text>
            <View style={styled.categoriesContainer} className='mx-auto'>
                {categories.length > 0 &&
                    categories.map((category) => {
                        return (
                            <View key={category.id} className='w-25 h-20 px-2 py-5 mb-10'>
                                <TouchableOpacity>
                                    <Image source={{ uri: category.imageUrl }} className='w-20 h-20 rounded-2xl' />
                                </TouchableOpacity>
                                <Text className='text-center text-[15px]'>{category.name}</Text>
                            </View>
                        );
                    })}
            </View>
        </ScrollView>
    );
}

const styled = StyleSheet.create({
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 20,
        height: height * 0.16,
        width: width * 0.7,
        position: 'relative',
        top: -height * 0.09,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 75,
    },
    categoriesContainer: {
        flex: 1,
        position: 'relative',
        top: -height * 0.05,
        width: width * 0.9,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    banner: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
});
