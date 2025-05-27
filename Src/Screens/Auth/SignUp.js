import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../Components/Container'
import images from '../../Components/Images'
import Colors from '../../themes/colors'
import { fonts } from '../../Constant/Fonts'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import InputField from '../../Components/InputField'
import Button from '../../Components/Button'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { SaveUserData, Saveuserislogin } from '../../Redux/Actions/Actions'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Platform } from 'react-native'
import appleAuthentication, { googleAuthentication } from '../../Helperfunctions';
import { _axiosPostAPIAUTH } from '../../Apis/Apis'
import Spacer from '../../Components/Spacer'
import Toast from 'react-native-simple-toast';



const SignUp = (props) => {

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
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
        setLoading(true);
        if (Platform.OS === 'ios') {
            loginWithApple();
        } else {
            loginWithgoogle();
        }
    };

    const loginWithgoogle = async () => {
        setLoading(true);
        googleAuthentication().then(res => {
            console.log("ressss", res)
            axios
                .post(`https://prod-api.quick.shop/auth/users-auth/googlesignin`, {
                    name: res?.user?.name,
                    imageUrl: res?.user?.photo ?? '',
                    email: res?.user?.email,
                    googleId: res?.idToken,
                }).then(response => {
                    let data = {
                        loginTime: Date.now()
                    };
                    data['userToken'] = response.data.data.accessToken;
                    data['refreshToken'] = response.data.data.refreshToken;

                    data['userData'] = response.data.data.user;
                    data['email'] = response.data.data.user?.email;
                    // props.SaveUserData(data);
                    dispatch(SaveUserData(data))

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

    const loginWithApple = async () => {
        try {
            setLoading(true);
            const res = await appleAuthentication();
            console.log("ressssssssssssss", res);
            const response = await axios.post(`https://prod-api.quick.shop/auth/users-auth/applesignin`, {
                name: res?.user?.name,
                email: res?.user?.email,
                appleId: res?.identityToken,
            });

            let data = {
                loginTime: Date.now(),
                userToken: response.data.data.accessToken,
                refreshToken: response.data.data.refreshToken,
                userData: response.data.data.user,
                email: response.data.data.user?.email,
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
        } else if (password === '' || !confirmPassword) {
            setApiError(true);
            setApiErrorMsg('Please Enter Password');
        } else if (password != confirmPassword) {
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
                        props.navigation.navigate('Login');
                        setLoading(false);
                    }
                    setUserName(''), setEmail(''), setPassword('');
                    setLoading(false);
                })
                .catch(err => {
                    console.log("error is this", err)
                    setLoading(false);
                    if (err) {
                        // console.log('err', err.data.message);
                        setApiError(true);
                        setApiErrorMsg(err.data.message);
                    } else {
                        setApiError(true);
                        setApiErrorMsg(err.error);
                    }
                });
        }
    };

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    <View style={styles.view}>
                        <View>
                            <Text style={styles.txt}>Sign Up</Text>
                            <Text style={styles.Credential}>
                                Enter your credentials to continue
                            </Text>
                        </View>

                        <View style={styles.formViewtwo}>
                            <Image source={images.userunfill} style={styles.emailiconimg} />
                            <TextInput
                                maxLength={35}
                                marginLeft={'3%'}
                                fontWeight={'600'}
                                value={userName}
                                placeholderTextColor={Colors.placeholder}
                                color={Colors.balckText}
                                placeholder='User name'
                                fontFamily={fonts.PoppinsSemiBold}
                                onChangeText={e => setUserName(e)}
                                width={widthPercentageToDP('100%')}
                            />
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
                                width={widthPercentageToDP('100%')}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <InputField
                                placeholder="Password"
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

                        <View style={styles.inputView}>
                            <InputField
                                placeholder="Confirm Password"
                                maxLength={25}
                                fontWeight={'500'}
                                secureText
                                leftIcon={true}
                                secureTextEntry={true}
                                value={confirmPassword}
                                onChangeText={e => setConfirmPassword(e)}
                                borderColor={Colors.borderColor}
                                placeholderTextColor={Colors.placeholder}
                                color={Colors.balckText}
                                fontFamily={fonts.PoppinsRegular}
                            />
                        </View>



                        <Button
                            onPress={() => registerUser()}
                            title={'Sign Up'}
                            btnContainer={{
                                marginTop: heightPercentageToDP(8),
                                padding: heightPercentageToDP(5),
                                bottom: heightPercentageToDP(1),
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
                    </View>
                    <Spacer />
                    {apiError ? (
                        <Text style={styles.apiError}>{apiErrorMsg}</Text>
                    ) : (
                        <Text style={styles.apiErrortxt}> {''}</Text>
                    )}
                    {/* <Loader loading={loading} /> */}
                </View>
            </TouchableWithoutFeedback>
        </Container>
    )
}

export default SignUp

const styles = StyleSheet.create({
    apiError: {
        color: 'red',
        fontSize: 13,
        // marginLeft: 12,
        textAlign: 'center',
        // marginHorizontal: wp(10),
    },
    apiErrortxt: {
        color: 'red',
        fontSize: 13,
        marginLeft: 12,
        textAlign: 'center',
    },
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
        marginLeft: heightPercentageToDP(1.5),
        height: 24,
        width: 24,
    },
    keyiconstyle: {
        alignItems: 'center',
        marginTop: heightPercentageToDP('2%'),
        height: heightPercentageToDP('6%'),
        borderRadius: 10,
        borderColor: '#CFCFCF',
        borderWidth: 1,
        flexDirection: 'row',
    },
    continuetxt: {
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
        marginLeft: heightPercentageToDP('1%'),
        marginRight: heightPercentageToDP('1%'),
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
    Credential: {
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: '400',
    },
    emailiconimg: {
        marginLeft: heightPercentageToDP(1),
        height: 24,
        width: 24,
        justifyContent: 'center',
        tintColor: Colors.BtnBackground,
    },
    formViewtwo: {
        alignItems: 'center',
        marginTop: heightPercentageToDP('4%'),
        height: Platform.OS === 'ios' ? heightPercentageToDP(6) : heightPercentageToDP(7),
        borderRadius: 10,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        flexDirection: 'row',
    },
    googletxt: {
        marginLeft: heightPercentageToDP('1%'),
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
    },
    appleText: {
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
    },
    touchstyle: {
        height: heightPercentageToDP('5%'),
        width: widthPercentageToDP('20%'),
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    txtfacebook: {
        marginLeft: heightPercentageToDP('1%'),
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
    },
    facebooktouch: {
        borderWidth: 0.2,
        marginTop: heightPercentageToDP('3%'),
        borderColor: '#929292',
        flexDirection: 'row',
        width: widthPercentageToDP('40%'),
        height: heightPercentageToDP('7%'),
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewtwo: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
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
    lastView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPercentageToDP('2%'),
    },
    noAccount: {
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
        fontSize: 12.5,
    },
    noAccount: {
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
        fontSize: 12.5,
    },
    signuptext: {
        fontSize: 13,
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular,
        marginLeft: heightPercentageToDP(0.2),
    },
    inputView: {
        marginTop: heightPercentageToDP(2),
    },
    lastMian: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightPercentageToDP(5),
        borderWidth: 0,
        borderColor: 'red',
    },
    continueMian: {
        borderColor: '#F0F0F0',
        borderWidth: 0.25,
        width: widthPercentageToDP('30%'),
        height: heightPercentageToDP('0%'),
    },
    facebook: {
        height: 24,
        width: 24,
    },
    apple: {
        height: widthPercentageToDP(8),
        width: widthPercentageToDP(8),
    },
})