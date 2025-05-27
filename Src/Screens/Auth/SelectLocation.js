import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView, StyleSheet, StatusBar, TextInput, FlatList } from 'react-native'
import images from "../../Components/Images";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import RBSheet from "react-native-raw-bottom-sheet";
import { iconPath } from "../../Constant/Icons";
const SelectLocation = (props) => {
    const ref = useRef(null);
    const refRBSheet = useRef();
    console.log(props);

    const [showaddress, setshowaddress] = useState("");
    console.log('====================================');
    console.log(props.route.params.region.latitude);
    console.log('====================================');

    const onPress = (data, details) => {
        setshowaddress(data.description);
        console.log(details.geometry.location);
        refRBSheet.current.close()
    };

    const Clear = (sg) => {
        ref.current?.setAddressText("");
    };
    const mapRef = React.createRef();
    const changeRegion = () => {
        const targetLatitude = 6.86;
        const targetLongitude = 6.86; mapRef.current.animateToRegion({
            latitude: targetLatitude,
            longitude: targetLongitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
        })
    }

    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1 }} >
            <View >
                <View style={{ marginHorizontal: hp('3%'), marginTop: hp('6%') }}>

                </View>
                <MapView
                    ref={mapRef}
                    style={styles.mapStyle}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={props.route.params.region}
                    customMapStyle={mapStyle}
                >
                    <Marker
                        draggable
                        coordinate={{
                            latitude: props.route.params.region.latitude,
                            longitude: props.route.params.region.longitude,
                        }}
                        onDragEnd={
                            (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                        }
                        title={'Test Marker'}
                        description={'This is a description of the marker'}
                    />
                </MapView>
                <View style={{ borderColor: 'red', borderWidth: 0, borderRadius: 15, }}>
                    <View style={{ paddingHorizontal: hp('2%'), marginTop: hp('2%') }}>
                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '400' }}>Enter your address</Text>
                        <View style={{ alignItems: 'center', marginTop: hp('1%'), height: hp('6%'), borderRadius: 10, borderColor: '#CFCFCF', borderWidth: 1, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                                <TextInput
                                    value={showaddress}
                                    placeholder="Enter your full address"
                                    maxLength={25}
                                    marginLeft={'1.25%'}
                                    fontWeight={'400'}
                                    fontSize={15}
                                    editable={false}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    placeholderTextColor={'#BFBFBF'}
                                    onFocus={() => setenableshift(true)}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity style={{ borderColor: 'green', backgroundColor: '#DDEFE3', borderRadius: 20, marginTop: hp('2%'), alignItems: 'center', justifyContent: 'center', borderWidth: 1, width: wp('20%'), height: hp('4.5%') }}>
                                <Text style={{ fontSize: 15 }}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: hp('1%'), borderColor: '#D7D7D7', borderRadius: 20, marginTop: hp('2%'), alignItems: 'center', justifyContent: 'center', borderWidth: 1, width: wp('20%'), height: hp('4.5%') }}>
                                <Text style={{ fontSize: 15 }}>Office</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderColor: 'red', marginLeft: hp('1%'), borderColor: '#D7D7D7', borderRadius: 20, marginTop: hp('2%'), alignItems: 'center', justifyContent: 'center', borderWidth: 1, width: wp('20%'), height: hp('4.5%') }}>
                                <Text style={{ fontSize: 15 }}>Other</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Address')} style={{ justifyContent: 'center', marginTop: hp('5%'), backgroundColor: '#53B175', width: wp('85%'), height: hp('6%'), borderRadius: 25, alignSelf: 'center' }}>
                            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 18, fontWeight: '500' }}>Save Address</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={hp(90)}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(52, 52, 52, 0.3)',
                    },
                    draggableIcon: {
                        backgroundColor: "#E4E4E4",
                        width: wp('30%')

                    },
                    container: {
                        // alignItems: 'center',
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    },
                }}
            >
                <View style={{
                    flex: 1
                }}>
                    <View style={{
                        justifyContent: 'center', marginHorizontal: hp('2%'), height: hp(70)
                    }}>
                        <GooglePlacesAutocomplete
                            ref={ref}
                            placeholder={'Search Location'}
                            minLength={2}
                            fetchDetails={true}
                            // debounce={400}
                            onChangeText={(a) => { }}
                            textInputProps={{
                                placeholderTextColor: "gray",
                                color: "black"

                            }}
                            query={{
                                key: "AIzaSyDgeSzpacyGnNUXkDfADHv6P9H9SCdRoZ0",
                                language: 'en',
                                // components: "country:bg",
                            }}
                            GooglePlacesDetailsQuery={{
                                fields: "geometry",
                            }}
                            onPress={onPress}
                            onFail={(error) => console.error(error)}
                            // renderLeftButton={() => (
                            //     <TouchableOpacity
                            //         onPress={() => {
                            //             navigation.goBack();
                            //         }}
                            //         style={{
                            //             alignItems: "center",
                            //             justifyContent: "center",
                            //             marginRight: 10,
                            //             color: "black",
                            //         }}
                            //     >
                            //         <Image
                            //             source={images.leftarrow}
                            //             resizeMode="contain"
                            //             style={{
                            //                 height: 20,
                            //                 width: 20,
                            //                 tintColor: "black",
                            //             }}
                            //         />
                            //     </TouchableOpacity>
                            // )}
                            renderRightButton={() => (
                                <TouchableOpacity
                                    onPress={() => {
                                        Clear();
                                    }}
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: 10,
                                        color: "black",
                                    }}
                                >
                                    <Image
                                        source={iconPath.Cross}
                                        resizeMode="contain"
                                        style={{
                                            height: 20,
                                            width: 20,
                                            tintColor: "#D2D2D2",
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            styles={{
                                textInputContainer: {
                                    marginVertical: "10%",
                                    borderWidth: 1,
                                    marginHorizontal: 10,
                                    color: "black",
                                    borderColor: '#D2D2D2',
                                    borderRadius: 10
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb',
                                },
                                poweredContainer: {
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    borderBottomRightRadius: 5,
                                    borderBottomLeftRadius: 5,
                                    borderColor: '#c8c7cc',
                                    borderTopWidth: 0.5,
                                },

                                description: { color: 'black' },

                            }}
                        />
                    </View>
                </View>
            </RBSheet>
        </View>
    )

}

export default SelectLocation;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapStyle: {
        height: hp(65),
        width: wp(100)
    },
});





const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
    },
];