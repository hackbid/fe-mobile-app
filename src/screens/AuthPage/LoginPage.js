import { Button, Image, Pressable, StyleSheet, Switch, Dimensions, Text, TextInput, TouchableOpacity, View, StatusBar } from 'react-native';
import logo from '../../../assets/logotransparan.png';
import Form from 'react-native-form';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../store/actions/actionCreator';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export default function LoginPage({ navigation }) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const LoginHandler = () => {
        if (form.email == '') {
            return setErrMsg('Email is required');
        }
        if (form.password == '') {
            return setErrMsg('Password is required');
        }
        setIsLoading(true);
        dispatch(postLogin(form))
            .then((response) => {
                const { access_key, id, username, email } = response;
                AsyncStorage.setItem('access_key', access_key);
                AsyncStorage.setItem('id', `${id}`);
                AsyncStorage.setItem('username', username);
                AsyncStorage.setItem('email', email);
            })
            .then((_) => {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Login Success',
                    text2: 'Welcome to hackbid app',
                });
                navigation.navigate('MainApp');
            })
            .catch((error) => {
                return setErrMsg(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    useEffect(() => {
        setIsLoading(true);
        const checkAccessKey = async () => {
            const accessKey = await AsyncStorage.getItem('access_key');
            if (accessKey) {
                navigation.navigate('MainApp');
            }
            setIsLoading(false);
        };
        checkAccessKey();
    }, []);
    return (
        <>
            <StatusBar backgroundColor='#07114F' />
            <LoadingOverlay visible={isLoading} message='please wait' />
            <View style={{ flex: 1, height: height, width: width }} className='bg-yellow-50'>
                <Image source={logo} style={{ marginTop: width * 0.3 }} className='w-[70%] h-20 object-contain mx-auto' />
                <View className='flex-1 my-10 mx-5'>
                    <Text className='text-3xl font-bold'>Login</Text>
                    <Text className='text-sm mt-1 font-light text-gray-500'>Enter Your Data To Login</Text>
                    {errMsg && (
                        <View className='mt-5 bg-red-100  border border-red-400 py-2 rounded-md' role='alert'>
                            <Text className='text-red-700 text-center'>{errMsg}</Text>
                        </View>
                    )}
                    <Form className='mt-2'>
                        <TextInput
                            className='border-2 border-[#07114F]/50 h-10 bg-white rounded-md p-2 my-2'
                            placeholder='Email'
                            name='email'
                            value={form.email}
                            type='TextInput'
                            onChangeText={(text) => setForm({ ...form, email: text })}
                        />
                        <TextInput
                            className='border-2 border-[#07114F]/50 h-10 bg-white rounded-md p-2 my-2'
                            placeholder='Password'
                            name='password'
                            value={form.password}
                            type='TextInput'
                            secureTextEntry={true}
                            onChangeText={(text) => setForm({ ...form, password: text })}
                        />
                    </Form>
                    <TouchableOpacity className='my-2' onPress={LoginHandler}>
                        <View className='bg-[#07114f] rounded-xl'>
                            <Text className='text-white py-2 font-bold text-center'>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                    <View className='bg-gray-600/70 w-full mx-auto my-2 h-[1px]'></View>
                    <TouchableOpacity
                        className='my-2'
                        onPress={() => {
                            navigation.navigate('RegisterPage');
                        }}>
                        <View className='bg-[#FEC72C] rounded-xl'>
                            <Text className='text-302F2E py-2 font-bold text-center'>REGISTER</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
