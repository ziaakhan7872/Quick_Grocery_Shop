// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   StyleSheet,
//   Platform,
//   PermissionsAndroid,
//   TouchableOpacity,
//   FlatList,
//   KeyboardAvoidingView,
//   ScrollView,
// } from 'react-native';
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import Geolocation from '@react-native-community/geolocation';
// import {
//   Container,
//   images,
//   Button,
//   fonts,
//   Colors,
//   SmallButton,
//   iconPath,
//   Loader,
// } from '../../Components/Index';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import { _AxiosGetBearer, _axiosPatchApi } from '../../Apis/Apis';
// import { useSelector } from 'react-redux';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Spacer from '../../Components/Spacer';
// import { Dropdown } from 'react-native-element-dropdown';


// const API_KEY = 'AIzaSyBNOZn8be1ix47uhHa8cRc385pJhsW8OEs';


// const EditAddress = props => {
//   const userData = useSelector(response => {
//     return response?.userdataReducer?.userData;
//   });
//   let data = props?.route?.params?.item;
//   console.log('propspropspropspropsprops', props?.route?.params?.item);
//   useEffect(() => {
//     getAddresTypes();
//   }, []);

//   const refRBSheet = useRef();
//   const [addrestype, setaddrestype] = useState([]);
//   const [myaddress, setmyaddress] = useState(
//     data?.address ? data?.address : '',
//   );
//   // const [fulladdress, setfulladdress] = useState('');
//   const [city, setcity] = useState(data?.city ? data?.city : '');
//   const [state, setstate] = useState(data?.state ? data?.state : '');
//   const [nearby, setnearby] = useState(
//     data?.nearByPlace ? data?.nearByPlace : '',
//   );
//   const [postalcode, setpostalcode] = useState(
//     data?.postalCode ? data?.postalCode.toString() : '',
//   );
//   const [name, setname] = useState(data?.name ? data?.name : '');
//   const [mobileNo, setmobileNo] = useState(
//     data?.contactNo ? data?.contactNo : '',
//   );
//   const [isOpen, setIsOpen] = useState(false);
//   const [addresid, setaddresid] = useState(data?.addressType?.id);
//   const [loading, setLoading] = useState(false);
//   const [isErrormessage, setisErrormessage] = useState(false);
//   const [errormessage, seterrormessage] = useState('');
//   const [RBSSBool, setRBSSBool] = useState(false);
//   const [customAddress, setCustomAddress] = useState(data?.customAddress)

//   const [currentLongitude, setCurrentLongitude] = useState(data?.longitude);
//   const [currentLatitude, setCurrentLatitude] = useState(data?.latitude);
//   const ref = useRef(null);
//   const mapRef = useRef(null);

//   const [region, setRegion] = useState({
//     latitude: data?.latitude,
//     longitude: data?.longitude,
//     latitudeDelta: 0.001,
//     longitudeDelta: 0.001,
//   });

//   const getAddresTypes = async () => {
//     try {
//       await _AxiosGetBearer('address/types', userData?.userToken)
//         .then(async response => {
//           console.log('RESponse', response, response?.data[0].id);
//           //   setaddresid(response?.data[0].id);
//           setaddrestype(response?.data);
//         })
//         .catch(err => {
//           console.log('Err,', err.data.message);
//         });
//     } catch (error) {
//       console.log('errorerrorerrorerror', error);
//     }
//   };

//   const saveAddress = async () => {
//     try {
//       setisErrormessage(false);

//       if (!myaddress) {
//         setisErrormessage(true);
//         seterrormessage('Enter Address');
//       } else if (!city) {
//         setisErrormessage(true);
//         seterrormessage('Enter city');
//       } else if (!customAddress) {
//         setisErrormessage(true);
//         seterrormessage('Enter you full address');
//       } else if (!name) {
//         setisErrormessage(true);
//         seterrormessage('Enter name');
//       } else if (!mobileNo) {
//         setisErrormessage(true);
//         seterrormessage('Enter mobileNo');
//       } else {
//         setLoading(true);
//         let data2 = {
//           address: myaddress,
//           customAddress: customAddress,
//           name: name,
//           contactNo: mobileNo,
//           city: city,
//           nearByPlace: nearby ?? '',
//           latitude: currentLatitude,
//           longitude: currentLongitude,
//           addressTypeId: addresid,
//         };
//         console.log("data2data2data2data2data2", data2)

