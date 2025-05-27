import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { heightPercentageToDP } from "react-native-responsive-screen";
import { images, Container, Button, fonts, Colors, Loader } from "../../Components/Index";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { _axiosPostAPIAUTH } from "../../Apis/Apis";
const ForgetPass = (props) => {

  const [email, setEmail] = useState('');
  const [enableshift, setenableshift] = useState(false)
  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState('');

  const forgotPassword = async () => {

    setApiError(false);
    if (!email) {
      setApiError(true);
      setApiErrorMsg('Please Enter Email');
    }

    else {

      setLoading(true);

      await _axiosPostAPIAUTH('users-auth/forget-password', {
        "email": email.toLowerCase()
      })
        .then(async response => {
          setLoading(false);
          console.log('responseresponseresponseresponseresponseresponseresponse', response);
          props.navigation.navigate('CheckEmail')
        })
        .catch(err => {
          setLoading(false);
          console.log('Err, is this', err.data.message);
          setApiError(true);
          setApiErrorMsg(err.data.message);
        });
    }
  };


  return (
    <KeyboardAwareScrollView style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
      <View>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 75 }}>
          <Image source={images.forgetpass} style={{ height: 274, width: 274, }} />
        </View>
        <View style={{ paddingHorizontal: hp('3%'), marginTop: hp(5) }}>
          <Text style={{ color: Colors.balckText, fontFamily: fonts.PoppinsSemiBold, fontSize: 24, }}>Forgot your Password?</Text>
          <View style={{ marginTop: hp(1) }}>
            <Text style={{ color: Colors.grayText, fontFamily: fonts.PoppinsRegular, fontSize: 14, }}>Enter your registered email to receive password reset instructions.</Text>
          </View>

          <View style={styles.formViewtwo}>
            <Image source={images.emailicon} style={styles.emailiconimg} />
            <TextInput
              placeholder="Email Address"
              maxLength={45}
              marginLeft={'1%'}
              fontWeight={'600'}
              value={email}
              onChangeText={(e) => setEmail(e)}
              width={wp('100%')}
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
              onFocus={() => setenableshift(true)}
            />
          </View>

        </View>
        {apiError ? <Text style={styles.errorText}>{apiErrorMsg}</Text> : null}

        <Button onPress={() => forgotPassword()}
          title={"Send"}
          btnContainer={{

            marginTop: hp(10),
            height: hp(6),

          }}

        />

      </View>
      <Loader loading={loading} />

    </KeyboardAwareScrollView>


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
    justifyContent: 'center',
    tintColor: Colors.BtnBackground
  },
  signuptext: {
    fontSize: 13,
    color: 'black',
    marginLeft: hp(0.2)
  },
  button: {
    marginTop: hp('15%'),
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
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 12,
    textAlign: 'center',
    marginTop: hp(2)
  },
})

export default ForgetPass;