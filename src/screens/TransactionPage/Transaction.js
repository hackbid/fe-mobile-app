import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWinner } from '../../store/actions/actionCreator';
import EachCard from './component/EachCard';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
export default function Transaction({ navigation }) {
    const { user } = useSelector((state) => state.user);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useFocusEffect(
        useCallback(() => {
            setIsLoading(true);
            dispatch(getWinner(user.id))
                .then((res) => {
                    setData(res);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, [])
    );
    return (
        <View className='p-2'>
            <LoadingOverlay visible={isLoading} message='Fetching Data ..' />
            <FlatList
                data={data}
                keyExtractor={data.id}
                renderItem={(item) => {
                    return <EachCard data={item} user={user} navigation={navigation} />;
                }}
            />
        </View>
    );
}
