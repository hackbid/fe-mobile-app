import HeaderList from './components/HeaderList';
import { useState, useEffect, useCallback } from 'react';
import CardContainer from './components/CardContainer';
import { BottomSheet } from 'react-native-btr';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchItems } from '../../store/actions/actionCreator';

export default function List() {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
    useFocusEffect(
        useCallback(() => {
            dispatch(fetchItems());
        }, [])
    );

    return (
        <View style={styles.fragment}>
            <HeaderList toggleBottomNavigationView={toggleBottomNavigationView} />
            <CardContainer />
            <BottomSheet
                visible={visible}
                //setting the visibility state of the bottom shee
                onBackButtonPress={toggleBottomNavigationView}
                //Toggling the visibility state on the click of the back botton
                onBackdropPress={toggleBottomNavigationView}
                //Toggling the visibility state on the clicking out side of the sheet
            >
                <View style={styles.bottomSheet}>
                    <Text>FILTER NICH BRO</Text>
                </View>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        padding: 16,
    },
    fragment: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
});