//         await _axiosPatchApi(`address/${data.id}`, data2, userData?.userToken)
//           .then(async response => {
//             console.log('update addresssss', response);
//             props.navigation.goBack();
//             setLoading(false);
//           })
//           .catch(err => {
//             console.log('Err,', err);
//             setLoading(false);
//           });
//       }
//     } catch (error) {
//       console.log('errorerrorerrorerror', error);
//       setLoading(false);
//     }
//   };

//   const onPress = (data, details) => {
//     refRBSheet.current.close();
//     console.log('====================================');
//     console.log(data, details);
//     console.log('====================================');
//     setmyaddress(data.description);
//     mapRef.current.animateToRegion({
//       latitude: details.geometry.location.lat,
//       longitude: details.geometry.location.lng,
//       latitudeDelta: 0.001,
//       longitudeDelta: 0.001,
//     });
//     setRegion({
//       latitude: details.geometry.location.lat,
//       longitude: details.geometry.location.lng,
//       latitudeDelta: 0.001,
//       longitudeDelta: 0.001,
//     });
//     setCurrentLatitude(details.geometry.location.lat);
//     setCurrentLongitude(details.geometry.location.lng);

//     console.log('====================================');
//     console.log(details);
//     console.log('====================================');
//   };
//   const getOneTimeLocation = () => {
//     Geolocation.getCurrentPosition(
//       //Will give you the current location
//       position => {
//         console.log('currentLongitude', position);

//         //getting the Longitude from the location json
//         const currentLongitude = JSON.stringify(position.coords.longitude);
//         console.log('currentLongitude', currentLongitude);
//         //getting the Latitude from the location json
//         const currentLatitude = JSON.stringify(position.coords.latitude);

//         console.log('currentLatitude', currentLatitude);
//         setCurrentLatitude(currentLatitude);
//         setCurrentLongitude(currentLongitude);
//         getLocationNmaebuyCurentLoc(currentLatitude, currentLongitude);
//         // //Setting Longitude state
//         // console.log('currentLongitude',currentLongitude);

//         gotocurrentlocation(
//           parseFloat(currentLatitude),
//           parseFloat(currentLongitude),
//         );

//         geocoding(currentLatitude, currentLongitude);
//       },
//       error => {
//         console.log('my erroorororoor', error.message);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 20000,
//       },
//     );
//   };

//   const getLocationNmaebuyCurentLoc = (LATITUDE, LONGITUDE) => {
//     console.log(
//       'getLocationNmaebuyCurentLocgetLocationNmaebuyCurentLoc',
//       LATITUDE,
//       LONGITUDE,
//     );
//     fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LATITUDE},${LONGITUDE}&key=${API_KEY}`,
//     )
//       .then(response => response.json())
//       .then(data => {
//         const address = data.results[0].formatted_address;
//         console.log('addressaddress====>>>>><<<', address);
//         setmyaddress(address);
//       })
//       .catch(error => console.error('errorerrorerrorerror', error));
//   };
//   const gotocurrentlocation = (lat, long) => {
//     setRegion({
//       latitude: lat,
//       longitude: long,
//       latitudeDelta: 0.001,
//       longitudeDelta: 0.001,
//     });
//     mapRef.current.animateToRegion({
//       latitude: lat,
//       longitude: long,
//       latitudeDelta: 0.001,
//       longitudeDelta: 0.001,
//     });
//   };
//   const geocoding = (lati, longi) => {
//     fetch(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`,
//     )
//       .then(response => response.json())
//       .then(data => {
//         const location = data.results[0].geometry.location;
//         const latitude = location.lat;
//         const longitude = location.lng;
//         console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//       });
//   };

