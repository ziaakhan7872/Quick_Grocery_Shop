import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../Components/Container'
import { Image } from 'react-native'
import images from '../../Components/Images'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { RenderOnlinePickUpDeliveryForm } from './Component/Index'
import { style } from './Style'
import UseOnlinePickUpDelivery from './Hooks/Index'
import Button from '../../Components/Button'


const OnlinePickupDelivery = (props) => {
  const { deliveryType, setDeliveryType, navigation } = UseOnlinePickUpDelivery(props)
  return (
    <Container>
      <View style={style.modalBackground}>
        <RenderOnlinePickUpDeliveryForm DeliveryType={deliveryType} setDeliveryType={setDeliveryType} />
      </View>
      <Button onPress={() => navigation()}
        title={"Confirm"}
        btnContainer={{
          height: hp(6),
          marginTop: hp(2)

        }}


      />
    </Container>
  )
}

export default OnlinePickupDelivery

