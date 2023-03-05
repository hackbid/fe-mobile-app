import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategory } from '../../store/actions/actionCreator';
import * as ImagePicker from 'expo-image-picker';
import NumericInput from 'react-native-numeric-input';
const { width, height } = Dimensions.get('window');
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import axios from 'axios';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';

export default function PostItem() {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.user.user);
    const categories = useSelector((state) => state.apps.categories);
    const [subCategories, setSubCategories] = useState([]);
    const [form, setForm] = useState({
        name: '',
        categoryId: '',
        SubCategoryId: '',
        description: '',
        startPrice: '',
        multiple: '',
        startDate: '',
        startHour: 0,
        endHour: '',
        weight: '',
    });
    useEffect(() => {
        dispatch(fetchSubCategory(form.categoryId))
            .then((res) => {
                setSubCategories(res);
            })
            .catch((err) => {
                setSubCategories([]);
            });
    }, [form.categoryId]);

    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const [images, setImages] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            const uploaded = result.assets?.map((item) => item.uri);
            setImages(uploaded);
        }
    };
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const postHandler = () => {
        if (form.name == '') {
            return setErrMsg('Name is required');
        }
        if (form.SubCategoryId == '') {
            return setErrMsg('SubCategory is required');
        }
        if (form.startPrice == '') {
            return setErrMsg('Start Price is required');
        }
        if (form.multiple == '') {
            return setErrMsg('Multiple is required');
        }
        if (date <= new Date()) {
            return setErrMsg('Start Date must be greater than today');
        }
        if (form.startHour == '') {
            return setErrMsg('Start Hour is required');
        }
        if (form.endHour <= form.startHour) {
            return setErrMsg('End Hour must be greater than Start Hour');
        }
        if (form.endHour == '') {
            return setErrMsg('End Hour is required');
        }
        if (form.weight == '') {
            return setErrMsg('Weight is required');
        }
        if (images == null) {
            return setErrMsg('Image is required');
        }
        setIsLoading(true);
        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append('images', {
                name: new Date() + `_Image_${index}`,
                uri: image,
                type: 'image/jpg',
            });
        });
        formData.append('name', form.name);
        formData.append('SubCategoryId', form.SubCategoryId);
        formData.append('startPrice', form.startPrice);
        formData.append('description', form.description);
        formData.append('multiple', form.multiple);
        formData.append('startDate', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
        formData.append('startHour', form.startHour);
        formData.append('endHour', form.endHour);
        formData.append('weight', form.weight);
        formData.append('UserId', userLogin.id);
        axios({
            method: 'post',
            url: 'http://192.168.1.5:4000/items',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <ScrollView className='bg-yellow-50' style={styles.container} showsVerticalScrollIndicator={false}>
            <LoadingOverlay visible={isLoading} message='Uploading Your Data' />
            <View className='w-[80%] mx-auto my-5'>
                {errMsg && (
                    <View className='my-2 bg-red-100  border border-red-400 py-2 rounded-md' role='alert'>
                        <Text className='text-red-700 text-center'>{errMsg}</Text>
                    </View>
                )}
                <TextInput
                    className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                    placeholder='Title of Item'
                    name='name'
                    value={form.name}
                    type='TextInput'
                    onChangeText={(text) => setForm({ ...form, name: text })}
                />
                <View className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md text-[16x] my-2'>
                    <Picker selectedValue={form.categoryId} onValueChange={(itemValue, itemIndex) => setForm({ ...form, categoryId: itemValue })}>
                        <Picker.Item
                            style={{ fontSize: 14, justifyContent: 'center', height: '100%', color: 'gray' }}
                            label='Select Category'
                            value=''
                        />
                        {categories.map((item) => {
                            return <Picker.Item key={item.id} label={item.name} value={item.id} />;
                        })}
                    </Picker>
                </View>
                {subCategories.length > 0 && (
                    <View className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md text-[16x] my-2'>
                        <Picker
                            selectedValue={form.SubCategoryId}
                            onValueChange={(itemValue, itemIndex) => setForm({ ...form, SubCategoryId: itemValue })}>
                            <Picker.Item
                                style={{ fontSize: 14, justifyContent: 'center', height: '100%', color: 'gray' }}
                                label='Select Sub Category'
                                value=''
                            />
                            {subCategories.map((item) => {
                                return <Picker.Item key={item.id} label={item.name} value={item.id} />;
                            })}
                        </Picker>
                    </View>
                )}
                <TextInput
                    className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                    placeholder='Daescription'
                    name='description'
                    value={form.description}
                    type='TextInput'
                    onChangeText={(text) => setForm({ ...form, description: text })}
                />
                <TextInput
                    className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                    placeholder='Start Price'
                    name='startPrice'
                    value={form.startPrice}
                    keyboardType='numeric'
                    type='TextInput'
                    onChangeText={(text) => setForm({ ...form, startPrice: text })}
                />
                <TextInput
                    className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                    placeholder='Multiple'
                    name='multiple'
                    value={form.multiple}
                    keyboardType='numeric'
                    type='TextInput'
                    onChangeText={(text) => setForm({ ...form, multiple: text })}
                />
                <Button onPress={showDatepicker} title={date.toLocaleDateString()} />
                <View className='mt-4 flex-row justify-between mx-5'>
                    <Text className='font-normal text-md'>Start Hour</Text>
                    <Text className='font-normal text-md'>End Hour</Text>
                </View>
                <View className='flex-row justify-between my-2'>
                    <NumericInput
                        type='up-down'
                        onChange={(value) => setForm({ ...form, startHour: value })}
                        minValue={1}
                        maxValue={24}
                        containerStyle={{ backgroundColor: 'white' }}
                    />
                    <View className='flex justify-center items-center'>
                        <Text className='font-bold text-xl'>to</Text>
                    </View>
                    <NumericInput
                        type='up-down'
                        onChange={(value) => setForm({ ...form, endHour: value })}
                        minValue={form.startHour}
                        maxValue={24}
                        containerStyle={{ backgroundColor: 'white' }}
                    />
                </View>
                <TextInput
                    className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                    placeholder='Weight'
                    name='weight'
                    keyboardType='numeric'
                    value={form.weight}
                    type='TextInput'
                    onChangeText={(text) => setForm({ ...form, weight: text })}
                />
                <View className='my-2 mx-auto w-full'>
                    {images ? (
                        <View className='flex-row justify-between my-2'>
                            <Text className='text-center text-[15px] font-bold text-[#1d1d1d]'>{images?.length} Images Selected</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setImages(null);
                                }}>
                                <Text className='text-center text-[15px] font-bold text-[#E13636]'>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity className='bg-[#302F2E] rounded-md p-2 text-[15px] my-2' onPress={pickImage}>
                            <Text className='text-center font-bold text-[#F3F3F3]'>UPLOAD IMAGES</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity className='bg-[#FEC72C] rounded-md p-2 text-[15px] my-2' onPress={(e) => postHandler(e)}>
                    <Text className='text-center font-bold text-[#1D1D1D]'>POST</Text>
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
    },
});
