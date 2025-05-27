import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import { images, Colors, fonts, Header, Button, Loader } from '../../Components/Index';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { _axiosPatchApiAUTH } from '../../Apis/Apis';
import InputField from '../../Components/InputField';
import { useSelector } from "react-redux";
import Spacer from '../../Components/Spacer';

const ChangePassword = props => {

  const userToken = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });

  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState('');

  const [currentPassword, setcurrentPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const Changepass = async () => {
    setApiError(false);
    setApiErrorMsg('')
    if (!currentPassword) {
      setApiError(true);
      setApiErrorMsg('Please Enter current Password');
    } else if (!newPassword) {
      setApiError(true);
      setApiErrorMsg('Please Enter new Password');
    } else if (!confirmPassword) {
      setApiError(true);
      setApiErrorMsg('Please Enter confirm Password');
    } else if (newPassword != confirmPassword) {
      setApiError(true);
      setApiErrorMsg('Password not Match');
    } else {
      setLoading(true);
      let data = {
        currentPassword,
        newPassword,
        confirmPassword,
      }
      await _axiosPatchApiAUTH('users/password', data,
        userToken)
        .then(async response => {
          setLoading(false);
          props.navigation.navigate('BottomTab', {
            screen: 'Account'
          });
        })
        .catch(err => {
          setLoading(false);
          console.log('Err,', err.response.data);
          setApiError(true);
          setApiErrorMsg(err.response.data.message);
        });
    }
  };

  return (
    <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
      <View style={{ marginHorizontal: hp('3%'), marginTop: hp('6%') }}>
        <Header
          title={'Change Password'}
          onPress={() => props.navigation.goBack()}
        />
        <View style={{ marginTop: hp('2%') }}>
          <Text style={styles.inputtxt}>Current Password</Text>
          <View style={styles.inputmain}>
            <InputField
              placeholder="**************"
              maxLength={25}
              fontWeight={'500'}
              secureText
              secureTextEntry={true}
              value={currentPassword}
              onChangeText={setcurrentPassword}
              borderColor={Colors.borderColor}
              placeholderTextColor={Colors.balckText}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
            />
          </View>
          <Text style={styles.inputtxt}>New Password</Text>
          <View style={styles.inputmain}>
            <InputField
              placeholder="**************"
              maxLength={25}
              fontWeight={'500'}
              secureText
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setnewPassword}
              borderColor={Colors.borderColor}
              placeholderTextColor={Colors.balckText}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
            />
          </View>
          <Text style={styles.inputtxt}>Confirm New Password</Text>
          <View style={styles.inputmain}>
            <InputField
              placeholder="**************"
              maxLength={25}
              fontWeight={'500'}
              secureText
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setconfirmPassword}
              borderColor={Colors.borderColor}
              placeholderTextColor={Colors.balckText}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
            />
          </View>
          <Spacer height={hp(10)} />
          <Button
            onPress={() => Changepass()}
            title={'Change Password'}
            btnContainer={{
              // position: 'absolute',
              height: hp(6),
              // bottom: hp(8),
            }}
          />
        </View>
        {apiError && <View style={{ alignItems: "center", marginTop: hp(5) }}>
          <Text style={{ color: 'red', fontSize: 14 }}>{apiErrorMsg}</Text>


        </View>}

      </View>

      <Loader loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputtxt: {
    fontSize: 14,
    color: Colors.grayText,
    fontWeight: '500',
    marginTop: hp(3),
  },
  inputmain: {
    alignItems: 'center',
    marginTop: hp('1%'),
    height: hp('6%'),
    borderRadius: 10,
    borderColor: '#CFCFCF',
    borderWidth: 1,
    flexDirection: 'row',
  },
  eyeicon: {
    height: hp('5%'),
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
export default ChangePassword;
