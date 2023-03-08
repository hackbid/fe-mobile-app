import { useEffect, useState } from 'react';
import { Image, Pressable, Text, TouchableHighlight, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';
import Rupiah from '../../../helpers/Rupiah';
import { getWinner, postCheckout } from '../../../store/actions/actionCreator';

export default function EachCard({ data, user, navigation }) {
    const [image, setImage] = useState('https://hackbid.s3.ap-southeast-1.amazonaws.com/404.png');
    const { amountBid, Item, images, origin, destination, cost } = data.item;
    const dispatch = useDispatch();
    useEffect(() => {
        images.length > 0 && setImage(images[0]);
    }, []);

    const submitHandler = () => {
        dispatch(
            postCheckout({
                SellerId: Item.UserId,
                ItemId: Item.id,
                BuyerId: user.id,
                summary: amountBid + cost,
            })
        )
            .then((res) => {
                Toast.show({
                    type: 'success',
                    text1: 'Checkout Success',
                    text2: 'Please wait for the seller to confirm',
                });
                navigation.navigate('AccountPageStack', { screen: 'MutationPage', params: { UserId: user.id, username: user.username } });
            })
            .catch((err) => {
                Toast.show({
                    type: 'error',
                    text1: 'Checkout Failed',
                    text2: err.message,
                });
            })
            .finally(() => {
                dispatch(getWinner(user.id));
            });
    };

    return (
        <>
            {(Item.status == 'close' || Item.status == 'sold out') && (
                <View className='my-2 bg-white p-4 m-2 rounded-lg shadow-[200px] border-gray-300 border-2' key={data.id}>
                    <View className='flex flex-row py-2'>
                        <Image className='object-fill h-50 w-24 rounded-md border-2' source={{ uri: image }} />
                        <View className='px-2 w-[72%]'>
                            <Text className='font-bold text-gray-800 text-lg'>{Item.name}</Text>
                            <View className='flex-row justify-between'>
                                <Text className='font-light'>Bid Session</Text>
                                <Text className='font-semibold'>{Item.startDate}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='font-light'>Seller</Text>
                                <Text className='font-semibold'>{origin.seller}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='font-light'>Open Bid Price:</Text>
                                <Text className='font-semibold'>{Rupiah(Item.startPrice)}</Text>
                            </View>
                            <View className='flex-row justify-between'>
                                <Text className='font-light'>Weight :</Text>
                                <Text className='font-semibold'>{Item.weight} gr</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text className='font-bold text-center text-gray-800'>Total Invoice</Text>
                        <View className=' border-b border-t border-slate-300'>
                            <Text className='mt-2 text-right'>Price Bid : {Rupiah(amountBid)}</Text>
                            <Text className='mb-2 text-right'>Delivery Cost : {Rupiah(cost)}</Text>
                        </View>
                        <View>
                            <Text className='text-right font-bold'>
                                Summary : <Text className='text-red-600'>{Rupiah(amountBid + cost)}</Text>
                            </Text>
                        </View>
                    </View>
                    {Item.status == 'close' && (
                        <TouchableHighlight onPress={submitHandler} className='bg-yellow-500 w-1/3 mx-auto rounded-lg p-2 mt-5'>
                            <Text className='text-center font-bold text-white'>Checkout</Text>
                        </TouchableHighlight>
                    )}
                </View>
            )}
        </>
    );
}
