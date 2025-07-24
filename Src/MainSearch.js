import React, { useRef, useState, useEffect } from 'react';
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
    Button,
    Loader,
} from './Components/Index';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { BASE_URL, _axiosGetAPI, _axiosGetAPI1, _axiosPostAPI } from './Apis/Apis';
import { addTOcart } from './Components/Additemstocart';
import { RenderSearchitem, Renderpopuleritem } from './Screens/BesSellerDetails/components';
import { DeleteCartData, UpdateCartData, debounce, getcartData } from './Helperfunctions';
import Spacer from './Components/Spacer';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { AppEventsLogger } from 'react-native-fbsdk';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';




const MainSearch = props => {
    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });
    const [ofset, setofset] = useState(1);
    const [loading, setLoading] = useState(false);
    const [productList, setproductList] = useState([]);
    const [cart, setCart] = useState([])
    const [hasmore, setHasMore] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [heartPressed, setHeartPressed] = useState({})



    const isFocused = useIsFocused();
    useEffect(() => {
        getcartData(data => {
            if (data?.length) setCart(data)
        })
    }, [useIsFocused()])

    useEffect(() => {
        if (isFocused) {
            getAllproducts(ofset);
        }

    }, [isFocused]);

    // View content 
    useEffect(() => {
        // AppEventsLogger.logEvent('View content', {
        //     pageName: 'MainSearch',
        // });
    }, []);


    const onPressPlus = async (item) => {
        let cartCopy = [...cart]
        let filter = cartCopy.filter(i => i?.Productid !== item?.id)
        let find = cartCopy.find(i => i?.Productid == item?.id)
        if (find) {
            find.quantity += 1
            filter.push(find)
            setCart(filter)
            Toast.show('Added successfully')
        } else {
            setCart([...cart, {
                Productid: item?.id,
                ImageUrl: item?.imageUrl,
                ProductName: item?.name,
                quantity: 1,
                Price: item?.price,
            }])
        }

        await addTOcart(
            item?.id,
            item?.imageUrl,
            item?.name,
            1,
            item?.price,
            item.quantity - Number(item.outOfStockThreshold),
            props.navigation,
        )
        getcartData(data => {
            // setCart(data)
        })
    }

    const onPressMinus = (item) => {
        let finditem = cart?.find(i => i?.Productid == item?.id)
        if (finditem?.quantity > 1) {
            UpdateCartData(finditem?.quantity - 1, finditem?.id, data => {
                setCart(data)
                Toast.show('Remove successfully')
            })
        } else {
            let deleteCartItem = cart?.filter(i => i?.Productid !== item?.id)
            setCart(deleteCartItem)
            DeleteCartData(finditem?.id)
        }

    }
    useEffect(() => {
        if (searchText) {
            console.log("searching", searchText)
            searchAllproductsBuyfilter();
        } else {
            getAllproducts(ofset);
        }



    }, [searchText]);

    const handleToggleHeart = async (item) => {
    try {
      const response = await _axiosPostAPI(
        `store/products/favourite-products`,
        { productId: String(item.id) },
        userToken
      );

      if (response?.data?.statusCode === 200) {
        const current = heartPressed[item.id] ?? item.favourite;

        setHeartPressed(prev => ({
          ...prev,
          [item.id]: !current,
        }));

        Toast.show(response?.data?.message || 'Favourite updated');
      }
      else {
        Toast.show('Something went wrong while updating your favourite. Please try again.');

      }
    } catch (error) {
      console.log("💥 Favourite toggle error:", error);
      Toast.show('An error occurred while updating your favourite. Please check your internet connection or try again later.');

    }
  };

    const searchAllproductsBuyfilter = () => {

        // Your search logic here
        console.log("SEARCH TEXT", searchText,)
        _axiosGetAPI1(`store/products/?&limit=50&offset=1&search=name=${searchText}&&filter=isPublish=eq:true`, userToken).then(res => {
            setproductList(res?.data?.data?.products)
            const product = res?.data?.data?.products
            console.log("search product in main search", product)
            const initialHeartState = {};
            product.forEach(p => {
                initialHeartState[p.id] = p.favourite;
            });
            setHeartPressed(initialHeartState);
            console.log("res?.data?.data?.products", res?.data?.data?.products)
            if (res?.data?.data?.products?.length > 49) {
                setHasMore(true)
                setofset(2)
                // ----------------------Search----------------------
                // AppEventsLogger.logEvent('Search', {
                //     searchText: text,
                // });
            } else {
                setHasMore(false)
            }
        }).catch(error => {
            console.log("errroroororororo", error)
        })
    }

    const getAllproducts = async afterElement => {
        if (hasmore) {

            if (searchText.length > 0) {
                setLoading(true);
                _axiosGetAPI1(`store/products/?&limit=50&offset=${ofset}&search=name=${searchText}&&filter=isPublish=eq:true`, userToken).then(res => {
                    setproductList(pre => [...pre, ...res?.data?.data?.products])
                    const product = res?.data?.data?.products
                    console.log("search text products", product)
                    const initialHeartState = {};
                    product.forEach(p => {
                        initialHeartState[p.id] = p.favourite;
                    });
                    setHeartPressed(initialHeartState);
                    console.log("res?.data?.data?.products", res?.data?.data?.products.length)

                    if (res?.data?.data?.products?.length > 49) {
                        setHasMore(true)
                        setLoading(false);
                        setofset(ofset + 1)
                    } else {
                        setLoading(false);
                        setHasMore(false)
                    }
                }).catch(error => {
                    setLoading(false);
                    console.log("errroroororororo", error)
                })
            } else {
                try {

                    setLoading(true);
                    await _axiosGetAPI(
                        `store/products?limit=50&offset=${ofset}&filter=isPublish%3Deq%3Atrue`, null, userToken
                    )
                        .then(async response => {

                            setproductList(prev => [...prev, ...response?.data?.data?.products]);
                            const initialHeartState = {};
                            const product = response?.data?.data?.products
                            product.forEach(p => {
                                initialHeartState[p.id] = p.favourite;
                            });
                            console.log("search else products", product)

                            setHeartPressed(initialHeartState);
                            if (response?.data?.data?.products?.length == 50) {
                                setofset(ofset + 1);
                                setHasMore(true)
                            } else {
                                setHasMore(false)
                                setLoading(false);
                            }
                            setLoading(false);
                        })
                        .catch(err => {
                            setLoading(false);
                            setHasMore(false)
                        });
                } catch (error) {
                    setLoading(false);
                }
            }



        }

    };


    return (
        <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
            <View
                style={{
                    marginHorizontal: hp('3%'),
                    marginTop: hp(Platform.OS == 'ios' ? 6 : 2),
                }}>
                <Header title={'Search'} onPress={() => props.navigation.goBack()} />
            </View>
            <View
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
                            marginLeft: wp('2.3%'),
                            height: hp('2.6%'),
                            width: wp('5%'),
                            tintColor: Colors.BtnBackground,
                        }}
                    />
                    <TextInput
                        placeholder="Search by items name"
                        maxLength={25}
                        // marginLeft={'3%'}
                        // value={searchval}
                        autoFocus={true}
                        fontWeight={'400'}
                        borderColor={'red'}
                        marginLeft={Platform.OS === 'ios' ? wp(1.5) : wp(0.5)}
                        borderWidth={0}
                        value={searchText}
                        width={wp(79)}
                        onChangeText={text => setSearchText(text)}
                        placeholderTextColor={Colors.placeholder}
                        color={Colors.balckText}
                        fontFamily={fonts.PoppinsRegular}
                    />

                </View>

            </View>


            <View style={{ marginHorizontal: wp(5), flex: 1 }}>
                {productList.length > 0 ? (
                    <FlatList
                        data={productList}
                        onEndReached={() => getAllproducts()}
                        onEndReachedThreshold={1}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ marginTop: hp('2%') }}
                        numColumns={2}
                        ListEmptyComponent={() => (
                            <View
                                style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                                {loading == true ? (
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: Colors.balckText,
                                            fontFamily: fonts.PoppinsRegular,
                                        }}>
                                        {'No products found.'}
                                    </Text>
                                ) :
                                    (<View style={styles.skeletonWrapper}>
                                        {/* Rendering 8 skeleton items to match the grid structure */}
                                        {Array.from({ length: 10 }).map((_, index) => (
                                            <SkeletonPlaceholder key={index}>
                                                <View style={styles.skeletonContainerProducts}>
                                                    <View style={styles.skeletonImageProducts} />
                                                    {/* <View style={styles.skeletonText} /> */}
                                                </View>
                                            </SkeletonPlaceholder>
                                        ))}
                                    </View>)
                                }
                            </View>
                        )}
                        ItemSeparatorComponent={() => <Spacer height={wp(1)} />}
                        columnWrapperStyle={{ justifyContent: 'space-between', }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            return (
                                <RenderSearchitem
                                    handleToggleHeart={() => handleToggleHeart(item)}
                                    heartPressed={heartPressed[item.id]}
                                    onPressMinus={() => onPressMinus(item)}
                                    onPressPlus={() => cart?.find(i => i?.Productid == item?.id).quantity < (item?.quantity - Number(item.outOfStockThreshold)) ?
                                        onPressPlus(item) : Toast.show(`The Product Quantity is only ${item?.quantity - Number(item.outOfStockThreshold)}`)}
                                    count={cart?.find(i => i?.Productid == item?.id)?.quantity}
                                    onPressAdd={() => {
                                        Toast.show('Added Successfully')
                                        onPressPlus(item)
                                    }}
                                    setCart
                                    isCart={cart?.find(i => i?.Productid == item?.id)?.quantity > 0 ? true : false}
                                    item={item}
                                    onPress={() =>
                                        props.navigation.navigate('ShowItems', {
                                            data: item.id,
                                        })
                                    } />
                            )
                        }}
                        ListFooterComponent={() =>
                        (
                            <>
                                {
                                    loading && <View style={[styles.skeletonWrapper, { marginTop: 10 }]}>
                                        {/* Rendering 8 skeleton items to match the grid structure */}
                                        {Array.from({ length: 10 }).map((_, index) => (
                                            <SkeletonPlaceholder key={index}>
                                                <View style={styles.skeletonContainerProducts}>
                                                    <View style={styles.skeletonImageProducts} />
                                                    {/* <View style={styles.skeletonText} /> */}
                                                </View>
                                            </SkeletonPlaceholder>
                                        ))}
                                    </View>
                                }

                            </>

                        )
                        }
                    />
                ) : (
                    <View
                        style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                        {loading == false && (
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

        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainerProducts: {
        width: wp(42.5),  // Adjust width based on your design
        height: hp(30),  // Adjust height based on your design
        borderRadius: 10,  // Give a border radius to match the design
        marginHorizontal: wp(1),  // Add horizontal margin to space items
    },
    skeletonImageProducts: {
        width: wp(42.5),  // Adjust width based on your design
        height: hp(29), // Full height for the image placeholder
        borderRadius: 10,  // Match the border radius for a rounded effect
    },
    skeletonWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap', // This ensures that items wrap like in the FlatList's grid layout
        justifyContent: 'space-between',
    },
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
        width: wp(43),
        height: hp(25),
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
        fontWeight: 'bold',
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
        fontFamily: fonts.PoppinsRegular,
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
        width: wp(90),
        // marginHorizontal: hp('2%'),
        //height: hp('6%'),
        height: Platform.OS === 'ios' ? hp(5) : hp(6),
        borderRadius: 10,
        borderColor: '#CFCFCF',
        borderWidth: 1,
        flexDirection: 'row',
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
        // height: hp('7%'),
        // width: wp('25%'),
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

export default MainSearch;
