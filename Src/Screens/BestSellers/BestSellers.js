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
import { bestSellers } from '../../Constant/dummyData';
import { RenderBestSellers } from './components';

const BestSellers = (props) => {
    return (
        <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
            <View
                style={{
                    marginHorizontal: hp('3%'),
                    marginTop: hp(Platform.OS == 'ios' ? 8 : 2),
                }}></View>
            <Header title={'Search'} onPress={() => props.navigation.goBack()} />
            <Spacer />
            <SearchInputField leftIcon={images.search} styles={{ borderWidth: 1, borderColor: '#E2E2E2' }} placeholder={'Search for atta, dai, coke and more.'} />
            <Spacer />
            <View style={{ marginHorizontal: wp(5), flex: 1 }}>
                <FlatList
                    data={bestSellers}
                    numColumns={2}
                    ItemSeparatorComponent={() => <Spacer />}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <RenderBestSellers item={item} onPress={() => props.navigation.navigate('BestSellersDetails', { item })} />
                        )
                    }}

                />
                <Spacer />

            </View>
            <Spacer />



        </View>
    )
}

export default BestSellers