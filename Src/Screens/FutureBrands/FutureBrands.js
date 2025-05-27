import { View, Text, Platform, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../themes/colors'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../Components/Header';
import { RenderBestSellers } from '../BestSellers/components';
import FastImage from 'react-native-fast-image';
import { _axiosGetAPI } from '../../Apis/Apis';
import Loader from '../../Components/Loader';
import { useState } from 'react';
import { useEffect } from 'react';
import Spacer from '../../Components/Spacer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import images from '../../Components/Images';

const FutureBrands = (props) => {

    const [fetureBrand, setfetureBrand] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        getFeatureBrands()
    }, [])


    const getFeatureBrands = async () => {
        try {
            setLoading(true)
            await _axiosGetAPI('brands/all-publish?limit=500&offset=1&filter=isPublish=eq:true')
                .then(async response => {
                    console.log('setfetureBrand', response);

                    setfetureBrand(response?.data?.data?.brands);
                    setLoading(false);


                })
                .catch(err => {
                    console.log('Err,', err);
                    setLoading(false);
                });
        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false);
        }
    };
    return (
        <View style={{ backgroundColor: Colors.backgroundColor, flex: 1, paddingHorizontal: wp(4) }}>
            <View
                style={{
                    marginHorizontal: hp('3%'),
                    marginTop: hp(Platform.OS == 'ios' ? 8 : 2),
                }}></View>
            <Header title={'Feature Brands'} onPress={() => props.navigation.goBack()} />
            <Spacer />



            <FlatList
                data={fetureBrand}
                // data={[]}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{ justifyContent: 'space-between', marginTop: hp(0.5) }}
                numColumns={3}
                ListEmptyComponent={() => {
                    return (
                        <View style={styles.skeletonWrapper}>

                            {Array.from({ length: 18 }).map((_, index) => (
                                <SkeletonPlaceholder key={index}>
                                    <View style={styles.skeletonContainerFeatured}>
                                        <View style={styles.skeletonImageFeatured} />
                                        {/* <View style={styles.skeletonText} /> */}
                                    </View>
                                </SkeletonPlaceholder>
                                // <FastImage style={{ width: wp(30), height: wp(30), borderRadius: 10 }} source={images.banner} resizeMode={FastImage.resizeMode.contain} />

                            ))}
                        </View>
                    )
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate('BrandDetail', { data: item.id, item, })} >
                            <FastImage style={{ width: wp(30), height: wp(30), borderRadius: 10 }} source={{ uri: item?.imageUrl, priority: FastImage.priority.normal, }} resizeMode={FastImage.resizeMode.contain} />
                        </TouchableOpacity>
                    )
                }}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Add spacing of 10 units between items
            />

            {/* <Spacer /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    skeletonImageFeatured: {
        marginBottom: wp(1),
        borderRadius: 8,
        width: wp(29.5),
        height: wp(30),
        borderRadius: 8,
    },
    skeletonWrapper: {
        flex: 1,
        // backgroundColor: 'green',
        flexDirection: 'row',
        flexWrap: 'wrap', // This ensures that items wrap like in the FlatList's grid layout
        justifyContent: 'space-between',
    },
    skeletonContainer: {
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1),
        width: wp(21),
        height: hp(10.94),
        backgroundColor: Colors.whitecolor,
        marginLeft: 4,
    },
    skeletonContainerFeatured: {

        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1),
        width: wp(30),
        height: wp(31),

        // marginLeft: 4,
    },
})

export default FutureBrands