//   // const Clear = (sg) => {
//   //     ref.current?.setmyaddress("");
//   // };
//   const renderItem = ({ item, insex }) => {
//     return (
//       <View style={styles.btnmain}>
//         <SmallButton
//           onPress={() => setaddresid(item.id)}
//           title={item.name}
//           backgroundColor={
//             addresid == item.id ? Colors.smallbtnbgcolor : Colors.whitecolor
//           }
//           borderColor={
//             addresid == item.id ? Colors.BtnBackground : Colors.borderColor
//           }
//           leftimage={item.iconUrl}
//           tintColor={
//             addresid == item.id ? Colors.BtnBackground : Colors.balckText
//           }
//           titlestyle={{
//             color:
//               addresid == item.id ? Colors.BtnBackground : Colors.balckText,
//             fontSize: 15,
//             marginLeft: 10,
//           }}
//         />
//       </View>
//     );
//   };
//   const CitiesData = [
//     { label: 'Islamabad', value: 'Islamabad' },
//     { label: 'Rawalpindi', value: 'Rawalpindi' },
//   ];
//   return (
//     <Container style={{ backgroundColor: Colors.backgroundColor }}>
//       <KeyboardAwareScrollView >
//         <View style={styles.mapviewstyle}>
//           <MapView
//             // provider={PROVIDER_GOOGLE}
//             ref={mapRef}
//             style={{ width: wp(100), height: hp(50) }}
//             initialRegion={region}
//             // showsUserLocation={true}
//             // followUserLocation={true}
//             showsIndoors={true}
//           // draggable

//           //  onRegionChange={(region) => setRegion(region)}
//           // onRegionChangeComplete={(region) => setRegion(region)}
//           // onDragEnd={(region) => setRegion(region)}
//           >
//             <Marker
//               coordinate={region}
//               draggable
//               // image={require('../../Assets/Images/marker.png')}
//               style={{ width: 26, height: 28 }}
//               onDragEnd={e => {
//                 setCurrentLatitude(e.nativeEvent.coordinate.latitude);
//                 setCurrentLongitude(e.nativeEvent.coordinate.longitude);
//                 getLocationNmaebuyCurentLoc(
//                   e.nativeEvent.coordinate.latitude,
//                   e.nativeEvent.coordinate.longitude,
//                 );
//               }}
//             />
//           </MapView>
//         </View>

//         <View style={styles.mainview}>



//           <View style={styles.addrestextview}>
//             {myaddress != '' && <Text style={styles.addrestxt}>{myaddress}</Text>}


//             <View style={styles.inputview}>
//               <TextInput
//                 style={styles.input}
//                 // onFocus={() => refRBSheet.current.open()}
//                 onChangeText={txt => setCustomAddress(txt)}
//                 value={customAddress}
//                 placeholder="Enter your full address"
//                 placeholderTextColor={Colors.placeholder}
//                 color={Colors.balckText}
//                 fontFamily={fonts.PoppinsRegular}
//               />
//               <Image
//                 source={images.crossicon}
//                 style={{
//                   width: wp(5),
//                   alignSelf: 'center',
//                   height: wp(5),
//                 }}
//               />
//             </View>

//             <View style={styles.inputmainview}>

//               <View style={styles.inputview}>
//                 <TextInput
//                   style={styles.input1}
//                   onChangeText={txt => setnearby(txt)}
//                   placeholder="Near by place"
//                   value={nearby}
//                   placeholderTextColor={Colors.placeholder}
//                   color={Colors.balckText}
//                   fontFamily={fonts.PoppinsRegular}
//                 />
//               </View>
//             </View>

//             <View style={styles.containerDropwdown}>
//               <Dropdown
//                 style={[styles.dropdown, isOpen]}
//                 placeholderStyle={styles.placeholderStyle}
//                 selectedTextStyle={styles.selectedTextStyle}
//                 iconStyle={styles.iconStyle}
//                 data={CitiesData}
//                 renderItem={(item) => (
//                   <Text style={{ color: Colors.black, padding: 10, paddingVertical: hp(2) }}>
//                     {item.label}
//                   </Text>
//                 )}
//                 maxHeight={300}
//                 labelField="label"
//                 valueField="value"
//                 placeholder={!isOpen ? 'Select City' : '...'}
//                 value={city}
//                 onFocus={() => setIsOpen(true)}
//                 onBlur={() => setIsOpen(false)}
//                 onChange={item => {
//                   setcity(item.value);
//                   setIsOpen(false);
//                 }}
//               />
//             </View>
//             <Spacer />

