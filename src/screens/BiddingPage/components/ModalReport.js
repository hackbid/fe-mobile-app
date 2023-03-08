import React, { useState } from 'react';
import { Modal, Dimensions, Text, TouchableHighlight, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Overlay from 'react-native-modal-overlay';

const { height, width } = Dimensions.get('window');
export default function ModalReport({ modalVisible, setModalVisible, handleReport, report, setReport, itemName }) {
    return (
        <Overlay
            visible={modalVisible}
            onClose={() => {
                setModalVisible(false);
            }}
            AnimationType='zoomIn'
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            childrenWrapperStyle={{ backgroundColor: '#eee', borderRadius: 30 }}
            closeOnTouchOutside>
            <View style={{ height: height * 0.2, width: width * 0.8, alignItems: 'center' }}>
                <Text className='text-xl'>Report Item</Text>
                <View className='w-[80%] mt-2'>
                    <TextInput
                        className='border-2 bg-white border-[#07114f]/50 h-12 rounded-md px-5 text-[16x] my-2'
                        placeholder='Reason for reporting'
                        name='name'
                        value={report.reason}
                        type='TextInput'
                        onChangeText={(text) => setReport({ ...report, itemName: itemName, reason: text })}
                    />
                </View>
                <TouchableHighlight
                    onPress={handleReport}
                    style={{
                        backgroundColor: '#07114f',
                        borderRadius: 20,
                        padding: 10,
                        elevation: 2,
                        width: width * 0.6,
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Report</Text>
                </TouchableHighlight>
            </View>
        </Overlay>
    );
}
