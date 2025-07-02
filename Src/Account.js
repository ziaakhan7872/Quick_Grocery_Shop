import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  images,
  Colors,
  fonts,
  Header,
  Button,
  Loader,
} from './Components/Index';
import { DeleteUserAxious, _axiosdeleteAPIAUTH } from './Apis/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { SaveUserData, Saveuserislogin } from './Redux/Actions/Actions';
import { DeleteAccountModal } from './Components/Modal';
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native';
import Ionicon from "react-native-vector-icons/Ionicons"



const Account = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const IsfirstInstall = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });
  const userToken = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });
  const userData1 = useSelector(response => {
    return response?.userdataReducer?.userData;
  });
  const userId = useSelector(response => {
    return response?.userdataReducer?.userData?.userData?.id;
  });

  const [userData, setUserData] = useState(userData1)

  useEffect(() => {
    setUserData(userData1)
  }, [userData1, useIsFocused()])

  // console.log("userDatauserDatauserDatauserData", userData)

  const Logout = async () => {

    setLoading(true);
    dispatch(SaveUserData({}));
    dispatch(Saveuserislogin(false));
    props.navigation.replace('Login');
    await _axiosdeleteAPIAUTH('users-auth/logout', userToken)
      .then(async response => {
        setLoading(false);
        dispatch(SaveUserData({}));
        dispatch(Saveuserislogin(false));

        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Animation complete, navigate to the Login screen
          props.navigation.replace('Login');
        });
      })
      .catch(err => {
        setLoading(false);
        console.log('Err,', err);
      });
  };

  const onPressSure = async () => {
    if (userToken) {
      try {
        setLoading(true);
        await DeleteUserAxious(`users/self-delete/${userId}`, userToken).then(response => {
          console.log("response", response)
          dispatch(SaveUserData({}));
          dispatch(Saveuserislogin(false));
          props.navigation.replace('Login');
        })
      } catch (error) {
        setLoading(false);
        console.log("error", error)

      }

    } else {
      console.log("what is this ")
      setIsModalVisible(false)
      Toast.show('Please Login your account to delete your Account and data.')
      props.navigation.replace('Login');
    }
  }
  console.log("its user name", userData)
  return (
    <Animated.View
      style={{
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        paddingHorizontal: wp('5%'),
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}>
      <View style={{ marginTop: hp(Platform.OS == 'ios' ? 6 : 2) }}>
        <Text style={styles.nametxt}>{'Hello'}</Text>
        <Text style={styles.nameshow}>
          {userData?.userData?.name ? userData?.userData?.name : 'Guest'}
        </Text>
      </View>

      <View style={{ marginTop: hp('1%') }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(IsfirstInstall ? 'Myprofile' : 'Login')
          }
          style={styles.container}>
          <View style={styles.containertext}>
            <Image style={styles.containerimg} source={images.user} />
          </View>
          <View style={styles.orderarrow}>
            <Text style={styles.listtext}>My Profile</Text>
          </View>
          <View style={styles.conarrow}>
            <Image
              style={styles.containerarrow}
              source={images.leftArrow}></Image>
          </View>
        </TouchableOpacity>
        <View style={styles.newline} />
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Favourite')
          }
          style={styles.container}>
          <View style={styles.containertext}>
            <Ionicon name='heart' color={Colors.BtnBackground} size={20} />
          </View>
          <View style={styles.orderarrow}>
            <Text style={styles.listtext}>Favourite</Text>
          </View>
          <View style={styles.conarrow}>
            <Image
              style={styles.containerarrow}
              source={images.leftArrow}></Image>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.newline} /> */}
        {/* <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate('Favourite')}>
                <View style={styles.containertext}>
                    <Image style={styles.containerimg} source={images.heart} />

                </View >
                <View style={styles.orderarrow}>
                    <Text style={styles.listtext}>
                        Favourite
                    </Text>
                </View>
                <View style={styles.conarrow}>
                    <Image style={styles.containerarrow} source={images.leftArrow}>

                    </Image>
                </View>
            </TouchableOpacity> */}
        <View style={styles.newline} />
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            props.navigation.navigate(IsfirstInstall ? 'Address' : 'Login')
          }>
          <View style={styles.containertext}>
            <Image style={styles.containerimg} source={images.locations} />
          </View>
          <View style={styles.orderarrow}>
            <Text style={styles.listtext}>Address</Text>
          </View>
          <View style={styles.conarrow}>
            <Image
              style={styles.containerarrow}
              source={images.leftArrow}></Image>
          </View>
        </TouchableOpacity>
        <View style={styles.newline} />
        {/* <TouchableOpacity style={styles.container} onPress={()=> props.navigation.navigate('Wallet')}>
                <View style={styles.containertext}>
                    <Image style={styles.containerimg} source={images.emptyWallet} />

                </View >
                <View style={styles.orderarrow}>
                    <Text style={styles.listtext}>
                        Wallet
                    </Text>
                </View>
                <View style={styles.conarrow}>
                    <Image style={styles.containerarrow} source={images.leftArrow}>

                    </Image>
                </View>
            </TouchableOpacity> */}
        {/* <View style={styles.newline} /> */}
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            props.navigation.navigate(IsfirstInstall ? 'OrderHistory' : 'Login')
          }>
          <View style={styles.containertext}>
            <Image style={styles.containerimg} source={images.orderhistory} />
          </View>
          <View style={styles.orderarrow}>
            <Text style={styles.listtext}>Order History</Text>
          </View>
          <View style={styles.conarrow}>
            <Image
              style={styles.containerarrow}
              source={images.leftArrow}></Image>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.newline} /> */}
        {/* <TouchableOpacity
          style={styles.container}
          onPress={() =>
            props.navigation.navigate(
              IsfirstInstall ? 'Notifications' : 'Login',
            )
          }>
          <View style={styles.containertext}>
            <Image style={styles.containerimg} source={images.notificationss} />
          </View>
          <View style={styles.orderarrow}>
            <Text style={styles.listtext}>Notifications</Text>
          </View>
          <View style={styles.conarrow}>
            <Image
              style={styles.containerarrow}
              source={images.leftArrow}></Image>
          </View>
        </TouchableOpacity> */}
        {/* <View style={styles.newline} /> */}
        {/* <TouchableOpacity style={styles.container} onPress={()=> props.navigation.navigate('NewProduct')}>
                <View style={styles.containertext}>
                    <Image style={styles.containerimg} source={images.lampcharge} />

                </View >
                <View style={styles.orderarrow} >
                    <Text style={styles.listtext}>
                    New Product Suggestions
                    </Text>
                </View>
                <View style={styles.conarrow}>
                    <Image style={styles.containerarrow} source={images.leftArrow}>

                    </Image>
                </View>
            </TouchableOpacity> */}
        <View style={styles.newline} />
        <TouchableOpacity
          style={styles.container}
          onPress={() => props.navigation.navigate('Help')}>
          <View style={styles.containertext}>
            <Image style={styles.containerimg} source={images.headphone} />
          </View>
          <View style={styles.orderarrow}>
            <Text style={styles.listtext}>Help & Support</Text>
          </View>
          <View style={styles.conarrow}>
            <Image
              style={styles.containerarrow}
              source={images.leftArrow}></Image>
          </View>
        </TouchableOpacity>
        <View style={styles.newline} />
        {
          IsfirstInstall && (
            <>

              <TouchableOpacity
                style={styles.container}
                onPress={() => setIsModalVisible(true)}>
                <View style={styles.containertext}>
                  <Image style={[styles.containerimg, { tintColor: 'red' }]} source={images.remove} />
                </View>
                <View style={styles.orderarrow}>
                  <Text style={[styles.listtext, { color: 'red' }]}>Delete Your Account</Text>
                </View>
                <View style={styles.conarrow}>
                  <Image
                    style={[styles.containerarrow, { tintColor: 'red' }]}
                    source={images.leftArrow}></Image>
                </View>
              </TouchableOpacity>
              <View style={styles.newline} />
            </>
          )
        }


        {/* <View style={styles.newline} /> */}
      </View>

      {IsfirstInstall && (
        <View
          style={{ flex: 1, justifyContent: 'flex-end', marginBottom: hp(4) }}>
          <Button
            onPress={() => Logout()}
            title={'Log Out'}
            btnContainer={{
              backgroundColor: Colors.redcolor,

              padding: hp(6),
              marginTop: hp(5),
            }}
          />
        </View>
      )}
      <Loader loading={loading} />
      <DeleteAccountModal onPressSure={onPressSure} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  nametxt: {
    fontSize: 19,
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
  },
  nameshow: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
  },
  listtext: {
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    alignItems: 'center',
    height: wp('15%'),
    flexDirection: 'row',
  },
  containerimg: {
    tintColor: Colors.BtnBackground,
    width: wp('5%'),
    height: wp('5%'),
  },
  containerarrow: {
    width: wp('5%'),
    height: wp('6%'),
    marginLeft: 80,
  },
  line: {
    borderBottomColor: '#ECF0F1',
    borderBottomWidth: 1.5,
    marginTop: hp('2%'),
  },
  conarrow: {
    width: wp('20%'),
    marginTop: 5,
  },
  orderarrow: {
    width: wp('55%'),
  },
  containertext: {
    width: wp('9%'),
  },
  newline: {
    borderBottomColor: '#ECF0F1',
    borderBottomWidth: 1.5,
  },
});
export default Account;