//             {/* <View style={styles.inputview}>

//                     <TextInput
//                         style={styles.input}

//                         placeholder="Nearby Place (Optional)"
//                         onChangeText={(txt)=>setnearby(txt)}
//                         placeholderTextColor={Colors.placeholder}
//                         color={Colors.balckText}
//                         fontFamily={fonts.PoppinsRegular}

//                     />

//                 </View> */}
//             <Spacer height={hp(2)} />

//             <View style={styles.inputmainview}>
//               <View style={styles.inputsview}>
//                 <TextInput
//                   style={styles.input1}
//                   placeholder="Name"
//                   placeholderTextColor={Colors.placeholder}
//                   color={Colors.balckText}
//                   value={name}
//                   fontFamily={fonts.PoppinsRegular}
//                   onChangeText={txt => setname(txt)}
//                 />
//               </View>

//               <View style={styles.inputsview}>
//                 <TextInput
//                   style={styles.input1}
//                   value={mobileNo}
//                   onChangeText={txt => setmobileNo(txt)}
//                   placeholder="Mobile No."
//                   placeholderTextColor={Colors.placeholder}
//                   color={Colors.balckText}
//                   fontFamily={fonts.PoppinsRegular}
//                 />
//               </View>
//             </View>

//             <FlatList
//               data={addrestype}
//               renderItem={renderItem}
//               columnWrapperStyle={{ justifyContent: 'space-between' }}
//               numColumns={3}
//               keyExtractor={(item, index) => index.toString()}
//             />
//             {isErrormessage && (
//               <Text style={{ color: 'red', marginTop: hp(2) }}>{errormessage}</Text>
//             )}
//             <Button
//               onPress={() => saveAddress()}
//               title={'Update Address'}
//               btnContainer={{
//                 marginTop: hp(5),
//                 height: hp(6),
//               }}
//             />
//             {RBSSBool == true && (
//               <RBSheet
//                 ref={refRBSheet}
//                 closeOnDragDown={true}
//                 closeOnPressMask={false}
//                 height={hp(90)}
//                 customStyles={{
//                   wrapper: {
//                     backgroundColor: 'rgba(52, 52, 52, 0.3)',
//                   },
//                   draggableIcon: {
//                     backgroundColor: '#E4E4E4',
//                     width: wp('30%'),
//                   },
//                   container: {
//                     // alignItems: 'center',
//                     backgroundColor: '#fff',
//                     borderTopLeftRadius: 30,
//                     borderTopRightRadius: 30,
//                   },
//                 }}>
//                 <KeyboardAvoidingView
//                   behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
//                   style={{ flex: 1 }}>
//                   <ScrollView style={{ flex: 1 }}>
//                     <View
//                       style={{
//                         flex: 1,
//                       }}>
//                       <View
//                         style={{
//                           justifyContent: 'center',
//                           marginHorizontal: hp('2%'),
//                           height: hp(70),
//                         }}>
//                         <GooglePlacesAutocomplete
//                           ref={ref}
//                           placeholder={'Search Location'}
//                           minLength={2}
//                           fetchDetails={true}
//                           // debounce={400}
//                           onChangeText={a => { }}
//                           textInputProps={{
//                             placeholderTextColor: 'gray',
//                             color: 'black',
//                           }}
//                           query={{
//                             key: API_KEY,
//                             language: 'en',
//                             // components: "country:bg",
//                           }}
//                           GooglePlacesDetailsQuery={{
//                             fields: 'geometry',
//                           }}
//                           onPress={onPress}
//                           onFail={error => console.error(error)}
//                           renderRightButton={() => (
//                             <TouchableOpacity
//                               onPress={() => {
//                                 refRBSheet.current.close();
//                               }}
//                               style={{
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 marginRight: 10,
//                                 color: 'black',
//                               }}>
//                               <Image
//                                 source={iconPath.Cross}
//                                 resizeMode="contain"
//                                 style={{
//                                   height: 20,
//                                   width: 20,
//                                   tintColor: '#D2D2D2',
//                                 }}
//                               />
//                             </TouchableOpacity>
//                           )}
//                           styles={{
//                             textInputContainer: {
//                               marginVertical: '10%',
//                               borderWidth: 1,
//                               marginHorizontal: 10,
//                               color: 'black',
//                               borderColor: '#D2D2D2',
//                               borderRadius: 10,
//                             },
//                             predefinedPlacesDescription: {
//                               color: '#1faadb',
//                             },
//                             poweredContainer: {
//                               justifyContent: 'flex-end',
//                               alignItems: 'center',
//                               borderBottomRightRadius: 5,
//                               borderBottomLeftRadius: 5,
//                               borderColor: '#c8c7cc',
//                               borderTopWidth: 0.5,
//                             },

