import React, { useRef } from 'react';
import {
    StyleSheet,
    View,
    Modal
} from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = props => {
    let lottieRef = useRef()
    const {
        loading,
        ...attributes
    } = props;

    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={loading}
            onRequestClose={() => { }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <LottieView
                        style={styles.lottieStyle}
                        source={require('../loading.json')}
                        autoPlay={true}
                        loop={true}
                        speed={1}
                        ref={lottieRef}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //flexDirection: 'column',
        // justifyContent: 'space-around',
        // backgroundColor: '#00000040'
        alignSelf: 'center'
    },
    activityIndicatorWrapper: {
        backgroundColor: 'transparent',
        height: 100,
        width: 100,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    lottieStyle: {
        width: 170,
        height: 170,
        alignSelf: 'center',
    }
});

export default Loader;