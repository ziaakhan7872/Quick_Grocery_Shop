import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { _axiosPostAPIAUTH, _axiosGetAPI } from '../../Apis/Apis';
import Loader from '../../Components/Loader';
import { connect } from 'react-redux';
import { SaveUserData, Saveuserislogin } from '../../Redux/Actions/Actions';
import { images, Container, Button, fonts, Colors } from '../../Components/Index';
import InputField from '../../Components/InputField';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import appleAuthentication, { googleAuthentication } from '../../Helperfunctions';
import axios from 'axios';

const Login = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // adnankhan3937@gmail.com
  // Adnan@#123
  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "617601541308-taavoa3q4m6gfdaf2u212ov2iifl2csh.apps.googleusercontent.com",
      offlineAccess: true
    })
  }, [])

  const login = async () => {

    if (Platform.OS === 'ios') {
      loginWithApple();
    } else {

      loginWithgoogle();
    }
  };

  const loginWithgoogle = async () => {

    googleAuthentication().then(res => {
      console.log("ressss:::::", res)
      axios
        .post(`https://prod-api.quick.shop/auth/users-auth/googlesignin`, {
          name: res?.user?.name,
          imageUrl: res?.user?.photo ?? '',
          email: res?.user?.email,
          googleId: res?.idToken,
        }).then(response => {
          setLoading(false);
          console.log('res::::::::::222', response);
          let data = {
            loginTime: Date.now()
          };

          data['userToken'] = response.data.data.accessToken;
          data['refreshToken'] = response.data.data.refreshToken;
          data['userData'] = response.data.data.user;
          data['email'] = response.data.data.user?.email;

          props.SaveUserData(data);
          props.navigation.replace('BottomTab');
          dispatch(Saveuserislogin(true));
          setLoading(false);
        }).catch(error => {
          setLoading(false);
          console.log("error", error)
        })
    }).catch(error => {
      setLoading(false);
      console.log("this is error", error)
    })
  };

  // const loginWithFacebook = async () => {
  //   setLoading(true);
  //   try {
  //     // Log in with Facebook
  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }

  //     // Get the access token
  //     const data = await AccessToken.getCurrentAccessToken();
  //     if (!data) {
  //       throw 'Something went wrong obtaining access token';
  //     }

  //     // Use the access token to authenticate with your backend
  //     const res = await axios.post(`https://prod-api.quick.shop/auth/users-auth/facebooksignin`, {
  //       accessToken: data.accessToken,
  //     });

  //     let responseData = {
  //       loginTime: Date.now(),
  //       userToken: res.data.data.accessToken,
  //       refreshToken: res.data.data.refreshToken,
  //       userData: res.data.data.user,
  //       email: res.data.data.user?.email,
  //     };

  //     // Save user data
  //     props.SaveUserData(responseData);
  //     props.navigation.replace('BottomTab');
  //     dispatch(Saveuserislogin(true));
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("Facebook login error", error);
  //   }
  // };

  const loginWithApple = async () => {
    try {
      setLoading(true);
      const res = await appleAuthentication();
      // console.log("ressssssssssssss", res);

      const response = await axios.post(`https://prod-api.quick.shop/auth/users-auth/applesignin`, {
        token: res?.identityToken,
        email: res?.user?.email,
        name: res?.user?.name,
        // name: 'Adnan Saleem',
        // email: 'adnansaleem3937@gmail.com',
        // appleId: 'eyJraWQiOiJUOHRJSjF6U3JPIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLnF1ZWNrby5wcm9kdWN0aW9uIiwiZXhwIjoxNzI0NzU3MDM2LCJpYXQiOjE3MjQ2NzA2MzYsInN1YiI6IjAwMDk3OC5lNmYwZWQ4OWUwYjc0NTgyOTFlY2Q2OTk2YzlhMTNkZC4wNzIwIiwibm9uY2UiOiI3ZWUyN2U3MjgzMjNmNDI5MThlMzhlOWU2MzVhZGU1YWFhMGM5MTY0YTY0OTkyZGZjNjUyOWMxMWY3NDMwZmZmIiwiY19oYXNoIjoiUThpREVIc29RRzhOaW11S243MEItUSIsImVtYWlsIjoiYWRuYW5raGFuMzkzN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXV0aF90aW1lIjoxNzI0NjcwNjM2LCJub25jZV9zdXBwb3J0ZWQiOnRydWV9.A2K1miQz_5f_5Q6Wxai1QPnilNXEM6Do3rp6EYUG5Na3zVE5V7ziztEUphEaX6BMLb3Z4G7dOU8C6UX3BxI6T8nbUieviFKo2BCIFoKooeLZgKVCn2oD2ssm-pZOB1rcaSuWftcCTWrm6yIjrPhm-hIjnoY_oDry46fUoby3c2RQTp6LchHjkwsmWX0rQnHN1rjaHkppM-jn2q8WiblOV7M2Ky4SOYUUlnH7xA367IFgoN5BrSfpTvUHghnrJRZtMmWCbJqwj1kuVJRChmzcDeFBOAA_JjxTwLhGxGvmNCf0LPEoMwwuXVZts35VIuaOuFOGmXWiZNyC1DUV6Gx0qQ',
      });

      console.log('====================================');
      console.log(response, 'responseresponseresponse');
      console.log('====================================');

      let data = {
        loginTime: Date.now(),
        userToken: response?.data?.data?.accessToken,
        refreshToken: response?.data?.data?.refreshToken,
        userData: response?.data?.data?.user,
        email: response.data?.data?.user?.email,
      };
      props.SaveUserData(data);
      props.navigation.replace('BottomTab');
      dispatch(Saveuserislogin(true));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

 const LoginFun = async () => {
  setApiError(false);

  // Validate input first
  if (!email || !password) {
    setApiError(true);
    setApiErrorMsg('Please enter both Email and Password');
    return;
  }

  setLoading(true);

  try {
    const payload = {
      email: email.toLowerCase().trim(),
      password: password
    };
    console.log(payload,"payload")

    const response = await _axiosPostAPIAUTH('users-auth/signin', payload);
    console.log('Login success:', response);

    const userData = {
      loginTime: Date.now(),
      userToken: response.data.data.accessToken,
      refreshToken: response.data.data.refreshToken,
      userData: response.data.data.user,
      email: response.data.data.email
    };

    dispatch(SaveUserData(userData));
    dispatch(Saveuserislogin(true));
    props.navigation.replace('BottomTab');

  } catch (err) {
    console.log('Login error:', err?.response || err);

    const errorMsg = err?.response?.data?.message || 'Maybe your credentials are invalid';
    setApiError(true);
    setApiErrorMsg(errorMsg);
  } finally {
    setLoading(false);
  }
};


  return (
    <Container style={{ backgroundColor: Colors.backgroundColor }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Image
            resizeMode="contain"
            source={images.loginIcon}
            style={styles.imgstyle}></Image>

          <View style={styles.view}>
            <View>
              <Text style={styles.txt}>Sign in</Text>
              <Text style={styles.Credential}>
                Enter your credentials to continue
              </Text>
            </View>
            <View style={styles.formViewtwo}>
              <Image source={images.emailicon} style={styles.emailiconimg} />
              <TextInput
                placeholder="Email Address"
                maxLength={35}
                marginLeft={'3%'}
                fontWeight={'600'}
                value={email}
                placeholderTextColor={Colors.placeholder}
                color={Colors.balckText}
                fontFamily={fonts.PoppinsRegular}
                onChangeText={e => setEmail(e)}
                width={wp('100%')}
              />
            </View>

            <View style={styles.inputView}>
              <InputField
                placeholder="New Password"
                maxLength={25}
                fontWeight={'500'}
                secureText
                leftIcon={true}
                secureTextEntry={true}
                value={password}
                onChangeText={e => setPassword(e)}
                borderColor={Colors.borderColor}
                placeholderTextColor={Colors.placeholder}
                color={Colors.balckText}
                fontFamily={fonts.PoppinsRegular}
              />
            </View>

            {apiError ? <Text style={styles.errorText}>{apiErrorMsg}</Text> : null}

            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={false}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Forgot Password</Text>
                    <Text style={{ color: '#929292', textAlign: 'center' }}>
                      {'We have sent you an URL to change your password to'}{' '}
                      {'john_doe@gmail.com'}
                    </Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setModalVisible(false),
                          props.navigation.navigate('ResetPass');
                      }}>
                      <Text style={styles.textStyle}>Ok</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={[styles.buttonss, styles.buttonOpen]}
                onPress={() => props.navigation.navigate('ForgetPass')}>
                <Text style={styles.textStyless}>Forgot Password</Text>
              </TouchableOpacity>
            </View>

            <Button
              onPress={() => LoginFun()}
              title={'Sign In'}
              btnContainer={{
                marginTop: hp(8),
                padding: hp(5),
                bottom: hp(1),
              }}
            />


            <View style={styles.lastMian}>
              <View style={styles.continueMian}></View>
              <Text style={styles.continuetxt}>Or continue with</Text>
              <View style={styles.googleView}></View>
            </View>


            {Platform.OS === 'ios' ?
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => login()}
                style={styles.googletouch}>
                <Image source={images.apple} style={styles.apple} />
                <Text style={styles.appleText}>Apple</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => login()}
                style={styles.googletouch}>
                <Image source={images.google} style={styles.facebook} />
                <Text style={styles.googletxt}>Google</Text>
              </TouchableOpacity>
            }

            <View style={styles.lastView}>
              <Text style={styles.noAccount}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('SignUp')}>
                <Text style={styles.signuptext}> Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
          <Loader loading={loading} />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    SaveUserData: data => dispatch(SaveUserData(data)),
  };
};
const mapStateToProps = state => {
  return {
    userData: state.userdataReducer.userData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  googletouch: {
    borderWidth: 0.2,
    marginTop: heightPercentageToDP('3%'),
    borderColor: '#929292',
    flexDirection: 'row',
    width: widthPercentageToDP(92),
    height: heightPercentageToDP('7%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
    flex: 1,
  },
  keyicon: {
    marginLeft: hp(1.5),
    height: 24,
    width: 24,
  },
  keyiconstyle: {
    alignItems: 'center',
    marginTop: hp('2%'),
    height: hp('6%'),
    borderRadius: 10,
    borderColor: '#CFCFCF',
    borderWidth: 1,
    flexDirection: 'row',
  },
  continuetxt: {
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: hp('1%'),
    marginRight: hp('1%'),
  },
  view: {
    paddingHorizontal: widthPercentageToDP(4),
    marginTop: heightPercentageToDP('8%'),
  },
  txt: {
    color: Colors.Primary,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 24,
    fontWeight: '600',
  },
  emailiconimg: {
    marginLeft: hp(1),
    height: 24,
    width: 24,
    justifyContent: 'center',
    tintColor: Colors.BtnBackground,
  },
  formViewtwo: {
    alignItems: 'center',
    marginTop: hp('4%'),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 10,
    borderColor: Colors.borderColor,
    borderWidth: 1,
    flexDirection: 'row',
  },
  googletxt: {
    marginLeft: hp('1%'),
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
  },
  appleText: {
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
    textAlign: 'center',
  },
  touchstyle: {
    height: hp('5%'),
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  txtfacebook: {
    marginLeft: hp('1%'),
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
  },
  facebooktouch: {
    borderWidth: 0.2,
    marginTop: hp('3%'),
    borderColor: '#929292',
    flexDirection: 'row',
    width: wp('40%'),
    height: hp('7%'),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewtwo: {

  },
  googleView: {
    borderColor: '#F0F0F0',
    borderWidth: 0.25,
    width: widthPercentageToDP('30%'),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  eye: {
    height: 24,
    width: 24,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: wp('90%'),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  continueMian: {
    borderColor: '#F0F0F0',
    borderWidth: 0.25,
    width: widthPercentageToDP('30%'),
    height: heightPercentageToDP('0%'),
  },
  button: {
    marginTop: hp('4%'),
    alignSelf: 'center',
    //borderBottomWidth:0.5,
    width: wp('60%'),
    height: hp('6%'),
    borderRadius: 10,
  },
  lastMian: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(5),
    borderWidth: 0,
    borderColor: 'red',
  },
  imgstyles: {
    marginLeft: hp(1.5),
    height: 24,
    width: 24,
    borderColor: 'red',
    borderWidth: 0,
  },
  signinTxt: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  viewto: {
    alignItems: 'center',
    marginTop: hp('5%'),
    height: hp('6%'),
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 1,
    flexDirection: 'row',
  },
  buttonss: {
    marginTop: hp('4%'),
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    // width: wp('30%'),
    height: hp('2.7%'),
    //borderRadius:10,
  },
  Credential: {
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
    fontWeight: '400',
  },
  buttonOpen: {
    // backgroundColor: "black",
    //borderBottomWidth:1,
  },
  buttonClose: {
    backgroundColor: '#53B175',
    borderRadius: 20,
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp('1.5%'),
    color: 'white',
    fontWeight: '500',
  },
  textStyless: {
    textAlign: 'center',
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    // borderColor:'red',
    // borderWidth:1,
    // width: wp('30%'),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    //lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  facebook: {
    height: 24,
    width: 24,
  },
  apple: {
    height: wp(8),
    width: wp(8),
  },
  imgstyle: {
    alignSelf: 'center',

    marginTop: hp(6),
    height: hp(8),
    width: wp(40),
  },
  touchbtn: {
    marginTop: hp('6%'),
    backgroundColor: '#53B175',
    width: wp('85%'),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginLeft: 12,
    textAlign: 'center',
    marginTop: hp(2),
  },
  lastView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('2%'),
  },
  noAccount: {
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 12.5,
  },
  signuptext: {
    fontSize: 12,
    color: Colors.black1,
    fontFamily: fonts.PoppinsRegular,
    marginLeft: hp(0.2),
  },
  inputView: {
    marginTop: hp(2),
  },
});
