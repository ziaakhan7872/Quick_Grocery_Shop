import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, FlatList, Modal, Platform } from 'react-native'
import React, { useState, useEffect } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { images, Button, fonts, Colors, iconPath, Container, Header } from "../../Components/Index";
import Spacer from '../../Components/Spacer';
import { launchImageLibrary } from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import { _AxiosGetBearerAdmin } from '../../Apis/Apis';
import { useSelector } from 'react-redux';

const PaymentMethod = (props) => {
    console.log('props-=-=', props.route.params);
    const PaymentMethodList = props.route.params.PaymentMethodList;
    const Paymenttype = props.route.params.Paymenttype;
    const setPaymenttype = props.route.params.setPaymenttype;
    const [selectedType, setselectedType] = useState(Paymenttype)
    const [selectimage, setselectimage] = useState('')
    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });




    const onPressApply = async () => {
        props.navigation.goBack()
        // console.log("selectedType", selectedType)
        // if (selectedType == 'Cash On Delivery') {
        //     props.navigation.goBack()
        // } else {

        //     const formData = new FormData();
        //     if (selectimage != "") {
        //         var photo = {
        //             uri: selectimage.uri,
        //             type: selectimage.type,
        //             name: selectimage?.fileName ? selectimage.fileName : 'Reciept'
        //         };
        //         formData.append('profileImage', photo);

        //     } else {
        //         Toast.show('Please Upload Payment Reciept Or Screenshort.')
        //     }
        // }


    }


    const renderItem = ({ item, index }) => {
        const onPressUploadImage = async () => {
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
        return (
            <View>
                <TouchableOpacity onPress={() => { setPaymenttype(item.value), setselectedType(item.value) }} style={styles.standerdbtn}>
                    <Image
                        source={selectedType == item.value ? iconPath.radiocheck : iconPath.radiouncheck}
                        style={{ width: wp(5), height: wp(5) }}
                    />
                    <Text style={styles.text}>
                        {item.value}
                    </Text>
                </TouchableOpacity>
                {/* {item.value != 'Cash On Delivery' && selectedType != 'Cash On Delivery' &&
                    <View style={styles.flatlistcard}>
                        <View
                            style={styles.rowview}>
                            <Text style={styles.nametext}>
                                {'Bank Name'}
                            </Text>

                            <Text style={styles.heading}>
                                {'Meezan Bank'}
                            </Text>
                        </View>
                        <Spacer />
                        <View
                            style={styles.rowview}>
                            <Text style={styles.nametext}>
                                {'Account Name'}
                            </Text>

                            <Text style={styles.heading}>
                                {'Quick Grocery'}
                            </Text>
                        </View>


                        <View
                            style={styles.rowview2}>
                            <Text style={styles.nametext}>
                                {'Account Number'}
                            </Text>

                            <Text style={styles.heading}>
                                {'03118174957'}
                            </Text>
                        </View>
                        <View
                            style={styles.rowview2}>
                            <Text style={styles.nametext}>
                                {'Branch'}
                            </Text>

                            <Text style={styles.heading}>
                                {'G-15, Islamabad'}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={onPressUploadImage} style={styles.upladimage}>

                            <TouchableOpacity onPress={onPressUploadImage} style={styles.uploadbtn}>
                                {
                                    selectimage?.uri ?
                                        <Image source={{ uri: selectimage.uri }} style={{ width: wp(78), height: wp(78), marginBottom: hp(1), borderRadius: 12 }} /> :
                                        <>
                                            <Image
                                                source={iconPath.Upload}
                                                style={{ width: wp(8), height: wp(8), marginBottom: hp(1) }}
                                            />
                                            <Text style={styles.nametext}>
                                                {'Upload transaction screenshot'}
                                            </Text>
                                        </>
                                }

                            </TouchableOpacity>
                        </TouchableOpacity>

                    </View>} */}
            </View>
        )
    }
    return (
        <Container>
            <Header
                title={'Payment Method'}
                onPress={() => props.navigation.goBack()}
            />
            <View style={{ marginTop: hp(3), flex: 1 }}>

                <FlatList
                    data={PaymentMethodList}
                    keyExtractor={(item) => item.value}
                    renderItem={renderItem}
                />

            </View>

            <Button onPress={onPressApply}
                title={"Apply"}
                btnContainer={{
                    height: hp(6),
                    marginTop: hp(2)

                }}


            />
        </Container>
    )
}

export default PaymentMethod

const styles = StyleSheet.create({

    standerdbtn: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        padding: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(2),
        marginHorizontal: wp(4)
    },
    text: {
        marginLeft: 10,
        fontSize: 15,
        fontFamily: fonts.PoppinsRegular,
        color: Colors.balckText
    },

    nametext: {

        fontSize: 15,
        fontFamily: fonts.PoppinsRegular,
        color: '#848A8D'
    },
    heading: {

        fontSize: 15,
        fontFamily: fonts.PoppinsRegular,
        color: '#565656'
    },
    flatlistcard: {
        padding: 15,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: wp(4),
        marginTop: hp(2),
    },
    rowview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    rowview2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginTop: hp(2)
    },
    upladimage: {
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: hp(2)
    },
    uploadbtn: {
        alignItems: "center",
        justifyContent: "center"
    }
})