import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Linking } from 'react-native'
import { images, Button, fonts, Colors, iconPath, Loader } from "../../Components/Index";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import { _AxiosGetBearerAdmin, uploadtransectionrecipt } from "../../Apis/Apis";
import { useSelector } from "react-redux";
import { openDatabase } from "react-native-sqlite-storage";
import Spacer from "../../Components/Spacer";


const Successfulorder = (props) => {
    const [region, setRegion] = useState({});
    const [trnsectionImage, settrnsectionImage] = useState('');

    const [loading, setLoading] = useState(false)
    const [Iserror, setIserror] = useState(false)
    const [errorMessage, seterrorMessage] = useState('')
    const [paymentMethods, setPaymentMethods] = useState([])
    console.log('propsprops ffffff', props.route.params);

    let paymenttype = props.route.params?.paymenttype
    let orderid = props.route.params?.id
    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });
    useFocusEffect(
        React.useCallback(() => {

            getOneTimeLocation()

        }, [])

    )

    console.log("props", props.route.params)
    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                console.log('currentLongitude', position)

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);
                console.log('currentLongitude', currentLongitude);
                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                console.log('currentLatitude', currentLatitude);

                // //Setting Longitude state
                // console.log('currentLongitude',currentLongitude);

                setRegion({
                    latitude: parseFloat(currentLatitude),
                    longitude: parseFloat(currentLongitude),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })

            },
            (error) => {
                console.log('my erroorororoor', error.message);
            },
            {

                enableHighAccuracy: true, timeout: 20000
            },
        );
    };

    useEffect(() => {
        _AxiosGetBearerAdmin('bank?limit=10&offset=1', userToken).then(res => {
            console.log("bank?limit=10&offset=1", res)
            setPaymentMethods(res?.data?.banks)
        }).catch(error => {
            console.log("error of this", error)
        })
    }, [])

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
            settrnsectionImage(result.assets[0])

            console.log('resultresultresult', result);

        } catch (error) {
            console.log(error, 'errorerrorerrorerror');
        }
    }
    const db = openDatabase(
        { name: 'Grocery.db', createFromLocation: 1 },
        successCB,
        errorCB,
        openCB,
    );

    const errorCB = err => {
        console.log('SQL Error: ' + err);
    };

    const successCB = () => {
        console.log('SQL executed fine');
    };
    const openCB = () => {
        console.log('Database OPENED');
    };
    const myadres = useSelector(response => {
        return response?.userdataReducer?.selectedAddress;
    });
    // Method to delete all data from cartTable
    const deleteAllFromCart = () => {
        try {

            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM cartTable',
                    [],
                    (tx, results) => {
                        console.log('All items deleted from cartTable', results);
                    },
                    error => {
                        console.log('Error deleting items from cartTable', error);
                    },
                );
            });
        } catch (error) {
            console.log('Error in transaction', error);
        }
    };
    const uploadTransection = async () => {
        try {
            try {
                setIserror(false)
                if (!trnsectionImage) {
                    setIserror(true)
                    seterrorMessage('Please select transaction Receipt Image')
                }

                else {
                    setLoading(true)
                    const formData = new FormData();


                    var photo = {
                        uri: trnsectionImage.uri,
                        type: trnsectionImage.type,
                        name: trnsectionImage?.fileName ? trnsectionImage.fileName : 'Profile'
                    };


                    formData.append('transactionReceiptImage', photo);

                    await uploadtransectionrecipt(formData, orderid, userToken)
                        .then(async response => {
                            console.log('transection recipt api response is', response);
                            if (response) {
                                deleteAllFromCart()
                                props.navigation.replace('BottomTab')

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
        } catch (error) {

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
                if (region?.latitude && region?.longitude) {
                    // If the app is not installed, open the browser
                    const webUrl = `https://www.google.com/maps/dir/?api=1&origin=${region.latitude},${region.longitude}&destination=${"33.64485244270809"},${"73.02109845239706"}&travelmode=driving`;
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
        <ScrollView contentContainerStyle={{ paddingBottom: hp(6) }} style={{ backgroundColor: "#FFFFFF" }}>
            {paymenttype != 'Cash On Delivery' ? <View style={styles.mainView}>
                <View>
                    <Image source={images.success} style={styles.success} />
                </View>
                <View>
                    <View style={styles.subView}>
                        <Text style={styles.txt}>Checkout Successful</Text>
                    </View>

                </View>


                <View style={styles.flatlistcard}>
                    <View
                        style={styles.rowview}>
                        <Text style={styles.nametext}>
                            {'Bank'}
                        </Text>

                        <Text style={styles.heading}>
                            {paymentMethods[0]?.name}
                        </Text>
                    </View>
                    <View
                        style={styles.rowview2}>
                        <Text style={styles.nametext}>
                            {'Account Name'}
                        </Text>

                        <Text style={styles.heading}>
                            {paymentMethods[0]?.accountName}
                        </Text>
                    </View>


                    <View
                        style={styles.rowview2}>
                        <Text style={styles.nametext}>
                            {'Account Number'}
                        </Text>

                        <Text style={styles.heading}>
                            {paymentMethods[0]?.accountNumber}
                        </Text>
                    </View>

                    <View
                        style={styles.rowview2}>
                        <Text style={styles.nametext}>
                            {'Branch'}
                        </Text>

                        <Text style={styles.heading}>
                            {paymentMethods[0]?.branchName}
                        </Text>
                    </View>


                </View>


                {/* <View style={styles.flatlistcard}>
                    <View
                        style={styles.rowview}>
                        <Text style={styles.nametext}>
                            {'Bank'}
                        </Text>

                        <Text style={styles.heading}>
                            {'Jazz Cash'}
                        </Text>
                    </View>
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

                </View> */}



                <View style={styles.upladimage}>

                    {trnsectionImage == '' ? <TouchableOpacity onPress={() => ChosePhoto()} style={styles.uploadbtn}>
                        <Image
                            source={iconPath.Upload}
                            style={{ width: wp(8), height: wp(8), marginBottom: hp(1) }}
                        />
                        <Text style={styles.nametext}>
                            {'Upload transaction screenshot'}
                        </Text>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => ChosePhoto()} style={styles.uploadbtn}>
                            <Image
                                source={{ uri: trnsectionImage.uri }}
                                style={{ width: wp(50), height: wp(30) }}
                            />

                        </TouchableOpacity>}
                </View>

                {Iserror && <View>
                    <Text style={{ fontSize: 14, color: 'red', textAlign: 'center', marginTop: hp(2) }}>

                        {errorMessage}
                    </Text>
                </View>}
                {/* <Button onPress={() => props.navigation.navigate('Trackorder',{
            region:region
        })}
                    title={"Track order"}
                    btnContainer={{
                          height: hp(6),
         
                     position:'absolute',
                     bottom:hp(20)
                    
                       
                    }}

                /> */}
                <Button onPress={() => uploadTransection()}
                    title={"Upload"}
                    btnContainer={{
                        height: hp(6),
                        marginTop: hp(4)


                    }}

                />

            </View>
                :

                <View style={{ ...styles.mainView, marginTop: hp(6) }}>
                    <View>
                        <Image source={images.success} style={styles.success} />
                    </View>
                    <View>
                        <View style={styles.subView}>
                            <Text style={styles.txt}>Checkout Successful</Text>
                        </View>

                    </View>

                    {/* <Button onPress={() => props.navigation.navigate('Trackorder',{
    region:region
})}
            title={"Track order"}
            btnContainer={{
                  height: hp(6),
 
             position:'absolute',
             bottom:hp(20)
            
               
            }}

        /> */}
                    <Button onPress={() => props.navigation.replace('BottomTab')}
                        title={"Back to Home"}
                        btnContainer={{
                            height: hp(6),
                            marginTop: hp(30),


                        }}

                    />
                    <Spacer />
                    {
                        props.route.params?.type == 'pickUp' ?
                            <Button onPress={handleNavigate}
                                title={"Store Location"}
                                btnContainer={{
                                    height: hp(6),
                                    // marginTop: hp(30),
                                }}

                            /> : null

                    }

                </View>

            }
            <Loader loading={loading} />

        </ScrollView>
    )

}
const styles = StyleSheet.create({

    success: {
        height: 135.85,
        width: 135.85,
        alignSelf: 'center',
        // justifyContent:'center',
        marginTop: hp('20%'),


    },
    mainView: {
        backgroundColor: Colors.backgroundColor,
        flex: 1
    },
    viewTxt: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('1%'),
        width: wp('80%'),
        borderWidth: 0,
        borderColor: 'red'
    },
    backHome: {
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        fontWeight: '500'
    },
    trackTxt: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500'
    },
    txtMian: {
        textAlign: 'center',
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular
    },
    subView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('3.5%')
    },
    txt: {
        fontSize: 19,
        fontWeight: '600',
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular
    },
    touchbtn: {
        justifyContent: 'center',
        marginTop: hp('25%'),
        backgroundColor: '#4CAE6F',
        width: wp('85%'),
        height: Platform.OS === 'ios' ? hp(6) : hp(7),
        borderRadius: 25,
        alignSelf: 'center'
    },
    touchbtnback: {
        justifyContent: 'center',
        borderColor: '#4CAE6F',
        borderWidth: 1,
        marginTop: hp('2%'),
        backgroundColor: '#FFFFFF',
        width: wp('85%'),
        height: Platform.OS === 'ios' ? hp(6) : hp(7),
        borderRadius: 25,
        alignSelf: 'center'
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
        padding: 19,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: hp(2),
        borderRadius: 10,
        marginHorizontal: wp(4)
    },
    uploadbtn: {
        alignItems: "center",
        justifyContent: "center"
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
})
export default Successfulorder;