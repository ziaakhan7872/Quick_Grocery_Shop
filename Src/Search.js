import React, { useRef, useState, useEffect, useCallback } from 'react';
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
  Keyboard,
  ActivityIndicator,
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
import RBSheet from 'react-native-raw-bottom-sheet';
import { iconPath } from './Constant/Icons';
import { _axiosGetAPI, _axiosGetAPI1, _axiosGetAPI11111, _axiosPostAPI } from './Apis/Apis';
import { ScrollView } from 'react-native-gesture-handler';
import { addTOcart } from './Components/Additemstocart';
import { RenderSearchitem, Renderpopuleritem } from './Screens/BesSellerDetails/components';
import { DeleteCartData, UpdateCartData, debounce, getcartData } from './Helperfunctions';
import Spacer from './Components/Spacer';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { AppEventsLogger } from 'react-native-fbsdk';
import _ from 'lodash';
import { newEvents } from './Components/CustomListner';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useSelector } from 'react-redux';



const Search = props => {
  const refRBSheet = useRef();
  const userToken = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });
  const [selectedIds, setSelectedIds] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedPricerange, setselectedPricerange] = useState('');
  const [selectedPrice, setselectedPrice] = useState([]);
  const [afterelement, setafterelement] = useState(1);
  const [ofset, setofset] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showLoadmore, setshowLoadmore] = useState(false);
  const [productList, setproductList] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [Category, setCategory] = useState([]);
  const [searchval, setsearchval] = useState('');
  const [cart, setCart] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [hasmore, setHasMore] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [heartPressed, setHeartPressed] = useState({});



  const isFocused = useIsFocused();
  useEffect(() => {
    cartData()
  }, [useIsFocused()])

  useEffect(() => {
    _axiosGetAPI(`brands/all-publish?offset=1&limit=100&categoryName=${encodeURIComponent(selectedCategory)}&filter=isPublish=eq:true`).then(res => {

      if (res.status == 200) {
        setBrands(res.data.data.brands)
      }

    }).catch(error => {
    })
  }, [selectedIds])

  useEffect(() => {
    newEvents.on('addCart', function (proposal) {
      cartData();
    });
    if (isFocused) {

      getAllproducts(ofset);
      // getallbrands();
      getallcategory();
    }

  }, []);

  const handleToggleHeart = async (item) => {
    console.log(item, "item of heart")
    try {
      const response = await _axiosPostAPI(
        `store/products/favourite-products`,
        { productId: String(item.id) },
        userToken
      );

      if (response?.data?.statusCode === 200) {
        console.log("response", response?.data?.message);
        // Toggle only after success
        setHeartPressed(prev => ({
          ...prev,
          [item.id]: !prev[item.id]
        }));

        Toast.show(response?.data?.message || 'Favourite updated');
      }
    } catch (error) {
      console.log("💥 Favourite toggle error:", error);
    }
  };


  const cartData = () => {
    getcartData(data => {
      if (data?.length) setCart(data)
    })
  }

  const onPressPlus = async (item) => {
    console.log("onpressplus")
    try {
      let cartCopy = [...cart]
      let filter = cartCopy.filter(i => i?.Productid !== item?.id)
      let find = cartCopy.find(i => i?.Productid == item?.id)
      if (find) {
        find.quantity += 1
        filter.push(find)
        setCart(filter)
        Toast.show('Added successfully')
      } else {

      }

      await addTOcart(
        item?.id,
        item?.imageUrl,
        item?.name,
        1,
        item?.price,
        item?.quantity - Number(item.outOfStockThreshold),
        props.navigation,
      )
      getcartData(data => {
      })
    } catch (error) {
      console.log("this is add buttonb= error", error);


    }



    // ----------------------Search-----------------------
    // AppEventsLogger.logEvent('Search', {
    //   seachText: item?.name,
    // });

  }

  const onPressMinus = async (item) => {
    let finditem = await cart?.find(i => i?.Productid == item?.id)
    if (finditem?.quantity > 1) {
      await UpdateCartData(finditem?.quantity - 1, finditem?.id, data => {
        setCart(data)
        Toast.show('Remove successfully')
      })
    } else {
      let deleteCartItem = await cart?.filter(i => i?.Productid !== item?.id)
      setCart(deleteCartItem)
      DeleteCartData(finditem?.id)
      Toast.show('Remove successfully')

    }

  }



  const ApplyFilter = async () => {
    setLoading(true)
    setproductList([])
    refRBSheet?.current?.close()

    let arr = [selectedIds?.id]
    if (selectedCategories?.name) {


      // _axiosGetAPI1(`https://prod-api.quick.shop/products/store/products/?&limit=50&offset=1&search=name=${searchText}&categoryName=${selectedCategories?.name ?? 'Beverages'}&filter=isPublish=eq:true`)



      let url = `store/products?offset=1&limit=50&search=name=${searchText}&categoryName=${encodeURIComponent(selectedCategories?.name)}`
      if (!selectedIds?.id) url = url + `&filter=isPublish=eq:true`
      if (selectedIds?.id && minPrice || maxPrice) url = url + `&filter=brandId=in:${encodeURIComponent(JSON.stringify(arr))};isPublish=eq:true;price=between:${encodeURIComponent(JSON.stringify([minPrice ?? 0, maxPrice ?? 1000]))};isPublish=eq:true`
      if (selectedIds?.id && !minPrice && !maxPrice) url = url + `&filter=brandId=in:${encodeURIComponent(JSON.stringify(arr))};isPublish=eq:true`


      // "${api_url}/store/products?&search=name=${name}&offset=${offVal}&limit=${limit}&categoryName=${selectedCategory}&filter=isPublish=eq:true`;"
      // Make a GET request using axios
      _axiosGetAPI(url, null, userToken)
        .then(response => {
          if (response.status == 200) {
            console.error('response?.data?.data?.products', response?.data?.data?.products);
            setproductList(pre => [...pre, ...response?.data?.data?.products])
            const product = response?.data?.data?.products
            const initialHeartState = {};
            product.forEach(p => {
              initialHeartState[p.id] = p.favourite;
            });
            setHeartPressed(initialHeartState);
            if (response?.data?.data?.products.length > 49) {
              setofset(2)
              setHasMore(true)
              setshowLoadmore(true);
              setLoading(false)

            } else {
              setHasMore(false)
              setshowLoadmore(false);
              console.log("running",)
              setLoading(false)

            }
          }

        })
        .catch(error => {
          // Handle error
          console.error('Error fetching data:', error);
          setLoading(false)

        });
    } else {
      setMaxPrice('')
      setMinPrice('')
      await _axiosGetAPI(
        `store/products?limit=50&offset=1&filter=isPublish%3Deq%3Atrue`,null,userToken,
      )
        .then(async response => {
          setproductList(response?.data?.data?.products);
          const product = response?.data?.data?.products
          const initialHeartState = {};
          product.forEach(p => {
            initialHeartState[p.id] = p.favourite;
          });
          if (response?.data?.data?.products?.length > 49) {
            setofset(2);
            setHasMore(true)
            setshowLoadmore(true);
            setLoading(false)

          } else {
            setshowLoadmore(false);
            setHasMore(false)
            setLoading(false)

          }
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          setshowLoadmore(false);
          // setHasMore(false)
        });
    }
  }


  const searchAllproductsBuyfilter = () => {
    console.log("category NAme",)
    if (selectedCategories?.name) {
      _axiosGetAPI1(`https://prod-api.quick.shop/products/store/products/?&limit=50&offset=1&search=name=${searchText}&categoryName=${encodeURIComponent(selectedCategories?.name ?? 'Beverages')}&filter=isPublish=eq:true`,null,userToken).then(res => {
        setproductList(res?.data?.data?.products)
          const product = response?.data?.data?.products
          const initialHeartState = {};
          product.forEach(p => {
            initialHeartState[p.id] = p.favourite;
          });
        console.log("this is run for", searchText)
        if (res?.data?.data?.products?.length > 49) {
          setofset(2)
          setHasMore(true)
        } else {
          setHasMore(false)
        }
      }).catch(error => {
      })
    } else {
      _axiosGetAPI1(`https://prod-api.quick.shop/products/store/products/?&limit=50&offset=1&search=name=${searchText}&filter=isPublish=eq:true`,null,userToken).then(res => {
        setproductList(res?.data?.data?.products)
          const product = response?.data?.data?.products
          const initialHeartState = {};
          product.forEach(p => {
            initialHeartState[p.id] = p.favourite;
          });
        console.log("this is run for", searchText)
        if (res?.data?.data?.products?.length > 49) {
          setofset(2)
          setHasMore(true)
        } else {
          setHasMore(false)
        }
      }).catch(error => {
      })
    }
    // Your search logic here
    // "${api_url}/store/products?&search=name=${name}&offset=${offVal}&limit=${limit}&categoryName=${selectedCategory}&filter=isPublish=eq:true`;"

  }

  useEffect(() => {

    searchAllproductsBuyfilter();

  }, [searchText]);


  const getAllproducts = async afterElement => {

    if (hasmore) {
      if (searchText !== '') {
        setLoading(true)
        _axiosGetAPI1(`https://prod-api.quick.shop/products/store/products/?&limit=50&offset=${ofset}&search=name=${searchText}&filter=isPublish=eq:true`,null,userToken).then(res => {
            const product = response?.data?.data?.products
          const initialHeartState = {};
          product.forEach(p => {
            initialHeartState[p.id] = p.favourite;
          });
          setproductList(prev => [...prev, ...res?.data?.data?.products])
          if (res?.data?.data?.products?.length > 49) {
            setofset(ofset + 1)
            setHasMore(true)
            setLoading(false)

          }
          else {
            setHasMore(false)
            setLoading(false)

          }
        }).catch(error => {
          setLoading(false)

        })
      } else {
        setLoading(true)

        if (selectedCategories?.name) {
          let url = `store/products?offset=${ofset}&limit=50&categoryName=${encodeURIComponent(selectedCategories?.name)}`
          if (selectedIds?.id && minPrice || maxPrice) url = url + `&filter=brandId=in:[${selectedIds?.id}];isPublish=eq:true;price=between:[${minPrice ?? 0},${maxPrice ?? 1000}];isPublish=eq:true`
          if (selectedIds?.id && !minPrice && !maxPrice) url = url + `&filter=brandId=in:[${selectedIds?.id}];isPublish=eq:true`


          // Make a GET request using axios
          _axiosGetAPI(url,null,userToken)
            .then(response => {
              if (response.status == 200) {
                setproductList(pre => [...pre, ...response?.data?.data?.products])
                  const product = response?.data?.data?.products
          const initialHeartState = {};
          product.forEach(p => {
            initialHeartState[p.id] = p.favourite;
          });
                if (response?.data?.data?.products.length > 49) {
                  setofset(ofset + 1)
                  setHasMore(true)
                  setshowLoadmore(true);
                  setLoading(false)

                } else {
                  setHasMore(false)
                  setshowLoadmore(false);
                  setLoading(false)


                }
              }

            })
            .catch(error => {
              setLoading(false)

              // Handle error
            });

        } else {
          try {
            setLoading(true);
            await _axiosGetAPI(
              `store/products?limit=50&offset=${ofset}&filter=isPublish%3Deq%3Atrue`,
            )
              .then(async response => {
                setproductList(prev => [...prev, ...response?.data?.data?.products]);
                if (response?.data?.data?.products?.length == 50) {
                  setofset(ofset + 1);
                  setHasMore(true)
                  setshowLoadmore(true);
                  setLoading(false)

                } else {
                  setshowLoadmore(false);
                  setHasMore(false)
                  setLoading(false)

                }
                setLoading(false);
              })
              .catch(err => {
                setLoading(false);
                setshowLoadmore(false);
                setLoading(false)

                // setHasMore(false)
              });
          } catch (error) {
            // setLoading(false);
            setLoading(false)

          }
        }
      }



    } else {
    }

  };





  const getallcategory = async () => {

    try {


      await _axiosGetAPI(`store/categories/all-publish?limit=200`)
        .then(async response => {

          let D = response?.data?.data?.categories.sort((a, b) =>
            a.name.charAt(0).localeCompare(b.name.charAt(0)),
          );

          setCategory(response?.data?.data?.categories);


        })
        .catch(err => {


        });
    } catch (error) {


    }
  };

  const addBrands = async (item, index) => {
    // var selectedIdss = [...selectedIds];
    setMaxPrice(null)
    setMinPrice(null)
    if (selectedIds.id == item?.id) {
      setSelectedIds('')
    } else {
      setSelectedIds(item)
    }
    // await setSelectedIds(selectedIdss);
  };


  const addCategories = async (item, index) => {

    setMinPrice('')
    setMaxPrice('')
    // var selectedCategoriesIdss = [...selectedCategories];
    if (selectedCategories?.name == item?.name) {
      setSelectedCategories({})
      setSelectedIds({})
    } else {

      setSelectedCategory(item.name)
      setSelectedCategories(item)
      setSelectedIds({})
    }
    // await setSelectedCategories(selectedCategoriesIdss);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)?.toLowerCase()
  }



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
            fontWeight={'400'}
            borderColor={'red'}
            marginLeft={Platform.OS === 'ios' ? wp(1.5) : wp(0.5)}
            borderWidth={0}
            value={searchText}
            width={wp(59)}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={Colors.placeholder}
            color={Colors.balckText}
            fontFamily={fonts.PoppinsRegular}
          />
          {/* <TouchableOpacity onPress={() => setsearchval('')}>
            <Image
              source={images.crossicon}
              style={{ height: hp('2%'), width: wp('2.5%') }}
            />
          </TouchableOpacity> */}
        </View>
        <TouchableOpacity
          onPress={() => { refRBSheet.current.open(), setofset(1) }}
          style={styles.btn}>
          <Image
            source={images.sideicon}
            style={{ width: 24, height: 24, tintColor: Colors.BtnBackground }}
          />
        </TouchableOpacity>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={hp(90)}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
          },
          draggableIcon: {
            backgroundColor: '#E4E4E4',
            width: wp('30%'),
          },
          container: {
            alignItems: 'center',
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <ScrollView
            contentContainerStyle={{ marginBottom: hp(50) }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginTop: hp('1%'),
                marginHorizontal: hp('2%'),
              }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: '600',
                  color: Colors.balckText,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                Categories
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList

                data={Category}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => addCategories(item, index)}
                    style={{
                      flexDirection: 'row',
                      width: wp(80),
                      margin: wp(2),
                      marginHorizontal: wp(5),
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        selectedCategories.name == item?.name
                          ? iconPath.check
                          : iconPath.Uncheck
                      }
                      style={{
                        width: wp(5.5),
                        height: wp(5.5),
                        resizeMode: 'contain',
                      }}></Image>
                    <Text
                      style={{
                        color: selectedCategories.name == item?.name
                          ? Colors.BtnBackground
                          : Colors.balckText,
                        fontSize: 15,
                        marginLeft: 7,
                        fontFamily: fonts.PoppinsRegular,
                      }}>
                      {capitalizeFirstLetter(item.name)}
                    </Text>
                  </Pressable>
                )}
              />
            </View>

            <View
              style={{
                justifyContent: 'center',
                marginTop: hp('1%'),
                marginHorizontal: hp('2%'),
              }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: '600',
                  color: Colors.balckText,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                Brands
              </Text>
            </View>
            <FlatList
              data={Brands}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => addBrands(item, index)}
                  style={{
                    flexDirection: 'row',
                    width: wp(80),
                    margin: wp(2),
                    marginHorizontal: wp(5),
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      selectedIds.id == item?.id
                        ? iconPath.check
                        : iconPath.Uncheck
                    }
                    style={{
                      width: wp(5.5),
                      height: wp(5.5),
                      resizeMode: 'contain',
                    }}></Image>
                  <Text
                    style={{
                      color: selectedIds.id == item?.id
                        ? Colors.BtnBackground
                        : Colors.balckText,
                      fontSize: 15,
                      fontFamily: fonts.PoppinsRegular,
                      marginLeft: 7,
                    }}>
                    {capitalizeFirstLetter(item.name)}
                  </Text>
                </Pressable>
              )}
            />
            {
              selectedIds?.id &&
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: hp('1%'),
                    marginHorizontal: hp('2%'),
                  }}>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: '600',
                      color: Colors.balckText,
                      fontFamily: fonts.PoppinsRegular,
                    }}>
                    Price Range
                  </Text>
                </View>
                <Spacer />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(5), marginBottom: hp(15) }}>
                  <TextInput placeholderTextColor={Colors.balckText} value={minPrice} onChangeText={e => setMinPrice(e)} keyboardType='number-pad' placeholder='Enter min price' style={{ paddingHorizontal: wp(2), borderWidth: 1, borderColor: Colors.grayText, width: wp(38), height: hp(5), borderRadius: 12, color: Colors.balckText }} />
                  <TextInput placeholderTextColor={Colors.balckText} value={maxPrice} onChangeText={e => setMaxPrice(e)} keyboardType='number-pad' placeholder='Enter max price' style={{ paddingHorizontal: wp(2), borderWidth: 1, borderColor: Colors.grayText, width: wp(38), height: hp(5), borderRadius: 12, color: Colors.balckText }} />
                </View>
              </View>
            }

            <Spacer />
            {/* <FlatList
              style={{ flex: 1 }}
              data={priceRange}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => addpricerange(item, index)}
                    style={{
                      flexDirection: 'row',
                      width: wp(80),
                      margin: wp(2),
                      marginHorizontal: wp(5),
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        selectedPricerange == item.id
                          ? iconPath.check
                          : iconPath.Uncheck
                      }
                      style={{
                        width: wp(5.5),
                        height: wp(5.5),
                        resizeMode: 'contain',
                      }}></Image>
                    <Text
                      style={{
                        color:
                          selectedPricerange == item.id
                            ? Colors.BtnBackground
                            : Colors.balckText,
                        fontSize: 15,
                        fontFamily: fonts.PoppinsRegular,
                        marginLeft: 7,
                      }}>
                      Rs. {item.pricefrom} - Rs. {item.priceto}
                    </Text>
                  </Pressable>
                );
              }}
            /> */}
          </ScrollView>
          <Spacer height={hp(6)} />
          <Button
            onPress={ApplyFilter}
            title={'Apply Filter'}
            btnContainer={{
              height: hp(6),
              bottom: hp(5),
            }}
          />
        </View>
      </RBSheet>
      <View style={{ marginHorizontal: wp(5), flex: 1, }}>

        <FlatList
          data={productList}
          // data={[]}
          onEndReached={() => getAllproducts(afterelement)}
          onEndReachedThreshold={1}
          keyExtractor={(item, index) => index.toString()}
          style={{ marginTop: hp('2%'), paddingBottom: 30 }}
          numColumns={2}
          ListEmptyComponent={() => (
            <View
              style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
              {loading == false ? (
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
          contentContainerStyle={{ paddingBottom: 30 }}

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
                  Toast.show('Added successfully')
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
                  {Array.from({ length: 2 }).map((_, index) => (
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
    width: wp(74),
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

export default Search;
