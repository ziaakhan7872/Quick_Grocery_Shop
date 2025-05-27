import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Colors from '../themes/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


import { fonts } from '../Constant/Fonts';

const SmallButton = ({ onPress, titlestyle, title, backgroundColor, borderColor, leftimage, tintColor, style }) => {
  return (
    <TouchableOpacity style={{ ...styles.btns, backgroundColor: backgroundColor, borderColor: borderColor, ...style }} onPress={onPress}>
      <Image

        source={{ uri: leftimage }}
        style={{
          width: wp(5), alignSelf: 'center',
          tintColor: tintColor,
          height: wp(5)
        }}
      />


      <Text style={titlestyle}>{title}</Text>

    </TouchableOpacity>
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
export default SmallButton;
