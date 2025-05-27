import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleButton from './SimpleButton'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const RowButtons = ({ titlebtn1, titlebtn2, onPressBtn1, onPressBtn2, btntitle, style }) => {
    return (
        <View style={styles.btnMainView}>
            <SimpleButton
                title={titlebtn1}
                onPress={onPressBtn1}
                btntitle={btntitle}
                outerBox={[{ width: widthPercentageToDP(45), borderRadius: 80 }, style]}

            />
            <SimpleButton
                title={titlebtn2}
                onPress={onPressBtn2}
                btntitle={btntitle}
                outerBox={[{ width: widthPercentageToDP(45), borderRadius: 80 }, style]}

            />
        </View>
    )
}

export default RowButtons

const styles = StyleSheet.create({
    btnMainView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
})