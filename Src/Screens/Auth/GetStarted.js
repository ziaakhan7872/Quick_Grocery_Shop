import React from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity,

} from 'react-native'
import { images, Colors, Button } from "../../Components/Index";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Container from "../../Components/Container";
import Onboarding from 'react-native-onboarding-swiper';
import { fonts } from '../../Constant/Fonts'
import { useDispatch } from "react-redux";
import { Savefirstinstall } from "../../Redux/Actions/Actions";
import ShopQuick from "./ShopQuick"
  ;
const GetStart = (props) => {
  const dispatch = useDispatch()
  const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? Colors.BtnBackground : '#D5EBDD'

    return (
      <View
        style={{

          width: 8,
          height: 8,
          marginHorizontal: 3,
          borderRadius: 5,
          backgroundColor
        }}>

      </View>
    )
  }
  return (

    <Container style={{ backgroundColor: Colors.backgroundColor, }} >
      <View style={{ paddingHorizontal: wp(4), flex: 1, justifyContent: 'center', }}>
        <Image
          source={images.quickGrocery}
          style={styles.quickGrocery}
        />
        <View style={{ marginTop: '10%' }}>
          <Text style={styles.titleStyles}>Grocery Shopping ka Quick Solutions!</Text>
          <Text style={styles.subTitleStyles}>Order Groceries Online and get delivered at your doorstep! 🥕🛒</Text>
        </View>
      </View>
      <View style={{ paddingBottom: wp(4), }}>
        <Button onPress={() => {
          props.navigation.navigate('ShopQuick')
        }}
          title={"Get Started"} titleStyle={styles.btntxt}
          btnContainer={{
            height: Platform.OS === 'ios' ? hp(6) : hp(7),
            borderRadius: 25,
          }}

        />
      </View>
    </Container>
  )
}
const styles = StyleSheet.create({

  quickGrocery: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(75),
    height: hp(50),
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  img: {
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? hp(15) : hp(18),
    width: Platform.OS === 'ios' ? wp(43) : wp(45),
  },
  btn: {
    marginTop: hp('8%'),
    justifyContent: 'center',
    backgroundColor: '#53B175',
    width: wp('80%'),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 25,
    alignSelf: 'center',
    borderWidth: 1
  },
  btntxt: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: fonts.PoppinsRegular,
  },
  view: {
    marginVertical: 10,
    alignSelf: 'center',
    marginBottom: hp(10),
    borderWidth: 1,
  },
  titleStyles: {
    color: Colors.Primary,
    // fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: fonts.PoppinsSemiBold,
    marginHorizontal: wp(5)
  },
  subTitleStyles: {
    fontSize: 14,
    // fontWeight: 'regular',
    fontFamily: fonts.PoppinsRegular,
    color: Colors.grayText,
    textAlign: 'center',
    marginTop: '3%',
    marginHorizontal: wp(5)


  },
})

export default GetStart;