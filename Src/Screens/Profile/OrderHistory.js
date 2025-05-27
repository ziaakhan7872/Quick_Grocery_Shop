import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Platform, Linking } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Button, Colors, fonts, Header, images, Loader } from "../../Components/Index";
import { _AxiosGetBearer, _AxiosGetBearerAUTH } from "../../Apis/Apis";
import { useSelector } from "react-redux";
import Geolocation from '@react-native-community/geolocation';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Spacer from "../../Components/Spacer";
import moment from "moment/moment";
import Toast from 'react-native-simple-toast';

const OrderHistory = (props) => {

    const [OrderData, setOrderData] = useState([])
    const [loading, setloading] = useState(false)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });


    // useEffect(() => {
    //     getOneTimeLocation()
    // }, [])



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


    const convertdate = (inputDate) => {


        // Create a new Date object by parsing the input date string
        const date = new Date(inputDate);

        // Format the date using the Intl.DateTimeFormat object with desired options
        const formatter = new Intl.DateTimeFormat("en", {

            month: "long",
            day: "2-digit",
            year: "numeric",
        });

        const formattedDate = formatter.format(date);

        console.log(formattedDate);

        return formattedDate

    }
    useEffect(() => {
        getOrderHistory()

    }, [])
    const getOrderHistory = async () => {
        try {
            setloading(true)

            await _AxiosGetBearerAUTH('users/my-orders?limit=500&offset=1', userToken)
                .then(async response => {
                    console.log('orderhistory', JSON.stringify(response.data.myOrders));
                    setOrderData(response.data.myOrders)
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


    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('OrderInfo', {
                item
            })} style={{ paddingHorizontal: wp(5) }}>
                {
                    index == 0 || moment(OrderData[index].createdAt).format('ll') !== moment(OrderData[index - 1].createdAt).format('ll') ?
                        <>
                            <Spacer />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <Text style={styles.time}>{moment(item?.createdAt).format('ll')}</Text>
                                {/* <Text style={styles.orderratetxt}>{"Orders"}</Text> */}

                            </View>
                        </>
                        : null
                }

                <View style={styles.mainview}>
                    <View style={styles.subview}>
                        <Text style={styles.time}>
                            {moment(item?.createdAt).format('lll')}
                        </Text>
                        <TouchableOpacity onPress={() => props.navigation.navigate('OrderInfo', {
                            item
                        })} style={{ width: wp('31%'), justifyContent: 'center' }}>
                            <Image source={images.leftArrow} style={styles.arow} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowview}>
                        <View style={{ borderWidth: 0, justifyContent: 'center' }}>
                            <Text style={styles.orderratetxt}>Order Number</Text>
                            <Text style={styles.totprice}>{item?.id}</Text>


                        </View>
                        <View style={{ borderWidth: 0 }}>
                            <Text style={styles.orderratetxt}>Products</Text>
                            <Text style={styles.totalprodct}>{item?.orderLines?.length} {item?.orderLines?.length > 1 ? "Products" : "Product"}</Text>
                        </View>
                        <View>
                            <Text style={styles.orderratetxt}>Order Price</Text>
                            <Text style={styles.totprice}>Rs. {item.total}</Text>

                        </View>
                    </View>
                    {/* <Spacer /> */}
                    {/* {
                        item?.type == 'pickUp' ?
                            <Button onPress={handleNavigate} title={'Store Location'} btnContainer={{ height: hp(5), padding: 0, paddingVertical: 0, width: wp(80) }} /> : null

                    } */}
                </View>

            </TouchableOpacity>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <View style={{ marginHorizontal: hp('3%'), marginTop: hp(Platform.OS == 'ios' ? 6 : 2) }}>

                <Header
                    title={'Order History'}
                    onPress={() => props.navigation.goBack()}
                />
            </View>

            {/* <View style={{ flexDirection: 'row', marginHorizontal: hp('2%'), marginTop: hp('3%') }}>
                <Text style={styles.datatxt}>
                    {'April 2022'}
                </Text>
                <Text style={styles.listordertxt}>{'2 Orders'}</Text>
            </View> */}
            <Spacer height={hp(4)} />
            <FlatList
                data={OrderData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: hp('0%') }}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: hp(10) }}
            />
            <Loader loading={loading} />

        </View>
    )


}

const styles = StyleSheet.create({
    mainview: {
        borderColor: '#E2E2E2',
        borderWidth: 1.15,
        marginTop: hp('2%'),
        // marginHorizontal: hp('2%'),
        paddingBottom: hp('2%'),
        borderRadius: 10
    },
    subview: { flexDirection: 'row', marginHorizontal: hp('1.5%'), marginTop: hp('2%'), justifyContent: 'space-between' },
    time: {
        color: Colors.balckText,
        fontFamily: fonts.PoppinsMedium,
        fontSize: 16,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    arow: { width: wp('3%'), alignSelf: 'center', height: hp('3%'), tintColor: 'black', alignSelf: 'flex-end' },
    rowview: { marginTop: hp('1.7%'), flexDirection: 'row', marginHorizontal: hp('1.5%'), borderWidth: 0, borderColor: 'red', justifyContent: 'space-between' },
    orderratetxt: {
        // width: wp(32),
        color: "#BFBFBF",
        fontFamily: fonts.PoppinsRegular,
        fontSize: 14
    },
    datatxt: { color: Colors.balckText, fontFamily: fonts.PoppinsRegular, fontSize: 18, width: wp('50%') },
    totalprodct: {
        marginTop: 5,
        justifyContent: 'center',
        textAlign: 'center',
        borderColor: 'red',
        borderWidth: 0,
        // fontWeight: '500',
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular,
        fontSize: 16
    },
    producttxt: { color: Colors.grayText, fontFamily: fonts.PoppinsRegular, fontSize: 16, borderColor: 'red', borderWidth: 0 },
    listordertxt: { color: Colors.grayText, fontFamily: fonts.PoppinsRegular, fontSize: 17, width: wp('41%'), textAlign: 'right' },
    pricetxt: { borderColor: 'red', borderWidth: 0, color: Colors.grayText, fontFamily: fonts.PoppinsRegular, fontSize: 16, },
    totprice: { justifyContent: 'center', marginLeft: wp(1), marginTop: 5, borderColor: 'red', borderWidth: 0, color: Colors.balckText, fontFamily: fonts.PoppinsRegular, fontSize: 16 },
    starimg: { width: wp(4), height: wp(4), marginLeft: 2 }
})

export default OrderHistory;