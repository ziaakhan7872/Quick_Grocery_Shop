import React from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, } from 'react-native'
import { Container, images, Button, fonts, Colors } from "../../Components/Index";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CheckEmail = (props) => {

  return (
    <Container style={{ backgroundColor: Colors.backgroundColor }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 75 }}>
        <Image source={images.mail} style={{ height: 274, width: 274 }} />
      </View>
      <View style={{ paddingHorizontal: hp('3%'), marginTop: hp(5), justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: Colors.balckText, fontFamily: fonts.PoppinsSemiBold, textAlign: 'center', fontSize: 20 }}>Check your Email</Text>
        <View style={{ marginTop: hp(1) }}>
          <Text style={{ color: Colors.grayText, fontFamily: fonts.PoppinsRegular, fontSize: 14, textAlign: 'center', width: wp(60) }}>We have sent a password recovery instructions to your email.</Text>
        </View>

      </View>
      <Button onPress={() => props.navigation.navigate('Login')}
        title={"OK"}
        btnContainer={{
          position: 'absolute',

          height: hp(6),
          bottom: hp(10)

        }}

      />


    </Container>
  )

}
const styles = StyleSheet.create({

  formViewtwo: {
    alignItems: 'center',
    marginTop: hp('4%'),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 10,
    borderColor: '#CFCFCF',
    borderWidth: 1,
    flexDirection: 'row'
  },
  emailiconimg: {
    marginLeft: hp(1),
    height: 24,
    width: 24,
    justifyContent: 'center'
  },
  signuptext: {
    fontSize: 13,
    color: 'black',
    marginLeft: hp(0.2)
  },
  button: {
    marginTop: hp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#53B175',
    width: wp('90%'),
    height: Platform.OS === 'ios' ? hp(5.5) : hp(7),
    borderRadius: 25,
    alignSelf: 'center'
  },
  buttontxt: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },
})
export default CheckEmail;