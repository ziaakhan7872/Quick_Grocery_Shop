import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

import { fonts, Colors, images } from '../Components/Index';

const Header = ({ title, onPress, righticon, onrightPress }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', borderWidth: 0, justifyContent: 'center', }}>
        <View>
          <Image source={images.leftarrow} style={{ height: hp('3%'), width: wp('3.5%'), borderWidth: 0, marginRight: wp(2.5) }} />
        </View>
        <View style={{ alignSelf: 'center', width: wp('80%'), justifyContent: 'center', borderWidth: 0, marginRight: wp(2.5) }}>
          <Text style={{ textAlign: 'center', fontSize: 16, color: Colors.balckText, fontFamily: fonts.PoppinsMedium }}>{title}</Text>
        </View>
      </TouchableOpacity>
      {righticon && (
        <TouchableOpacity onPress={onrightPress}>
          <Image source={righticon} style={{ height: wp(5), width: wp(5) }} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btns: {
    borderColor: 'green', flexDirection: 'row',
    backgroundColor: '#DDEFE3', borderRadius: 20, alignItems: 'center',
    borderWidth: 1, width: wp(26), height: hp(5), paddingHorizontal: wp(2)
  },
  title: {
    alignSelf: 'center',
    margin: 0,
    padding: 0,
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular

  },
});
export default Header;
