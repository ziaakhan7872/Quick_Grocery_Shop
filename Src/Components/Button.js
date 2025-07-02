import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Colors from '../themes/colors';
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { fonts } from '../Constant/Fonts';

const Button = ({ btnContainer, titleStyle, onPress, title, loading,height=wp('16%') }) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        {
          height: height,
        },
        btnContainer ? btnContainer : {},
      ]}
      activeOpacity={0.8}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="large" color="#fafafa" />
      ) : (
        <Text style={{ ...styles.title, ...titleStyle }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
export const BorderesButton = ({ btnContainer, titleStyle, onPress, title, loading }) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnBordered,
        {
          height: heightPercentageToDP(5),
        },
        btnContainer ? btnContainer : {},
      ]}
      activeOpacity={0.8}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size="large" color="#fafafa" />
      ) : (
        <Text style={{ ...styles.title1, ...titleStyle }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.BtnBackground,
    width: wp('100%') - 40,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: wp(3),
    borderRadius: wp(15),
    marginBottom: 8,
  },
  btnBordered: {
    backgroundColor: Colors.whitecolor,
    // width: wp('100%') - 40,
    // alignSelf: 'center',
    justifyContent: 'center',
    height: heightPercentageToDP(3),
    // paddingVertical: wp(3),
    borderRadius: wp(1),
    marginBottom: 4,
    borderWidth: 2,
    borderColor: Colors.Primary
  },
  title: {
    alignSelf: 'center',
    color: Colors.BtnText,
    margin: 0,
    padding: 0,
    fontSize: 18,
    fontFamily: fonts.PoppinsRegular,
  },
  title1: {
    alignSelf: 'center',
    color: Colors.Primary,
    fontSize: 14,
    // fontWeight: '500',
    fontFamily: fonts.PoppinsSemiBold,
  },
});
export default Button;
