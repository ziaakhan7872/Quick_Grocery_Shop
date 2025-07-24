import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from 'react-native'
import { Button, Colors, fonts, Header, images, Loader } from "../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { _AxiosGetBearerAUTH, DeleteUserAxious } from "../../Apis/Apis";
import Spacer from "../../Components/Spacer";
import axios from "axios";
import { getcartData } from "../../Helperfunctions";
import { addTOcart } from "../../Components/Additemstocart";
import Geolocation from '@react-native-community/geolocation';


const OrderInfo = (props) => {
    const prodec = props.route.params.item
    const [orderDetail, setorderDetail] = useState([])
    const [cart, setCart] = useState([])
    const [loading, setloading] = useState(false)
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')

    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });


    const CartData = () => {
        getcartData(data => {
            setCart(data)
        })
    }


    useEffect(() => {
        getOrderdetail()
        CartData()

    }, [])



    const getOrderdetail = async () => {
        try {
            setloading(true)

            await _AxiosGetBearerAUTH(`users/my-order/${prodec.id}`, userToken)
                .then(async response => {
                    console.log('orderhistory', JSON.stringify(response.data));
                    setorderDetail(response.data)
                    setloading(false)
                })
                .catch(err => {
                    console.log('Err,from placeorder', err?.response?.data?.message);
                    setloading(false)
                });
            // props.navigation.navigate('Successfulorder')
        } catch (error) {
            setloading(false)
        }
    }
