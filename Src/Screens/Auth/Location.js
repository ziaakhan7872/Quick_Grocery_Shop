import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
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
  iconPath,
  Loader,
} from '../../Components/Index';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RBSheet from 'react-native-raw-bottom-sheet';
import { _PostBearerAUTH, _AxiosGetBearerAUTH } from '../../Apis/Apis';
import { useSelector } from 'react-redux';
const API_KEY = 'AIzaSyBNOZn8be1ix47uhHa8cRc385pJhsW8OEs';
const Location = props => {
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

  const [currentLongitude, setCurrentLongitude] = useState();
  const [currentLatitude, setCurrentLatitude] = useState();
  const ref = useRef(null);
  const mapRef = useRef(null);

  const [region, setRegion] = useState();

  const getAddresTypes = async () => {
    try {
      await _AxiosGetBearerAUTH('address/types', userData?.userToken)
        .then(async response => {
          console.log('RESponse', response, response?.data[0].id);
          setaddresid(response?.data[0].id);
          setaddrestype(response?.data);
        })
        .catch(err => {
          console.log('Err,', err.data.message);
        });
    } catch (error) {
      console.log('errorerrorerrorerror', error);
    }
  };

  const saveAddress = async () => {
    console.log('====================================');
    console.log('latitude', currentLatitude, 'longitude', currentLongitude);
    console.log('====================================');
    try {
      setisErrormessage(false);

      if (!myaddress) {
        setisErrormessage(true);
        seterrormessage('Enter Address');
      } else if (!city) {
        setisErrormessage(true);
        seterrormessage('Enter city');
      } else if (!state) {
        setisErrormessage(true);
        seterrormessage('Enter state');
      } else if (!name) {
        setisErrormessage(true);
        seterrormessage('Enter name');
      } else if (!mobileNo) {
        setisErrormessage(true);
        seterrormessage('Enter mobileNo');
      } else if (!postalcode) {
        setisErrormessage(true);
        seterrormessage('Enter postalcode');
      } else {
        setLoading(true);
        let data = {
          address: myaddress,
          city: city,
          state: state,
          nearByPlace: nearby,
          name: name,
          contactNo: mobileNo,
          postalCode: postalcode,
          latitude: currentLatitude,
          longitude: currentLongitude,
          addressTypeId: addresid,
        };

        await _PostBearerAUTH('address', data, userData?.userToken)
          .then(async response => {
            console.log('save addresss apid', response);
            props.navigation.navigate('BottomTab');
            setLoading(false);
          })
          .catch(err => {
            console.log('Err,', err);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false);
    }
  };

  const onPress = (data, details) => {
    refRBSheet.current.close();
    console.log('====================================');
    console.log(data, details);
    console.log('====================================');
    setmyaddress(data.description);
    mapRef.current.animateToRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
    setRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
    setCurrentLatitude(details.geometry.location.lat);
    setCurrentLongitude(details.geometry.location.lng);

    console.log('====================================');
    console.log(details);
    console.log('====================================');
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
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
        // //Setting Longitude state
        // console.log('currentLongitude',currentLongitude);

        gotocurrentlocation(
          parseFloat(currentLatitude),
          parseFloat(currentLongitude),
        );

        geocoding(currentLatitude, currentLongitude);
      },
      error => {
        console.log('my erroorororoor', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
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
        const address = data.results[0].formatted_address;
        console.log('addressaddress====>>>>><<<', address);
        setmyaddress(address);
      })
      .catch(error => console.error('errorerrorerrorerror', error));
  };
  const gotocurrentlocation = (lat, long) => {
    setRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
    mapRef.current.animateToRegion({
      latitude: lat,
      longitude: long,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
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

  // const Clear = (sg) => {
  //     ref.current?.setmyaddress("");
  // };
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
      <View style={styles.mapviewstyle}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={{ width: wp(100), height: hp(40) }}
          initialRegion={region}
          // showsUserLocation={true}
          // followUserLocation={true}
          showsIndoors={true}
        // draggable

        //  onRegionChange={(region) => setRegion(region)}
        // onRegionChangeComplete={(region) => setRegion(region)}
        // onDragEnd={(region) => setRegion(region)}
        >
          <Marker
            coordinate={region}
            draggable
            // image={require('../../Assets/Images/marker.png')}
            style={{ width: 26, height: 28 }}
            onDragEnd={e => {
              setCurrentLatitude(e.nativeEvent.coordinate.latitude);
              setCurrentLongitude(e.nativeEvent.coordinate.longitude);
              getLocationNmaebuyCurentLoc(
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude,
              );
            }}
          />
        </MapView>
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

      <View style={styles.mainview}>
        <View style={styles.addrestextview}>
          {myaddress != '' && <Text style={styles.addrestxt}>{myaddress}</Text>}
        </View>

        <View style={styles.inputview}>
          <TextInput
            style={styles.input}
            // onFocus={() => refRBSheet.current.open()}
            onPressIn={() => refRBSheet.current.open()}
            onChangeText={txt => setmyaddress(txt)}
            value={myaddress}
            placeholder="Enter your full address"
            placeholderTextColor={Colors.placeholder}
            color={Colors.balckText}
            fontFamily={fonts.PoppinsRegular}
          />
          <Image
            source={images.crossicon}
            style={{
              width: wp(5),
              alignSelf: 'center',
              height: wp(5),
            }}
          />
        </View>
        <View style={styles.inputmainview}>
          <View style={styles.inputsview}>
            <TextInput
              style={styles.input1}
              value={city}
              placeholder="City"
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
              onChangeText={txt => setcity(txt)}
            />
          </View>

          <View style={styles.inputsview}>
            <TextInput
              style={styles.input1}
              onChangeText={txt => setstate(txt)}
              value={state}
              placeholder="State"
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
            />
          </View>
        </View>

        <View style={styles.inputmainview}>
          <View style={styles.inputsview}>
            <TextInput
              style={styles.input1}
              placeholder="Postal Code"
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              keyboardType='number-pad'
              fontFamily={fonts.PoppinsRegular}
              value={postalcode}
              onChangeText={txt => setpostalcode(txt)}
            />
          </View>

          <View style={styles.inputsview}>
            <TextInput
              style={styles.input1}
              onChangeText={txt => setnearby(txt)}
              placeholder="Near by place"
              value={nearby}
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
            />
          </View>
        </View>

        {/* <View style={styles.inputview}>

                    <TextInput
                        style={styles.input}

                        placeholder="Nearby Place (Optional)"
                        onChangeText={(txt)=>setnearby(txt)}
                        placeholderTextColor={Colors.placeholder}
                        color={Colors.balckText}
                        fontFamily={fonts.PoppinsRegular}

                    />

                </View> */}

        <View style={styles.inputmainview}>
          <View style={styles.inputsview}>
            <TextInput
              style={styles.input1}
              placeholder="Name"
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              value={name}
              fontFamily={fonts.PoppinsRegular}
              onChangeText={txt => setname(txt)}
            />
          </View>

          <View style={styles.inputsview}>
            <TextInput
              style={styles.input1}
              value={mobileNo}
              onChangeText={txt => setmobileNo(txt)}
              placeholder="Mobile No."
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
            />
          </View>
        </View>

        <FlatList
          data={addrestype}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
        {isErrormessage && (
          <Text style={{ color: 'red', marginTop: hp(2) }}>{errormessage}</Text>
        )}
        <Button
          onPress={() => saveAddress()}
          title={'Save Address'}
          btnContainer={{
            marginTop: hp(5),
            height: hp(6),
          }}
        />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={hp(90)}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(52, 52, 52, 0.3)',
            },
            draggableIcon: {
              backgroundColor: '#E4E4E4',
              width: wp('30%'),
            },
            container: {
              // alignItems: 'center',
              backgroundColor: '#fff',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            },
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
            style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    marginHorizontal: hp('2%'),
                    height: hp(70),
                  }}>
                  <GooglePlacesAutocomplete
                    ref={ref}
                    placeholder={'Search Location'}
                    minLength={2}
                    fetchDetails={true}
                    // debounce={400}
                    onChangeText={a => { }}
                    textInputProps={{
                      placeholderTextColor: 'gray',
                      color: 'black',
                    }}
                    query={{
                      key: API_KEY,
                      language: 'en',
                      // components: "country:bg",
                    }}
                    GooglePlacesDetailsQuery={{
                      fields: 'geometry',
                    }}
                    onPress={onPress}
                    onFail={error => console.error(error)}
                    renderRightButton={() => (
                      <TouchableOpacity
                        onPress={() => {
                          refRBSheet.current.close();
                        }}
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 10,
                          color: 'black',
                        }}>
                        <Image
                          source={iconPath.Cross}
                          resizeMode="contain"
                          style={{
                            height: 20,
                            width: 20,
                            tintColor: '#D2D2D2',
                          }}
                        />
                      </TouchableOpacity>
                    )}
                    styles={{
                      textInputContainer: {
                        marginVertical: '10%',
                        borderWidth: 1,
                        marginHorizontal: 10,
                        color: 'black',
                        borderColor: '#D2D2D2',
                        borderRadius: 10,
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
            </ScrollView>
          </KeyboardAvoidingView>
        </RBSheet>
      </View>
      <Loader loading={loading} />
    </Container>
  );
};
const styles = StyleSheet.create({
  mapviewstyle: { borderWidth: 0, height: hp(50) },
  inputview: {
    borderWidth: 1,
    marginTop: hp(2),
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
    marginTop: hp(3),
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
    marginTop: hp(3),
  },
  addrestxt: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
  },
  mainview: {
    borderWidth: 0,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(3),
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
export default Location;
