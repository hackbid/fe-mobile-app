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
        const start = startHour - hourNow;
        const close = endHour - hourNow;
        const minutes = Number(moment().format('mm'));
        if (status == 'posted') {
            setCounterStyle('text-green-800');
            if (start == 1) {
                return `Starting in ${60 - minutes} minutes`;
            } else {
                return `Starting in ${start} hours`;
            }
        } else if (status == 'close') {
            setCounterStyle('text-red-800');
            return 'Session is closed';
        } else if (status == 'active') {
            setCounterStyle('text-orange-800');
            if (close == 1) {
                return `Closed in ${60 - minutes} minutes`;
            } else {
                return `Closed in ${close} hours`;
            }
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
                backgroundColor: '#F5F5F5',
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
                <Text className='font-semibold text-[12px]' numberOfLines={2}>
                    {name}
                </Text>
                <Text className='font-light mt-1 text-[12px]' numberOfLines={1}>
                    {description}
                </Text>
                <Text className='mt-1 text-black text-[11px]'>Start Price : {Rupiah(startPrice)}</Text>
                <Text className={`${counterStyle}` + ' font-bold mt-1 text-[12px]'}>{counter}</Text>
                {status == 'active' && (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('BiddingRoom', { id, name })}
                        className='bg-[#FFAA04] rounded-lg mt-2 p-1 w-[50%]'>
                        <Text className='text-center font-bold text-[#1d1d1d] text-[12px]'>BID NOW</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
