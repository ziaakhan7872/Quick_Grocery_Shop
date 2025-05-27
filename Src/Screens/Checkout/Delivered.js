import React,{useRef} from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, FlatList } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import {images,fonts,Colors,Header} from "../../Components/Index";


const Delivered = ({ navigation }) => {

    const refRBSheet = useRef();
    return (
        <View style={styles.mainView}>
            <View style={styles.subView}>
                <TouchableOpacity style={styles.headerMain} onPress={() => navigation.navigate('Trackorder')}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={images.leftarrow} style={styles.headerArrow} />
                    </View>
                    <View style={styles.trackView}>
                        <Text style={styles.trackTxt}>Track Order</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.lineView}>

            </View>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity onPress={() => navigation.navigate('Successfuldelivered')} style={styles.successtouch}>

                    <Text style={styles.deliver}>Delivery Has Arrived</Text>
                </TouchableOpacity>
                <View style={styles.profileMainView}></View>
                <View style={styles.profileSubView}>
                    <View style={styles.imgView}>
                        <Image source={images.Profilerider} style={styles.profileimg} />
                    </View>
                    <View style={styles.userMainView}>
                        <Text style={styles.nameTxt}>John Stewart</Text>
                        <Text style={styles.designation}>Rider</Text>
                    </View>
                    <View style={styles.messageView}>
                        <TouchableOpacity onPress={() => navigation.navigate('Message')} style={styles.touchchat}>
                            <Image source={images.chat} style={styles.chaticon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => refRBSheet.current.open()} style={styles.touchphone}>
                            <Image source={images.phone} style={styles.phoneicon} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.lineViews}></View>
                <View style={styles.shopMainView}>
                    <TouchableOpacity style={styles.shop}>
                        <Image source={images.shopicon} style={styles.shopicon} />
                    </TouchableOpacity>
                    <View style={styles.address}>
                        <Text style={styles.addresstxt}>101st Rd
                            Eureka, Nevada</Text>
                        <Text style={styles.locatetxt}>Store Location</Text>
                    </View>
                </View>
                <View style={styles.imglineView}>
                    <Image source={images.line} style={styles.imgStyle} />
                </View>
                <View style={styles.viewTouch}>
                    <TouchableOpacity style={styles.locate}>
                        <Image source={images.locations} style={styles.shopicon} />
                    </TouchableOpacity>
                    <View style={styles.styless}>
                        <Text style={styles.txt}>131st Rd
                            Eureka, Nevada</Text>
                        <Text style={styles.delivery}>Delivery Location</Text>
                    </View>
                </View>
            </ScrollView>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                // height={hp(60)}
                customStyles={{

                    wrapper: {
                        backgroundColor: "transparent",
                    },
                    draggableIcon: {
                        backgroundColor: "#CFCFCF",
                        width: wp('30%')
                    }
                }}
            >
                <View style={styles.lastView}>
                    <TouchableOpacity style={styles.borderCall}>
                        <TouchableOpacity style={styles.colourPhone}>
                            <Image source={images.colouredphone} style={styles.whatsView} />
                        </TouchableOpacity>
                        <Text style={styles.txtPhone}>Call on Phone</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.viewLast}></View>
                <View style={styles.viewLasttxt}>
                    <TouchableOpacity style={styles.touchimg}>
                        <TouchableOpacity style={styles.whatsappTouch}>
                            <Image source={images.whatsappicon} style={styles.whatsappicon} />
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
    headerMain: {
        flexDirection: 'row',
        borderWidth: 0,
        borderColor: 'red',
        height: hp('5%')
    },
    viewTouch: {
        flexDirection: 'row',
        marginHorizontal: hp('2%')
    },
    headerArrow: {
        height: hp('3%'),
        width: wp('3.5%')
    },
    styless: {
        borderWidth: 0,
        marginLeft: hp('1%'),
        borderColor: 'red',
        justifyContent: 'center',
        width: wp('80%')
    },
    imgStyle: {
        height: hp('3.5%'),
        width: wp('0.5%')
    },
    whatsView: {
        height: 24,
        width: 24,
    },
    txtPhone: {
        textAlign: 'center',
        marginLeft: hp('1%'),
        fontSize: 17,
        fontWeight: '400',
        color:'black'
    },
    borderCall: {
        flexDirection: 'row',
        marginHorizontal: hp('3%'),
        alignItems: 'center'
    },
    colourPhone: {
        justifyContent: 'center',
        width: wp('9%'),
        alignItems: 'center',
        height: hp('3.9%'),
        borderColor: 'red',
        borderWidth: 0,
        borderRadius: 5,
    },
    lastView: {
        borderColor: 'red',
        borderWidth: 0,
        marginTop: hp('3%')
    },
    delivery: {
        marginTop: hp('0.5%'),
        color: '#D0D0D0'
    },
    whatsappicon: {
        height: 24, 
       
    },
    whatsapp: {
        textAlign: 'center',
        marginLeft: hp('1%'),
        fontSize: 17,
        fontWeight: '400',
        color:'black'
    },
    touchimg: {
        flexDirection: 'row',
        marginHorizontal: hp('3%'),
        alignItems: 'center'
    },
    whatsappTouch: {
        justifyContent: 'center',
        width: wp('9%'),
        alignItems: 'center',
        height: hp('3.9%'),
        borderColor: 'red',
        borderWidth: 0,
        borderRadius: 5,
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
    imglineView: {
        marginHorizontal: hp('3%'),
        borderColor: 'red',
        borderWidth: 0,
        marginTop: hp('0%'),
        width: wp('10%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 16,
        color: 'black'
    },
    nameTxt: {
        fontWeight: '600',
        fontSize: 18,
        color:'black'
    },
    locatetxt: {
        marginTop: hp('0.5%'),
        color: '#D0D0D0'
    },
    lineViews: {
        borderBottomWidth: 0.7,
        marginHorizontal: hp('2%'),
        marginTop: hp('2.5%'),
        borderColor: '#EFEFEF'
    },
    shopMainView: {
        flexDirection: 'row',
        marginHorizontal: hp('2%'),
        marginTop: hp('2%')
    },
    messageView: {
        borderWidth: 0,
        borderColor: 'red',
        flexDirection: 'row'
    },
    address: {
        borderWidth: 0,
        marginLeft: hp('1%'),
        borderColor: 'red',
        justifyContent: 'center',
        width: wp('80%')
    },
    addresstxt: {
        color: 'black',
        fontSize: 16
    },
    userMainView: {

        borderWidth: 0,
        marginLeft: hp('1.5%'),
        borderColor: 'red',
        justifyContent: 'center',
        width: wp('48%')
    },
    trackView: {
        alignSelf: 'center',
        width: wp('80%'),
        justifyContent: 'center'
    },
    designation: {
        marginTop: hp('0.5%'),
        color: '#D0D0D0'
    },
    trackTxt: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 18,
        color: 'black'
    },
    scrollView: {
        marginTop: hp('2%')
    },
    successtouch: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    deliver: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: '600',
        color: 'black'
    },
    imgView: {
        borderWidth: 0,
        borderColor: 'red',
        justifyContent: 'center'
    },
    profileimg: {

        height:56,
        width:56
        // height: Platform.OS === 'ios' ? hp(6.5) : hp(8),
        // width: Platform.OS === 'ios' ? wp(14) : wp(16.2)
    },
    touchchat: {
        justifyContent: 'center',
        alignItems: 'center',
        // height: Platform.OS === 'ios' ? hp(4.5) : hp(5.5),
        // width: Platform.OS === 'ios' ? wp(9.5) : wp(10),
        alignSelf: 'center',
        borderRadius: 5,
        borderColor: 'green',
        borderWidth: 1,
        width:38,
        height:38
    },
    lineView: {
        height: hp('45%'),
        backgroundColor: '#D7D7D7',
        marginTop: hp('2%'),
        borderWidth: 0
    },
    profileMainView: {
        borderBottomWidth: 0.5,
        marginTop: hp('2%'),
        marginHorizontal: hp('2%'),
        borderColor: '#EFEFEF'
    },
    profileSubView: {
        borderWidth: 0,
        marginTop: hp('2%'),
        borderColor: 'red',
        flexDirection: 'row',
        marginHorizontal: hp('2%')
    },
    chaticon: {
        // height: hp('2.3%'), 
        // width: wp('4.7%')
        height: Platform.OS === 'ios' ? hp(2.3) : hp(3),
        width: Platform.OS === 'ios' ? wp(4.7) : wp(5),
    },
    touchphone: {
        justifyContent: 'center',
        marginLeft: hp('1%'),
        // width: wp('9.5%'), 
        alignItems: 'center',
        // height: hp('4.5%'), 
        // height: Platform.OS === 'ios' ? hp(4.5) : hp(5.5),
        // width: Platform.OS === 'ios' ? wp(9.5) : wp(10),
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: '#53B175',
        width:38,
        height:38
    },
    phoneicon: {
        // height: Platform.OS === 'ios' ? hp(3) : hp(4),
        // width: Platform.OS === 'ios' ? wp(5) : wp(6),
        width:24,
        height:24
    },
    whatsappicon: {
        // height: hp('4%'), 
        // width: wp('6.7%'),
        // height: Platform.OS === 'ios' ? hp(3) : hp(4),
        // width: Platform.OS === 'ios' ? wp(6.5) : wp(6.7),
        width:24,
        height:24
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
        backgroundColor: '#53B175',
        width:31,
        height:31
    },
    shopicon: {
        // height: hp('2.5%'), 
        // width: wp('5%'),
        // height: Platform.OS === 'ios' ? hp(2.5) : hp(3),
        // width: Platform.OS === 'ios' ? wp(5) : wp(5.5),
        width:20,
        height:20
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
        borderColor: 'green',
        width:31,
        height:31
    }
})


export default Delivered;