import React from 'react';
import { Modal, ActivityIndicator, StyleSheet, View, Dimensions, Text } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LoadingOverlay = ({ visible, message }) => {
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.overlay}>
                <ActivityIndicator size={100} color='#FEC72C' />
                <Text style={{ color: '#FEC72C', fontSize: 20, marginTop: 10 }}>{message}</Text>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(7, 17, 79, 0.8)',
    },
});

export default LoadingOverlay;
