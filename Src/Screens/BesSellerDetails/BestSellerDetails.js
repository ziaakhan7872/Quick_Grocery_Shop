import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react'
import Colors from '../../themes/colors'
import Header from '../../Components/Header'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Spacer from '../../Components/Spacer';
import { SearchInputField } from '../../Components/InputField';
import images from '../../Components/Images';
import useBestSellersDetails from './hook';
import { Renderpopuleritem } from './components';
import Loader from '../../Components/Loader';


const BestSellersDetails = (props) => {
    const { PopulerItems, loading, cart, setCart, onPressPlus, onPressMinus, count } = useBestSellersDetails(props)
    return (
        <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
            <View
                style={{
                    marginHorizontal: hp('3%'),
                    marginTop: hp(Platform.OS == 'ios' ? 8 : 2),
                }}></View>
            <Header title={props?.route?.params?.item?.name} onPress={() => props.navigation.goBack()} />
            <Spacer />
            <SearchInputField leftIcon={images.search} styles={{ borderWidth: 1, borderColor: '#E2E2E2' }} placeholder={'Search for atta, dai, coke and more.'} />
            <Spacer />
            <View style={{ marginHorizontal: wp(5), flex: 1 }}>
                <FlatList
                    data={PopulerItems}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <Renderpopuleritem onPressMinus={() => onPressMinus(item?.product)} onPressPlus={() => onPressPlus(item?.product)} count={cart?.find(i => i?.Productid == item?.productId)?.quantity} onPressAdd={() => onPressPlus(item?.product)} setCart isCart={cart?.find(i => i?.Productid == item?.productId)?.quantity > 0 ? true : false} item={item} onPress={() =>
                                props.navigation.navigate('ShowItems', {
                                    data: item.productId,
                                })
                            } />
                        )
                    }}
                    ItemSeparatorComponent={() => <Spacer />} // Add spacing of 10 units between items
                />
            </View>
            <Loader loading={loading} />

        </View>
    )
}

export default BestSellersDetails