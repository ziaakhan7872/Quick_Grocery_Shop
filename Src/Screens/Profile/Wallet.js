import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, } from 'react-native'
import { Colors, fonts, Header, Button, images } from "../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const Wallet = (props) => {

    return (
        <View style={{ backgroundColor: Colors.backgroundColor , flex: 1 }}>
            <View style={{ marginHorizontal: hp(2.5), marginTop: hp('6%') }}>
         
                <Header
                title={'Wallet'}
                onPress={() => props.navigation.goBack()}
                />
              
                <View style={styles.mainview}>
                    <Text style={styles.credettxt}>
                        {'Available Credit'}
                    </Text>
                    <Text style={styles.pricetxt}>{'Rs.'}{'0'}</Text>
                </View>
                <View style={styles.cardview}>
                    <Text style={styles.cardtxt}>Cards</Text>
                    <View style={styles.cardimg}>
                        <Image source={images.card} style={{ height: 46, width: 46 }} />
                        <Text style={styles.adtxt}>Add a card to enjoy seamless payment experience</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Addcard')} 
                    style={styles.addbtn}>
                        <Text style={styles.adcardtxt}>Add Card</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.transview}>
                    <Text style={styles.transtxt}>Transactions</Text>
                    <View style={styles.lastview}>

                        <Text style={styles.lasttxt}>You have no Transactions</Text>
                    </View>

                </View>
            </View>
        </View>
    )

}

export default Wallet;


const styles = StyleSheet.create({
    mainview: {
        flexDirection: 'row', marginTop: hp(4),
        backgroundColor: '#F8F8F8', height: hp(6), borderRadius: 10, alignItems: 'center'
    },
    lastview:{ flexDirection: 'row', marginTop: hp('3%'), alignItems: 'center', justifyContent: 'center' },
    transtxt:{ marginTop: hp('1%'), fontWeight: '600', fontSize: 15, color: Colors.grayText,fontFamily:fonts.PoppinsRegular, },
    transview:{ borderRadius: 10, height: 95, marginTop: hp('2%'),
     backgroundColor: '#F8F8F8', paddingHorizontal: hp('2%') },
    addbtn:{ borderColor: 'red', borderWidth: 0, height: 40, 
    justifyContent: 'center', width: wp(40),borderWidth:0, marginTop: 6 },
    adcardtxt:{ fontWeight: '600', fontSize: 15, color: Colors.BtnBackground,fontFamily:fonts.PoppinsRegular },
    adtxt:{ marginLeft: hp('1%'), width: wp('66%'), color:Colors.grayText,fontFamily:fonts.PoppinsRegular, borderWidth: 0,
     borderColor: 'red', lineHeight: 16.8, fontSize: 14, fontWeight: '400' },
    credettxt: {
        marginLeft: hp('2%'), fontWeight: '500',
        fontSize: 15, borderColor: 'blue', borderWidth: 0, width: wp('70%'), color: Colors.
            balckText, fontFamily: fonts.PoppinsRegular
    },
    pricetxt: {
        borderColor: 'blue', borderWidth: 0, width: wp('10%'), fontWeight: '500',
        fontSize: 15, color: Colors.balckText, fontFamily: fonts.PoppinsRegular
    },
    lasttxt:{ marginLeft: hp('2%'), width: wp('50%'), color: Colors.grayText,fontFamily:fonts.PoppinsRegular, justifyContent: 'center', alignItems: 'center' },
    cardview:{ borderRadius: 10, height: 140, marginTop: hp('2%'), 
    backgroundColor: '#F8F8F8', paddingHorizontal: hp('2%') },
    cardtxt:{ marginTop: hp('1%'), fontWeight: '600', fontSize: 15,
     color: Colors.grayText,fontFamily:fonts.PoppinsRegular },
     cardimg:{ flexDirection: 'row', marginTop: hp('2%'), justifyContent: 'center', alignItems: 'center' },
})