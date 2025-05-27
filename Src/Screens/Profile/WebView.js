import { View, Text } from 'react-native'
import React from 'react'
import Container from '../../Components/Container'
import Header from '../../Components/Header'
import { WebView } from 'react-native-webview';
import Spacer from '../../Components/Spacer';
import Colors from '../../themes/colors';


const WebViewComponent = (props) => {
    return (
        <Container style={{}}>
            <Header
                title={props.route?.params?.item?.title}
                onPress={() => props.navigation.goBack()}
            />
            <Spacer />
            <WebView source={{ uri: props.route?.params?.item?.uri }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                scalesPageToFit={true}
                style={{ flex: 1, backgroundColor: Colors.backgroundColor }}
                androidHardwareAccelerationDisabled={true}
                javaScriptEnabledAndroid={true}
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={true}
                allowsBackForwardNavigationGestures
                onError={error => console.error(error)}
                useWebkit={true}
                mixedContentMode="always"
                setSupportMultipleWindows={false}
                cacheEnabled={true}
                originWhitelist={['*']}
                cacheMode="LOAD_CACHE_ELSE_NETWORK"
            />
        </Container>
    )
}

export default WebViewComponent