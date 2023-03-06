import {
    Image,
    Button,
    Dimensions,
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StatusBar,
} from 'react-native';
import logo from '../../../assets/logotransparan.png';
import Form from 'react-native-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import { fetchProvince, fetchProvinceId } from '../../store/actions/actionCreator';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function RegisterPage({ navigation }) {
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const dispatch = useDispatch();
    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);
    useEffect(() => {
        dispatch(fetchProvince()).then((res) => {
            setProvince(res);
        });
    }, []);

    const [form, setForm] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        province_id: '',
        city_id: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        if (form.province_id !== '') {
            dispatch(fetchProvinceId(form.province_id)).then((res) => {
                setCity(res);
            });
        }
    }, [form.province_id]);

    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const registerHandler = () => {
        if (form.username == '') {
            return setErrMsg('Username is required');
        }
        if (form.fullName == '') {
            return setErrMsg('Fullname is required');
        }
        if (form.email == '') {
            return setErrMsg('Email is required');
        }
        if (form.password == '') {
            return setErrMsg('Password is required');
        }
        if (form.city_id == '') {
            return setErrMsg('City is required');
        }
        if (form.address == '') {
            return setErrMsg('Address is required');
        }
        if (form.phone == '') {
            return setErrMsg('Phone is required');
        }
        if (image == null) {
            return setErrMsg('Image is required');
        }
        const formData = new FormData();
        formData.append('profileImage', {
            name: new Date() + '_Profile',
            uri: image,
            type: 'image/jpg',
        });
        formData.append('username', form.username);
        formData.append('fullName', form.fullName);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('city_id', form.city_id);
        formData.append('address', form.address);
        formData.append('phone', form.phone);
        setIsLoading(true);
        axios({
            method: 'post',
            url: 'http://192.168.1.5:4000/users/register',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Register Success',
                    text2: 'Please Login to Continue',
                });
                navigation.navigate('LoginPage');
            })
            .catch((err) => {
                setErrMsg(err.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <StatusBar backgroundColor={'#07114F'} />
            <View className='flex-1 bg-[#FFFDF5]'>
                <LoadingOverlay visible={isLoading} message='Uploading ...' />
                <ScrollView className='flex-1 mx-3' showsVerticalScrollIndicator={false}>
                    <Image source={logo} className='w-[70%] h-20 object-contain mx-auto mt-5' />
                    <View className='flex-1 my-2 mx-2'>
                        <Text className='text-3xl font-bold'>Register</Text>
                        <Text className='text-sm mt-1 font-light text-gray-500'>Complete your Data To Register</Text>
                        {errMsg && (
                            <Pressable onPress={() => setErrMsg(null)} className='mt-5 bg-red-100 border border-red-400 py-2 rounded' role='alert'>
                                <Text className='text-red-700 text-center'>{errMsg}</Text>
                            </Pressable>
                        )}
                        <Form type='multipart/form-data' className='mt-2'>
                            <TextInput
                                className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                                placeholder='Username'
                                name='username'
                                value={form.username}
                                type='TextInput'
                                onChangeText={(text) => setForm({ ...form, username: text })}
                            />
                            <TextInput
                                className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                                placeholder='Full Name'
                                name='fullName'
                                value={form.fullName}
                                type='TextInput'
                                onChangeText={(text) => setForm({ ...form, fullName: text })}
                            />
                            <TextInput
                                className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                                placeholder='Email'
                                name='email'
                                value={form.email}
                                type='TextInput'
                                onChangeText={(text) => setForm({ ...form, email: text })}
                            />
                            <TextInput
                                className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                                placeholder='Password'
                                name='password'
                                value={form.password}
                                type='TextInput'
                                secureTextEntry={true}
                                onChangeText={(text) => setForm({ ...form, password: text })}
                            />
                            <TextInput
                                className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                                placeholder='Phone'
                                name='phone'
                                value={form.phone}
                                type='TextInput'
                                onChangeText={(text) => setForm({ ...form, phone: text })}
                            />
                            <View className='bg-white border-2 border-[#07114f]/50 rounded-md my-2'>
                                <Picker
                                    selectedValue={form.province_id}
                                    onValueChange={(itemValue, itemIndex) => setForm({ ...form, province_id: itemValue })}>
                                    <Picker.Item
                                        style={{ fontSize: 14, justifyContent: 'center', height: '100%', color: 'gray' }}
                                        label='Select Province'
                                        value=''
                                    />
                                    {province.map((item, i) => {
                                        return <Picker.Item key={i} label={item.province} value={item.province_id} />;
                                    })}
                                </Picker>
                            </View>
                            {form.province_id !== '' && (
                                <View className='bg-white border-2 border-[#07114f]/50 rounded-md my-2'>
                                    <Picker
                                        selectedValue={form.city_id}
                                        onValueChange={(itemValue, itemIndex) => setForm({ ...form, city_id: itemValue })}>
                                        <Picker.Item
                                            style={{ fontSize: 14, justifyContent: 'center', height: '100%', color: 'gray' }}
                                            label='Select Province'
                                            value=''
                                        />
                                        {city.length > 0 &&
                                            city.map((item, i) => {
                                                return <Picker.Item key={item.city_id} label={item.city_name} value={item.city_id} />;
                                            })}
                                    </Picker>
                                </View>
                            )}
                            <TextInput
                                className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                                placeholder='Comlpete Address'
                                name='address'
                                value={form.address}
                                type='TextInput'
                                onChangeText={(text) => setForm({ ...form, address: text })}
                            />

                            <View className='my-2'>
                                {image ? (
                                    <View>
                                        <Text className='text-sm my-1 font-light text-center text-gray-500'>Your Uploaded Photo Profile</Text>
                                        <Image source={{ uri: image }} className='w-full mx-auto' style={{ width: 200, height: 200 }} />
                                    </View>
                                ) : (
                                    <Button title='UPLOAD YOUR PROFILE PICTURE' onPress={pickImage} color='#FFC700' />
                                )}
                            </View>
                            <TouchableOpacity
                                className='bg-[#07114F] rounded-md p-2 text-[15px] my-2'
                                onPress={(e) => registerHandler(e)}
                                type='submit'>
                                <Text className='text-center font-bold text-white'>REGISTER</Text>
                            </TouchableOpacity>
                        </Form>
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
