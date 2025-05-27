import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, fonts } from './Index';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const SimpleButton = ({ title, onPress, outerBox, btntitle }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8} onPress={onPress} style={[styles.CustomButton, outerBox]}>
            <View>
                <Text style={[styles.titletext, btntitle,]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SimpleButton;

const styles = StyleSheet.create({
    CustomButton: {
        width: widthPercentageToDP(92),
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        justifyContent: 'center',
        height: heightPercentageToDP(6)
    },
    titletext: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: fonts.PoppinsMedium,
        color: Colors.whitecolor,
        textAlign: 'center',
    },
})