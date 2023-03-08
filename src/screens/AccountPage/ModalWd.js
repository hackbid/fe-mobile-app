import React, { useState } from 'react';
import { Modal, Dimensions, Text, TouchableHighlight, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Overlay from 'react-native-modal-overlay';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';
import { postWithDraw } from '../../store/actions/actionCreator';

const { height, width } = Dimensions.get('window');
export default function ModalWd({ modalVisible, setModalVisible, user }) {
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const handleWdButton = () => {
        setModalVisible(!modalVisible);
        dispatch(postWithDraw({ balance: amount, UserId: user.id })).then((_) => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Request Withdraw Success',
                text2: 'We will be transfered to your bank account soon',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        });
    };

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
            <View style={{ height: height * 0.2, width: width * 0.8, alignItems: 'center', justifyContent: 'center' }}>
                <Text className='text-xl mb-4'>Withdraw Balance</Text>
                <TextInput
                    placeholder='Amount'
                    onChangeText={(text) => setAmount(text)}
                    keyboardType='number-pad'
                    className='border-2 border-gray-300 rounded-md w-[70%] p-2 my-2'
                />
                <TouchableHighlight
                    className='mt-2 w-[70%] h-10 bg-[#07114F] rounded-lg flex-row justify-center items-center'
                    onPress={handleWdButton}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Confirm</Text>
                </TouchableHighlight>
            </View>
        </Overlay>
    );
}
