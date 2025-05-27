import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP,
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Colors from '../../../themes/colors';
import Spacer, { HorizontalSpacer } from '../../../Components/Spacer';
import { BorderesButton } from '../../../Components/Button';
import { fonts } from '../../../Constant/Fonts';
import { useNavigation } from '@react-navigation/native';

export const RenderBestSellers = ({ item, onPress }) => {
    return (
        <View style={styles.sellerMainStyle}>
            <View style={{ backgroundColor: Colors.smallbtnbgcolor, padding: wp(2), borderRadius: 5.8, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={styles.imageWrapper}>

                        <Image source={item?.images[0]} style={styles.bestSellersImage} />
                    </View>
                    <HorizontalSpacer width={wp(2)} />
                    <View style={styles.imageWrapper}>
                        <Image source={item?.images[1]} style={styles.bestSellersImage} />
                    </View>
                </View>
                <Spacer height={wp(2)} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={styles.imageWrapper}>
                        <Image source={item?.images[2]} style={styles.bestSellersImage} />
                    </View>
                    <HorizontalSpacer width={wp(2)} />
                    <View style={styles.imageWrapper}>
                        <Text style={{ fontSize: 14, fontFamily: fonts.PoppinsMedium, fontWeight: '600', color: Colors.Primary }}>+{item?.images?.length - 3}</Text>
                    </View>
                </View>

            </View>
            <Spacer height={hp(1)} />
            <Text style={{ fontSize: 14, fontFamily: fonts.PoppinsMedium, fontWeight: '600' }}>{item?.name}</Text>
            {/* <Spacer height={hp(0)} /> */}
            <Text style={{ fontSize: 12, fontFamily: fonts.PoppinsRegular, fontWeight: '500', color: '#92A2A9' }}>{item?.images?.length} Products</Text>
            <Spacer height={hp(1)} />
            <BorderesButton title={'See All'} onPress={onPress} />

        </View>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        width: wp(16.5),
        height: wp(16.5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whitecolor
        , borderRadius: 5.8,
    },
    bestSellersImage: {
        width: wp(14.5),
        height: wp(14.5),
        resizeMode: 'contain',
    },
    sellerMainStyle: {
        padding: wp(2),
        borderWidth: 1,
        borderColor: Colors.smallbtnbgcolor,
        borderRadius: 12,
    },
});