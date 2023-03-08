import { Dimensions, View, Text, Pressable, Image, StyleSheet, FlatList } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import CardToday from './components/CardToday';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsToday } from '../../store/actions/actionCreator';
import moment from 'moment-timezone';
import { useFocusEffect } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
export default function BiddingList({ navigation }) {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.apps.itemToday);
    const [time, setTime] = useState(moment().format('DD MMMM YY - HH:mm:ss'));
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchItemsToday());
        }, [])
    );
    setInterval(() => {
        moment.tz.setDefault('Asia/Jakarta');
        setTime(moment().format('DD MMMM YY - HH:mm:ss'));
    }, 1000);
    return (
        <View style={styles.container}>
            <LinearGradient
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.53,
                    shadowRadius: 13.97,

                    elevation: 21,
                }}
                // Button Linear Gradient
                colors={['#07114F', '#2239C8']}
                className='h-20 px-8 py-2 flex-row justify-between items-center rounded-b-[40px]'>
                <View className='mx-auto'>
                    <Text className='text-center text-2xl text-white font-bold'>Today's auction</Text>
                    <Text className='text-center text-[15px] font-normal text-white'>{time}</Text>
                </View>
            </LinearGradient>
            <FlatList data={items} renderItem={({ item }) => <CardToday data={item} navigation={navigation} />} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFDF5',
        height: height,
        width: width,
    },
});
