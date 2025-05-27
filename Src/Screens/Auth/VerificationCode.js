import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity ,PermissionsAndroid} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import {Loader,Button,fonts,Colors} from '../../Components/Index'
import { _axiosPostAPI } from '../../Apis/Apis'
import { CommonActions } from "@react-navigation/routers";
import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect } from "@react-navigation/native";
const VerificationCode = props=> {

  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [errormsg, seterrormsg] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props1, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const [region, setRegion] = useState({});
  useFocusEffect(
      React.useCallback(() => {
          GetLocation()
          getOneTimeLocation()
      
      },[])
    )

  const GetLocation = () => {
      if (Platform.OS == 'android') {
          const requestLocationPermission = async () => {

              try {
                  const granted = await PermissionsAndroid.request(
                      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                      {
                          title: 'Location Access Required',
                          message: 'This App needs to Access your location',
                      },
                  );
                  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                      //To Check, If Permission is granted
                      getOneTimeLocation();
                      // subscribeLocationLocation();
                  } else {
                      console.log('Permission Denied');
                  }
              } catch (err) {
                  console.warn(err);
              }


          };
          requestLocationPermission();
          return () => {
              Geolocation.clearWatch(watchID);
          };
      }
      else {
          getOneTimeLocation();
          console.log('iosss platform');
      }

  }

  const getOneTimeLocation = () => {
      Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
          console.log('currentLongitude',position)

              //getting the Longitude from the location json
              const currentLongitude =
                  JSON.stringify(position.coords.longitude);
                  console.log('currentLongitude',currentLongitude);
              //getting the Latitude from the location json
              const currentLatitude =
                  JSON.stringify(position.coords.latitude);
              
              console.log('currentLatitude',currentLatitude);

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
              console.log('my erroorororoor',error.message);
          },
          {

              enableHighAccuracy:true, timeout: 20000
          },
      );
  };


  // const phonenumber = props.route.params.phonenumber

  const verifyNum = async () => {
   props.navigation.navigate('Location',{
    region:region,
     isshow:false
  })
    // setLoading(true)
    // let data = {}
    // data['phoneNumber'] = ('92' + props.route.params.number)
    // data['otpCode'] = value
    // console.log("VAHDh", data)
    // await _axiosPostAPI('auth/challenge/otp-verification', data)
    //   .then(async (response) => {
    //     if(response.data.statusCode==200){
    //        props.navigation.dispatch(
    //           CommonActions.reset({
    //             index: 0,
    //             routes: [
    //               {
    //                 name: "Location",
    //                 params: {
    //                   number:props.route.params.number
    //                 },

    //               },

    //             ],
               

    //           })
    //         );
    //     setLoading(false)

              
    //       }
    //       else{
    //         console.log('rrrrr',response.data.statusCode)
    //     setLoading(false)
          
    //           seterrormsg(response.data.message)
    //       }

       
    //     console.log("RESponse", response);
    //   })
    //   .catch((err) => {
    //     setLoading(false)
    //     console.log("Err catch", err);
    //     seterrormsg(err.data.message)
    //   })
  }
  const ResisterPhone = async () => {
  
    setLoading(true)
    let data = {}
    data['phoneNumber'] = ('92' + props.route.params.number)
    console.log(data);
    await _axiosPostAPI('auth/phone-number', data)
        .then( (response) => {
            setLoading(false)
            console.log("RESponse", response.data);
         
        })
        .catch((err) => {
            setLoading(false)
            console.log("Err,", err);
          
        })
    }

  const CELL_COUNT = 4

  return (
    <View style={styles.mainView}>
      <View style={styles.subView}>
        <Text style={styles.entercodeTxt}>{'Enter code sent to your'} {'\n'} {'phone'}</Text>
        <View style={styles.numberView}>
          <Text style={{ color: '#929292' }}>{'We sent it to the number'} </Text>
          {/* <Text style={{ fontWeight: '600', color: 'black' }}>{'+92'} {props.route.params.number.slice(0,6)}***</Text> */}
          <Text style={{ fontWeight: '600', color: Colors.balckText,fontFamily:fonts.PoppinsRegular }}>{'+92'} {3060831393}***</Text>

        </View>
      </View>
      <View style={{
        marginTop: wp(10),
        alignSelf: 'center'
      }}>
        {/* Verification  code */}
        <CodeField
          // ref={ref}
          // {...props1}
          value={value}
          onChangeText={(txt)=>{setValue(txt),seterrormsg('')}}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          editable={true}
          // autoFocus={true}
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {errormsg.length>0 &&(
        <Text style={{alignSelf:'center',marginTop:20,color:'red'}}>{errormsg}</Text>
        )}
      </View>
      <Button onPress={() =>verifyNum()} style={styles.button}
        title= {"Continue"}
        btnContainer={{
         
          marginTop:hp(15),
          height:hp(6),
          bottom:hp(1)
          
        }}
      
      />
   
      <TouchableOpacity style={{ marginTop: hp('2%'), alignSelf: 'center', borderBottomWidth: 0, alignItems: 'center' }} onPress={()=>console.log('jdjdkj')}>
        <Text style={{ textAlign: 'center', color: Colors.balckText,fontFamily:fonts.PoppinsRegular }}>Resend the code?</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: '#CFCFCF',
          borderBottomWidth: 1,
          width: wp('30%'),
          alignSelf: 'center',
          // marginTop:hp('1%'),
          marginTop: Platform.OS === 'ios' ? hp(0) : hp(0),

        }}
      />
      
      <Loader loading={loading} />
    </View>
  )

}
const styles = StyleSheet.create({

  mainView:{
    flex: 1, 
    backgroundColor: Colors.backgroundColor

  },
  subView:{
    marginTop: hp('15%'),
     paddingHorizontal: wp('5%')
  },
  entercodeTxt:{
    textAlign: 'center', 
    color: Colors.balckText,fontFamily:fonts.PoppinsRegular,
    fontSize: 20, 
    fontWeight: '600'
  },
  numberView:{
    flexDirection: 'row', 
    marginTop: hp('2%'), 
    justifyContent: 'center'
  },
  countryPicker: {
    marginTop: wp(10),
    alignSelf: 'center',
  },
  countryPickerView: {
    width: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: wp(5),
    paddingVertical: wp(2),
  },
  phone: {
    marginTop: hp('2%'),
    color: '#191C32',
    width: wp('90%'),
    fontSize: 27,
    fontWeight: '600',
    marginLeft: wp(4),
    //fontFamily: fonts.PoppinRegular,
  },

  codeFieldRoot: { marginTop: 10 },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 45,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#00000030',
    color: '#000',
    textAlign: 'center',
    borderRadius: 8,
    marginHorizontal: wp(3),
  },
  focusCell: {
    borderColor: 'green',
  },

  buttontouch: {
    justifyContent: 'center',
    marginTop: hp('8%'),
    backgroundColor: '#53B175',
    width: wp('80%'),
    height: Platform.OS === 'ios' ? hp(5.5) : hp(7),
    borderRadius: 25,
    alignSelf: 'center'
  }
})

export default VerificationCode;