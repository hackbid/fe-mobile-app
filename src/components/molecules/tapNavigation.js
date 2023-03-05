import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
export default function TabBarBackground() {
    return <View style={styles.tab} />;
}

const styles = StyleSheet.create({
    tab: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 50, backgroundColor: '#EFEFEF' },
});
