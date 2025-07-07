import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { style } from '../Style'
import images from '../../../Components/Images'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from '../../../themes/colors';
import { fonts } from '../../../Constant/Fonts';
import { iconPath } from '../../../Constant/Icons';
import { useNavigation } from '@react-navigation/native';


export const RenderOnlinePickUpDeliveryForm = ({DeliveryType, setDeliveryType,props}) => {
    const navigation = useNavigation()
    return (
        <View>
            <View style={style.subView}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
                    <View>
                        <Image source={images.leftarrow} style={{ height: hp('3%'), width: wp('3.5%') }} />
                    </View>
                    <View style={{ alignSelf: 'center', width: wp('80%'), justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 18, color: Colors.balckText, fontFamily: fonts.PoppinsRegular }}>Delivery Type</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setDeliveryType('Delivery')} style={style.standerdbtn}>
                <Image
                    source={DeliveryType == 'Delivery' ? iconPath.radiocheck : iconPath.radiouncheck}
                    style={{ width: wp(5), height: wp(5) }}
                />


                <Text style={style.text}>
                    {'Delivery'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeliveryType('PickpUp')} style={style.standerdbtn}>
                <Image
                    source={DeliveryType != 'Delivery' ? iconPath.radiocheck : iconPath.radiouncheck}
                    style={{ width: wp(5), height: wp(5) }}
                />


                <Text style={style.text}>
                    {'Pickup'}
                </Text>
            </TouchableOpacity>
        </View>

    )
}


