import React, { useRef, useState } from "react";
import { View, Text, Platform, TouchableOpacity, Image, StyleSheet, Linking, Dimensions } from 'react-native'
import { images, Colors, fonts, Header } from "../../Components/Index";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
const widthScreen = Dimensions.get('window').width;
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import MapViewDirections from 'react-native-maps-directions';
const API_KEY = "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0";

const Trackorder = (props) => {
    const [region, setRegion] = useState(props.route.params.region);
    const [riderdestination, setriderdestination] = useState({
        latitude: 33.64390385502651,
        longitude: 73.02104864269495
    });
    const [customerdastination, setcustomerdastination] = useState({
        latitude: 33.65009136309268,
        longitude: 73.02360411733389
    });

    const refRBSheet = useRef();
    const mapRef = useRef(null);
    return (
        <View style={styles.mainView}>
            <View style={styles.subView}>
                <Header
                    title={'Track Order'}
                    onPress={() => props.navigation.goBack()}
                />

            </View>
            <View style={styles.line}>
                <MapView
                    // provider={PROVIDER_GOOGLE}
                    ref={mapRef}
                    style={{ width: wp(100), height: hp(50) }}
                    initialRegion={region}

                    showsIndoors={true}


                >
                    {/* <MapViewDirections
                        origin={riderdestination}
                        destination={customerdastination}
                        apikey={API_KEY}
                        strokeWidth={8}
                        strokeColor={Colors.BtnBackground}
                    /> */}

                    <Marker coordinate={customerdastination}
                        style={{ width: 26, height: 28 }}

                    // image={require('../../Assets/Images/customericon.png')}

                    />
                    <Marker coordinate={riderdestination}
                        style={{ width: 26, height: 28 }}

                    // image={require('../../Assets/Images/ridericon.png')}

                    />


                </MapView>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.estimate}>
                    <Text style={styles.txt}>
                        Estimated Arrival Time
                    </Text>
                    <Text style={styles.time}>12:45 - 01:10</Text>
                </View>
                <View style={styles.lineView}></View>
                <View style={styles.userProfile}>
                    <View style={styles.userProfileSub}>
                        <Image source={images.Profilerider} style={styles.profileimg} />

                        <View style={styles.MainProfile}>
                            <Text style={styles.userText}>John Stewart</Text>
                            <Text style={styles.rider}>Rider</Text>
                        </View>
                    </View>
                    <View style={styles.messageView}>
                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('Message')} style={styles.touchchat}> */}
                        <TouchableOpacity onPress={() => console.log('abc')} style={styles.touchchat}>

                            <Image source={images.chat} style={styles.chaticon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.touchphone}>
                            <Image source={images.phone} style={styles.phoneicon} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.shopView}></View>
                <View style={styles.shopsubView}>
                    <TouchableOpacity style={styles.shop}>
                        <Image source={images.shopicon} style={styles.shopicon} />
                    </TouchableOpacity>
                    <View style={styles.addressView}>
                        <Text style={styles.addressText}>101st Rd Eureka, Nevada</Text>
                        <Text style={styles.storetxt}>Store Location</Text>
                    </View>
                </View>
                <View style={styles.imgView}>
                    <Image source={images.line} style={styles.imgLine} />
                </View>
                <View style={styles.locateView}>
                    <TouchableOpacity style={styles.locate}>
                        <Image source={images.locations} style={styles.shopicon1} />
                    </TouchableOpacity>
                    <View style={styles.view}>
                        <Text style={styles.txtAddress}>131st Rd
                            Eureka, Nevada</Text>
                        <Text style={styles.deliveryLocation}>Delivery Location</Text>
                    </View>
                </View>
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={hp(25)}
                customStyles={{
                    container: {
                        backgroundColor: '#FDFEFD',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderTopColor: 'red',
                        width: wp(100)
                    },
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.6)',

                    },
                    draggableIcon: {
                        backgroundColor: "transparent",

                    }
                }}
            >
                <View style={styles.lastView}>
                    <TouchableOpacity style={styles.borderCall} onPress={() => { Platform.OS == 'ios' ? Linking.openURL(`telprompt:${923060831393}`) : Linking.openURL(`tel:${923060831393}`) }}>
                        <TouchableOpacity style={styles.colourPhone} >
                            <Image source={images.colouredphone} style={styles.whatsView} />
                        </TouchableOpacity>
                        <Text style={styles.txtPhone}>Call on Phone</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.viewLast}></View>
                <View style={styles.viewLasttxt}>
                    <TouchableOpacity style={styles.touchimg} onPress={() => Linking.openURL(`whatsapp://send?phone=${923060831393}`)}>
                        <TouchableOpacity style={styles.whatsappTouch}>
                            <Image source={images.whatsappicon} resizeMode='contain' style={styles.whatsappicon} />
                        </TouchableOpacity>
                        <Text style={styles.whatsapp}>Call on Whatsapp</Text>
                    </TouchableOpacity>

                </View>
            </RBSheet>
        </View>

    )

}
const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        backgroundColor: Colors.backgroundColor
    },
    subView: {
        marginHorizontal: hp('3%'),
        marginTop: hp('6%')
    },
    successTouch: {

        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 0, height: hp('5%')
    },
    colourPhone: {
        justifyContent: 'center',
        width: wp('9%'),
        alignItems: 'center',
        height: hp('3.9%'),
        borderColor: 'red',
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: Colors.whitecolor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    whatsapp: {
        textAlign: 'center',
        marginLeft: hp('1%'),
        fontSize: 17,
        fontWeight: '400',
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular
    },
    whatsappTouch: {
        justifyContent: 'center',
        width: wp('9%'),
        alignItems: 'center',
        height: hp('3.9%'),
        borderColor: 'red',
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: Colors.whitecolor,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,


    },
    touchimg: {
        flexDirection: 'row',
        marginHorizontal: hp('3%'),
        alignItems: 'center'
    },
    viewLast: {
        borderBottomWidth: 2,
        marginTop: hp('2%'),
        marginHorizontal: hp('3%'),
        borderColor: '#EFEFEF'
    },
    viewLasttxt: {
        borderColor: 'red',
        borderWidth: 0,
        marginTop: hp('3%')
    },
    whatsView: {
        height: 24,
        width: 24,
        tintColor: Colors.BtnBackground
    },
    txtPhone: {
        textAlign: 'center',
        marginLeft: hp('1%'),
        fontSize: 17,
        fontWeight: '400',
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular
    },
    MainProfile: {
        borderWidth: 0,
        marginLeft: hp(1.5),
        borderColor: 'red',
        justifyContent: 'center'
    },
    borderCall: {
        flexDirection: 'row',
        marginHorizontal: hp('3%'),
        alignItems: 'center'
    },
    lastView: {
        borderColor: 'red',
        borderWidth: 0,
        marginTop: hp('3%')
    },
    txtAddress: {
        fontSize: 16,
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular
    },
    view: {
        borderWidth: 0,
        marginLeft: hp('1%'),
        borderColor: 'red',
        justifyContent: 'center',
        width: wp('80%')
    },
    addressText: {
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular,
        fontSize: 16,
    },
    addressView: {
        borderWidth: 0,
        marginLeft: hp('2%'),
        borderColor: 'red',
        justifyContent: 'center',
        width: wp('80%')
    },
    deliveryLocation: {
        marginTop: hp('0.5%'),
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular
    },
    locateView: {

        flexDirection: 'row',
        marginHorizontal: hp('2%')
    },
    imgLine: {
        height: hp('3.5%'),
        width: wp('0.5%')
    },
    storetxt: {
        marginTop: hp('0.5%'),
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular
    },
    imgView: {
        marginHorizontal: hp('3%'),
        borderColor: 'red',
        borderWidth: 0,
        marginTop: hp('0%'),
        width: wp('10%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageView: {
        borderWidth: 0,
        borderColor: 'red',
        flexDirection: 'row'
    },
    userProfileSub: {
        borderWidth: 0,
        borderColor: 'red',
        flexDirection: 'row'
    },
    userText: {
        fontWeight: '600',
        fontSize: 18,
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular
    },
    estimate: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    scrollView: {
        marginTop: hp('2%'),
        flex: 1, borderWidth: 0,
        backgroundColor: "#ffffff"
    },
    shopsubView: {

        flexDirection: 'row',
        marginHorizontal: hp('2%'),
        marginTop: hp('2%')
    },
    lineView: {
        borderBottomWidth: 0.5,
        marginTop: hp('2%'),
        marginHorizontal: hp('2%'),
        borderColor: '#EFEFEF'
    },
    time: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginTop: hp('0.5'),
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular
    },
    userProfile: {
        borderWidth: 0,
        marginTop: hp(2),
        borderColor: 'red',
        flexDirection: 'row',
        width: widthScreen / 1.12,
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    txt: {
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular
    },
    arrowImg: {
        borderColor: 'red',
        borderWidth: 0,
        justifyContent: 'center'
    },
    shopView: {
        borderBottomWidth: 0.7,
        marginHorizontal: hp('2%'),
        marginTop: hp('2.5%'),
        borderColor: '#EFEFEF'
    },
    profileimg: {
        height: 56,
        width: 56,
        // height: Platform.OS === 'ios' ?  hp(6.5) : hp(8),
        // width: Platform.OS === 'ios' ?  wp(14) : wp(15)

    },
    track: {
        alignSelf: 'center',
        width: wp('80%'),
        justifyContent: 'center'
    },
    rider: {
        marginTop: hp('0.5%'),
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular
    },
    leftarrowTouch: {
        height: hp('3%'),
        width: wp('3.5%')
    },
    trackText: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular
    },
    line: {
        height: hp('45%'),
        backgroundColor: '#D7D7D7',
        marginTop: hp('2%'),
        borderWidth: 0
    },
    touchchat: {
        justifyContent: 'center',
        // width: wp('9.5%'), 
        alignItems: 'center',
        // height: hp('4.5%'), 
        // height: Platform.OS === 'ios' ? hp(4.5) : hp(5.5),
        // width: Platform.OS === 'ios' ? wp(9.5) : wp(10),
        alignSelf: 'center',
        borderRadius: 5,
        borderColor: Colors.BtnBackground,
        borderWidth: 1,
        height: 38,
        width: 38
    },
    chaticon: {
        // height: hp('2.3%'), 
        // width: wp('4.7%')
        // height: Platform.OS === 'ios' ? hp(2.3) : hp(3),
        // width: Platform.OS === 'ios' ? wp(4.7) : wp(5),
        height: 24,
        width: 24
    },
    touchphone: {
        justifyContent: 'center',
        marginLeft: hp('1%'),
        // width: wp('9.5%'), 
        alignItems: 'center',
        // height: hp('4.5%'), 
        // height: Platform.OS === 'ios' ? hp(4.5) : hp(5.5),
        // width: Platform.OS === 'ios' ? wp(9.5) : wp(10),
        height: 38,
        width: 38,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: Colors.BtnBackground
    },
    phoneicon: {
        // height: Platform.OS === 'ios' ? hp(3) : hp(4),
        // width: Platform.OS === 'ios' ? wp(5) : wp(7.6),
        height: 24,
        width: 24
    },
    whatsappicon: {
        height: 24,

    },
    shop: {
        justifyContent: 'center',
        marginLeft: hp('1%'),
        //width: wp('9.5%'), 
        alignItems: 'center',
        // height: hp('4.5%'), 
        // height: Platform.OS === 'ios' ? hp(4.5) : hp(5.5),
        // width: Platform.OS === 'ios' ? wp(9.5) : wp(10),
        alignSelf: 'center',
        borderRadius: 6,
        backgroundColor: Colors.BtnBackground,
        height: 31,
        width: 31
    },
    shopicon: {
        height: 20,
        width: 20,
    },
    shopicon1: {
        tintColor: Colors.BtnBackground,
        height: 20,
        width: 20,
    },
    locate: {
        justifyContent: 'center',
        marginLeft: hp('1%'),
        // width: wp('9.5%'), 
        alignItems: 'center',
        //height: hp('4.5%'), 
        alignSelf: 'center',
        // height: Platform.OS === 'ios' ? hp(4.5) : hp(5.5),
        // width: Platform.OS === 'ios' ? wp(9.5) : wp(10),
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.BtnBackground,
        height: 31,
        width: 31
    }
})

export default Trackorder;