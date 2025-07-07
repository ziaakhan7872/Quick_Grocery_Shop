import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const UseOnlinePickUpDelivery = (props) => {
    const [deliveryType, setDeliveryType] = useState("Delivery")

    const navigation = () => {
        props.route.params.setDeliveryType(deliveryType)
        props.navigation.goBack()
    }
    return {
        deliveryType,
        setDeliveryType,
        navigation

    }
}

export default UseOnlinePickUpDelivery

