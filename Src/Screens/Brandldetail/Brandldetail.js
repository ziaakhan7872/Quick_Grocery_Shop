

import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Pressable, ScrollView, Platform } from 'react-native'
import { images, Colors, fonts, Header, Loader, Button } from "../../Components/Index";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { _axiosGetAPI } from "../../Apis/Apis";
import { RenderSearchitem } from "../BesSellerDetails/components";
import useBrandDetails from "./Hook";
import Spacer from "../../Components/Spacer";
import Toast from 'react-native-simple-toast';



const BrandDetail = props => {

    const { productlist, afterelement, hasmore, loading, showLoadmore, getallBrands, onPressMinus, onPressPlus, cart,heartPressed,setHeartPressed,handleToggleHeart } = useBrandDetails(props)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <View style={{ marginHorizontal: hp('3%'), marginTop: hp(Platform.OS == 'ios' ? 6 : 2) }}>


                <Header
                    title={props?.route?.params?.item?.name}
                    onPress={() => props.navigation.goBack()}
                />
            </View>

            <ScrollView contentContainerStyle={{ flex: 1, marginHorizontal: wp(5) }} showsVerticalScrollIndicator={false}>
                {productlist.length > 0 ?
                    <FlatList
                        data={productlist}
                        onEndReached={() => getallBrands(afterelement)}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={() => <Spacer height={hp(3)} />}
                        style={{ marginTop: hp('2%') }}
                        ListEmptyComponent={() => <View style={{ alignItems: 'center', justifyContent: "center", alignSelf: "center", flex: 1, marginTop: hp(40) }}>

                            {loading === false && <Text style={{ fontSize: 16, color: Colors.balckText, fontFamily: fonts.PoppinsRegular }}>{'No products found.'}</Text>}

                        </View>}
                        ItemSeparatorComponent={() => <Spacer height={wp(1)} />}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item, index }) => {
                            return (
                                <RenderSearchitem heartPressed={heartPressed[item.id]} handleToggleHeart={()=>handleToggleHeart(item)} onPressMinus={() => onPressMinus(item)} onPressPlus={() => cart?.find(i => i?.Productid == item?.id).quantity < (item?.quantity - Number(item.outOfStockThreshold)) ? onPressPlus(item) : Toast.show(`The Product Quantity is only ${item?.quantity - Number(item.outOfStockThreshold)}`)} count={cart?.find(i => i?.Productid == item?.id)?.quantity} onPressAdd={() => onPressPlus(item)} setCart isCart={cart?.find(i => i?.Productid == item?.id)?.quantity > 0 ? true : false} item={item} onPress={() =>
                                    props.navigation.navigate('ShowItems', {
                                        data: item.id,
                                    })
                                    
                                } />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}

                        numColumns={2}
                    // ListFooterComponent={() => showLoadmore && <View>

                    //     <Button onPress={() => getallBrands(afterelement)}
                    //         title={"LoadMore"}
                    //         btnContainer={{


                    //             height: hp(6),
                    //             width: wp(55),
                    //             marginTop: hp(4)

                    //         }}

                    //     />
                    // </View>}


                    /> :

                    <View style={{}}>

                        {/* {loading === false && <Text style={{ fontSize: 16, color: Colors.balckText, fontFamily: fonts.PoppinsRegular }}>{'No products found.'}</Text>} */}

                    </View>
                }

            </ScrollView>
            <Loader loading={loading} />

        </View>
    )
}

const styles = StyleSheet.create({

    Scrolcontainer: {
        marginTop: hp('3%'),
    },
    imgview: {
        alignItems: 'center',
        height: hp('10%'),
        marginTop: Platform.OS === 'ios' ? hp(0) : hp(3),
        // paddingBottom: Platform.OS === 'ios' ?  hp(0) : hp(4),
        // width:Platform.OS === 'ios' ?  hp(0) : hp(4)
    },
    ScrollMainView: {
        borderWidth: 0.5,
        borderColor: '#CFCFCF',
        width: wp('42%'),
        height: hp('24%'),
        borderRadius: 10,
        justifyContent: 'center',
    },
    ScrollMainView2: {
        borderWidth: 0.5,
        borderColor: '#CFCFCF',
        //marginTop:hp(''),
        //paddingTop:hp('3%'),
        width: wp('42%'),
        height: hp('24%'),
        borderRadius: 10,
        // paddingHorizontal:hp('3%'),
        justifyContent: 'center',
        paddingBottom: Platform.OS === 'ios' ? hp(0) : hp(4),
        //marginLeft:hp('2%')
    },
    ScrollViewimg: {
        height: hp('12%'),
        width: wp('19%'),
    },
    ScrollViewText: {
        fontWeight: '600',
        fontSize: 15,
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular
    },
    ScrollViewSubText: {
        fontWeight: '400',
        fontSize: 14,
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular
    },
    ScrollSubView: {
        flexDirection: 'row',
        marginTop: hp('1.5%'),
        height: hp('4.5%'),
        // borderWidth:1,
        //  borderColor:'red',
        paddingHorizontal: wp('3%'),
    },
    ScrollLastView: {
        width: wp('26%'),
        justifyContent: 'center',
        //  borderColor:'red',
        //  borderWidth:1
    },
    Scrolltext: {
        fontWeight: '400',
        fontSize: 17,
        color: Colors.BtnBackground
    },
    ScrollViewlast: {
        backgroundColor: Colors.BtnBackground,
        borderRadius: 10,
        width: Platform.OS === 'ios' ? wp(10) : wp(9),
        height: Platform.OS === 'ios' ? hp(4.5) : hp(5),
        justifyContent: 'center',
        alignItems: 'center',

    },
    Scrollimg: {
        height: hp('2.75%'),
        width: wp('5.5%'),
        tintColor: Colors.whitecolor
    },
    container: {
        marginTop: hp('0.5%'),
        flexDirection: 'row'
    },
    label: {
        margin: 8,
        fontSize: 17,
    },

    searchbar: {
        alignItems: 'center',
        height: Platform.OS === 'ios' ? hp(5) : hp(6),
        borderRadius: 10,
        borderColor: '#CFCFCF',
        borderWidth: 0.5,
        flexDirection: 'row',
        width: wp(90),
        justifyContent: "center"
    },
    btn: {
        borderColor: '#CFCFCF',
        borderWidth: 0.5,
        width: wp('12%'),
        // height: Platform.OS === 'ios' ? hp(5) : hp(6),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemimg: {
        height: Platform.OS === 'ios' ? hp(7.5) : hp(10),
        width: Platform.OS === 'ios' ? wp(25) : wp(22),
        marginTop: hp(2),
        borderRadius: hp(8)
    },
    instok: {
        backgroundColor: '#0DD675',
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'flex-end',
        right: wp(3),
        top: hp(1),
    },
    stocktext: {
        fontFamily: fonts.Poppins,
        fontSize: 8,
        color: Colors.whitecolor,
    },
});


export default BrandDetail;