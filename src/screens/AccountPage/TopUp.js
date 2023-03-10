import { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import LoadingOverlay from '../../components/atoms/LoadingOverlay';
import { fetchUserLogin, patchPayment, postTopup } from '../../store/actions/actionCreator';
import { WebView } from 'react-native-webview';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function TopUp({ route, navigation }) {
    const { UserId } = route?.params;
    const [ammount, setAmmount] = useState(0);
    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [topUpSession, setTopUpSession] = useState(null);
    const [topUpUrl, setTopUpUrl] = useState(null);
    const dispatch = useDispatch();
    const topUpButtonHandler = () => {
        if (ammount < 10000) {
            return setErrMsg('Top up minimal Rp. 10.000');
        }
        setErrMsg(null);
        setIsLoading(true);
        dispatch(postTopup({ UserId, balance: ammount })).then((res) => {
            const { redirect_url } = res;
            setTopUpUrl(redirect_url);
            setTopUpSession(true);
            setIsLoading(false);
        });
    };
    const onNavigationStateChange = (navState) => {
        if (navState.url?.includes('success')) {
            return dispatch(patchPayment({ UserId, balance: ammount }))
                .then((res) => {
                    dispatch(fetchUserLogin(UserId))
                        .then((_) => {
                            Toast.show({
                                type: 'success',
                                position: 'top',
                                text1: 'Thankyou',
                                text2: 'Top up successfully',
                            });
                        })
                        .then((_) => {
                            navigation.navigate('AccountPage');
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <View style={styles.container}>
            {topUpSession ? (
                <WebView source={{ uri: topUpUrl }} onNavigationStateChange={onNavigationStateChange} />
            ) : (
                <>
                    <View className='relative bg-[#07114F] justify-center items-center rounded-b-[130px]' style={{ flex: 1 }}>
                        <Image source={require('./midtrans.png')} style={{ height: 220, width: 220 }} />
                    </View>
                    <LoadingOverlay visible={isLoading} message='Processing Top Up ..' />
                    <View className='w-[80%] mx-auto justify-center' style={{ flex: 3 }}>
                        <Text className='text-3xl font-bold my-3 text-center'>TOP UP</Text>
                        {errMsg && (
                            <View className='mt-5 bg-red-100 border border-red-400 py-2 rounded-md' role='alert'>
                                <Text className='text-red-700 text-center'>{errMsg}</Text>
                            </View>
                        )}
                        <TextInput
                            className='border-2 bg-white border-[#07114f]/50 rounded-md p-2 text-[14px] my-2'
                            placeholder='Top Up Nominal'
                            name='topup'
                            type='TextInput'
                            keyboardType='numeric'
                            onChangeText={(topUpValue) => setAmmount(topUpValue)}
                        />
                        <TouchableOpacity onPress={topUpButtonHandler}>
                            <Text className='text-[15px] flex justify-end bg-[#319302] px-3 py-2 rounded-lg text-center font-bold text-white'>
                                TOP UP
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className='flex-1' style={{ flex: 1 }}>
                        <Text className='text-[14px] text-center text-[#07114f]/50'>Powered by Midtrans</Text>
                    </View>
                </>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: height,
        width: width,
        backgroundColor: '#F5F5F5',
    },
});
