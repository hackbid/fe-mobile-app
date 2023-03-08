import { View, ScrollView, Text, Dimensions, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
const { width, height } = Dimensions.get('window');

export default function ChatRoom({ chats, socket, roomId, userLogin, sellerId, historyMongoId, sellerName }) {
    const [inputMessage, setInputMessage] = useState('');
    const [message, setMessage] = useState([]);
    useEffect(() => {
        setMessage(chats);
    }, []);
    useEffect(() => {
        socket.on('messageSuccess', (data) => {
            setMessage([...message, data]);
        });
    }, [socket]);
    const sendMessage = () => {
        let isSeller = sellerId == userLogin.id ? 'true' : 'false';
        setInputMessage('');
        socket.emit('sendMessage', {
            roomId: roomId,
            username: userLogin.username,
            chatValue: inputMessage,
            isSeller: isSeller,
            historyMongoId: historyMongoId,
        });
    };

    return (
        <View>
            <View style={{ height: height * 0.3, marginTop: 10 }}>
                <Text className='font-bold absolute z-50 left-[30] -top-10 text-center rounded-md p-2 w-[85%] bg-gray-300'>Room Chats</Text>
                <ScrollView
                    className='text-slate-50 text-xs font-normal bg-[#F3F3F3] py-2 mx-8 px-4'
                    showsVerticalScrollIndicator={false}
                    style={{ borderRadius: 15, overflow: 'hidden', top: -35, height: 20, marginTop: 25 }}>
                    {message?.length > 0 &&
                        message.map((chat, index) => {
                            const style = chat.isSeller == 'true' ? 'text-right bg-yellow-100' : 'bg-blue-100';
                            const padding = chat.username == userLogin.username ? 'ml-32' : 'pl-2';
                            return (
                                <View key={index} className={`${style} ${padding} ` + 'flex mb-2 w-[60%] px-2 py-1 rounded-lg'}>
                                    <View className='flex'>
                                        <Text className='text-gray-700 font-bold text-[10px]'>{chat?.username}</Text>
                                        <Text className='text-gray-700 text-[11px]'>{chat?.chatValue}</Text>
                                    </View>
                                </View>
                            );
                        })}
                </ScrollView>
            </View>
            <View className='my-2 mx-auto' style={{ flexDirection: 'row', top: -20 }}>
                <TextInput
                    value={inputMessage}
                    onChangeText={(text) => setInputMessage(text)}
                    className='text-gray-700 font-semibold bg-white border-2 border-black py-1 px-3 w-4/6 rounded-xl'
                    style={{ borderRadius: 5 }}
                    placeholder={'masukan pesan'}
                />
                <Pressable onPress={sendMessage} className='bg-blue-800 mx-1 p-3 px-4 rounded-lg'>
                    <Ionicons name='arrow-forward-circle-outline' size={25} color='white' />
                </Pressable>
            </View>
        </View>
    );
}
