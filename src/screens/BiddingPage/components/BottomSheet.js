import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import NumericInput from 'react-native-numeric-input';

export default function ButtonSheet({ visible, toggleBottomNavigationView, multiple, bidNow, handleBid, bidData, setBidData, historyMongoId }) {
    return (
        <BottomSheet
            visible={visible}
            //setting the visibility state of the bottom shee
            onBackButtonPress={toggleBottomNavigationView}
            //Toggling the visibility state on the click of the back botton
            onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
        >
            <View style={styles.bottomSheet}>
                <Text className='font-bold text-[20px] mt-3'>OPEN BID</Text>
                <Text className='font-light text-[15px] mb-5'>allowed multiply: {multiple}</Text>
                <View className='flex-row gap-2 justify-center items-center'>
                    <NumericInput
                        type='up-down'
                        value={bidData.bidValue}
                        initValue={bidNow + multiple}
                        minValue={bidNow + multiple}
                        onChange={(number) => {
                            setBidData({
                                ...bidData,
                                historyMongoId: historyMongoId,
                                bidValue: number,
                            });
                        }}
                        step={multiple}
                        containerStyle={{ backgroundColor: 'white' }}
                    />
                    <TouchableOpacity onPress={handleBid}>
                        <Text className='text-white bg-blue-800 px-4 py-2 text-lg rounded-lg'>Bid</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    bottomSheet: {
        backgroundColor: '#F3F3F3',
        width: '100%',
        height: 150,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
});
