import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    FlatList,
    Pressable,
    Platform,
} from 'react-native';
import {
    images,
    Colors,
    fonts,
    Header,
    Loader,
    Button,
} from '../../Components/Index';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { _axiosGetAPI, _axiosGetAPI1 } from '../../Apis/Apis';
import FastImage from 'react-native-fast-image';
import { addTOcart } from '../../Components/Additemstocart';
import { useIsFocused } from '@react-navigation/native';
import {  RenderTopSaver } from '../BesSellerDetails/components';
import { DeleteCartData, UpdateCartData, getcartData } from '../../Helperfunctions';
import Spacer from '../../Components/Spacer';

const TopSaverDetails = props => {
    const [productlist, setproductlist] = useState([]);
    const [afterelement, setafterelement] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showLoadmore, setshowLoadmore] = useState(false);
    const [cart, setCart] = useState([])



    useEffect(() => {
        getcategryproduct(afterelement, props?.route?.params?.item?.id);
        // return () => setproductlist([])
    }, [useIsFocused(), props?.route?.params?.item?.id]);



    const getcategryproduct = async (afterElement, id = 1) => {
        try {
            setLoading(true);
            await _axiosGetAPI1(
                `https://prod-api.quick.shop/products/store/products/top-saver?limit=200&offset=${afterElement}`,
            )
                .then(async response => {
                    console.log('getcategryproduct', response);
                    setproductlist(prev => [...prev, ...response?.data?.data?.products]);
                    setafterelement(
                        response?.data?.data?.products[
                            response?.data?.data?.products?.length - 1
                        ].id,
                    );
                    if (response?.data?.data?.products?.length == 20) {
                        setshowLoadmore(true);
                    } else {
                        setshowLoadmore(false);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.log('Err,', err);
                    setLoading(false);
                    setshowLoadmore(false);
                });
        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false);
        }
    };

    const searchproduct = async name => {
        try {
            await _axiosGetAPI1(
                `https://prod-api.quick.shop/products/store/products/top-saver?limit=200&offset=&search=name%3D${name}`,
            )
                .then(async response => {
                    console.log('getcategryproduct', response);
                    setproductlist(response?.data?.data?.products);
                })
                .catch(err => {
                    console.log('Err,', err);
                    setLoading(false);
                    setshowLoadmore(false);
                });
        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false);
        }
    };

    const outofStockDesig = (isOutOfStock, imageUrl, name, price) => {
        return (
            <View
                onPress={() =>
                    props.navigation.navigate('ShowItems', {
                        data: item.id,
                    })
                }
                style={{ marginTop: hp('2%'), marginLeft: hp('2.5%') }}>
                <View
                    style={{
                        ...styles.instok,
                        backgroundColor: isOutOfStock ? '#0DD675' : 'red',
                    }}>
                    <Text style={styles.stocktext}>
                        {isOutOfStock ? 'In stock' : 'Out of stock'}
                    </Text>
                </View>
                <View style={styles.ScrollMainView2}>
                    <View style={styles.imgview}>
                        <FastImage
                            style={styles.itemimg}
                            source={{
                                uri: imageUrl,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={{ justifyContent: 'center', paddingHorizontal: wp('3%') }}>
                        <Text numberOfLines={2} style={styles.ScrollViewText}>
                            {name}
                        </Text>
                    </View>
                    <View style={styles.ScrollSubView}>
                        <View style={styles.ScrollLastView}>
                            <Text style={styles.Scrolltext}>Rs. {price}</Text>
                        </View>
                        <View
                            style={{ ...styles.ScrollViewlast, backgroundColor: '#E2E2E2' }}>
                            <Image source={images.shoppingcart} style={styles.Scrollimg} />
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    const renderItem = ({ item, index }) => {
        const isOutOfStock = item?.quantity > item?.outOfStockThreshold;

        return (
            <View>
                {isOutOfStock ? (
                    <TouchableOpacity
                        onPress={() =>
                            props.navigation.navigate('ShowItems', {
                                data: item.id,
                            })
                        }
                        style={{ marginTop: hp('2%'), marginLeft: hp('2.5%') }}>
                        {/* <View
              style={{
                ...styles.instok,
                backgroundColor: isOutOfStock ? '#0DD675' : 'red',
              }}>
              <Text style={styles.stocktext}>
                {isOutOfStock ? 'In stock' : 'Out of stock'}
              </Text>
            </View> */}
                        <View style={styles.ScrollMainView2}>
                            <View style={styles.imgview}>
                                <FastImage
                                    style={styles.itemimg}
                                    source={{
                                        uri: item?.imageUrl,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </View>
                            <View
                                style={{ justifyContent: 'center', paddingHorizontal: wp('3%') }}>
                                <Text numberOfLines={1} style={styles.ScrollViewText}>
                                    {item.name}
                                </Text>
                            </View>
                            <View style={styles.ScrollSubView}>
                                <View style={styles.ScrollLastView}>
                                    <Text style={styles.Scrolltext}>Rs. {item.price}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() =>
                                        addTOcart(
                                            item?.id,
                                            item?.imageUrl,
                                            item?.name,
                                            1,
                                            item?.price,
                                            props.navigation,
                                        )
                                    }
                                    style={styles.ScrollViewlast}>
                                    <Image
                                        source={images.shoppingcart}
                                        style={styles.Scrollimg}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ) : (
                    outofStockDesig(isOutOfStock, item?.imageUrl, item?.name, item.price)
                )}
            </View>
        );
    };

    const onPressPlus = async (item) => {
        console.log("item", item)

        await addTOcart(
            item?.id,
            item?.imageUrl,
            item?.name,
            1,
            item?.price,
            props.navigation,
        )
        getcartData(data => {
            console.log("data", data)
            setCart(data)
        })
    }

    const onPressMinus = (item) => {
        let finditem = cart?.find(i => i?.Productid == item?.id)
        if (finditem?.quantity > 1) {
            UpdateCartData(finditem?.quantity - 1, finditem?.id, data => {
                console.log("uasdfasdfasdfas", data)
                setCart(data)
            })
        } else {
            let deleteCartItem = cart?.filter(i => i?.Productid !== item?.id)
            setCart(deleteCartItem)
            DeleteCartData(finditem?.id)
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <View
                style={{
                    marginHorizontal: hp('3%'),
                    marginTop: hp(Platform.OS == 'ios' ? 6 : 2),
                }}>
                <Header
                    title={'Top Savers'}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            {/* <View
                style={{
                    flexDirection: 'row',
                    marginTop: hp('2%'),
                    justifyContent: 'space-between',
                    paddingHorizontal: wp(5),
                }}>
                <View style={styles.searchbar}>
                    <Image
                        source={images.searchicon}
                        style={{
                            height: wp(6),
                            width: wp(6),
                            tintColor: Colors.BtnBackground,
                        }}
                    />
                    <TextInput
                        placeholder="Search by items name"
                        maxLength={25}
                        fontWeight={'400'}
                        borderColor={'red'}
                        marginLeft={wp(1.5)}
                        onChangeText={searchproduct}
                        placeholderTextColor={Colors.placeholder}
                        color={Colors.balckText}
                        fontFamily={fonts.PoppinsRegular}
                        style={{
                            alignItems: 'center',
                            alignContent: 'center',
                            marginTop: 2,
                            width: wp(78),
                            height: hp(5.5),
                        }}
                        alignItems={'center'}
                    />
                </View>
            </View> */}
            <View style={{ marginHorizontal: wp(5), flex: 1, paddingBottom: hp(3), backgroundColor: 'transparent' }}>
                {productlist.length > 0 ? (
                    <FlatList
                        data={productlist}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={() => <Spacer height={wp(1)} />}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        renderItem={({ item, index }) => {
                            return (
                                <RenderTopSaver onPressMinus={() => onPressMinus(item?.product)} onPressPlus={() => onPressPlus(item?.product)} count={cart?.find(i => i?.Productid == item?.product?.id)?.quantity} onPressAdd={() => onPressPlus(item?.product)} setCart isCart={cart?.find(i => i?.Productid == item?.product?.id)?.quantity > 0 ? true : false} item={item} onPress={() =>
                                    props.navigation.navigate('ShowItems', {
                                        data: item?.product?.id,
                                    })
                                } />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ marginTop: hp('2%') }}
                        numColumns={2}
                        ListFooterComponent={() =>
                            showLoadmore && (
                                <View>
                                    <Button
                                        onPress={() => getcategryproduct(afterelement)}
                                        title={'LoadMore'}
                                        btnContainer={{
                                            height: hp(6),
                                            width: wp(55),
                                            marginTop: hp(4),
                                            marginBottom: Platform.OS === 'android' ? hp(3) : hp(0),
                                        }}
                                    />
                                </View>
                            )
                        }
                    />
                ) : (
                    <View
                        style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                        {loading === false && (
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: Colors.balckText,
                                    fontFamily: fonts.PoppinsRegular,
                                }}>
                                {'No products found.'}
                            </Text>
                        )}
                    </View>
                )}

            </View>

            <Loader loading={loading} />
        </View>
    );
};

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
        fontFamily: fonts.PoppinsRegular,
    },
    ScrollViewSubText: {
        fontWeight: '400',
        fontSize: 14,
        color: Colors.grayText,
        fontFamily: fonts.PoppinsRegular,
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
        color: Colors.BtnBackground,
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
        tintColor: Colors.whitecolor,
    },
    container: {
        marginTop: hp('0.5%'),
        flexDirection: 'row',
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
        justifyContent: 'center',
    },
    btn: {
        borderColor: '#CFCFCF',
        borderWidth: 0.5,
        width: wp('12%'),
        // height: Platform.OS === 'ios' ? hp(5) : hp(6),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemimg: {
        height: Platform.OS === 'ios' ? hp(7.5) : hp(10),
        width: Platform.OS === 'ios' ? wp(25) : wp(22),
        marginTop: hp(2),
        borderRadius: hp(8),
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

export default TopSaverDetails;
