import { StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from "../../themes/colors";
import { fonts } from "../../Constant/Fonts";

export const style = StyleSheet.create({
    container:{

    },
    flatliststyle: {
            width: wp(44),
            paddingVertical: wp(1),
            borderColor: '#CFCFCF',
            borderRadius: 10,
            borderWidth: 0.5,
        },
    
        flatlistimg: {
            height: wp(40),
            width: wp(40),
            borderRadius: 30,
            tintColor: '#E6F6FC',
            alignSelf: 'center',
        },
        ScrollViewlast: {
        backgroundColor: Colors.BtnBackground,
        borderRadius: 10,
        height: hp(3.21),
        width: wp(16.51),
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'red',
        borderWidth: 0,
    },
    ScrollMainView2: {

        justifyContent: 'center',

    },
     flatlistimg: {
        height: wp(40),
        width: wp(40),
        borderRadius: 30,
        tintColor: '#E6F6FC',
        alignSelf: 'center',
    },
    ScrollSubView: {
        flexDirection: 'row',

        paddingHorizontal: wp('3%'),
    },
    ScrollLastView: {
        justifyContent: 'center',

    },

     ScrollViewText: {
            fontWeight: '600',
            fontSize: 14,
            color: '#264653',
            fontFamily: fonts.PoppinsRegular,
        },
})