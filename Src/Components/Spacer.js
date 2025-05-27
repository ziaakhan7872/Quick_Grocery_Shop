import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

export default function Spacer({ height }) {
    return (
        <View style={{ height: height ? height : heightPercentageToDP(2) }} />
    )
}

export const HorizontalSpacer = ({ width }) => {
    return (
        <View style={{ marginRight: width ? width : widthPercentageToDP(2) }} />
    )
}

const styles = StyleSheet.create({})