//                             description: { color: 'black' },
//                           }}
//                         />
//                       </View>
//                     </View>
//                   </ScrollView>
//                 </KeyboardAvoidingView>
//               </RBSheet>
//             )}
//           </View>
//         </View>


//         <Loader loading={loading} />
//       </KeyboardAwareScrollView >
//     </Container>
//   );
// };
// const styles = StyleSheet.create({
//   containerDropwdown: {
//     // padding: 16,
//     width: wp(87),
//     marginTop: hp(2),
//     height: hp('6%'),
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: '#000',
//   },
//   dropdown: {
//     height: 50,
//     borderColor: '#E2E2E2',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//     // borderColor: '#E2E2E2',
//     color: '#E2E2E2',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: '#000',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   dropdownContainer: {
//     marginTop: 5,
//     borderWidth: 1,
//     borderColor: Colors.BtnBackground,
//     borderRadius: 5,
//     width: wp(86),
//     maxHeight: 250,
//     marginHorizontal: wp(4),
//     paddingHorizontal: 10,


//   },
//   itemText: {
//     fontSize: 16,
//     color: 'black'
//   },
//   item: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#D9F0FA',
//   },
//   mapviewstyle: { borderWidth: 0, height: hp(50) },
//   inputview: {
//     borderWidth: 1,
//     marginTop: hp(2),
//     marginHorizontal: wp(0),
//     width: wp(87),
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     borderRadius: 8,
//     borderColor: '#E2E2E2',
//     paddingRight: 10,
//   },
//   mainview: {
//     borderWidth: 0,
//     // flex: 1,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     // position: 'absolute',
//     alignSelf: 'center',
//     // bottom: 0,
//     width: wp(100),
//     paddingTop: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // paddingBottom: hp(3),
//     backgroundColor: Colors.backgroundColor,
//   },
//   btnmain: {
//     borderWidth: 0,
//     marginTop: hp(3),
//     width: wp(30),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btns: {
//     borderColor: 'green',
//     flexDirection: 'row',
//     backgroundColor: '#DDEFE3',
//     borderRadius: 20,
//     alignItems: 'center',
//     borderWidth: 1,
//     width: wp(26),
//     height: hp(5),
//     paddingHorizontal: wp(2),
//   },
//   inputsview: {
//     borderWidth: 1,

//     borderRadius: 8,
//     borderColor: '#E2E2E2',
//   },

