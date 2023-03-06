import { useEffect, useState } from 'react';
import { View, Image, Text, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';
import Rupiah from '../../../helpers/Rupiah';
const { width, height } = Dimensions.get('window');
export default function CardToday({ data, navigation }) {
    const [counterStyle, setCounterStyle] = useState('text-[#07114F]');
    const getCounter = () => {
        moment.tz.setDefault('Asia/Jakarta');
        const hourNow = Number(moment().format('HH'));
        if (status == 'posted') {
            return `Session Starting in ${startHour - hourNow} hours`;
        } else if (status == 'close') {
            setCounter('Session is closed');
            return 'Session is closed';
        } else if (status == 'active') {
            return `Session closed in ${endHour - hourNow} hours`;
        }
    };
    const { id, name, description, images, startPrice, multiple, startDate, startHour, endHour, status } = data;
    const [image, setImage] = useState('https://hackbid.s3.ap-southeast-1.amazonaws.com/404.png');
    const [counter, setCounter] = useState('updating ...');
    useEffect(() => {
        if (images.length > 0) {
            setImage(images[0]);
        }
        setCounter(getCounter());
    }, []);

    setInterval(() => {
        setCounter(getCounter());
    }, 10000);

    return (
        <View
            style={{
                height: height * 0.2,
                width: width * 0.9,
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
            }}
            className='bg-[#FFAA04] flex-row rounded-lg p-2 mt-4 mx-auto'>
            <Image source={{ uri: image }} className='w-[40%] h-full rounded-xl' />
            <View className='p-2 ml-2 w-[50%]'>
                <Text className='font-semibold text-[15px]' numberOfLines={2}>
                    {name}
                </Text>
                <Text className='font-light mt-1 text-[12px]' numberOfLines={2}>
                    {description}
                </Text>
                <Text className='mt-1 text-black text-[11px]'>Start Price : {Rupiah(startPrice)}</Text>
                <Text className='font-bold mt-1 text-[#07114F] text-[12px]'>{counter}</Text>
                {status == 'active' && (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BiddingRoom', { id, name })}
                        className='bg-[#07114F] rounded-lg mt-2 p-1 w-[50%]'>
                        <Text className='text-center text-white text-[12px]'>BID NOW</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}