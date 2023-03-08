import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAuction } from '../../store/actions/actionCreator';

export default function MyAuction({ navigation, route }) {
    const { user } = useSelector((state) => state.user);
    const [auctionList, setAuctionList] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyAuction(user.id)).then((res) => {
            setAuctionList(res);
        });
    }, []);

    return (
        <View>
            <TouchableOpacity
                className='bg-blue-800 mx-1 p-3 px-4 rounded-lg my-2 '
                onPress={() => {
                    navigation.navigate('PostItem');
                }}>
                <Text className='text-center text-white'>Add new Item</Text>
            </TouchableOpacity>
            <Text>MyAuction</Text>
            <View className='w-[80%] mx-auto'>
                {auctionList.map((item) => {
                    return (
                        <View key={item.id} className='p-3 bg-white my-3'>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.startPrice}</Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}
