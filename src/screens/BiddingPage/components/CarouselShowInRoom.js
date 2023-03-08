import { useEffect, useState } from 'react';
import Carousel from 'react-native-banner-carousel-updated';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import LoadingOverLay from '../../../components/atoms/LoadingOverlay';
const BannerWidth = Dimensions.get('window').width * 0.9;
const BannerHeight = Dimensions.get('window').height;

export default function CarouselShowInRoom({ images }) {
    const [render, setRender] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (images.length === 0) {
            setRender(['https://hackbid.s3.ap-southeast-1.amazonaws.com/404.png']);
        } else {
            setRender(images);
        }
        setIsLoading(false);
    }, [images]);
    return (
        <View style={styles.container}>
            <LoadingOverLay visible={isLoading} message='fetching data' />
            <Carousel autoplay autoplayTimeout={4000} loop index={0} pageSize={BannerWidth}>
                {render.map((image, index) => (
                    <View key={index}>
                        <Image style={styles.img} source={{ uri: image }} />
                    </View>
                ))}
            </Carousel>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 0,
    },
    img: {
        width: BannerWidth,
        height: BannerHeight * 0.3,
        resizeMode: 'cover',
    },
});
