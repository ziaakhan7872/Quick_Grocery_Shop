import React, { useState } from "react"
import {
  View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, TextInput,
  Pressable, Modal, Alert
} from 'react-native'
import images from "../../Components/Images";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import InputField from "../../Components/InputField";

const ResetPass = ({ navigation }) => {

  const [hide, setHide] = useState(true)
  const [eye, seteye] = useState(true)
  const secureEntry = () => {
    setHide(!hide)

  }
  const showeyes = () => {
    seteye(!eye)
  }
  return (
    <View style={styles.container}>
      <Image source={images.colouredlogo} style={styles.mainicon}></Image>
      <View style={styles.resepassView}>
        <View>
          <Text style={styles.ResetPassTxt}>
            Reset Password
          </Text>
          <Text style={styles.newpassTxt}>Enter your new password</Text>
        </View>

        <View style={styles.inputView}>
          <InputField
            placeholder="New Password"
            maxLength={25}
            fontWeight={'500'}
            placeholderTextColor={'#C8C8C8'}
            secureText
            secureTextEntry={hide}
            onPress={secureEntry}
            borderColor={'red'}
            borderWidth={0}
          />
        </View>



        <View style={styles.inputViewto}>
          <InputField
            placeholder="Confirm Password"
            maxLength={25}
            fontWeight={'500'}
            placeholderTextColor={'#C8C8C8'}
            secureText
            secureTextEntry={eye}
            onPress={showeyes}
            borderColor={'red'}
            borderWidth={0}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('BottomTab')} style={styles.buttontouch}>
          <Text style={styles.submitTxt}>Submit</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  resepassView: {
    paddingHorizontal: hp('3%'),
    marginTop: hp('8%')
  },
  text: {
    color: 'blue',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  inputView: {

    marginTop: hp(3)
  },
  inputViewto: {

    marginTop: hp(2)
  },

  ResetPassTxt: {

    color: 'black',
    fontSize: 20,
    fontWeight: '600'
  },
  newpassTxt: {

    color: '#919191',
    fontSize: 14,
    marginTop: hp('1%')
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: wp('80%'),
    height: hp('30%'),
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: wp('1%'),
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,

  },
  buttonOpen: {
    backgroundColor: "black",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttontouch: {
    justifyContent: 'center',
    marginTop: hp('4%'),
    backgroundColor: '#53B175',
    width: wp('85%'),
    height: Platform.OS === 'ios' ? hp(5.5) : hp(7),
    borderRadius: 25,
    alignSelf: 'center'
  },
  iconimg: {
    marginLeft: hp(1.5),
    height: 24,
    width: 24,

    borderColor: 'red',
    borderWidth: 0,
    justifyContent: 'center'
  },
  mainicon: {
    alignSelf: 'center',
    marginTop: 76,

    height: 78.26,
    width: 67.3,

    borderColor: 'red',
    borderWidth: 0,
  },
  submitTxt: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },
})

export default ResetPass;