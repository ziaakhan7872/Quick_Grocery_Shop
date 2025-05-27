import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../Components/Container'
import images from '../../Components/Images'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { fonts } from '../../Constant/Fonts'
import Colors from '../../themes/colors'
import RowButtons from '../../Components/RowButtons'

const ShopQuick = ({ navigation }) => {
    return (
        <Container>
            <View style={styles.mainView}>
                <View style={{ height: heightPercentageToDP(10) }}></View>
                <Image source={images.bikeDelivery} style={styles.bikeDelivery} />
                <View style={styles.txtView}>
                    <Text style={styles.needText}>Need it? Shop Quick!</Text>
                    <Text style={styles.exploreText}>Explore a world of fresh, high-quality & affordable groceries with free delivery!</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: widthPercentageToDP(3), paddingBottom: widthPercentageToDP(4) }}>
                <RowButtons
                    titlebtn1={'Sign In'}
                    titlebtn2={'Sign Up'}
                    style={styles.btn}
                    onPressBtn1={() => {
                        navigation.navigate('Login')
                    }}
                    onPressBtn2={() => {
                        navigation.navigate('SignUp')

                    }}
                />
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('BottomTab')} style={{ marginBottom: widthPercentageToDP(4) }}>
                    <Text style={styles.LoginText}>Or Login as Guest</Text>
                </TouchableOpacity>
            </View>
        </Container >
    )
}

export default ShopQuick

const styles = StyleSheet.create({
    mainView: {
        // flex: 1,
        justifyContent: 'center'
    },
    bikeDelivery: {
        width: ('100%'),
        height: heightPercentageToDP(40)
    },
    txtView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    needText: {
        fontSize: 30,
        // fontWeight: '600',
        fontFamily: fonts.PoppinsSemiBold,
        color: Colors.Primary,
        textAlign: 'center',
        marginHorizontal: widthPercentageToDP(22),
        marginTop: '13%'
    },
    exploreText: {
        fontSize: 14,
        // fontWeight: '400',
        fontFamily: fonts.PoppinsRegular,
        color: Colors.grayText,
        marginHorizontal: widthPercentageToDP(10),
        textAlign: 'center',
        marginTop: '3%'
    },
    btn: {
        height: widthPercentageToDP(13.5)
    },
    LoginText: {
        fontSize: 12,
        fontFamily: fonts.PoppinsRegular,
        color: Colors.grayText,
        textAlign: 'center',
        marginTop: '3%'
    },
})