//   inputmainview: {
//     borderWidth: 0,
//     // marginTop: hp(2),
//     // marginHorizontal: wp(5),
//     width: wp(87),
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   input: {
//     borderWidth: 0,
//     width: wp(77),
//     height: hp(7),
//     paddingLeft: 10,
//   },
//   input1: {
//     borderWidth: 0,
//     width: wp(40),
//     height: hp(7),
//     paddingLeft: 10,
//   },
//   addrestextview: {
//     borderWidth: 0,
//     marginHorizontal: wp(5),
//     width: wp(87),
//     marginTop: hp(3),
//   },
//   addrestxt: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: Colors.balckText,
//     fontFamily: fonts.PoppinsRegular,
//   },

//   img: {
//     alignSelf: 'center',
//     width: 224.69,
//     height: 170.69,
//     //     height: Platform.OS === 'ios' ?  hp(15) : hp(18),
//     // width: Platform.OS === 'ios' ?  wp(43) : wp(45),
//   },
//   location: {
//     textAlign: 'center',
//     //marginTop:hp('5%'),
//     marginTop: Platform.OS === 'ios' ? hp(5) : hp(7),
//     fontSize: 20,
//     fontWeight: '600',
//     color: 'black',
//   },
//   txt: {
//     textAlign: 'center',
//     marginTop: Platform.OS === 'ios' ? hp(1) : hp(1),
//     color: '#929292',
//   },
//   touch: {
//     marginTop: Platform.OS === 'ios' ? hp(2) : hp(7),
//     borderWidth: 1,
//     borderColor: 'green',
//     marginHorizontal: wp('5%'),
//     height: Platform.OS === 'ios' ? hp(6) : hp(7),
//     borderRadius: 10,
//     justifyContent: 'center',
//   },
//   locationtouch: {
//     marginTop: hp('2%'),
//     borderWidth: 2,
//     borderColor: '#F7F7F7',
//     marginHorizontal: wp('5%'),
//     justifyContent: 'center',
//     height: Platform.OS === 'ios' ? hp(6) : hp(7),
//     borderRadius: 10,
//   },
// });
// export default EditAddress;

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
  _axiosPatchApi,
  _PostBearer,
  _PostBearerAUTH,
} from '../../Apis/Apis';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spacer from '../../Components/Spacer';
import { Dropdown } from 'react-native-element-dropdown';
const API_KEY = 'AIzaSyBNOZn8be1ix47uhHa8cRc385pJhsW8OEs';




const EditAddress = props => {
  const userData = useSelector(response => {
    return response?.userdataReducer?.userData
  });

  let data = props?.route?.params?.item;

  console.log("datadatadatadatadata", data)
  useEffect(() => {
    getAddresTypes();
    // getOneTimeLocation();
  }, []);


  const [addrestype, setaddrestype] = useState([]);
  const [myaddress, setmyaddress] = useState(data?.address ?? '');
  // const [fulladdress, setfulladdress] = useState('');
  const [city, setcity] = useState(data?.city ?? 'Islamabad');

  const [nearby, setnearby] = useState(data?.nearByPlace ?? '');
  const [name, setname] = useState(userData?.userData?.name ?? '');
  const [mobileNo, setmobileNo] = useState(data?.contactNo ?? '');
  const [addresid, setaddresid] = useState(data?.addressType?.id);
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
  const [DropDownHandler, setDropDownHandler] = useState(true);
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
  const [customAddress, setCustomAddress] = useState(data?.customAddress ?? '')
  const DEFAULT_REGION = {

    latitude: props?.route?.params?.lat ?? 33.64485244270809, // Example latitude (San Francisco)
    longitude: props?.route?.params?.lng ?? 73.02109845239706, // Example longitude
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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
        setLoading(true);

        let data2 = {
          address: myaddress,
          customAddress: customAddress,
          name: name,
          contactNo: mobileNo,
          city: city,

          nearByPlace: nearby?.length > 0 ? nearby : "null",
          latitude: region?.latitude,
          longitude: region?.longitude,
          addressTypeId: addresid,
        };


        console.log('data is this for click', data2);
        console.log('userData?.userTokenuserData?.userToken', userData?.userToken);
        console.log('userData?.userTokenuserData?.userToken', data.id);


        await _axiosPatchApi(`address/${data.id}`, data2, userData?.userToken)
          .then(async response => {
            console.log('update addresssss', response);
            props.navigation.navigate("Address");
            setLoading(false);
          })
          .catch(err => {
            console.log('Error in the update address api,', err);
            setLoading(false);
          });



      }
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false);
    }
  };

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
          setDropDownHandler(true);
          setResult([...data]);
        });
      }, 200);
    }
  }, [query]);

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

          <View style={{ alignSelf: 'flex-end', position: 'absolute', bottom: -10, flexDirection: 'row', justifyContent: 'space-between', width: wp(95), alignItems: 'center' }}>
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
export default EditAddress;