// `https://api.quick-shop.pk/auth/users/my-order/${orderDetail?.id}`
    const onPressDelete = () => {
        setloading(true)
       DeleteUserAxious(`users/my-order/${orderDetail?.id}`,userToken).then(res => {
            setloading(false)

            console.log("res", JSON.stringify(res?.data))
            props.navigation.navigate('Account')
        }).catch(error => {
            setloading(false)

            console.log("error", error)
        })
    }

    const onPressRepeat = async () => {
        setloading(true)

        orderDetail?.orderLines?.map(async (item) => {
            if (item?.quantity > (item?.product?.quantity - item?.product?.outOfStockThreshold)) {

            } else {
                await addTOcart(
                    item?.product?.id,
                    item?.product?.imageUrl,
                    item?.product?.name,
                    item?.quantity,
                    item?.product?.price,
                    item?.product?.quantity - Number(item?.product?.outOfStockThreshold),
                )
            }


        })
        setTimeout(() => {
            setloading(false)
            props.navigation.navigate('Checkout')

        }, 1900);



    }

    useEffect(() => {
        getOneTimeLocation()
    }, [])



    const getOneTimeLocation = () => {

        Geolocation.getCurrentPosition(
            //Will give you the current location
            position => {

                //getting the Longitude from the location json
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                setLongitude(currentLongitude)
                setLatitude(currentLatitude)
                console.log("currentLongitudecurrentLongitude", currentLongitude, currentLatitude)
            })
    };

    const handleNavigate = () => {




        // Construct Google Maps URL
        const googleMapsUrl = `google.navigation:q=${"33.64485244270809"},${"73.02109845239706"}&mode=d`;

        // Check if the device can open the Google Maps app
        Linking.canOpenURL('google://').then((supported) => {
            if (supported) {
                console.log("supported")
                // Open Google Maps app with directions
                Linking.openURL(googleMapsUrl);
            } else {
                if (latitude && longitude) {
                    // If the app is not installed, open the browser
                    const webUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${"33.64485244270809"},${"73.02109845239706"}&travelmode=driving`;
                    Linking.openURL(webUrl);
                } else {
                    Toast.show('Please give permission of current location to find best routes')
                }

            }
        }).catch((err) => {
            console.error("Error opening Google Maps: ", err);
        });
    };



    return (
        <View style={styles.maincont}>
            <ScrollView>
                <View style={styles.subview}>
                    <Spacer />

                    <Header
                        title={'Order Detail'}
                        onPress={() => props.navigation.goBack()}
                        righticon={images.remove}
                        onrightPress={onPressDelete}

                    />
                    <View style={styles.cardview}>
                        <View style={styles.subcard}>
                            <View style={{ width: wp('6%'), justifyContent: 'center' }}>
                                <Image source={images.locationlight} style={{ width: wp('4.5%'), height: hp('2.5%'), tintColor: Colors.BtnBackground }} />
                            </View>
                            <View style={styles.deleveryview}>
                                <Text style={styles.deleverytxt}>Delivery Address</Text>

                            </View>

                        </View>
                        <View style={styles.adresview}>
                            <Text style={styles.adrestxt}>{orderDetail?.address?.address}</Text>

                        </View>
                    </View>
                </View>
                <View style={{ marginTop: wp(4), marginHorizontal: wp(1) }}>

                    <View style={{ borderWidth: 1.15, marginHorizontal: wp(5), borderColor: "#E2E2E2", borderRadius: 12 }}>

                        {orderDetail?.orderLines?.map((item, index) => {
                            console.log("first")
                            return (
                                <View style={styles.flatlistmain}>
                                    <View style={styles.imagename}>

                                        <View style={{ width: wp(12), height: wp(12), borderWidth: 1, borderColor: Colors.borderColor, borderRadius: wp(8), alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                source={{ uri: item?.product?.imageUrl }}
                                                style={{ width: wp(10), height: wp(10), borderRadius: wp(8) }}
                                            />
                                        </View>
                                        <View>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.productname}>
                                                {item?.product?.name?.length < 12 ? item?.product?.name : item?.product?.name?.slice(0, 12) + "..."}
                                            </Text>

                                            {/* <Text style={styles.quantity}>
                                            {item?.product}
                                        </Text> */}
                                        </View>

                                    </View>

                                    <Text style={styles.price}>
                                        Rs.{item?.price}
                                    </Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={styles.rowtxtview}>
                        <Text style={styles.headintxt}>Order number
                        </Text>
                        <Text style={styles.restxt}>{orderDetail?.id}</Text>
                    </View>
                    <View style={styles.rowtxtview}>
                        <Text style={styles.headintxt}>Payment method</Text>
                        <Text style={styles.restxt}>{orderDetail?.paymentType?.value}</Text>
                    </View>
                    {/* <View style={{ borderBottomColor: '#CFCFCF', borderBottomWidth: 0.5, marginTop: hp('2.5%'), marginHorizontal: hp('3%') }}></View> */}

                    <View style={styles.rowtxtview}>
                        <Text style={styles.headintxt}>Subtotal</Text>
                        <Text style={styles.restxt}>Rs.{orderDetail?.total}</Text>
                    </View>
                    <View style={styles.rowtxtview}>
                        <Text style={styles.headintxt}>Delivery Charges</Text>
                        <Text style={styles.restxt}>Rs.{orderDetail?.deliveryFee}</Text>
                    </View>

                    <View style={{ borderBottomColor: '#CFCFCF', borderBottomWidth: 0.7, marginTop: hp('2.5%'), marginHorizontal: hp(3) }}></View>
                    <View style={styles.rowtxtview}>
                        <Text style={styles.headintxt}>Total</Text>
                        <Text style={styles.restxt}>Rs.{Number(orderDetail?.total) + Number(orderDetail?.deliveryFee)}</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Button title={'Repeat Order'} onPress={onPressRepeat} />

                <Text onPress={handleNavigate} style={{ textAlign: 'center', fontSize: 16, fontWeight: '700' }}>Store Locator</Text>
                <Spacer height={hp(4)} />


            </View>

            <Loader loading={loading} />

        </View>
    )

}
const styles = StyleSheet.create({
    maincont: { backgroundColor: Colors.backgroundColor, flex: 1 },
    subview: { marginHorizontal: hp('3%'), marginTop: hp('6%') },
    cardview: {
        borderWidth: 1, paddingHorizontal: hp('2%'), borderRadius: 10,
        paddingBottom: hp('2%'), borderColor: '#CFCFCF', marginTop: hp('5%')
    },
    subcard: { flexDirection: 'row', marginTop: hp('2%'), borderWidth: 0, borderColor: 'red' },
    deleveryview: { width: wp('67%'), borderWidth: 0, borderColor: 'red', justifyContent: 'center' },
    deleverytxt: { color: Colors.BtnBackground, fontFamily: fonts.PoppinsRegular, fontSize: 15.5, fontWeight: '500' },
    adresview: { width: wp('72%'), marginTop: hp('1%'), borderWidth: 0, borderColor: 'red', justifyContent: 'center' },
    adrestxt: { color: Colors.grayText, fontFamily: fonts.PoppinsRegular, fontSize: 14, fontWeight: '400' },
    rowtxtview: {
        borderColor: 'red', marginTop: hp('2%'), borderWidth: 0,
        flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: hp('3%')
    },
    headintxt: { color: Colors.grayText, fontFamily: fonts.PoppinsRegular, fontWeight: '500' },
    restxt: { color: Colors.balckText, fontFamily: fonts.PoppinsRegular, fontWeight: '500' },
    flatlistmain: {
        borderBottomWidth: 1,
        borderColor: Colors.borderColor,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginHorizontal: wp(4)
    },
    imagename: {
        flexDirection: "row", alignItems: "center",

    },
    productname: {
        fontSize: 14,
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular,
        fontWeight: '500',
        width: wp(50),
        marginLeft: 10
    },
    quantity: {
        fontSize: 14,
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
        fontWeight: '500',

        marginLeft: 10
    },
    price: {
        fontSize: 14,
        color: Colors.BtnBackground,
        fontFamily: fonts.PoppinsRegular,
        fontWeight: '500',


    },
})

export default OrderInfo;

