import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchItemById, postReport } from '../../store/actions/actionCreator';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import TopRoom from './components/TopRoom';
import ChatRoom from './components/ChatRoom';
import ButtonSheet from './components/BottomSheet';
import socket from '../../helpers/Socket';
import moment from 'moment-timezone';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import CountDown from './components/Countdown';
import Rupiah from '../../helpers/Rupiah';
import ModalReport from './components/ModalReport';
import Overlay from 'react-native-modal-overlay';
const { width, height } = Dimensions.get('window');
export default function BiddingRoom({ route, navigation }) {
    const [time, setTime] = useState('loading');
    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
    const { id } = route.params;
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.user.user);

    const getCountdown = (endHour) => {
        const hourRemaining = Number(moment().format('HH')) * 3600 + Number(moment().format('mm')) * 60 + Number(moment().format('ss'));
        const remainingTime = Math.floor(endHour * 3600 - hourRemaining);
        setTime(remainingTime);
    };
    const [winner, setWinner] = useState({});
    const [chat, setChat] = useState([]);
    const [historyMongoId, setHistoryMongoId] = useState('');
    const [sellerId, setSellerId] = useState('');
    useEffect(() => {
        dispatch(fetchItemById(id))
            .then((res) => {
                setItem(res);
                getCountdown(res.endHour);
                setWinner(res.Winner);
                setChat(res.chats);
                setHistoryMongoId(res.historyMongoId);
                setSellerId(res.UserId);
                setBidData({ ...bidData, bidValue: res.Winner.amountBid });
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                socket.emit('joinRoom', { roomId: id, username: userLogin.username, UserId: userLogin.id });
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        socket.on('connectedToRoom', (data) => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: data.message,
            });
        });
        socket.on('bidError', (data) => {
            console.log(data);
        });
        socket.on('bidSuccess', (data) => {
            setWinner(data);
            Toast.show({
                type: 'success',
                position: 'top',
                text1: `${data.username} has been bid to ${Rupiah(data.amountBid)}`,
            });
        });
    }, [socket]);
    const [bidData, setBidData] = useState({
        roomId: id,
        UserId: userLogin.id,
        username: userLogin.username,
        bidValue: 0,
    });
    const handleBid = async () => {
        socket.emit('bid', bidData);
        toggleBottomNavigationView();
    };
    const [report, setReport] = useState({
        itemId: id,
        itemName: '',
        UserId: userLogin.id,
        username: userLogin.username,
        reason: '',
    });
    const handleReport = () => {
        setModalVisible(false);
        dispatch(postReport(report)).then((res) => {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Report has been sent',
            });
        });
    };

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            {isLoading ? (
                <View>
                    <LoadingOverlay visible={isLoading} message='fetching data' />
                </View>
            ) : (
                <View className='bg-[#FFFDF5]' style={{ width: width, height: height }}>
                    <TopRoom item={item} winner={winner} navigation={navigation} socket={socket} itemId={item.id} />
                    <View className='relative -top-10'>
                        <CountDown until={time} onFinish={() => navigation.navigate('BiddingList')} size={25} />
                    </View>
                    <ChatRoom
                        chats={chat}
                        socket={socket}
                        roomId={id}
                        userLogin={userLogin}
                        historyMongoId={historyMongoId}
                        sellerId={sellerId}
                        sellerName={item.seller.username}
                    />
                    <View className='flex-row w-[80%] mx-auto'>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                            }}
                            className='bg-red-400 w-[30%] p-3 mx-auto rounded-xl'
                            style={{ top: -20 }}>
                            <Text className='text-center font-bold text-md text-gray-600'>Report</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={toggleBottomNavigationView}
                            className='bg-yellow-400 w-[68%] p-3 mx-auto rounded-xl'
                            style={{ top: -20 }}>
                            <Text className='text-center font-bold text-md text-gray-600'>Request Bid</Text>
                        </TouchableOpacity>
                    </View>
                    <ModalReport
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleReport={handleReport}
                        itemName={item.name}
                        report={report}
                        setReport={setReport}
                    />
                    <ButtonSheet
                        visible={visible}
                        socket={socket.current}
                        multiple={item?.multiple}
                        bidNow={item.Winner.amountBid}
                        toggleBottomNavigationView={toggleBottomNavigationView}
                        setBidData={setBidData}
                        bidData={bidData}
                        handleBid={handleBid}
                        historyMongoId={historyMongoId}
                    />
                </View>
            )}
        </>
    );
}
