import { View, Text, StyleSheet, TextInput, Image, FlatList } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import useGoogleMap from './Hook'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from '../../themes/colors';
import Button from '../../Components/Button';
import Spacer from '../../Components/Spacer';
import { fonts } from '../../Constant/Fonts';
import images from '../../Components/Images';
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from 'react-native';


const GoogleMap = ({ navigation, route }) => {
    const { ref, refRBSheet, markerPosition, setMarkerPosition, mapRef, getLocationNmaebuyCurentLoc, handleMapPress, getOneTimeLocation,
        region, setRegion, handleRegionChangeComplete, myAddress, result, setResult, isOpen, setIsOpen, query, setQuery, DEFAULT_REGION } = useGoogleMap(route)

    return (
        <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    provider='google'
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    style={{ width: wp(100), height: hp(100), }}
                    region={markerPosition ?? DEFAULT_REGION}
                    showsIndoors={true}
                    onPress={(event) => handleMapPress(event.nativeEvent.coordinate?.latitude, event.nativeEvent.coordinate?.longitude)}
                    onRegionChangeComplete={handleRegionChangeComplete}
                >

                    {/* <Marker
                        draggable
                        coordinate={markerPosition ?? DEFAULT_REGION}
                        pinColor='#009DE0'
                        onDragEnd={e => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
                            getLocationNmaebuyCurentLoc(latitude, longitude);
                        }}
                        style={{
                            position: 'absolute',
                            top: hp(50) - wp(6), // 🔁 Adjust for perfect vertical center (tweak as needed)
                            left: wp(50) - wp(3), // 🔁 Adjust for perfect horizontal center (tweak as needed)
                            width: wp(6),
                            height: wp(6),
                            zIndex: 10,
                            resizeMode: 'contain',
                            pointerEvents: 'none',
                            transform: [{ translateX: -wp(3.5) }, { translateY: -wp(7) }], // Adjust for perfect alignment
                        }}
                    /> */}

                    {/* <Image
                        source={images.marker} // Your marker icon
                        resizeMode='contain'
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: wp(17),
                            height: wp(17),
                            transform: [{ translateX: -wp(3.5) }, { translateY: -wp(7) }], // Adjust for perfect alignment
                            zIndex: 10,
                            pointerEvents: 'none',
                        }}
                    /> */}

                </MapView>

                <Image
                    source={images.marker}
                    resizeMode="contain"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: wp(10),
                        height: wp(10),
                        transform: [{ translateX: -wp(8.5) }, { translateY: -wp(17) }],
                        zIndex: 10,
                        pointerEvents: 'none',
                    }}

                />

                <View style={{ position: "absolute", top: hp(8), left: 0, right: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24, alignItems: 'center' }}>

                    <View style={styles.inputview}>
                        <Image source={images.search} tintColor={Colors.Primary} style={{ height: wp(5), width: wp(5), alignSelf: 'center', marginStart: wp(2), tintColor: Colors.Primary }} />
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor={Colors.placeholder}
                            color={Colors.balckText}
                            value={query}
                            fontFamily={fonts.PoppinsRegular}
                            onChangeText={txt => setQuery(txt)}
                        />
                    </View>


                    {
                        result?.length > 0 ?
                            <View style={styles.containerDropwdown}>
                                <FlatList
                                    data={result}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                handleMapPress(item?.center?.lat, item?.center?.lng)
                                                // setMarkerPosition({ latitude: item?.center?.lat, longitude: item?.center?.lng, latitudeDelta: 0.01, longitudeDelta: 0.01 });
                                                // getLocationNmaebuyCurentLoc(item?.center?.lat, item?.center?.lng);
                                                setResult([])
                                                setQuery('')

                                            }}
                                        >
                                            <Text style={styles.dropdownText}>{item?.place_name}</Text>
                                            <Text style={styles.addressstyle}>{item?.place_address}</Text>

                                        </TouchableOpacity>
                                    )}
                                />
                            </View> : null
                    }

                </View>

                {/* <View style={{ alignSelf: 'flex-end', position: 'absolute', bottom: hp(22), flexDirection: 'row', justifyContent: 'space-between', width: wp(95), alignItems: 'center' }}>
                    <View style={styles.instructions} >
                        <Text style={{ color: Colors.Primary, fontSize: 12, fontFamily: fonts.PoppinsMedium }}>Single Tap or Hold pin{"\n"}to Mark Location</Text>
                    </View>

                    <TouchableOpacity
                        // style={{ alignSelf: 'flex-end', position: 'absolute', bottom: -20 }}
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
                </View> */}
                {
                    myAddress ?
                        <View style={{ backgroundColor: Colors.whitecolor, position: "absolute", bottom: 0, left: 0, right: 0, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                            <Spacer height={hp(4)} />
                            <Text style={styles.addrestxt}>{myAddress}</Text>

                            <Button
                                onPress={() => route?.params?.item ? navigation.navigate("EditAddress", { item: route?.params?.item }) : navigation.navigate("AddAddress", { lat: markerPosition?.latitude, lng: markerPosition.longitude, address: myAddress })}
                                title={'Next'}
                                btnContainer={{
                                    marginTop: hp(2),
                                    paddingVertical: 0,
                                    height: hp(5.5),
                                }}
                            />
                            <Spacer />
                        </View> : null

                }

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    instructions: {
        backgroundColor: 'white',
        padding: wp(2),
        borderRadius: 12,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Shadow for Android
        elevation: 5,
    },
    addressstyle: {
        marginTop: hp(1),
        fontSize: 12,
        color: Colors.grayText,
    },
    dropdownText: {
        fontSize: 16,
        color: '#000',
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    containerDropwdown: {
        // padding: 16,
        width: wp(87),
        // marginTop: hp(2),
        // height: hp(5.5),
        maxHeight: hp(50),
        backgroundColor: Colors.whitecolor,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderColor: '#E2E2E2',
        // position: 'absolute',
        // top: 0,
        // zIndex: 1111

    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    placeholderStyle: {
        fontSize: 16,
        // borderColor: '#E2E2E2',
        color: '#E2E2E2',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#000',
    },
    dropdown: {
        height: 50,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    input: {
        borderWidth: 0,
        width: wp(77),
        height: hp(6),
        paddingLeft: 10,

    },
    inputview: {
        backgroundColor: 'white',
        zIndex: 111,
        borderWidth: 2,
        marginTop: hp(1),
        marginHorizontal: wp(0),
        width: wp(87),
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 8,
        borderColor: '#E2E2E2',
        paddingRight: 10,
    },
    addrestxt: {
        fontSize: 16,

        paddingHorizontal: wp(5),
        fontWeight: '500',
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular,
    },
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
        height: hp(90),
        width: wp(100)
    },
});
export default GoogleMap

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