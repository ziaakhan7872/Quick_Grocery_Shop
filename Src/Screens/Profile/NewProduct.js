import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Colors, fonts, Header, Button } from "../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const NewProduct = (props) => {

    return (
        <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
            <View style={{ marginHorizontal: hp('3%'), marginTop: hp('6%') }}>
                <Header
                    title={'New Product Suggestions'}
                    onPress={() => props.navigation.goBack()}
                />
            </View>

            <View style={{ marginTop: hp('4%'), marginHorizontal: hp('2.5%') }}>
                <Text style={styles.inputhesing}>Brand and product name</Text>
                <View style={{ alignItems: 'center', marginTop: hp('1%'), height: hp('6%'), borderRadius: 10, borderColor: '#CFCFCF', borderWidth: 1, flexDirection: 'row' }}>

                    <TextInput
                        placeholder="Colgate, Nestle"
                        maxLength={25}
                        placeholderTextColor={Colors.placeholder}
                        color={Colors.balckText}
                        fontFamily={fonts.PoppinsRegular}
                        fontWeight={'400'}
                        fontSize={15}
                        justifyContent={'center'}
                        alignItems={'center'}
                        marginLeft={wp('3%')}
                        width={wp(100)}
                    />
                </View>

            </View>
            <View style={{ marginTop: hp('2%'), marginHorizontal: hp('2.5%') }}>
                <Text style={styles.inputhesing}>Size (Optional)</Text>
                <View style={styles.inputview}>

                    <TextInput
                        placeholder="Colgate, Nestle"
                        maxLength={25}
                        fontWeight={'400'}
                        fontSize={15}
                        justifyContent={'center'}
                        alignItems={'center'}
                        marginLeft={wp('3%')}
                        placeholderTextColor={Colors.placeholder}
                        color={Colors.balckText}
                        fontFamily={fonts.PoppinsRegular}
                        width={wp(100)}
                    />


                </View>

            </View>

            <Button onPress={() => props.navigation.navigate('Account')}
                title={"Submit"}
                btnContainer={{
                    position: 'absolute',
                    height: hp(6),
                    bottom: hp(5)

                }}

            />
        </View>

    )

}
const styles = StyleSheet.create({
    inputview: { alignItems: 'center', marginTop: hp('1%'), height: hp('6%'), borderRadius: 10, borderColor: '#CFCFCF', borderWidth: 1, flexDirection: 'row' },
    inputhesing: { fontSize: 15, color: Colors.balckText, fontFamily: fonts.PoppinsRegular, fontWeight: '400' },
})
export default NewProduct;

