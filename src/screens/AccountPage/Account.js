import { Text, View, StyleSheet, ImageBackground, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserLogin, postLogout } from '../../store/actions/actionCreator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Rupiah from '../../helpers/Rupiah';
import ModalWd from './ModalWd';
import { useFocusEffect } from '@react-navigation/native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function AccountPage({ navigation }) {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.user.user);

    const checkLogin = async () => {
        const UserId = await AsyncStorage.getItem('id');
        if (UserId) {
            dispatch(fetchUserLogin(UserId));
        } else {
            navigation.navigate('LoginPageStack');
        }
    };

    useFocusEffect(
        useCallback(() => {
            checkLogin();
        }, [])
    );

    const LogoutHandler = () => {
        dispatch(postLogout())
            .then((_) => {
                AsyncStorage.clear();
            })
            .then((_) => {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Logout Success',
                    text2: 'See you again',
                });
                navigation.navigate('LoginPageStack');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <ScrollView className='bg-[#F5F5F5]' style={styles.container}>
            <ModalWd modalVisible={modalVisible} setModalVisible={setModalVisible} user={userLogin} />
            <LinearGradient
                // Button Linear Gradient
                colors={['#07114F', '#2239C8']}
                className='h-20 px-8 py-2 flex-row justify-between items-center rounded-b-[60px] '>
                <View className='flex-row mx-auto justify-center items-center'>
                    <View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: userLogin?.imageProfile,
                            }}
                        />
                    </View>
                    <View className='ml-3'>
                        <Text className='text-white text-2xl font-bold'>{userLogin?.username}</Text>
                        <Text className='text-white text-md font-light'>detail of account</Text>
                    </View>
                </View>
            </LinearGradient>
            <Text style={styles.headText}>Balance Information</Text>
            <View className='bg-[#07114F] w-[80%] h-32 rounded-2xl mx-auto p-4 flex-row justify-around'>
                <View className='flex bg-[#FEC72C] justify-center items-center rounded-xl w-[45%]'>
                    <Text className='text-[10px]'>Your Balance</Text>
                    <Text className='text-[15px] font-bold'>{Rupiah(userLogin?.balance)}</Text>
                </View>
                <View className='flex justify-center items-center w-[45%] gap-2'>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('TopUpPage', {
                                UserId: userLogin?.id,
                                username: userLogin?.username,
                            });
                        }}>
                        <Text className='text-[15px] bg-[#319302] w-32 px-2 py-0.5 rounded-lg text-center font-bold text-white'>TOP UP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text className='text-[15px] bg-[#FFA800] w-32 px-2 py-0.5 rounded-lg text-center font-bold text-white'>WITHDRAW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('MutationPage', {
                                UserId: userLogin?.id,
                                username: userLogin?.username,
                            });
                        }}>
                        <Text className='text-[15px] bg-[#D863DB] w-32 px-2 py-0.5 rounded-lg text-center font-bold text-white'>MUTATION</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className=' my-3 h-2 w-full mx-auto bg-gray-200/50' />
            <Text style={styles.headText}>Personal Information</Text>
            <View className='w-[80%] gap-2 mt-2 mx-auto'>
                <View className='bg-gray-200/50 flex-row justify-between px-4 py-3 rounded-lg my-2 items-center'>
                    <Text className='text-[#1D1D1D] text-[12px] font-light'>username :</Text>
                    <Text className='text-[#1D1D1D] text-md font-bold'>{userLogin?.username}</Text>
                </View>
                <View className='bg-gray-200/50 flex-row justify-between px-4 py-3 rounded-lg my-2 items-center'>
                    <Text className='text-[#1D1D1D] text-[12px] font-light'>email :</Text>
                    <Text className='text-[#1D1D1D] text-md font-bold'>{userLogin?.email}</Text>
                </View>
                <View className='bg-gray-200/50 flex-row justify-between px-4 py-3 rounded-lg my-2 items-center'>
                    <Text className='text-[#1D1D1D] text-[12px] font-light'>Full Name :</Text>
                    <Text className='text-[#1D1D1D] text-md font-bold'>{userLogin?.fullName}</Text>
                </View>
                <View className='bg-gray-200/50 flex-row justify-between px-4 py-3 rounded-lg my-2 items-center'>
                    <Text className='text-[#1D1D1D] text-[12px] font-light'>Phone Number:</Text>
                    <Text className='text-[#1D1D1D] text-md font-bold'>{userLogin?.phone}</Text>
                </View>
            </View>
            <View className=' my-3 h-2 w-full mx-auto bg-gray-200/50' />
            <Text style={styles.headText}>Address Information</Text>
            <View className='w-[80%] h-fit mx-auto bg-gray-200/50 px-4 py-3 rounded-lg my-2'>
                <Text className='text-[#1D1D1D] text-md font-bold'>{userLogin?.fullName}</Text>
                <Text className='text-[#1D1D1D] text-[12px] font-light'>
                    {userLogin?.city_id} - {userLogin?.address}
                </Text>
            </View>
            <View className=' my-3 h-2 w-full mx-auto bg-gray-200/50' />
            <View className='flex-row justify-center gap-2 py-5'>
                <TouchableOpacity>
                    <Text className='text-[15px] bg-[#319302] w-32 px-2 py-2 rounded-lg text-center font-bold text-white mx-auto'>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={LogoutHandler}>
                    <Text className='text-[15px] bg-[#E13636] w-32 px-2 py-2 rounded-lg text-center font-bold text-white mx-auto'>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        paddingBottom: 20,
    },
    banner: {
        width: width,
        height: height * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 75,
    },
    headText: {
        marginVertical: 10,
        fontSize: 18,
        color: '#07114F',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
