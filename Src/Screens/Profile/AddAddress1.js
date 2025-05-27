import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    StyleSheet,
    Platform,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';
import {
    Container,
    images,
    Button,
    fonts,
    Colors,
    SmallButton,
    Loader,
} from '../../Components/Index';
import MapView, { Marker } from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    _AxiosGetBearer,
    _AxiosGetBearerAUTH,
    _PostBearer,
    _PostBearerAUTH,
} from '../../Apis/Apis';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const API_KEY = 'AIzaSyBNOZn8be1ix47uhHa8cRc385pJhsW8OEs';
const AddAddress1 = props => {
    const userData = useSelector(response => {
        return response?.userdataReducer?.userData;
    });

    useEffect(() => {
        getAddresTypes();
        getOneTimeLocation();
    }, []);

    const refRBSheet = useRef();
    const [addrestype, setaddrestype] = useState([]);
    const [myaddress, setmyaddress] = useState('');
    // const [fulladdress, setfulladdress] = useState('');
    const [city, setcity] = useState('');
    const [state, setstate] = useState('');
    const [nearby, setnearby] = useState('');
    const [postalcode, setpostalcode] = useState('');
    const [name, setname] = useState('');
    const [mobileNo, setmobileNo] = useState('');
    const [addresid, setaddresid] = useState('');
    const [loading, setLoading] = useState(false);
    const [isErrormessage, setisErrormessage] = useState(false);
    const [errormessage, seterrormessage] = useState('');
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState('');

    const [currentLongitude, setCurrentLongitude] = useState();
    const [currentLatitude, setCurrentLatitude] = useState();
    const ref = useRef(null);
    const mapRef = useRef(null);
    const [DropDownHandler, setDropDownHandler] = useState(true);
    const [region, setRegion] = useState(DEFAULT_REGION);
    const [markerPosition, setMarkerPosition] = useState(DEFAULT_REGION);


    // const [markerPosition, setMarkerPosition] = useState({
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    // });

    const getAddresTypes = async () => {
        try {
            await _AxiosGetBearerAUTH('address/types', userData?.userToken)
                .then(async response => {
                    console.log('RESponse', response, response?.data[0].id);
                    setaddresid(response?.data[0].id);
                    setaddrestype(response?.data);
                })
                .catch(err => {
                    console.log('Err,', err);
                });
        } catch (error) {
            console.log('errorerrorerrorerror', error);
        }
    };

    const saveAddress = async () => {

        try {
            setisErrormessage(false);

            if (!myaddress) {
                setisErrormessage(true);
                seterrormessage('Please Enter Address');
            } else if (!city) {
                setisErrormessage(true);
                seterrormessage('Please Enter city');
            } else if (!state) {
                setisErrormessage(true);
                seterrormessage('Please Enter state');
            } else if (!name) {
                setisErrormessage(true);
                seterrormessage('Please Enter Name');
            } else if (!mobileNo) {
                setisErrormessage(true);
                seterrormessage('Please Enter Mobile No');
            } else if (mobileNo.length < 9 || mobileNo.length > 14) {
                setisErrormessage(true);
                seterrormessage('Please Enter Valid Mobile No');
            } else if (!postalcode) {
                setisErrormessage(true);
                seterrormessage('Enter Postal Code');
            } else {
                setLoading(true);
                let data = {
                    address: myaddress,
                    city: city,
                    state: state,
                    nearByPlace: nearby ?? '',
                    name: name,
                    contactNo: mobileNo,
                    postalCode: postalcode,
                    latitude: region?.latitude,
                    longitude: region?.longitude,
                    addressTypeId: addresid,
                };
                console.log('data is this', data, userData?.userToken);
                await _PostBearerAUTH('address', data, userData?.userToken)
                    .then(async response => {
                        console.log('save addresss apid', response);
                        props.navigation.navigate('BottomTab');
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log('Errs is,', err);
                        setLoading(false);
                        // Toast.show(
                        //   err,
                        //   Toast.LONG,
                        // );
                    });
            }
        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false);
        }
    };

    const DEFAULT_REGION = {
        latitude: 33.738045, // Example latitude (San Francisco)
        longitude: 73.084488, // Example longitude
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };



    const getOneTimeLocation = () => {
        console.log('getOneTimeLocation');
        Geolocation.getCurrentPosition(
            // console.log("first")
            //Will give you the current location
            position => {
                console.log('currentLongitude', position);

                //getting the Longitude from the location json
                const currentLongitude = JSON.stringify(position.coords.longitude);
                console.log('currentLongitude', currentLongitude);
                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);

                console.log('currentLatitude', currentLatitude);
                setCurrentLatitude(currentLatitude);
                setCurrentLongitude(currentLongitude);
                getLocationNmaebuyCurentLoc(currentLatitude, currentLongitude);


                setRegion({
                    latitude: position.coords.longitude,
                    longitude: position.coords.latitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                });

                gotocurrentlocation(
                    parseFloat(currentLatitude),
                    parseFloat(currentLongitude),
                );

                geocoding(currentLatitude, currentLongitude);
            },
            error => {
                console.log('my erroorororoor', error.message);
                setRegion(DEFAULT_REGION);
            },
            {
                enableHighAccuracy: false,
                timeout: 100000,
            },
        );
    };

    const getLocationNmaebuyCurentLoc = (LATITUDE, LONGITUDE) => {
        console.log(
            'getLocationNmaebuyCurentLocgetLocationNmaebuyCurentLoc',
            LATITUDE,
            LONGITUDE,
        );
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LATITUDE},${LONGITUDE}&key=${API_KEY}`,
        )
            .then(response => response.json())
            .then(data => {
                console.log('data get from api esponse', data);

                const address = data.results[0].formatted_address;
                console.log('addressaddress====>>>>><<<', address);
                setmyaddress(address);
            })
            .catch(error => console.error('errorerrorerrorerror', error));
    };

    const gotocurrentlocation = (lat, long) => {
        setMarkerPosition({
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        mapRef?.current?.animateToRegion({
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
    };
    const geocoding = (lati, longi) => {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`,
        )
            .then(response => response.json())
            .then(data => {
                const location = data.results[0].geometry.location;
                const latitude = location.lat;
                const longitude = location.lng;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            });
    };
    const MAPBOX_ACCESS_TOKEN =
        'pk.eyJ1Ijoid2FzZWVtOTkiLCJhIjoiY2w0emRmejBlMjhpczNrbWw4N3VyaHA2OCJ9.Fj1fOKYNuo6uj0SdfqENrw';

    const searchLocation = query => {
        //  ------------------New Code------------------
        let qry = query.trim();
        return new Promise((resolve, reject) => {
            fetch(
                // `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`,
                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`,
            )
                .then(res => res.json())
                .then(data => {
                    console.log(data?.results, 'data of searchLocation');
                    const address = [];
                    data.results.map(feature => {
                        address.push({
                            id: feature.place_id,
                            place_name: feature.name,
                            place_address: feature?.formatted_address,
                            center: feature.geometry?.location,
                        });
                    });
                    console.log("addressaddressaddressaddressaddress", address)
                    resolve(address);
                })
                .catch(err => reject(err, 'error'));
        });
    };

    useEffect(() => {
        if (query.length > 0) {
            let x = setTimeout(() => {
                searchLocation(query).then(data => {
                    console.log(data, 'dataa in useEffect');
                    setDropDownHandler(true);
                    setResult([...data]);
                });
            }, 200);
        }
    }, [query]);
    // const Clear = (sg) => {
    //     ref.current?.setmyaddress("");
    // };

    const handleMapPress = (event) => {
        // Update marker position on map press
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
        getLocationNmaebuyCurentLoc(latitude, longitude);
    };

    const handleRegionChangeComplete = (newRegion) => {
        // Update the region state only if there's a real change
        if (newRegion.latitude !== region.latitude || newRegion.longitude !== region.longitude) {
            setRegion(newRegion);
        }
    };

    const renderItem = ({ item, insex }) => {
        return (
            <View style={styles.btnmain}>
                <SmallButton
                    onPress={() => setaddresid(item.id)}
                    title={item.name}
                    backgroundColor={
                        addresid == item.id ? Colors.smallbtnbgcolor : Colors.whitecolor
                    }
                    borderColor={
                        addresid == item.id ? Colors.BtnBackground : Colors.borderColor
                    }
                    leftimage={item.iconUrl}
                    tintColor={
                        addresid == item.id ? Colors.BtnBackground : Colors.balckText
                    }
                    titlestyle={{
                        color:
                            addresid == item.id ? Colors.BtnBackground : Colors.balckText,
                        fontSize: 15,
                        marginLeft: 10,
                    }}
                />
            </View>
        );
    };
    return (
        <Container style={{ backgroundColor: Colors.backgroundColor }}>
            <KeyboardAwareScrollView >
                <View style={styles.mapviewstyle}>
                    {console.log('regionregionregionregion', region)}
                    {markerPosition && (
                        <MapView
                            ref={mapRef}
                            style={{ width: wp(100), height: hp(100) }}
                            initialRegion={markerPosition}
                            showsIndoors={true}
                            onPress={handleMapPress}
                            onRegionChangeComplete={handleRegionChangeComplete}
                        >
                            <Marker
                                coordinate={markerPosition}
                                draggable
                                tappable
                                pinColor='#009DE0'
                                onDragEnd={e => {
                                    const { latitude, longitude } = e.nativeEvent.coordinate;
                                    setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
                                    getLocationNmaebuyCurentLoc(latitude, longitude);
                                }}
                            />
                        </MapView>
                    )}
                    <TouchableOpacity
                        style={{ alignSelf: 'flex-end', position: 'absolute', bottom: -20 }}
                        onPress={() => getOneTimeLocation()}>
                        <Image
                            source={images.currentlocation}
                            resizeMode="contain"
                            style={{
                                width: wp(15),
                                height: hp(15),
                                marginRight: wp(2),
                            }}
                        />
                    </TouchableOpacity>
                </View>


                <Loader loading={loading} />
            </KeyboardAwareScrollView>
        </Container>
    );
};
const styles = StyleSheet.create({
    mapviewstyle: { borderWidth: 0, height: hp(100) },
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
    btnmain: {
        borderWidth: 0,
        marginTop: hp(2),
        width: wp(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    btns: {
        borderColor: 'green',
        flexDirection: 'row',
        backgroundColor: '#DDEFE3',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        width: wp(26),
        height: hp(5),
        paddingHorizontal: wp(2),
    },
    inputsview: {
        borderWidth: 1,

        borderRadius: 8,
        borderColor: '#E2E2E2',
    },

    inputmainview: {
        borderWidth: 0,
        marginTop: hp(2),
        marginHorizontal: wp(5),
        width: wp(87),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    input: {
        borderWidth: 0,
        width: wp(77),
        height: hp(7),
        paddingLeft: 10,
    },
    input1: {
        borderWidth: 0,
        width: wp(40),
        height: hp(7),
        paddingLeft: 10,
    },
    addrestextview: {
        borderWidth: 0,
        marginHorizontal: wp(5),
        width: wp(87),
        // marginTop: hp(3),
    },
    addrestxt: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular,
    },
    mainview: {
        borderWidth: 0,
        // flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // position: 'absolute',
        alignSelf: 'center',
        // bottom: 0,
        width: wp(100),
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingBottom: hp(3),
        backgroundColor: Colors.backgroundColor,
    },
    img: {
        alignSelf: 'center',
        width: 224.69,
        height: 170.69,
        //     height: Platform.OS === 'ios' ?  hp(15) : hp(18),
        // width: Platform.OS === 'ios' ?  wp(43) : wp(45),
    },
    location: {
        textAlign: 'center',
        //marginTop:hp('5%'),
        marginTop: Platform.OS === 'ios' ? hp(5) : hp(7),
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    txt: {
        textAlign: 'center',
        marginTop: Platform.OS === 'ios' ? hp(1) : hp(1),
        color: '#929292',
    },
    touch: {
        marginTop: Platform.OS === 'ios' ? hp(2) : hp(7),
        borderWidth: 1,
        borderColor: 'green',
        marginHorizontal: wp('5%'),
        height: Platform.OS === 'ios' ? hp(6) : hp(7),
        borderRadius: 10,
        justifyContent: 'center',
    },
    locationtouch: {
        marginTop: hp('2%'),
        borderWidth: 2,
        borderColor: '#F7F7F7',
        marginHorizontal: wp('5%'),
        justifyContent: 'center',
        height: Platform.OS === 'ios' ? hp(6) : hp(7),
        borderRadius: 10,
    },
});
export default AddAddress1;




