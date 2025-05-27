import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import images from './Components/Images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ConfirmOrder = ({navigation}) => {
  return (
    <ImageBackground
      source={images.backgroundConfirmOrder}
      style={styles.container}>
      <View
        style={{width: wp('100%'), marginTop: hp('20%'), alignItems: 'center'}}>
        <Image source={images.SuccessOrder}></Image>

        <Text
          style={{
            color: 'black',
            marginTop: hp('2%'),
            fontSize: 28,
            fontWeight: '400',
          }}>
          Your Order has been
        </Text>
        <Text style={{color: 'black', fontSize: 28, fontWeight: '400'}}>
          accepted
        </Text>
        <Text
          style={{
            color: '#c2c3b5',
            fontSize: 14,
            marginTop: hp('1%'),
            fontWeight: '400',
          }}>
          Your items has been placed and is
        </Text>
        <Text style={{color: '#c2c3b5', fontSize: 14, fontWeight: '400'}}>
          on it's way to being processed
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{
            backgroundColor: '#53b175',
            width: wp('70%'),
            height: hp('7%'),
            borderRadius: 10,
            marginTop: hp('10%'),
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 22,
              textAlign: 'center',
              marginTop: hp('2%'),
            }}>
            Track offer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={{
            width: wp('70%'),
            height: hp('7%'),
            borderRadius: 10,
            marginTop: hp('6%'),
          }}>
          <Text style={{fontWeight: '500', fontSize: 22, textAlign: 'center'}}>
            Back To Home
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
export default ConfirmOrder;
