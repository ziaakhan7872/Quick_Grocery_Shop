import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity, Platform, KeyboardAvoidingView, FlatList } from 'react-native'
import { Colors, fonts, Header, Button, images, Loader, iconPath } from "../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from "react-redux";
import { SaveUserData } from "../../Redux/Actions/Actions";
import { _updateProfile } from "../../Apis/Apis";
import { connect } from 'react-redux';
import { HorizontalSpacer } from "../../Components/Spacer";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

const Myprofile = (props) => {

    const dispatch = useDispatch()

    const userData = useSelector(response => {
        return response?.userdataReducer?.userData?.userData;
    });


    const refreshToken = useSelector(response => {
        return response?.userdataReducer?.userData?.refreshToken;
    });
    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });

    //   console.log(updateUserdata,'userData');
    const [enableshift, setenableshift] = useState(false)


    const [loading, setLoading] = useState(false)
    const [Iserror, setIserror] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')



    const [fullname, setfullname] = useState(userData?.name ? userData.name : '')
    const [email, setemail] = useState(userData?.email ? userData.email : '')
    const [phoneNumber, setphoneNumber] = useState(userData?.contactNo ? userData.contactNo : '')
    const [gender, setgender] = useState(userData?.gender ? userData.gender : '')
    const [ImageUrl, setImageUrl] = useState(userData?.imageUrl ? userData.imageUrl : '')
    const [selectimage, setselectimage] = useState('')
    const [isOpen, setIsOpen] = useState(false);




    const UpdateProfile = async () => {
        setIserror(false)
        try {
            if (!fullname) {
                setIserror(true)
                seterrorMessage('Please enter name')
            }
            else if (!email) {
                setIserror(true)
                seterrorMessage('Please enter email')
            }


            else if (!phoneNumber) {
                setIserror(true)
                seterrorMessage('Please enter Phone Number')
            }
            else if (!gender) {
                setIserror(true)
                seterrorMessage('Please enter gender')
            }
            else {
                setLoading(true)

                const formData = new FormData();
                formData.append('name', fullname);
                formData.append('gender', gender?.toLowerCase());
                formData.append('contactNo', phoneNumber);
                formData.append('email', email);
                if (selectimage != "") {
                    var photo = {
                        uri: selectimage.uri,
                        type: selectimage.type,
                        name: selectimage?.fileName ? selectimage.fileName : 'Profile'
                    };
                    formData.append('profileImage', photo);
                };
                console.log("form data", formData)
                await _updateProfile(formData, userToken)
                    .then(async response => {
                        console.log('users/profile update api response is', response?.data);


                        if (response.statusCode == 200) {

                            setLoading(false)
                            let data = {};
                            data['userToken'] = userToken;
                            data['refreshToken'] = refreshToken;
                            data['userData'] = response.data;
                            data['email'] = response.data.email;
                            await dispatch(SaveUserData(data))
                            props.navigation.navigate('Account')


                        }
                        else {

                            setLoading(false);
                            setIserror(true)
                            seterrorMessage(response?.message)
                        }

                    })
                    .catch(err => {
                        console.log('Err,', err);
                        setLoading(false);
                        setIserror(true)
                        seterrorMessage(err?.message)
                    });

            }

        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false);
        }
    };





    const ChosePhoto = async () => {
        try {
            let options = {
                options: 'photo',
                maxWidth: 500,
                maxHeight: 500,
                includeBase64: true

            }

            // You can also use as a promise without 'callback':
            const result = await launchImageLibrary(options);
            setselectimage(result.assets[0])

            console.log('resultresultresult', result);

        } catch (error) {
            console.log(error, 'errorerrorerrorerror');
        }
    }

    const genderData = [
        { label: 'Mr.', value: 'male' },
        { label: 'Ms.', value: 'female' },
    ];

    return (
        <KeyboardAwareScrollView behavior="position" enabled={enableshift} style={{ backgroundColor: Colors.backgroundColor, flex: 1 }} >
            <View >
                <View style={{ marginHorizontal: hp('3%'), marginTop: hp(Platform.OS == 'ios' ? 6 : 2) }}>

                    <Header
                        title={'My Profile'}
                        onPress={() => props.navigation.goBack()}
                    />
                    <View>

                        <View style={styles.profilemain}>

                            {ImageUrl != null && ImageUrl != '' && selectimage == '' ?
                                <View style={styles.profileview}>
                                    <Image
                                        source={{ uri: ImageUrl }}
                                        style={{ width: wp(35), height: wp(35), borderRadius: wp(20), resizeMode: 'cover' }}
                                    />
                                    <TouchableOpacity onPress={() => ChosePhoto()} style={styles.uploadbtn}>
                                        <Image
                                            source={images.Cameraprofile}
                                            style={{ width: wp(10), height: wp(10) }}
                                        />
                                    </TouchableOpacity>
                                </View>


                                :
                                selectimage == '' ?
                                    <View style={styles.profileview}>
                                        <Image
                                            source={images.userplaceholder}
                                            style={{ width: wp(20), height: wp(20), resizeMode: 'cover' }}
                                        />
                                        <TouchableOpacity onPress={() => ChosePhoto()} style={styles.uploadbtn}>
                                            <Image
                                                source={images.Cameraprofile}
                                                style={{ width: wp(10), height: wp(10) }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    : <View style={styles.profileview}>

                                        <Image
                                            source={{ uri: selectimage.uri }}
                                            style={{ width: wp(33), height: wp(33), borderRadius: wp(20), resizeMode: 'cover' }}
                                        />
                                        <TouchableOpacity onPress={() => ChosePhoto()} style={styles.uploadbtn}>
                                            <Image
                                                source={images.Cameraprofile}
                                                style={{ width: wp(10), height: wp(10) }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                            }
                        </View>


                        {Iserror &&

                            <Text style={{ color: 'red', fontSize: 14, alignSelf: "center" }}>{errorMessage}</Text>


                        }



                        <Text style={styles.name}>Full name</Text>
                        <View style={{ marginTop: hp('2'), flexDirection: 'row' }}>
                            <View style={styles.containerDropwdown}>

                                <Dropdown
                                    style={[styles.dropdown, isOpen && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={genderData}
                                    renderItem={(item) => (
                                        <Text style={{ color: Colors.black, padding: 10, paddingVertical: hp(2) }}>
                                            {item.label}
                                        </Text>
                                    )}

                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isOpen ? 'Select gender' : '...'}
                                    value={gender}
                                    onFocus={() => setIsOpen(true)}
                                    onBlur={() => setIsOpen(false)}
                                    onChange={item => {
                                        setgender(item.value);
                                        setIsOpen(false);
                                    }}
                                />
                            </View>

                            <HorizontalSpacer />

                            <View style={[styles.mainivputview, { marginTop: 0 }]}>

                                <TextInput
                                    placeholder="Name"
                                    maxLength={25}
                                    fontWeight={'400'}
                                    marginLeft={'3%'}
                                    width={wp('60%')}
                                    placeholderTextColor={Colors.placeholder}
                                    color={Colors.balckText}
                                    fontFamily={fonts.PoppinsRegular}
                                    onChangeText={setfullname}
                                    value={fullname}

                                />
                            </View>



                        </View>

                        <View style={{ marginTop: hp('1%') }}>
                            <Text style={styles.name}>Email Address</Text>
                            <View style={styles.mainivputview}>
                                <TextInput
                                    placeholder={"John_doe@gmail.com"}
                                    maxLength={45}
                                    value={email}
                                    fontWeight={'400'}
                                    marginLeft={'3%'}
                                    width={wp('100%')}
                                    onChangeText={setemail}
                                    placeholderTextColor={Colors.placeholder}
                                    color={Colors.balckText}
                                    fontFamily={fonts.PoppinsRegular}
                                />
                                {userData?.isEmailVerified &&
                                    <View style={styles.touch}>
                                        <Text style={styles.verifiedtxt}>Verified</Text>
                                    </View>
                                }
                            </View>
                        </View>



                        <View style={{ marginTop: hp('2%') }}>
                            <Text style={styles.name}>Phone Number</Text>
                            <View style={styles.mainivputview}>

                                <TextInput
                                    placeholder="+92 332 1234567"
                                    value={phoneNumber}
                                    onChangeText={setphoneNumber}
                                    width={wp('100%')}
                                    fontWeight={'400'}
                                    marginLeft={'3%'}
                                    maxLength={15}
                                    keyboardType="number-pad"
                                    placeholderTextColor={Colors.placeholder}
                                    color={Colors.balckText}
                                    fontFamily={fonts.PoppinsRegular}

                                />
                            </View>


                        </View>


                        {/* <View style={{ marginTop: hp('2%') }}>
                            <Text style={styles.name}>Gender</Text>
                            <View style={styles.mainivputview}>

                                <TextInput
                                    placeholder="male or female"
                                    maxLength={6}
                                    value={gender}
                                    width={wp('100%')}
                                    onChangeText={setgender}
                                    fontWeight={'400'}
                                    marginLeft={'3%'}
                                    placeholderTextColor={Colors.placeholder}
                                    color={Colors.balckText}
                                    fontFamily={fonts.PoppinsRegular}

                                />
                            </View>


                        </View> */}
                        {/* <View style={{ marginTop: hp('2%') }}>
                            <Text style={styles.name}>Date of Birth</Text>
                            <View style={styles.mainivputview}>

                                <TextInput
                                    placeholder={"12 Jan, 2021"}
                                    maxLength={12}
                                    placeholderTextColor={Colors.placeholder}
                                    color={Colors.balckText}
                                    fontFamily={fonts.PoppinsRegular}
                                    fontWeight={'400'}
                                    marginLeft={'3%'}
                                    onFocus={() => setenableshift(true)}
                                    width={wp(100)}
                                />
                            </View>


                        </View> */}

                        <Button onPress={() => UpdateProfile()}
                            title={"Save"}
                            btnContainer={{

                                height: hp(6),
                                marginTop: hp(4)

                            }}

                        />
                        <Button onPress={() => props.navigation.navigate('ChangePassword')}
                            title={"Change Password"}
                            btnContainer={{
                                backgroundColor: Colors.graybtnbg,
                                height: hp(6),
                                marginTop: hp(2)

                            }}
                            titleStyle={{
                                color: Colors.balckText
                            }}

                        />

                    </View>
                </View>
                <Loader loading={loading} />

            </View>
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
    containerDropwdown: {
        // padding: 16,
        width: wp(20),
        height: hp(6),
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000',
    },
    dropdown: {
        height: hp(6),
        color: Colors.black,
        borderColor: '#929292',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#aaa',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000000',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },

    itemText: {
        fontSize: 16,
        color: 'black'
    },
    item: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D9F0FA',
    },
    input: {
        borderWidth: 0,
        width: wp(77),
        height: hp(7),
        paddingLeft: 10,
    },
    inputview: {
        borderWidth: 1,
        marginTop: hp(1),
        marginHorizontal: wp(0),
        width: wp(87),
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 8,
        borderColor: '#E2E2E2',
        paddingRight: 10,
    },
    inputmainview: {
        borderWidth: 0,
        // marginTop: hp(2),
        marginHorizontal: wp(5),
        width: wp(17),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    mainivputview: {
        alignItems: 'center',
        height: hp('6%'),
        marginTop: hp('1%'), borderRadius: 10, borderColor: '#929292', borderWidth: 0.5, flexDirection: 'row', zIndex: 1
    },
    mainivputview1: {
        alignItems: 'center',
        height: hp('6%'),
        marginTop: hp('1%'),
        borderRadius: 10,
        borderColor: '#929292',
        borderWidth: 0.5,
        flexDirection: 'row'
    },
    name: { fontSize: 15, color: Colors.balckText, fontFamily: fonts.PoppinsSemiBold },
    profilemain: {
        marginTop: hp(2),
        // backgroundColor:'red'
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    changepass: {
        justifyContent: 'center',
        marginTop: hp('2%'),
        backgroundColor: '#EFEFEF',
        width: wp('85%'),
        // height: hp('6%'), 
        height: Platform.OS === 'ios' ? hp(6) : hp(7),
        borderRadius: 25,
        alignSelf: 'center'
    },
    touch: {
        width: wp('18%'),
        height: Platform.OS === 'ios' ? hp(3) : hp(4),
        justifyContent: 'center',
        backgroundColor: Colors.BtnBackground,
        borderRadius: 15
    }
    ,
    verifiedtxt: { color: Colors.whitecolor, fontFamily: fonts.PoppinsRegular, textAlign: 'center', fontWeight: '500' },
    profileview: {
        width: wp(35),
        height: wp(35),
        borderRadius: wp(20),
        borderColor: '#009DE0',
        borderWidth: 4,
        backgroundColor: "#EDF4F6",
        alignItems: "center",
        justifyContent: "center"
    },
    uploadbtn: {
        position: 'absolute',
        alignContent: "center",
        alignSelf: 'flex-end',
        bottom: -5
    }

})


const mapDispatchToProps = dispatch => {
    return {
        SaveUserData: data => dispatch(SaveUserData(data)),
    };
};



export default connect(null, mapDispatchToProps)(Myprofile);
