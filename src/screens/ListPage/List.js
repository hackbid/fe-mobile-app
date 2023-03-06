import HeaderList from './components/HeaderList';
import { Fragment } from 'react';
import CardContainer from './components/CardContainer';
import { BottomSheet } from 'react-native-btr';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function List() {
    const [visible, setVisible] = useState(false);

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
    return (
        <Fragment>
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
        </Fragment>
    );
}

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        padding: 16,
    },
});
