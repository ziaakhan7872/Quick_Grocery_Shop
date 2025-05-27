import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'
import { MenuOption, MenuOptions, MenuContext, Menu, MenuTrigger, MenuProvider } from 'react-native-popup-menu'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {Colors,fonts,Header,images} from './Components/Index'

const CHAINDATA = [
  {
    img: images.gift,
    Title: 'Gift Offer',
    subTitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    time: '1mint ago',
  },
  {
    img: images.istgift,
    Title: 'Coupon offer',
    subTitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    time: '10mint ago',
  },
  {
    img: images.secondgift,
    Title: 'Great winter offer',
    subTitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    time: '12mint ago',
  },
  {
    img: images.fourgift,
    Title: 'Gift Offer',
    subTitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    time: '25mint ago',
  },
  {
    img: images.fivegift,
    Title: '12% Off in vegetable',
    subTitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    time: '30mint ago',
  },
  {
    img: images.sixgift,
    Title: 'Gift',
    subTitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    time: '35mint ago',
  },
  {
    img: images.sevengift,
    Title: 'Welcome',
    subTitle: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    time: '20mint ago',
  },

]



const Notify = ({ navigation }) => {

  const [toogleValue, setToogle] = useState(false)

  return (
    <MenuProvider>
      <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
        <View style={{ marginHorizontal: hp('3%'), marginTop: hp('6%'), borderColor: 'red', borderWidth: 0 }}>
          <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{borderColor:'red',borderWidth:0,flexDirection:'row'}}>
              <Image source={images.leftarrow} style={{ height: hp('3%'), width: wp('3.5%'), borderColor: 'red', borderWidth: 0 }} />
            
            <View style={{ alignSelf: 'center', width: wp('80%'), justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 18, color: 'black' }}>Notifications</Text>
            </View>
            </TouchableOpacity>
            <Menu>
            <MenuTrigger  style={{borderWidth:0,borderColor:'red',width:wp(7),alignItems:'flex-end'}} customStyles={{ triggerTouchable: { underlayColor: 'white' } }}>
                <Image source={images.more} style={{ width: wp('2.5%'), height: hp('3%') }}>
                </Image>
                </MenuTrigger>
              <MenuOptions customStyles={{
                optionsContainer: {
                  marginTop: hp(6.2), borderRadius: 6,
                  width: 203,
                  height: 107,
                },
                optionWrapper: {
                },
              }} >
               
                <MenuOption onSelect={() => this.getMoreMember(false)}>
                  <View
                    style={styles.menuOptionStyle}>
                    
                    <Text style={[styles.menuOptionText, { color: '#363636' }]}>{"Mark all as read"}</Text>
                  </View>
                </MenuOption>
                <MenuOption onSelect={() => this.getMoreMember(false)}>
                  <View
                    style={styles.menuOptionStyle}>
                    <Text style={[styles.menuOptionText, { color: '#363636' }]}>{"Notifications"}</Text>
                    <View style={styles.toogleInner}>
                      <ToggleSwitch
                        isOn={toogleValue}
                        onColor={'green'}
                        offColor="#AEADBD"
                        size="small"
                        onToggle={isOn => setToogle(isOn)}
                      />
                      
                    </View>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
        <FlatList
          data={CHAINDATA}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: hp('2%'), paddingHorizontal: hp('2%') }}
          renderItem={({ item }) => (
            <View style={{ borderWidth: 0, borderColor: 'red', marginTop: hp('2%') }}>
              <View style={{ flexDirection: 'row', borderColor: 'red', borderWidth: 0 }}>
                <View style={{ width: wp('14%'), height: hp('7%'), borderColor: 'blue', borderWidth: 0, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={item.img} style={{ width: 43, height: 43 }} />
                </View>
                <View style={{ borderColor: 'red', borderWidth: 0, width: wp('75%'), marginLeft: hp('0.5%') }}>
                  <View style={{ flexDirection: 'row', marginTop: hp('0.5%'), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', marginTop: hp('0.5%'), borderColor: 'red', borderWidth: 0, width: wp('44%') }}>{item.Title}</Text>
                    <View style={{  width: wp('30%'), borderColor: 'black', borderWidth: 0, marginTop: hp('0.75%') }}>
                      <Text style={{ textAlign: 'right', color: 'green', fontWeight: '400', fontSize: 13 }}>{item.time}</Text>
                    </View>
                  </View>
                  <View style={{ borderWidth: 0, borderColor: 'red', marginTop: hp('1%'), width: wp('68%') }}>
                    <Text style={{ color: '#8A8A8A', fontSize: 13 }}>{item.subTitle}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.bottomline}></View>
            </View>



          )}
        />



      </View>
    </MenuProvider>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(6),
  },
  bottomline: {
    borderBottomWidth: 1.25,
    borderBottomColor: '#F5F5F5',
    marginTop: hp('2%')
  },
  image: {
    flex: 1,
  },
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

export default Notify;

