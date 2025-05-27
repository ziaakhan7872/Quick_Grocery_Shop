import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import images from "../../Components/Images";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const Successfuldelivered = ({ navigation }) => {

    return (
        <View style={styles.mainView}>
            <View>
                <Image source={images.success} style={styles.success} />
            </View>
            <View>
                <View style={styles.viewTxt}>
                    <Text style={styles.txt}>Lorem ipsum dolor sit amet</Text>
                </View>
                <View style={styles.subView}>
                    <Text style={styles.subviewTxt}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</Text>
                </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.subtotalView}>
                <Text style={styles.subtotalviewTxt}>Subtotal</Text>
                <Text style={styles.pricetxt}>Rs. 410</Text>
            </View>
            <View style={styles.deliverchargeView}>
                <Text style={styles.deliverchargeTxt}>Delivery Charge</Text>
                <Text style={styles.price}>Rs. 100</Text>
            </View>
            <View style={styles.taxView}>
                <Text style={styles.tax}>Tax</Text>
                <Text style={styles.price}>Rs. 50</Text>
            </View>
            <View style={styles.lineView}></View>
            <View style={styles.totalMainnView}>
                <Text style={styles.totalTxt}>Total</Text>
                <Text style={styles.price}>Rs. 560</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.touchbtn}>
                <Text style={styles.backtoHome}>Back to Home</Text>
            </TouchableOpacity>

        </View>
    )

}
const styles = StyleSheet.create({

    mainView: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    subtotalView: {
        borderColor: 'red',
        marginTop: hp('3%'),
        borderWidth: 0,
        flexDirection: 'row',
        marginHorizontal: hp('2.5%'),
        justifyContent: 'space-between'
    },
    subtotalviewTxt: {
        fontWeight: '500',
        color: '#C5C5C5'
    },
    lineView: {
        borderBottomWidth: 0.7,
        marginHorizontal: hp('2%'),
        marginTop: hp('3%'),
        borderColor: '#CFCFCF'
    },
    backtoHome: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500'
    },
    price: {
        color: 'green',
        fontWeight: '500'
    },
    totalMainnView: {
        borderColor: 'red',
        marginTop: hp('2%'),
        borderWidth: 0,
        flexDirection: 'row',
        marginHorizontal: hp('2.5%'),
        justifyContent: 'space-between'
    },
    totalTxt: {
        fontWeight: '600',
        color: 'black',
        fontSize: 15
    },
    pricetxt: {
        color: 'black'
    },
    price: {
        color: 'black'
    },
    success: {
        height: 135.85,
        width: 135.85,
        //  width: Platform.OS === 'ios' ?  wp(32.5) : wp(30),
        //  height: Platform.OS === 'ios' ?  hp(15) : hp(18),
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: hp('10%')

    },
    taxView: {
        borderColor: 'red',
        marginTop: hp('1%'),
        borderWidth: 0,
        flexDirection: 'row',
        marginHorizontal: hp('2.5%'),
        justifyContent: 'space-between'
    },
    tax: {
        fontWeight: '500',
        color: '#C5C5C5'
    },
    deliverchargeView: {

        borderColor: 'red',
        marginTop: hp('1%'),
        borderWidth: 0,
        flexDirection: 'row',
        marginHorizontal: hp('2.5%'),
        justifyContent: 'space-between'
    },
    deliverchargeTxt: {
        fontWeight: '500', color: '#C5C5C5'
    },
    viewTxt: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('3.5%')
    },
    txt: {
        fontSize: 19,
        fontWeight: '600',
        color: 'black'
    },
    line: {
        borderBottomWidth: 0.5,
        marginTop: hp('3%'),
        marginHorizontal: hp('2%'),
        borderColor: '#CFCFCF'
    },
    subView: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('1%'),
        width: wp('80%'),
        borderWidth: 0,
        borderColor: 'red'
    },
    subviewTxt: {
        textAlign: 'center',
        color: '#969696'
    },
    touchbtn: {
        justifyContent: 'center',
        marginTop: hp('25%'),
        backgroundColor: '#4CAE6F',
        width: wp('85%'),
        height: Platform.OS === 'ios' ? hp(6) : hp(7),
        borderRadius: 25,
        alignSelf: 'center'
    },
})
export default Successfuldelivered;