
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import Spacer, { HorizontalSpacer } from '../../../Components/Spacer';
import Colors from '../../../themes/colors';
import { addTOcart } from '../../../Components/Additemstocart';
import images from '../../../Components/Images';
import { BorderesButton } from '../../../Components/Button';
import { fonts } from '../../../Constant/Fonts';
import { on } from 'npm';
import Ionicon from "react-native-vector-icons/Ionicons"
import useBestSellersDetails from '../hook';


export const Renderpopuleritem = ({ item, onPress, isCart, onPressAdd, onPressMinus, onPressPlus, count }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.flatliststyle}>
                <View style={styles.ScrollMainView2}>
                    <View
                        style={{
                            alignItems: 'center',

                            // marginTop: hp(5),
                        }}>
                        <View style={{ height: wp(40), width: wp(40), alignItems: 'center', justifyContent: 'center', borderRadius: 5.8 }}>
                            <FastImage
                                style={styles.flatlistimg}
                                source={{
                                    uri: item?.product?.imageUrl,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    </View>
                    <Spacer height={hp(1)} />
                    <View
                        style={{ justifyContent: 'center', paddingHorizontal: wp('3%') }}>
                        <Text numberOfLines={1} style={styles.ScrollViewText}>
                            {item?.product?.name}
                        </Text>
                        <Text style={{ color: '#92A2A9', fontSize: 12, }}>1 ltr</Text>
                    </View>
                    <View style={[styles.ScrollSubView, { justifyContent: 'space-between' }]}>
                        <View style={styles.ScrollLastView}>
                            <Text style={{ fontSize: 12, color: Colors.Primary, fontWeight: '600' }}>
                                Rs. {item?.product?.price}
                            </Text>
                        </View>
                        {
                            isCart ?
                                <CartButtons onPressMinus={onPressMinus} onPressPlus={onPressPlus} count={count} />
                                // <TouchableOpacity
                                //     onPress={() =>
                                //         addTOcart(
                                //             item?.productId,
                                //             item?.product.imageUrl,
                                //             item?.product?.name,
                                //             1,
                                //             item?.product?.price,
                                //             props.navigation,
                                //         )
                                //     }
                                //     style={styles.ScrollViewlast}>
                                //     <Image
                                //         source={images.shoppingcart}
                                //         style={styles.Scrollimg}
                                //     />
                                // </TouchableOpacity>
                                :
                                <BorderesButton onPress={onPressAdd} title={'Add'} btnContainer={{ paddingHorizontal: wp(5), height: hp(3.5), borderWidth: 1 }} titleStyle={{ fontSize: 14, fontWeight: '500' }} />
                        }

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};
export const RenderTopSaver = ({ item, onPress, isCart, onPressAdd, onPressMinus, onPressPlus, count }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.flatliststyle}>
                <View style={styles.ScrollMainView2}>
                    <View
                        style={{
                            alignItems: 'center',

                            // marginTop: hp(5),
                        }}>
                        <View style={{ height: wp(40), width: wp(40), alignItems: 'center', justifyContent: 'center', borderRadius: 5.8 }}>
                            <FastImage
                                style={styles.flatlistimg}
                                source={{
                                    uri: item?.product?.imageUrl,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    </View>
                    <Spacer height={hp(1)} />
                    <View
                        style={{ justifyContent: 'center', paddingHorizontal: wp('3%') }}>
                        <Text numberOfLines={1} style={styles.ScrollViewText}>
                            {item?.product?.name}
                        </Text>
                        <Text style={{ color: '#92A2A9', fontSize: 12, }}>{item?.product?.description?.slice(0, 15)}...</Text>
                    </View>
                    <View style={[styles.ScrollSubView, { justifyContent: 'space-between' }]}>
                        <View style={styles.ScrollLastView}>
                            <Text style={{ fontSize: 12, color: Colors.Primary, fontWeight: '600' }}>
                                Rs. {item?.product?.price}
                            </Text>
                            <Text style={{ fontSize: 10, color: Colors.redcolor, fontWeight: '600', textDecorationLine: 'line-through' }}>
                                Rs. {item?.product?.price + item?.discount}
                            </Text>
                        </View>
                        {
                            isCart ?
                                <CartButtons onPressMinus={onPressMinus} onPressPlus={onPressPlus} count={count} />
                                :
                                <BorderesButton onPress={onPressAdd} title={'Add'} btnContainer={{ paddingHorizontal: wp(5), height: hp(3.5), borderWidth: 1 }} titleStyle={{ fontSize: 14, fontWeight: '500' }} />
                        }

                    </View>
                </View>
                <View style={{ position: 'absolute', top: 10, left: 10, backgroundColor: Colors.Primary, paddingHorizontal: wp(2), paddingVertical: wp(1), borderRadius: 5 }}>
                    <Text style={{ color: Colors.whitecolor, fontSize: 8, fontFamily: fonts.PoppinsSemiBold }}>{parseInt(item?.discount / item?.product?.price * 100)}% OFF</Text>

                </View>
            </TouchableOpacity>
        </View>
    );
};

export const RenderSearchitem = ({ item, onPress, isCart, onPressAdd, onPressMinus, onPressPlus, count,heartPressed,handleToggleHeart }) => {

    // const { heartPressed, setHeartPressed, handleToggleHeart } = useBestSellersDetails()
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.flatliststyle}>
                <View style={styles.ScrollMainView2}>
                    <View
                        style={{
                            alignItems: 'center',

                            // marginTop: hp(5),
                        }}>
                        <View style={{ height: wp(40), width: wp(40), alignItems: 'center', justifyContent: 'center', borderRadius: 5.8 }}>
                            <FastImage
                                style={styles.flatlistimg}
                                source={{
                                    uri: item?.imageUrl,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    </View>
                    <Spacer height={hp(1)} />
                    <View
                        style={{ justifyContent: 'center', paddingHorizontal: wp('3%') }}>
                        <Text numberOfLines={1} style={styles.ScrollViewText}>
                            {item?.name}
                        </Text>
                        <Text style={{ color: '#92A2A9', fontSize: 12 }}>
                            {(item?.description || item?.product?.description || '').slice(0, 15)}
                            {(item?.description || item?.product?.description)?.length > 15 ? '...' : ''}
                        </Text>
                        <Spacer />
                    </View>
                    <View style={[styles.ScrollSubView, { justifyContent: 'space-between' }]}>
                        <View style={styles.ScrollLastView}>
                            {item.discountedPrice ? (
                                <View>
                                    <Text style={{ fontSize: 12, color: Colors.Primary, fontWeight: '600' }}>
                                        Rs. {item?.discountedPrice}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: Colors.redcolor, fontWeight: '600', textDecorationColor: Colors.redcolor, textDecorationLine: "line-through" }} >
                                        Rs. {item?.price}
                                    </Text>
                                </View>

                            ) : (
                                <Text style={{ fontSize: 12, color: Colors.Primary, fontWeight: '600' }}>
                                    Rs. {item?.price}
                                </Text>
                            )}

                        </View>
                        {
                            isCart ?
                                <CartButtons onPressMinus={onPressMinus} onPressPlus={onPressPlus} count={count} />

                                :
                                <BorderesButton onPress={onPressAdd} title={'Add'} btnContainer={{ paddingHorizontal: wp(5), height: hp(3.5), borderWidth: 1 }} titleStyle={{ fontSize: 14, fontWeight: '500' }} />
                        }

                    </View>
                    <View style={{ position: "absolute", right: 10, top: 10 }}>
                        <TouchableOpacity onPress={handleToggleHeart}>
                            <Ionicon
                                name={heartPressed ? 'heart' : 'heart-outline'}
                                color={Colors.BtnBackground}
                                size={20}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export const RenderRelatedProduct = ({ item, onPress, isCart, onPressAdd, onPressMinus, onPressPlus, count,heartPressed,handleToggleHeart }) => {

    // const { heartPressed, setHeartPressed, handleToggleHeart } = useBestSellersDetails()
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.flatliststyle,{width:wp(26)}]}>
                <View style={styles.ScrollMainView2}>
                    <View
                        style={{
                            alignItems: 'center',

                            // marginTop: hp(5),
                        }}>
                        {/* <View style={{ height: wp(12), width: wp(12), alignItems: 'center', justifyContent: 'center', borderRadius: 5.8 }}> */}
                            <FastImage
                                style={[styles.relatedProductImage,{height:wp(12),width:wp(12)}]}
                                source={{
                                    uri: item?.imageUrl,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        {/* </View> */}
                    </View>
                    <Spacer height={hp(1)} />
                    <View
                        style={{ justifyContent: 'center', paddingHorizontal: wp('3%') }}>
                        <Text numberOfLines={1} style={[styles.ScrollViewText,{fontSize:10,fontWeight:"bold",color:"#363636"}]}>
                            {item?.name}
                        </Text>
                        <Text style={{ color: '#828282', fontSize: 9,fontWeight:"500" }}>
                            {(item?.description || item?.product?.description || '').slice(0, 15)}
                            {(item?.description || item?.product?.description)?.length > 15 ? '...' : ''}
                        </Text>
                        <Spacer />
                    </View>
                    <View style={[styles.ScrollSubView, { justifyContent: 'space-between' ,alignItems:"center"}]}>
                        <View style={styles.ScrollLastView}>
                            {item.discountedPrice ? (
                                <View>
                                    <Text style={{ fontSize: 10, color: Colors.Primary, fontWeight: '400' }}>
                                        Rs. {item?.discountedPrice}
                                    </Text>
                                    <Text style={{ fontSize: 10, color: Colors.Primary, fontWeight: '400' }}>
                                        Rs. {item?.price}
                                    </Text>
                                </View>

                            ) : (
                                    <Text style={{ fontSize: 10, color: Colors.Primary, fontWeight: '400' }}>
                                    Rs. {item?.price}
                                </Text>
                            )}

                        </View>
                        {
                            isCart ?
                                <CartButtons onPressMinus={onPressMinus} onPressPlus={onPressPlus} count={count} />

                                :
                                <BorderesButton onPress={onPressAdd} title={'Add'} btnContainer={{ paddingHorizontal: wp(1.71), height: hp(2), borderWidth: 1 }} titleStyle={{ fontSize: 10, fontWeight: '500' }} />
                        }

                    </View>
                    <View style={{ position: "absolute", right: 10, top: 10 }}>
                        <TouchableOpacity onPress={handleToggleHeart}>
                            <Ionicon
                                name={heartPressed ? 'heart' : 'heart-outline'}
                                color={Colors.BtnBackground}
                                size={20}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const CartButtons = ({ onPressMinus, onPressPlus, count }) => {
    return (
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: Colors.Primary, paddingHorizontal: wp(1.5), paddingVertical: hp(0.98), borderRadius: 5.8 }}>
            <TouchableOpacity hitSlop={{ left: 10, right: 10 }} onPress={onPressMinus}>
                <Image source={images.minus} style={{ height: wp(4), width: wp(4), tintColor: 'white' }} />
            </TouchableOpacity>
            <HorizontalSpacer width={wp(1)} />
            <Text style={{ color: Colors.whitecolor }}>{count ?? 0}</Text>
            <HorizontalSpacer width={wp(1)} />
            <TouchableOpacity hitSlop={{ left: 10, right: 10 }} onPress={onPressPlus}>

                <Image source={images.plus} style={{ height: wp(4), width: wp(4), tintColor: 'white' }} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({



    ScrollMainView2: {

        justifyContent: 'center',

    },

    ScrollViewText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#264653',
        fontFamily: fonts.PoppinsRegular,
    },

    ScrollSubView: {
        flexDirection: 'row',

        paddingHorizontal: wp('3%'),
    },
    ScrollLastView: {
        justifyContent: 'center',

    },

    ScrollViewlast: {
        backgroundColor: Colors.BtnBackground,
        borderRadius: 10,
        height: hp(3.21),
        width: wp(16.51),
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: 'red',
        borderWidth: 0,
    },

    Scrollimg: {
        height: 24,
        width: 24,
        tintColor: Colors.Primary,
    },
    flatliststyle: {
        width: wp(44),
        paddingVertical: wp(1),
        borderColor: '#CFCFCF',
        borderRadius: 10,
        borderWidth: 0.5,
    },

    flatlistimg: {
        height: wp(40),
        width: wp(40),
        borderRadius: 30,
        tintColor: '#E6F6FC',
        alignSelf: 'center',
    },
    relatedProductImage: {
        height: wp(12),
        width: wp(12),
        borderRadius: 30,
        tintColor: '#E6F6FC',
        alignSelf: 'center',
        marginRight:10
    },

});