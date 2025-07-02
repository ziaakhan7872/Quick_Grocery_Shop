import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { useNavigation } from '@react-navigation/native';
import Colors from '../../themes/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { CustomFavouriteList } from './Component/Index';
import { UseFavourite } from './Hooks/Index';
const Favourite = (props) => {
    const navigation = useNavigation();
    const { favouriteProducts, setFavouriteProducts, heartPressed, setHeartPressed, handleToggleHeart, cart, onPressMinus, onPressPlus, setCart } = UseFavourite(props)
    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <View
                style={{
                    marginHorizontal: hp('3%'),
                    marginTop: hp(Platform.OS == 'ios' ? 6 : 2),
                }}>
                <Header
                    title={"Favourite"}
                    onPress={() => navigation.goBack()}
                />
            </View>
            {favouriteProducts && favouriteProducts.length > 0 ? (
                <CustomFavouriteList cart={cart} onPressMinus={onPressMinus} onPressPlus={onPressPlus} heartPressed={heartPressed} handleToggleHeart={handleToggleHeart} relatedItem={favouriteProducts} />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: Colors.textColor }}>No Favourite Products Found</Text>
                </View>
            )
            }

        </View>
    )
}

export default Favourite

