import React, { useState,useEffect,useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Platform } from 'react-native'
import {images,Colors,fonts, Loader} from "../../Components/Index";
import ToggleSwitch from 'toggle-switch-react-native'
import { MenuOption, MenuOptions, MenuContext, Menu, MenuTrigger, MenuProvider } from 'react-native-popup-menu'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { _AxiosGetBearerNotification,_axiosPatchApiNOTIFICATION } from "../../Apis/Apis";
import { useSelector } from "react-redux";

const Notifications = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [NotificationList, setNotificationList] = useState([]);
  const [NotificationIds, setNotificationIds] = useState([]);
  const menuref =useRef(null);


  const userToken = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });
  const markallread = async () => {
    try {
        setLoading(true)
      await _axiosPatchApiNOTIFICATION(`notifications/is-read`,{notificationsIds:NotificationIds},userToken)
        .then(async response => {
          console.log('RESponse', response);
          getNotifications()
         setLoading(false)
         setToogle(false)
         menuref.current.close()
        })
        .catch(err => {
          console.log('Err,', err);
         setLoading(false)

        });
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false)

    }
  };


  const getNotifications = async () => {
    try {
        setLoading(true)
      await _AxiosGetBearerNotification(`notifications?limit=500&afterElement=1`,userToken)
        .then(async response => {
          console.log('RESponse', response.data.notifications);
let arr=[]
          response.data.notifications.map((data)=>{
arr.push(data.id)
          })
         
          setNotificationIds(arr)
          setNotificationList(response.data.notifications)
         setLoading(false)
        })
        .catch(err => {
          console.log('Err,', err);
         setLoading(false)

        });
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false)

    }
  };
  const [toogleValue, setToogle] = useState(false)
  useEffect(()=>{
    getNotifications()
  },[])

  function getTimeAgo(date) {
    const currentDate = new Date();
    const previousDate = new Date(date);
  
    const timeDiff = Math.abs(currentDate - previousDate);
  
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;
  
    if (timeDiff < minute) {
      const seconds = Math.floor(timeDiff / 1000);
      return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
    } else if (timeDiff < hour) {
      const minutes = Math.floor(timeDiff / minute);
      return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else if (timeDiff < day) {
      const hours = Math.floor(timeDiff / hour);
      return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (timeDiff < week) {
      const days = Math.floor(timeDiff / day);
      return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (timeDiff < month) {
      const weeks = Math.floor(timeDiff / week);
      return weeks + (weeks === 1 ? ' week ago' : ' weeks ago');
    } else if (timeDiff < year) {
      const months = Math.floor(timeDiff / month);
      return months + (months === 1 ? ' month ago' : ' months ago');
    } else {
      const years = Math.floor(timeDiff / year);
      return years + (years === 1 ? ' year ago' : ' years ago');
    }
  }
const rendernotification=({item,index})=>{
  return(
     <View style={{...styles.mainview,backgroundColor:item.isRead?'#ffffff':'#F9F9F9'}}>
    <View style={styles.sndview}>
     {item.imageUrl!=null?
     
     <View style={styles.iconsview}>
        <Image source={{uri:item.imageUrl}} style={{ width: 43, height: 43 }} />
      </View>
      :
     <View style={styles.iconsview}>
        <Image source={images.gift} style={{ width: 43, height: 43 }} />
      </View>
      
      
      }
      <View style={styles.txtmain}>
        <View style={styles.titleview}>
          <Text style={styles.titlestyle}>{item.title}</Text>
          <View style={styles.timeview}>
            <Text style={styles.timetxt}>{getTimeAgo(item.createdAt)}</Text>
          </View>
        </View>
        <View style={styles.subtitleview}>
          <Text style={styles.subtitletxt}>{item.description}</Text>
        </View>
      </View>
    </View>
    <View style={styles.bottomline}></View>
  </View>
  )
}
  return (
    <MenuProvider>
      <View style={{ backgroundColor: Colors.backgroundColor , flex: 1 }}>
        <View style={{ marginHorizontal: hp('3%'), marginTop: hp(Platform.OS=='ios'?6:2), borderColor: 'red', borderWidth: 0 }}>
          <View style={{ flexDirection: 'row',borderColor:'red',borderWidth:0,justifyContent:'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{borderColor:'red',borderWidth:0,flexDirection:'row'}}>
              <Image source={images.leftarrow} style={{ height: hp('3%'), width: wp('3.5%'), borderColor: 'red', borderWidth: 0 }} />
            
            <View style={{ alignSelf: 'center', width: wp('75%'), justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 18, color: Colors.balckText,fontFamily:fonts.PoppinsRegular }}>Notifications</Text>
            </View>
            </TouchableOpacity>
            <Menu ref={menuref} style={{}}>
              <MenuTrigger  style={{borderWidth:0,borderColor:'red',width:wp(7),alignItems:'flex-end'}} customStyles={{ triggerTouchable: { underlayColor: 'white' } }}>
                <Image source={images.more} style={{ width: wp('2.5%'), height: hp('3%') }}>
                </Image>
              </MenuTrigger>
              <MenuOptions customStyles={{
                optionsContainer: {
                  marginTop: hp(6.2), borderRadius: 6,
                  width: 250,
                  height: 50,
                  
                },
                optionWrapper: {
                },
              }} >
               
                <MenuOption>
                  <TouchableOpacity
                  onPress={()=>markallread()}
                    style={styles.menuOptionStyle}>
                    <Text style={[styles.menuOptionText, { color: Colors.balckText,fontFamily:fonts.PoppinsRegular }]}>{"Mark all as read"}</Text>
                  </TouchableOpacity>
                </MenuOption>
                {/* <MenuOption>
                  <View
                    style={styles.menuOptionStyle}>
                   
                    <Text style={[styles.menuOptionText, { color: Colors.balckText,fontFamily:fonts.PoppinsRegular }]}>{"Notifications"}</Text>
                    <View style={styles.toogleInner}>
                      <ToggleSwitch
                        isOn={toogleValue}
                        onColor={Colors.BtnBackground}
                        offColor="#AEADBD"
                        size="small"
                        onToggle={isOn => setToogle(isOn)}
                      />
                      
                    </View>
                  </View>
                </MenuOption> */}
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <View style={{marginTop:hp(2)}}>
        <FlatList
          data={NotificationList}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: hp('2%'), paddingHorizontal: hp('2%') }}
          renderItem={rendernotification}
        />
</View>


      </View>
      <Loader loading={loading} />
    </MenuProvider>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(6),
  },
  txtmain:{ borderColor: 'red', borderWidth: 0, width: wp('75%'), marginLeft: hp('0.5%') },
  titlestyle:{ fontSize: 16, fontWeight: '600', marginTop: hp('0.5%'), borderColor: 'red', borderWidth: 0, width: wp('44%'),color: Colors.balckText,fontFamily:fonts.PoppinsRegular },
  bottomline: {
    borderBottomWidth: 1.25,
    borderBottomColor: '#F5F5F5',
    marginTop: hp('2%')
  },
  subtitletxt:{color:Colors.grayText,fontFamily:fonts.PoppinsRegular, fontSize: 13 },
  subtitleview:{ borderWidth: 0, borderColor: 'red', marginTop: hp('1%'), width: wp('68%') },
  timetxt:{ textAlign: 'right',color:Colors.BtnBackground,fontFamily:fonts.PoppinsRegular, fontWeight: '400', fontSize: 13 },
  timeview:{  width: wp('30%'), borderColor: 'black', borderWidth: 0, marginTop: hp('0.75%') },
  titleview:{ flexDirection: 'row', marginTop: hp('0.5%'), justifyContent: 'center', alignItems: 'center' },
  iconsview:{ width: wp('14%'), height: hp('7%'), borderColor: 'blue', borderWidth: 0, justifyContent: 'center', alignItems: 'center' },
  image: {
    flex: 1,
  },
  sndview:{ flexDirection: 'row', borderColor: 'red', borderWidth: 0 },
  mainview:{ borderWidth: 0, borderColor: 'red' },
  menu: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  home: {
    color: '#191C32',
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 48,
  },
  iconView: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF9FA',
    width: wp(10),
    height: wp(10),
    marginTop: 7
  },
  wallet: {
    color: '#191C32',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 40,
  },
  cardView: {
    height: Platform.OS == 'ios' ? hp(27) : hp(30),
    width: wp(90),
    borderRadius: 30,
    alignSelf: 'center',
  },
  iconText: {
    marginTop: 5,
    color: '#191C32',
    lineHeight: 18,
    fontWeight: '500',
    fontSize: 12,
    alignSelf: 'center',
  },
  totalbalance: {
    marginTop: hp(2),
    color: '#9395A4',
    fontSize: 14,
    fontWeight: '600',
  },
  balance: {
    color: '#26273C',
    fontSize: 23,
    fontWeight: '500',
    lineHeight: 40,
  },
  netWorkAddressStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('72%'),
    marginVertical: wp(1),
    justifyContent: 'space-between'
  },

  addressStyle: {
    color: '#26273C',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
  },
  copyIcon: {
    width: wp(5.5),
    height: wp(5.5),
  },
  icons: {
    marginTop: hp(2.5),
    width: wp(13),
    height: wp(13),
    resizeMode: 'contain',
  },
  iconsView: {
    flexDirection: 'row',
    width: wp(75),
    justifyContent: 'space-between',
  },
  listView: {
    backgroundColor: '#fafafa',
    marginTop: hp(2),
    height: hp(60),
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  walletAddress: {
    marginTop: wp(4),
    color: '#26273C',
    fontSize: 19,
    fontWeight: '500',
    lineHeight: 35,
    paddingHorizontal: wp(5),
  },
  listContainer: {
    //paddingVertical: 10,
    flexDirection: 'row',
    paddingHorizontal: wp('2%'),
  },
  imageList: {
    width: wp(10),
    height: wp(10),
    borderRadius: 50,
    resizeMode: 'contain',
  },
  list: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: wp(70),
    marginHorizontal: wp(3),
    justifyContent: 'space-between',
  },
  listTitle: {
    color: '#26273C',
    fontSize: 16,
    lineHeight: 27,
  },
  subTitle: {
    color: '#9395A4',
    lineHeight: 20,
  },
  amount: {
    color: '#9395A4',
    lineHeight: 27,
    alignSelf: 'flex-end',
  },
  menuOptionStyle: {
    flexDirection: 'row',
    marginTop: hp(1),
    marginBottom: hp(1),
    width: '90%',
    alignSelf: 'center'
  },
  menuOptionImage: {
    width: hp(2),
    height: hp(2)
  },
  menuOptionText: {
    fontSize: hp(1.7),
    fontWeight: '500',
    //fontFamily: "Inter",
    marginLeft: hp(1.5)
  },
  menuDivider: {
    width: '90%',
    alignSelf: 'center',
    height: hp(0.2),
    backgroundColor: 'black'
  },
  toogleInner: {
    // 
    marginLeft: hp(2)
  },
  listText: {
    fontSize: hp(1.7),
    fontWeight: '500',
    //fontFamily: "Inter",
    color: 'black',
    marginLeft: hp(2)
  },



})

export default Notifications;

