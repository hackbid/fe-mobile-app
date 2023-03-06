import { FlatList, View } from 'react-native';
import { data } from './data';
import CardAuction from './CardAuction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchItems } from '../../../store/actions/actionCreator';
export default function CardContainer({}) {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.apps.items);
    return (
        <View className='flex items-center py-2 bg-[#FFFDF5]'>
            <FlatList
                data={items}
                numColumns={2}
                renderItem={({ item }) => {
                    return <CardAuction item={item} />;
                }}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
