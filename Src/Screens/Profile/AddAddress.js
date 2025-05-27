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
  iconPath,
} from '../../Components/Index';
import MapView, { Marker } from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  _AxiosGetBearer,
  _AxiosGetBearerAUTH,
  _PostBearer,
  _PostBearerAUTH,
} from '../../Apis/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from '../../Components/Spacer';
import { Dropdown } from 'react-native-element-dropdown';
import { Saveactiveaddress } from '../../Redux/Actions/Actions';
const API_KEY = 'AIzaSyBNOZn8be1ix47uhHa8cRc385pJhsW8OEs';
const AddAddress = props => {
  const userData = useSelector(response => {
    return response?.userdataReducer?.userData
  });


  useEffect(() => {
    getAddresTypes();
    // getOneTimeLocation();
  }, []);
  const dispatch = useDispatch()
  const refRBSheet = useRef();
  const [addrestype, setaddrestype] = useState([]);
  const [myaddress, setmyaddress] = useState(props?.route?.params?.address);
  // const [fulladdress, setfulladdress] = useState('');
  const [city, setcity] = useState('Islamabad');
  const [state, setstate] = useState('');
  const [nearby, setnearby] = useState('');
  const [postalcode, setpostalcode] = useState('');
  const [name, setname] = useState(userData?.userData?.name ?? '');
  const [mobileNo, setmobileNo] = useState(userData?.userData?.contactNo ?? '');
  const [addresid, setaddresid] = useState('');
  const [loading, setLoading] = useState(false);
  const [isErrormessage, setisErrormessage] = useState(false);
  const [errormessage, seterrormessage] = useState('');
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [currentLongitude, setCurrentLongitude] = useState();
  const [currentLatitude, setCurrentLatitude] = useState();
  const ref = useRef(null);
  const mapRef = useRef(null);
  const [region, setRegion] = useState({

    latitude: props?.route?.params?.lat ?? 33.64485244270809, // Example latitude (San Francisco)
    longitude: props?.route?.params?.lng ?? 73.02109845239706, // Example longitude
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerPosition, setMarkerPosition] = useState({

    latitude: props?.route?.params?.lat ?? 33.64485244270809, // Example latitude (San Francisco)
    longitude: props?.route?.params?.lng ?? 73.02109845239706, // Example longitude
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [customAddress, setCustomAddress] = useState('')
  const [DEFAULT_REGION] = useState({

    latitude: props?.route?.params?.lat ?? 33.64485244270809, // Example latitude (San Francisco)
    longitude: props?.route?.params?.lng ?? 73.02109845239706, // Example longitude
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })


  // useEffect(() => {
  //   const DEFAULT_REGIONs = {

  //     latitude: props?.route?.params?.lat ?? 33.64485244270809, // Example latitude (San Francisco)
  //     longitude: props?.route?.params?.lng ?? 73.02109845239706, // Example longitude
  //     latitudeDelta: 0.01,
  //     longitudeDelta: 0.01,
  //   };
  //   setDEFAULT_REGION(DEFAULT_REGIONs)
  //   setMarkerPosition(DEFAULT_REGIONs)
  //   setRegion(DEFAULT_REGIONs)
  // }, [])





  console.log("setRegionsetRegionsetRegionsetRegion", props?.route?.params, region);

  const getAddresTypes = async () => {
    try {
      await _AxiosGetBearerAUTH('address/types', userData?.userToken)
        .then(async response => {

          setaddresid(response?.data[0].id);
          setaddrestype(response?.data?.slice(0, 2));
        })
        .catch(err => {

        });
    } catch (error) {

    }
  };

  const saveAddress = async () => {

    try {
      setisErrormessage(false);

      // if (!myaddress) {
      //   setisErrormessage(true);
      //   seterrormessage('Please Enter Address');
      // } else
      if (!city) {
        setisErrormessage(true);
        seterrormessage('Please Enter city');
      } else if (!customAddress) {
        setisErrormessage(true);
        seterrormessage('Please Enter Flat number, Floor, Street, Sector.');
      }
      else if (!name) {
        setisErrormessage(true);
        seterrormessage('Please Enter Name');
      } else if (!mobileNo) {
        setisErrormessage(true);
        seterrormessage('Please Enter Mobile No');
      } else if (mobileNo.length < 9 || mobileNo.length > 14) {
        setisErrormessage(true);
        seterrormessage('Please Enter Valid Mobile No');
      } else {
        console.log("regionregionregionregionregion", region);

        setLoading(true);
        let data = {
          address: myaddress,
          customAddress: customAddress,
          city: city,
          nearByPlace: nearby ?? '',
          name: name,
          contactNo: mobileNo,
          latitude: region?.latitude,
          longitude: region?.longitude,
          addressTypeId: addresid,
        };
        console.log('data is this', data, userData?.userToken);

        await _PostBearerAUTH('address', data, userData?.userToken)
          .then(async response => {
            console.log('save addresss apid:::::', response);
            dispatch(Saveactiveaddress(response?.data))
            props.navigation.navigate('Checkout');
            setLoading(false);
          })
          .catch(err => {
            console.log('--------Errs is----------', err);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false);
    }
  };

  // const DEFAULT_REGION = {

  //   latitude: 33.64485244270809, // Example latitude (San Francisco)
  //   longitude: 73.02109845239706, // Example longitude
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // };




  const getOneTimeLocation = () => {

    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);
        getLocationNmaebuyCurentLoc(currentLatitude, currentLongitude);
        if (currentLatitude && currentLongitude) {
          console.log("this is currennt latiture and  lonngitude", currentLatitude, currentLongitude)
          setRegion({
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          });
          setMarkerPosition({
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          })
        } else {
          console.log("this is currennt latiture and  lonngitude only",)

          setRegion(DEFAULT_REGION);
          setMarkerPosition(DEFAULT_REGION)
          getLocationNmaebuyCurentLoc(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
        }

        // //Setting Longitude state

        gotocurrentlocation(
          parseFloat(currentLatitude),
          parseFloat(currentLongitude),
        );

        geocoding(currentLatitude, currentLongitude);
      },
      error => {
        setRegion(DEFAULT_REGION);
        setMarkerPosition(DEFAULT_REGION)
        getLocationNmaebuyCurentLoc(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
      },
      {
        enableHighAccuracy: false,
        timeout: 100000,
      },
    );
  };

  const getLocationNmaebuyCurentLoc = (LATITUDE, LONGITUDE) => {

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LATITUDE},${LONGITUDE}&key=${API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {

        const address = data.results[0].formatted_address;
        setmyaddress(address);
      })
      .catch(error => console.error('errorerrorerrorerror', error));
  };

  const gotocurrentlocation = (lat, long) => {
    if (lat && long) {
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
    } else {
      setMarkerPosition({
        latitude: DEFAULT_REGION.latitude,
        longitude: DEFAULT_REGION.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      mapRef?.current?.animateToRegion({
        latitude: DEFAULT_REGION.latitude,
        longitude: DEFAULT_REGION.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }

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
      });
  };



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
          const address = [];
          data.results.map(feature => {
            address.push({
              id: feature.place_id,
              place_name: feature.name,
              place_address: feature?.formatted_address,
              center: feature.geometry?.location,
            });
          });
          resolve(address);
        })
        .catch(err => reject(err, 'error'));
    });
  };

  const handleMapPress = (event) => {
    scrollViewRef.current.scrollTo({ x: 0, y: 0 })
    // Update marker position on map press
    const { latitude, longitude } = event.nativeEvent.coordinate;

    console.log("latitude, longitudelatitude, longitudelatitude, longitude", latitude, longitude)
    if (latitude & longitude) {
      setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
      setRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 })

      mapRef?.current?.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      getLocationNmaebuyCurentLoc(latitude, longitude);
    }

  };

  const handleRegionChangeComplete = (newRegion) => {
    // Update the region state only if there's a real change
    if (newRegion?.latitude !== region?.latitude || newRegion?.longitude !== region?.longitude) {
      setRegion(newRegion);
    } else {
      setRegion(DEFAULT_REGION);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      let x = setTimeout(() => {
        searchLocation(query).then(data => {

          setResult([...data]);
        });
      }, 200);
    }
  }, [query]);
  // const Clear = (sg) => {
  //     ref.current?.setmyaddress("");
  // };
  const renderItem = ({ item, insex }) => {
    return (
      <View style={styles.btnmain}>
        <SmallButton
          style={{ width: wp(42), }}
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

  const CitiesData = [
    { label: 'Islamabad', value: 'Islamabad' },
    { label: 'Rawalpindi', value: 'Rawalpindi' },
  ];
  const scrollViewRef = useRef(null);
  // Adjust based on your content

  useEffect(() => {
    // Scroll to the end of the content when the component mounts
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: false });
      }
    }, 700); // Timeout to ensure it runs after the component is rendered
  }, []);
  return (
    <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
      >

        <View style={styles.mapviewstyle}>

          {markerPosition ? (
            <MapView
              ref={mapRef}

              style={{ width: wp(100), height: hp(75) }}
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
          ) : <MapView
            ref={mapRef}

            style={{ width: wp(100), height: hp(75) }}
            initialRegion={DEFAULT_REGION}
            showsIndoors={true}
            onPress={handleMapPress}
            onRegionChangeComplete={handleRegionChangeComplete}
          >
            <Marker
              coordinate={DEFAULT_REGION}
              draggable
              tappable
              pinColor='#009DE0'
              onDragEnd={e => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
                getLocationNmaebuyCurentLoc(latitude, longitude);
              }}
            />
          </MapView>}

          <View style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'space-between', width: wp(95), alignItems: 'center' }}>
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
          </View>


        </View>

        <View style={styles.mainview}>
          <View style={{ height: hp(0.5), width: wp(30), backgroundColor: 'gray', borderRadius: 40 }}></View>
          <Spacer height={hp(1)} />
          <View style={styles.addrestextview}>
            {myaddress != '' && (
              <Text style={styles.addrestxt}>{myaddress}</Text>
            )}
          </View>

          <View style={styles.inputview}>

            <TextInput
              style={styles.input}
              // onFocus={() => refRBSheet.current.open()}
              // onPressIn={() => refRBSheet.current.open()}
              onChangeText={txt => setCustomAddress(txt)}
              value={customAddress}
              placeholder="Flat number, Floor, Street, Sector."
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
            />
            <TouchableOpacity
              style={{
                width: wp(5),
                alignSelf: 'center',
                height: wp(5),
              }}
              onPress={() => {
                setmyaddress('');
              }}>
              <Image
                source={images.crossicon}
                style={{
                  width: wp(5),
                  alignSelf: 'center',
                  height: wp(5),
                }}
              />
            </TouchableOpacity>
          </View>
          {/* <Spacer /> */}
          <View style={styles.inputview}>
            <TextInput
              style={styles.input1}
              onChangeText={txt => setnearby(txt)}
              // placeholder="Near by place (Optional)"
              placeholder="Near by place"
              value={nearby}
              placeholderTextColor={Colors.placeholder}
              color={Colors.balckText}
              fontFamily={fonts.PoppinsRegular}
            />
          </View>
          <View style={styles.containerDropwdown}>
            <Dropdown
              style={[styles.dropdown, isOpen]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={CitiesData}
              renderItem={(item) => (
                <Text style={{ color: Colors.black, padding: 10, paddingVertical: hp(2) }}>
                  {item.label}
                </Text>
              )}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isOpen ? 'Select City' : '...'}
              value={city}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setIsOpen(false)}
              onChange={item => {
                setcity(item.value);
                setIsOpen(false);
              }}
            />
          </View>
          <Spacer />

          <Spacer height={hp(1)} />
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
                keyboardType='numeric'
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

        </View>
        <Loader loading={loading} />
        <Spacer />


      </ScrollView>
      <Button
        onPress={saveAddress}
        title={'Save Address'}
        btnContainer={{
          // marginTop: hp(2),
          height: hp(6),
        }}
      />
      <Spacer />
    </View>
  );
};
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
  containerDropwdown: {
    // padding: 16,
    width: wp(87),
    marginTop: hp(2),
    height: hp('6%'),
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  dropdown: {
    height: 50,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdownContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.BtnBackground,
    borderRadius: 5,
    width: wp(86),
    maxHeight: 250,
    marginHorizontal: wp(4),
    paddingHorizontal: 10,


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
  mapviewstyle: { borderWidth: 0, height: hp(75) },
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
    width: wp(43),
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: wp(43),
    borderRadius: 8,
    borderColor: '#E2E2E2',
  },

  inputmainview: {
    borderWidth: 0,
    // marginTop: hp(2),
    marginHorizontal: wp(5),
    width: wp(87),
    alignItems: 'center',
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
    width: wp(85),
    height: hp(7),
    paddingLeft: 10,
  },
  addrestextview: {
    borderWidth: 0,
    // backgroundColor: 'green',
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
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    // position: 'absolute',
    alignSelf: 'center',
    // bottom: 0,
    width: wp(100),
    paddingTop: hp(1),
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
export default AddAddress;