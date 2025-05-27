import React from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity, Platform, Linking } from 'react-native'
import { Colors, fonts, Header, images } from "../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Spacer from "../../Components/Spacer";

const Help = (props) => {

    return (
        <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
            <View style={{ marginHorizontal: hp('3%'), marginTop: hp(Platform.OS == 'ios' ? 9 : 2) }}>
                <Header
                    title={'Help & Support'}
                    onPress={() => props.navigation.goBack()}
                />

            </View>
            {/* <View style={{ marginTop: hp('2%'), marginHorizontal: hp('3%') }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Report')} style={styles.container}>
                    <View style={styles.containertext}>
                        <Image style={styles.containerimg} source={images.user} />

                    </View >
                    <View style={styles.orderarrow}>
                        <Text style={styles.heding}>
                            Report Technical Complaint
                        </Text>
                    </View>
                    <View style={styles.conarrow}>
                        <Image style={styles.containerarrow} source={images.leftArrow}>

                        </Image>
                    </View>
                </TouchableOpacity>

            </View> */}
            {/* <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFCF' }}></View> */}
            <View style={{ marginHorizontal: hp('3%') }}>
                <Spacer />

                <TouchableOpacity onPress={() => props.navigation.navigate('WebView', { item: { title: 'FAQs', uri: 'https://quick.shop/faqs' } })} style={styles.container}>
                    <View style={styles.containertext}>
                        <Image style={styles.containerimg} source={images.question} />

                    </View >
                    <View style={styles.orderarrow}>
                        <Text style={styles.heding}>
                            FAQs
                        </Text>
                    </View>
                    <View style={styles.conarrow}>
                        <Image style={styles.containerarrow} source={images.leftArrow}>

                        </Image>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#CFCFCF' }}></View>
            <View style={{ marginHorizontal: hp('3%') }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('WebView', { item: { title: 'Terms & Conditions', uri: 'https://quick.shop/terms' } })} style={styles.container}>
                    <View style={styles.containertext}>
                        <Image style={styles.containerimg} source={images.term} />

                    </View >
                    <View style={styles.orderarrow}>
                        <Text style={styles.heding}>
                            Terms & Conditions
                        </Text>
                    </View>
                    <View style={styles.conarrow}>
                        <Image style={styles.containerarrow} source={images.leftArrow}>

                        </Image>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFCF' }}></View>
            <View style={{ marginHorizontal: hp('3%') }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('WebView', { item: { title: 'Privacy Policy', uri: 'https://quick.shop/privacy' } })} style={styles.container}>
                    <View style={styles.containertext}>
                        <Image style={{ width: wp('5%'), height: hp('2.5%'), tintColor: Colors.BtnBackground }} source={images.privacy} />

                    </View >
                    <View style={styles.orderarrow}>
                        <Text style={styles.heding}>
                            Privacy Policy
                        </Text>
                    </View>
                    <View style={styles.conarrow}>
                        <Image style={styles.containerarrow} source={images.leftArrow}>

                        </Image>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFCF' }}></View>
            <View style={{ marginHorizontal: hp('3%') }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('WebView', { item: { title: ' Return & Cancellation Policy', uri: 'https://quick.shop/return' } })} style={styles.container}>
                    <View style={styles.containertext}>
                        <Image style={styles.containerimg} source={images.return} />

                    </View >
                    <View style={styles.orderarrow}>
                        <Text style={styles.heding}>
                            Return & Cancellation Policy
                        </Text>
                    </View>
                    <View style={styles.conarrow}>
                        <Image style={styles.containerarrow} source={images.leftArrow}>

                        </Image>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFCF' }}></View>
            <View style={{ marginHorizontal: hp('3%') }}>
                <TouchableOpacity onPress={() => {
                    const phoneNumber = '+1234567890';  // Include country code
                    let url = `whatsapp://send?phone=${phoneNumber}&text=Hello, this is a test message`;
                    Linking.canOpenURL(url)
                        .then((supported) => {
                            if (supported) {
                                Linking.openURL(url);
                            } else {
                                Alert.alert("WhatsApp is not installed on your device");
                            }
                        })
                        .catch((err) => console.error('Error occurred', err));
                }} style={styles.container}>
                    <View style={styles.containertext}>
                        <Image style={styles.containerimg} source={images.term} />

                    </View >
                    <View style={styles.orderarrow}>
                        <Text style={styles.heding}>
                            File a Complaint
                        </Text>
                    </View>
                    <View style={styles.conarrow}>
                        <Image style={styles.containerarrow} source={images.leftArrow}>

                        </Image>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{ borderBottomWidth: 0.7, borderBottomColor: '#CFCFCF' }}></View>

        </View>
    )

}
const styles = StyleSheet.create({

    container: {

        alignItems: 'center',
        height: wp('15%'),
        flexDirection: 'row',

    },
    heding: { fontSize: 15, color: Colors.balckText, fontFamily: fonts.PoppinsMedium },
    containerimg: {
        width: wp('6%'),
        height: wp('5%'),
        tintColor: Colors.BtnBackground
    },
    containerarrow: {
        width: wp('5%'),
        height: wp('6%'),
        marginLeft: 80,

    },
    line: {
        borderBottomColor: '#ECF0F1',
        borderBottomWidth: 1.5,
        marginTop: hp('2%')
    },
    conarrow: {
        width: wp('20%'),
        marginTop: 5
    },
    orderarrow: {
        width: wp('55%'),

    },
    containertext: {
        width: wp('9%'),

    },
    newline: {
        borderBottomColor: '#ECF0F1',
        borderBottomWidth: 1.5,

    }
})
export default Help;

