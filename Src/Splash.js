import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { images, Colors } from './Components/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';
import { db } from './Helperfunctions';



const Splash = ({ navigation }) => {


  // useEffect(() => {
  //   TrackingPermission()
  // }, [])

  // const TrackingPermission = async () => {
  //   const trackingStatus = await getTrackingStatus();
  //   if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
  //     console.log('trackingStatus', trackingStatus)
  //     // enable tracking features
  //   } else {
  //     const trackingStatus = await requestTrackingPermission();
  //   }
  // }


  const IsfirstInstall = useSelector(response => {
    return response?.userdataReducer?.userData;
  });

  const AddNewColumn = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT TotalQuantity FROM cartTable LIMIT 1`,
        [],
        () => {
          console.log('Column TotalQuantity exists');
        },
        (txObj, error) => {
          console.log('errorerrorerror', txObj, error);
          db.transaction(tx => {
            console.log('errorerrorerror', tx);
            // Column 'tronPrivateKey' does not exist, so add it
            tx.executeSql(
              `ALTER TABLE cartTable ADD COLUMN TotalQuantity TEXT`,
              [],
              () => console.log('Column TotalQuantity added'),

              error =>
                console.error('Error adding tronPrivateKey column', error),
            );
          });
        },
      );
    });
  }

  useEffect(() => {
    AddNewColumn()
    console.log("IsfirstInstallIsfirstInstall", IsfirstInstall)
    setTimeout(() => {
      if (IsfirstInstall?.userData) {
        navigation.replace('BottomTab');
      } else {
        navigation.replace('GetStarted');

      }
      // navigation.replace('Register')
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
        translucent
        hidden={false}
      />

      <Image
        source={images.splashLogo}
        style={styles.imgstyle}
        resizeMode={'contain'}></Image>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BtnBackground,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    justifyContent: 'center',
  },
  imgstyle: {
    width: '60%',
    height: '15%',
  },
});
export default Splash;

// import { View, Text,Image } from 'react-native'
// import React from 'react'
// import images from './Components/Images'

// const Splash = () => {
//   return (
//     <View>
//         <Image source={images.backgroundSignin}/>
//       <Text>Splash</Text>
//     </View>
//   )
// }

// export default Splash
