import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import {
  images,
  Container,
  Button,
  fonts,
  Colors,
  Loader,
} from '../../Components/Index';
import { _axiosPostAPIAUTH } from '../../Apis/Apis';
import { connect } from 'react-redux';
import InputField from '../../Components/InputField';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-simple-toast';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Register = props => {
  let navigation = props.navigation;
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confimPassword, setconfimPassword] = useState('');
  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setisFocused] = useState(false);
  const [isactive, setisactive] = useState('Username');
  const [user, setUser] = useState({});

  // ////////

  const [userInfo, setuserInfo] = useState({});


  const loginWithgoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      setUser(userInfo);
    } catch (error) {
      console.log('Message', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        // console.log('Some Other Error Happened');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };





  const registerUser = async () => {
    setApiError(false);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    if (userName === '') {
      setApiError(true);
      setApiErrorMsg('Please fill all fields');
    } else if (email === '') {
      setApiError(true);
      setApiErrorMsg('Please Enter Email');
    } else if (reg.test(email.trim()) === false) {
      setApiError(true);
      setApiErrorMsg('Please Enter Valid Email');
    } else if (password === '' || !confimPassword) {
      setApiError(true);
      setApiErrorMsg('Please Enter Password');
    } else if (password != confimPassword) {
      setApiError(true);
      setApiErrorMsg(`Password doesn't match`);
    } else {
      let data = {
        name: userName,
        email: email,
        password: password,
      };
      setLoading(true);
      console.log('data', data);
      await _axiosPostAPIAUTH('users-auth/signup', data)
        .then(res => {
          console.log('response of registration api====>>>>', res);
          if (res) {
            // let data = {}
            // data['email'] = email
            // data['password'] = password
            // data['username'] = userName
            // data['token'] = res.data.accessToken
            // props.SaveUserData(data)
            Toast.show(
              'Please Verify your email and Signin.',
              Toast.LONG,
            );
            navigation.navigate('Login');
            setLoading(false);
          }
          setuserName(''), setEmail(''), setPassword('');
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          if (err) {
            console.log('err', err.data.message);
            setApiError(true);
            setApiErrorMsg(err.data.message);
          } else {
            setApiError(true);
            setApiErrorMsg(err.error);
          }
        });
    }
  };

  const handleInputFocus = () => {
    setisFocused(true);
  };
  const handleInputBlur = () => {
    setisFocused(false);
  };
  const [hide, setHide] = useState(true);
  const [eye, seteye] = useState(true);
  const secureEntry = () => {
    setHide(!hide);
  };
  const showeyes = () => {
    seteye(!eye);
  };
  return (
    <Container style={{ backgroundColor: Colors.backgroundColor }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.subView}>
            <View>
              <Text style={styles.signupTxt}>Sign up</Text>
              <Text style={styles.Credentialtxt}>
                Enter your credentials to continue
              </Text>
            </View>

            <View>
              <View
                style={{
                  ...styles.formView,
                  borderColor:
                    isactive == 'Username'
                      ? Colors.BtnBackground
                      : Colors.borderColor,
                }}>
                <Image source={images.usericon} style={styles.formViewImg} />
                <TextInput
                  placeholder="Username"
                  maxLength={25}
                  marginLeft={'1%'}
                  fontWeight={'600'}
                  value={userName}
                  onChangeText={e => setuserName(e)}
                  width={wp('100%')}
                  color={Colors.balckText}
                  placeholderTextColor={Colors.placeholder}
                  fontFamily={fonts.PoppinsRegular}
                  onFocus={() => setisactive('Username')}
                />
              </View>
              <View
                style={{
                  ...styles.formViewtwo,
                  borderColor:
                    isactive == 'Email'
                      ? Colors.BtnBackground
                      : Colors.borderColor,
                }}>
                <Image source={images.emailicon} style={styles.emailiconimg} />
                <TextInput
                  placeholder="Email Address"
                  maxLength={45}
                  marginLeft={'1%'}
                  fontWeight={'600'}
                  value={email}
                  onChangeText={e => setEmail(e)}
                  width={wp('70%')}
                  color={Colors.balckText}
                  placeholderTextColor={Colors.placeholder}
                  fontFamily={fonts.PoppinsRegular}
                  onFocus={() => setisactive('Email')}
                />
              </View>

              <View style={styles.inputView}>
                <InputField
                  placeholder="New Password"
                  maxLength={25}
                  fontWeight={'500'}
                  secureText
                  secureTextEntry={hide}
                  onPress={secureEntry}
                  onChangeText={e => setPassword(e)}
                  color={Colors.balckText}
                  placeholderTextColor={Colors.placeholder}
                  fontFamily={fonts.PoppinsRegular}
                  onFocus={() => setisactive('New')}
                  borderColor={
                    isactive == 'New' ? Colors.BtnBackground : Colors.borderColor
                  }
                />
              </View>
              <View
                style={{
                  width: wp(90),
                  alignSelf: 'center',
                  marginLeft: wp(10),
                }}>
                {isFocused && password.length < 8 ? (
                  <Text
                    style={{
                      color: Colors.BtnBackground,
                      fontSize: 12,
                      marginTop: 3,
                    }}>
                    Password requires uppercase and lowercase letters, numbers and
                    special characters(min 8)
                  </Text>
                ) : null}
              </View>
              <View style={styles.inputViewto}>
                <InputField
                  placeholder="Confirm Password"
                  maxLength={25}
                  fontWeight={'500'}
                  secureText
                  secureTextEntry={eye}
                  onPress={showeyes}
                  color={Colors.balckText}
                  fontFamily={fonts.PoppinsRegular}
                  onChangeText={e => setconfimPassword(e)}
                  onFocus={() => setisactive('Confirm')}
                  borderColor={
                    isactive == 'Confirm'
                      ? Colors.BtnBackground
                      : Colors.borderColor
                  }
                  placeholderTextColor={Colors.placeholder}
                />
              </View>
            </View>

            <Button
              onPress={() => registerUser()}
              title={'Sign up'}
              btnContainer={{
                marginTop: hp(6),
                height: hp(6),
                bottom: hp(1),
              }}
            />

            {/* error message */}
            {apiError ? (
              <Text style={styles.apiError}>{apiErrorMsg}</Text>
            ) : (
              <Text style={styles.apiErrortxt}> {''}</Text>
            )}

            {/* <View style={styles.connectView}>
            <View style={styles.subconnectView}></View>
            <Text style={styles.connectWith}> Or connect with</Text>
            <View style={styles.subconnectView}></View>
          </View> */}
            {/* <View style={styles.googlemainView}>
            <TouchableOpacity
              onPress={() => loginWithgoogle()}
              style={styles.google}>
              <Image source={images.google} style={styles.facebook} />
              <Text style={styles.googletxt}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => loginWithFb()}
              style={styles.button}>
              <Image source={images.facebook} style={styles.facebook} />
              <Text style={styles.facebooktxt}>Facebook</Text>
            </TouchableOpacity>
          </View> */}
            <View style={styles.lastmainView}>
              <Text style={styles.accountText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signinTxt}> Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Loader loading={loading} />
        </View>

      </TouchableWithoutFeedback>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {},
  subView: {
    paddingHorizontal: hp('3%'),
    marginTop: hp(2),
  },
  signupTxt: {
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 20,
    fontWeight: '500',
    marginTop: hp('5%'),
  },
  Credentialtxt: {
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 12,
    marginTop: hp('1%'),
  },
  apiError: {
    color: 'red',
    fontSize: 13,
    // marginLeft: 12,
    textAlign: 'center',
    marginHorizontal: wp(10),
  },
  apiErrortxt: {
    color: 'red',
    fontSize: 13,
    marginLeft: 12,
    textAlign: 'center',
  },
  formViewImg: {
    tintColor: Colors.BtnBackground,
    marginLeft: hp(1),
    height: 24,
    width: 24,
    justifyContent: 'center',
  },
  emailiconimg: {
    marginLeft: hp(1),
    height: 24,
    width: 24,
    justifyContent: 'center',
    tintColor: Colors.BtnBackground,
  },
  keyicon: {
    marginLeft: hp(1),
    height: 24,
    width: 24,
    justifyContent: 'center',
    tintColor: Colors.BtnBackground,
  },
  eyeicon: {
    height: hp('5%'),
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  inputViewto: {
    marginTop: hp(2),
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  facebook: {
    height: 24,
    width: 24,
  },
  inputView: {
    marginTop: hp(2),
  },
  imgstyle: {
    height: Platform.OS === 'ios' ? hp(14) : hp(16.5),
    width: Platform.OS === 'ios' ? wp(26) : wp(23.5),
  },
  button: {
    borderWidth: 0.2,
    marginTop: hp('3%'),
    borderColor: '#929292',
    flexDirection: 'row',
    width: Platform.OS === 'ios' ? wp(40) : wp(40),
    height: hp('7%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('2%'),
  },
  touchbtn: {
    justifyContent: 'center',
    marginTop: hp('8%'),
    backgroundColor: '#53B175',
    width: wp('90%'),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
  },
  touchbtnTxt: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  formView: {
    alignItems: 'center',
    marginTop: hp('5%'),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 10,

    borderWidth: 1,
    flexDirection: 'row',
  },
  formViewtwo: {
    alignItems: 'center',
    marginTop: hp('2%'),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 10,

    borderWidth: 1,
    flexDirection: 'row',
  },
  connectView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
  },
  subconnectView: {
    borderColor: '#F0F0F0',
    borderWidth: 0.25,
    width: wp('30%'),
    height: hp('0%'),
  },
  connectWith: {
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: hp('1%'),
    marginRight: hp('1%'),
  },
  googlemainView: {
    flexDirection: 'row',
  },
  googletxt: {
    marginLeft: hp('1%'),
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
  },
  google: {
    borderWidth: 0.2,
    marginTop: hp('3%'),
    borderColor: '#929292',
    flexDirection: 'row',
    width: Platform.OS === 'ios' ? wp(40) : wp(40),
    height: Platform.OS === 'ios' ? hp(7) : hp(7),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebooktxt: {
    marginLeft: hp('1%'),
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
  },
  lastmainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
  },

  accountText: {
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 12.5,
  },
  signinTxt: {
    fontSize: 13,
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: hp(0.2),
  },
});
export default Register;
