import React, { useEffect, useRef, useState, } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ImageBackground,
  TouchableWithoutFeedback,

} from 'react-native';
import {
  images,
  fonts,
  Colors,
} from './Components/Index';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  UserTokenVerification,
  _AxiosGetBearerAUTH,
  _axiosGetAPI,
  _axiosGetAPIAUTH,
  getCategaryMinimalWithProducts,
} from './Apis/Apis';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-simple-toast';
import FastImage from 'react-native-fast-image';
import { SearchInputField } from './Components/InputField';
import Spacer, { HorizontalSpacer } from './Components/Spacer';
import { CategoryModal } from './Components/Modal';
import {
  RenderSearchitem,
  RenderTopSaver,
} from './Screens/BesSellerDetails/components';
import useHome from './Screens/Home/Hook';
// import { getAppstoreAppVersion } from 'react-native-appstore-version-checker';
import AppLink from 'react-native-app-link';
import { SaveUserData, Saveuserislogin } from './Redux/Actions/Actions';
import { useIsFocused } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-reanimated-carousel';





const Home = props => {
  const userData = useSelector(
    response => response?.userdataReducer?.userData?.userData,
  );
  const IsfirstInstall = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });
  const userData1 = useSelector(
    response => response?.userdataReducer?.userData,
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   try {
  //     AppEventsLogger.logEvent('Add to cart', {
  //       content_type: 'product',
  //       content_id: 5,
  //       currency: 'PKR', // Adjust the currency if needed
  //       value: 100, // Assuming Price is in the same currency
  //     });
  //     console.log("the event is triggered by nafees Add To Cart")
  //   } catch (error) {
  //     console.log("log purchase error eror", error)
  //   }
  // }, [])

  // useEffect(() => {
  //   // ----------------------View Content----------------------
  //   try {
  //     AppEventsLogger.logEvent('View content', {
  //       pageName: 'home',
  //     });
  //     console.log("Viewcontent event");

  //   } catch (error) {
  //     console.log("Viewcontent error", error)
  //   }

  // }, [])


  const LogoutAfterTokenExpire = async () => {

    UserTokenVerification(userData1.userToken).then(res => {
      if (res.statusCode == 200) {
      } else {
        dispatch(SaveUserData({}));
        dispatch(Saveuserislogin(false));
      }
    }).catch(err => {
      dispatch(SaveUserData({}));
      dispatch(Saveuserislogin(false));
    })
  }

  const scrollRef = useRef()

  const [fetureBrand, setfetureBrand] = useState([]);
  const [relatedItem, setRelatedItem] = useState([]);
  const [Banners, setBanners] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState(0);
  const [scrollTop, setScrollTop] = useState(false)
  const [mistryDetail, setMistryDetials] = useState(false)
  const [animating, setAnimating] = useState(false);  // State to manage the fade-out animation
  const [currentIndex, setCurrentIndex] = useState(0)
  const userToken = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });






  let requestQueue = [];
  let isProcessingQueue = false;

  function processQueue() {
    if (requestQueue.length === 0) {
      isProcessingQueue = false;
      return;
    }

    isProcessingQueue = true;
    const request = requestQueue.shift();

    _axiosGetAPI(request.url, null, userToken)
      .then(res => {
        request.resolve(res);
        setTimeout(processQueue, 1000 / MAX_REQUESTS_PER_SECOND);
      })
      .catch(err => {
        request.reject(err);
        setTimeout(processQueue, calculateBackoffTime()); // Exponential backoff
      });
  }

  function calculateBackoffTime() {
    // Implement exponential backoff logic here
    // For simplicity, this example just returns a fixed value
    return 500; // 2 seconds
  }

  function throttleRequests(url) {
    return new Promise((resolve, reject) => {
      requestQueue.push({ url, resolve, reject });
      if (!isProcessingQueue) {
        processQueue();
      }
    });
  }

  useEffect(() => {
    LogoutAfterTokenExpire()
  }, [useIsFocused()])


  useEffect(() => {

    setLoading(true)
    getCategaryMinimalWithProducts(setLoading, data => {

      setCategories([...data]);
      let all = [...data];
      if (data?.length) {
        data?.map(async (i, index) => {

          // await _axiosGetAPI(
          //   `store/products?offset=1&limit=20&categoryName=${encodeURIComponent(i?.name)}`
          // )
          throttleRequests(`store/products?offset=1&limit=20&categoryName=${encodeURIComponent(i.name)}&filter=isPublish=eq:true`)

            .then(res => {
              console.log(res, "respone of category")
              const products = res?.data?.data?.products;
              all[index].allProducts = products;

              // ✅ Update categories
              setCategories([...all]);

              // ✅ Update heartPressed per product
              const updatedHearts = {};
              products?.forEach(prod => {
                updatedHearts[prod.id] = prod.favourite;
              });

              setHeartPressed(prev => ({ ...prev, ...updatedHearts }));

              // setCategories([])
              // setAllCategories([...allCategories, ...res?.data?.data?.products])
            }).catch(error => {
              setLoading(false);
            })


          // setAllCategories(all)
        });
      }
    });
  }, []);








  useEffect(() => {

    getFeatureBrands();
    getBanners();
    getOrderHistory()
  }, []);


  const getFeatureBrands = async () => {
    try {
      setLoading(true)
      await _axiosGetAPI('brands/all-publish?limit=50&offset=1&filter=isPublish=eq:true')
        .then(async response => {
          setfetureBrand(response?.data?.data?.brands);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };



  const getBanners = async () => {
    try {
      setLoading(true)
      await _axiosGetAPIAUTH(
        'banners?limit=10&offset=1&filter=device=eq:mobile',
      )
        .then(async response => {
          const filteredData = response?.data?.data?.banners
          setBanners(filteredData);
          console.log(response?.data?.data?.banners, "new carousel response ")
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const getOrderHistory = async () => {
    try {
      setLoading(true)

      await _AxiosGetBearerAUTH('users/order/page?limit=10&offset=1', userToken)
        .then(async response => {
          console.log('response of order hisory', response.data);
          // setOrderData(response.data.myOrders)
          const allProducts = response?.data?.orderLines.map(order => {
            console.log("map order", order);
            return {
              ...order.product,
              price: order.price,
              discountedPrice: order.discountedPrice
            }

          });

          console.log("all product", allProducts)
          setRelatedItem(allProducts)
          setLoading(false)

        })
        .catch(err => {
          console.log('Err,from placeorder', err);


          setLoading(false)


        });

      // props.navigation.navigate('Successfulorder')
    } catch (error) {
      setLoading(false)
    }
  }
  const _renderItem = ({ item }) => (
    <View style={{ marginHorizontal: wp(0.2), borderRadius: 10, overflow: 'hidden' }}>
      <FastImage
        source={{ uri: item.imageUrl, priority: FastImage.priority.high }}
        style={{ width: wp(100), height: hp(30.68), }}
        resizeMode={FastImage.resizeMode.cover} // Use cover or contain, avoid 'stretch'
      />
    </View>
  );


  const renderBrand = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('BrandDetail', {
            data: item.id,
            item,
          })
        }>
        <FastImage
          style={{ width: wp(30), height: wp(30), borderRadius: 10 }}
          source={{
            uri: item?.imageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        {/* <Text style={styles.brandtitle}>{item.name}</Text> */}
        {/* <Text style={styles.brandsubtitle}>{item.name}</Text> */}
      </TouchableOpacity>
    );
  };

  const {
    PopulerItems,
    loading,
    setLoading,
    cart,
    onPressMinus,
    onPressPlus,
    searchResults,
    onChangeText,
    topSaver,
    searchText,
    setSearchText,
    setSearchResults,
    TotalPrice, setTotalPrice,
    isMystryShow, setIsMystryShow,
    mystryLimit, setMystryLimit,
    heartPressed, handleToggleHeart, setHeartPressed
  } = useHome(props);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSearchResults([]), setSearchText('');
      }}>
      <>
        <StatusBar />
        <ScrollView
          ref={scrollRef}
          style={{}}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.backgroundColor }}
          // stickyHeaderHiddenOnScroll={['2']}
          onScroll={(event) => { event.nativeEvent.contentOffset.y > 1000 ? setScrollTop(true) : setScrollTop(false) }}

          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View id="1">
            <Image
              source={images.homeBackground}
              style={styles.homeBackgroundStyle}
            />

            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0,
                borderColor: 'red',
                paddingHorizontal: hp(3),
                marginTop: hp(Platform.OS == 'ios' ? 6 : 0),
              }}>
              <View style={styles.viewmain}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(IsfirstInstall ? "Myprofile" : "Login")} style={{ flexDirection: 'row', alignItems: 'center' }}>


                  {/* <Image source={{ uri: userData?.imageUrl }} style={{ height: wp(8), width: wp(8), borderRadius: 100, borderWidth: 1, borderColor: 'grey' }} /> */}

                  <HorizontalSpacer width={wp(1)} />
                  <View>
                    <Text style={[styles.nametxt,{width:wp(70)}]} numberOfLines={1}>{`Hi, ${userData?.name ? userData?.name : 'Guest'
                      }`}</Text>
                  </View>

                </TouchableOpacity>

                <Text style={styles.msgtxt}>{'What would you buy today?'}</Text>
                <Spacer height={hp(1)} />
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Notifications')}
                style={styles.ScrollViewbell}>
                <Image
                  source={images.notificationbell}
                  style={styles.Scrollimg}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('MainSearch', { isKeyboardOpen: true })}>
            <SearchInputField
              editable={false}
              onPressCross={() => {
                setSearchText(''), setSearchResults([]);
              }}
              onPress={() => props.navigation.navigate('MainSearch', { isKeyboardOpen: true })}
              // isCrossIcon
              value={searchText}
              onChangeText={onChangeText}
              styles={{
                borderColor: '#E2E2E2',
                borderWidth: 1,
                shadowColor: '#E2E2E2',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5,
              }}
              leftIcon={images.search}
              placeholder={'Search “Sweets”'}
              placeholderTextColor={'#C8C8C8'}
            />
          </TouchableOpacity>


          <View>
            <Spacer height={hp(3)} />

            <FlatList
              data={categories.length > 0 ? categories?.slice(0, 8) : []}
              contentContainerStyle={{ marginHorizontal: widthPercentageToDP(5) }}
              ItemSeparatorComponent={() => <Spacer height={hp(0.5)} />}
              numColumns={4}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.skeletonWrapper}>
                    {/* Rendering 8 skeleton items to match the grid structure */}
                    {Array.from({ length: 8 }).map((_, index) => (
                      <SkeletonPlaceholder key={index}>
                        <View style={styles.skeletonContainer}>
                          <View style={styles.skeletonImage} />
                          {/* <View style={styles.skeletonText} /> */}
                        </View>
                      </SkeletonPlaceholder>
                    ))}
                  </View>
                )
              }}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{ borderRadius: 8 }}
                    onPress={() => props.navigation.navigate('homestack', {
                      screen: 'CategoryDetail',
                      params: {
                        item,
                      },
                    })}>
                    <ImageBackground
                      // onProgress={() => setIsVisible(!isVisible)}
                      source={images.categoryBg}
                      onPress={() => onPress(item)}
                      style={{
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: hp(1),
                        width: wp(21),
                        height: hp(10.94),
                        backgroundColor: Colors.whitecolor,
                        marginLeft: index % 4 !== 0 ? 4 : 0,
                      }}>
                      <Spacer height={heightPercentageToDP(0.5)} />
                      <Text
                        onPress={() => props.navigation.navigate('homestack', {
                          screen: 'CategoryDetail',
                          params: {
                            item,
                          },
                        })}
                        style={styles.nameStyle}>
                        {item?.name.split(' ')[0]}
                      </Text>
                      <Spacer height={heightPercentageToDP(0.5)} />
                      <Image
                        source={{ uri: item?.imageUrl }}
                        style={styles.imageStyle}
                      />
                    </ImageBackground>
                  </TouchableOpacity>
                );
              }}
            />
            <Spacer height={hp(1)} />
            <TouchableOpacity
              onPress={() => setIsVisible(!isVisible)}
              style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ ...styles.exclusiveofer2 }}>View All Categories</Text>
              <Image
                source={images.arrowdown}
                style={{ height: 18, width: 18, tintColor: Colors.whitecolor }}
              />
            </TouchableOpacity>
            <Spacer />
            <Spacer height={Platform.OS == 'ios' ? hp(3) : hp(5)} />

            <View style={{ marginHorizontal: hp(2) }}>
              {
                (Banners && Banners?.length > 0) ?
                  <View
                    style={{
                      borderWidth: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Carousel
                      loop
                      width={wp(100)}
                      height={hp(30)}
                      autoPlay
                      autoPlayInterval={6000}
                      data={Banners}
                      scrollAnimationDuration={1000}
                      onSnapToItem={(index) => setCurrentIndex(index)}
                      renderItem={_renderItem}
                      pagingEnabled={true}
                      mode="parallax"
                      modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                        parallaxAdjacentItemScale: 0.8,
                      }}
                    />

                    <Spacer height={hp(1)} />
                    {/* <View style={{ flexDirection: 'row'}}>
                    {Banners.map((_, index) => (
                      <View
                        key={index}
                        style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: currentIndex === index ? Colors.BtnBackground : Colors.placeholder,marginLeft:5 }}
                      />
                    ))}
                  </View> */}
                  </View> :
                  // null
                  // <SkeletonPlaceholder >
                  //   <View style={styles.skeletonContainerAd}>
                  //     <View style={styles.skeletonImageAd} />
                  //     {/* <View style={styles.skeletonText} /> */}
                  //   </View>
                  // </SkeletonPlaceholder>

                  null
              }

              <Text style={{ ...styles.exclusiveofer }}>Featured Brands</Text>
              <Spacer />

              <FlatList
                data={fetureBrand ? fetureBrand?.slice(0, 9) : []}
                keyExtractor={(item, index) => index.toString()}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginTop: hp(0.5),
                }}
                ListEmptyComponent={() => {
                  return (
                    <View style={styles.skeletonWrapper}>
                      {/* Rendering 8 skeleton items to match the grid structure */}
                      {Array.from({ length: 9 }).map((_, index) => (
                        <SkeletonPlaceholder key={index}>
                          <View style={styles.skeletonContainerFeatured}>
                            <View style={styles.skeletonImageFeatured} />
                            {/* <View style={styles.skeletonText} /> */}
                          </View>
                        </SkeletonPlaceholder>
                      ))}
                    </View>
                  )
                }}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={renderBrand}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Add spacing of 10 units between items
              />
              <Spacer />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => props.navigation.navigate('FutureBrands')}
                style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ ...styles.exclusiveofer1 }}>View All</Text>
                <Image
                  source={images.arrowdown}
                  style={{ height: 18, width: 18, tintColor: Colors.Primary }}
                />
              </TouchableOpacity>
            </View>

            <Spacer height={hp(1)} />

            <View>
              {relatedItem && (
                <View >
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginHorizontal: wp(5),
                    }}>
                    <Text style={{ ...styles.exclusiveofer }}>Order Again</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        onPress={() => props.navigation.navigate('OrderHistory')}
                        style={{ ...styles.exclusiveofer1 }}>
                        View All
                      </Text>
                      <Image
                        source={images.leftArrow}
                        style={{ height: 18, width: 18, tintColor: Colors.Primary }}
                      />
                    </View>

                  </View>
                  <View style={{ marginHorizontal: wp(5) }}>
                    <FlatList
                      data={relatedItem}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal={true}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      // renderItem={renderItem}
                      ItemSeparatorComponent={() => <HorizontalSpacer />}
                      renderItem={({ item, index }) => {
                        return (
                          <RenderSearchitem
                            handleToggleHeart={() => handleToggleHeart(item)}
                            heartPressed={heartPressed[item.id]}
                            onPressMinus={() => onPressMinus(item)}
                            // onPressPlus={() => cart?.find(i => i?.Productid == item?.id).quantity < (item?.quantity - Number(item.outOfStockThreshold)) ? onPressPlus(item) : Toast.show(`The Product Quantity is only ${(item?.quantity - Number(item.outOfStockThreshold))}`)}

                            // ----------------------NEW-CODE----------------------
                            onPressPlus={() => {
                              const foundItem = cart?.find(i => i?.Productid === item?.id);

                              if (foundItem) {
                                Toast.show('Added successfully')
                              }

                              if (foundItem?.quantity < (item?.quantity - Number(item.outOfStockThreshold))) {
                                onPressPlus(item);
                                // Log the AddToCart event to Facebook Pixel

                                // try {
                                //   AppEventsLogger.logEvent('Add to cart', {
                                //     content_type: 'product',
                                //     content_id: item?.id.toString(),
                                //     currency: 'PKR', // Adjust the currency if needed
                                //     value: item?.price, // Assuming price is in the same currency
                                //   });
                                // } catch (error) {
                                //   console.log('Add to cart event not generated', error);
                                // }
                              } else {
                                Toast.show(`The Product Quantity is only ${(item?.quantity - Number(item.outOfStockThreshold))}`);
                              }
                            }}
                            // ----------------------NEW-CODE----------------------

                            count={
                              cart?.find(i => i?.Productid == item?.id)
                                ?.quantity
                            }
                            onPressAdd={() => {
                              Toast.show('Added Successfully')
                              onPressPlus(item),
                                cart.find(i => i?.quantity == item?.id) ? Toast.show('Added successfully') : null
                            }}
                            setCart
                            isCart={
                              cart?.find(i => i?.Productid == item?.id)
                                ?.quantity > 0
                                ? true
                                : false
                            }
                            item={item}
                            onPress={() =>
                              props.navigation.navigate('ShowItems', {
                                data: item.id,
                              })
                            }
                          />
                        );
                      }}

                    />
                  </View>

                </View>

              )}

            </View>


            {
              topSaver?.length ?
                <>
                  <Spacer />
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      marginHorizontal: wp(5),
                    }}>
                    <Text style={{ ...styles.exclusiveofer }}>Top Saver</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        onPress={() => props.navigation.navigate('TopSaverDetails')}
                        style={{ ...styles.exclusiveofer1 }}>
                        View All
                      </Text>
                      <Image
                        source={images.leftArrow}
                        style={{ height: 18, width: 18, tintColor: Colors.Primary }}
                      />
                    </View>
                  </View>
                  <Spacer />
                  <View style={{ marginHorizontal: wp(5) }}>
                    <FlatList
                      data={topSaver ?? []}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal={true}
                      // contentContainerStyle={{ paddingHorizontal: wp(5) }}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({ item, index }) => {
                        return (
                          <RenderTopSaver
                            onPressMinus={() => onPressMinus(item?.product)}
                            onPressPlus={() => onPressPlus(item?.product)}
                            count={
                              cart?.find(i => i?.Productid == item?.product?.id)
                                ?.quantity ?? 0
                            }
                            onPressAdd={() => {
                              onPressPlus(item?.product),
                                cart.find(i => i?.quantity == item?.id) ? Toast.show('Added successfully') : null
                            }}
                            setCart
                            isCart={
                              cart?.find(i => i?.Productid == item?.product?.id)
                                ?.quantity > 0
                                ? true
                                : false
                            }
                            item={item}
                            onPress={() =>
                              props.navigation.navigate('ShowItems', {
                                data: item?.product?.id,
                              })
                            }
                          />
                        );
                      }}
                      ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Add spacing of 10 units between items
                    />
                  </View>
                  <Spacer />
                </> : null
            }

            {categories?.length &&
              categories?.map(i => {
                return (
                  <View>
                    <Spacer />
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginHorizontal: wp(5),
                      }}>
                      <Text style={{ ...styles.exclusiveofer }}>{i?.name}</Text>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          onPress={() =>
                            props.navigation.navigate('CategoryDetail', {
                              item: i,
                            })
                          }
                          style={{ ...styles.exclusiveofer1 }}>
                          View All
                        </Text>
                        <Image
                          source={images.leftArrow}
                          style={{
                            height: 18,
                            width: 18,
                            tintColor: Colors.Primary,
                          }}
                        />
                      </View>
                    </View>
                    <View style={{ marginHorizontal: hp(2) }}>
                      <Spacer />
                      <FlatList
                        data={i?.allProducts ? i?.allProducts : []}
                        // data={[]}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        ListEmptyComponent={() => {
                          return (
                            <View style={styles.skeletonWrapper}>
                              {/* Rendering 8 skeleton items to match the grid structure */}
                              {Array.from({ length: 3 }).map((_, index) => (
                                <SkeletonPlaceholder key={index}>
                                  <View style={styles.skeletonContainerProducts}>
                                    <View style={styles.skeletonImageProducts} />
                                    {/* <View style={styles.skeletonText} /> */}
                                  </View>
                                </SkeletonPlaceholder>
                              ))}
                            </View>
                          )
                        }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {

                          return (
                            <RenderSearchitem
                              handleToggleHeart={() => handleToggleHeart(item)}
                              heartPressed={heartPressed[item.id]}
                              onPressMinus={() => onPressMinus(item)}
                              // onPressPlus={() => cart?.find(i => i?.Productid == item?.id).quantity < (item?.quantity - Number(item.outOfStockThreshold)) ? onPressPlus(item) : Toast.show(`The Product Quantity is only ${(item?.quantity - Number(item.outOfStockThreshold))}`)}

                              // ----------------------NEW-CODE----------------------
                              onPressPlus={() => {
                                const foundItem = cart?.find(i => i?.Productid === item?.id);

                                if (foundItem) {
                                  if (foundItem?.quantity < (item?.quantity - Number(item.outOfStockThreshold))) {
                                    onPressPlus(item);
                                    Toast.show('Added successfully')

                                    // Log the AddToCart event to Facebook Pixel

                                    // try {
                                    //   AppEventsLogger.logEvent('Add to cart', {
                                    //     content_type: 'product',
                                    //     content_id: item?.id.toString(),
                                    //     currency: 'PKR', // Adjust the currency if needed
                                    //     value: item?.price, // Assuming price is in the same currency
                                    //   });
                                    // } catch (error) {
                                    //   console.log('Add to cart event not generated', error);
                                    // }
                                  } else {
                                    Toast.show(`The Product Quantity is only ${(item?.quantity - Number(item.outOfStockThreshold))}`);
                                  }
                                }


                              }}
                              // ----------------------NEW-CODE----------------------

                              count={
                                cart?.find(i => i?.Productid == item?.id)
                                  ?.quantity
                              }
                              onPressAdd={() => {
                                Toast.show('Added Successfully')
                                onPressPlus(item),
                                  cart.find(i => i?.quantity == item?.id) ? Toast.show('Added successfully') : null
                              }}
                              setCart
                              isCart={
                                cart?.find(i => i?.Productid == item?.id)
                                  ?.quantity > 0
                                  ? true
                                  : false
                              }
                              item={item}
                              onPress={() =>
                                props.navigation.navigate('ShowItems', {
                                  data: item.id,
                                })
                              }
                            />
                          );
                        }}
                        ItemSeparatorComponent={() => (
                          <View style={{ width: 10 }} />
                        )} // Add spacing of 10 units between items
                      />
                    </View>
                  </View>
                );
              })}
            <Spacer />

            <Spacer height={hp(4)} />
          </View>
        </ScrollView>
        {
          isVisible ?
            <CategoryModal
              backdropOpacity={0.7}
              isModalVisible={isVisible}
              setIsModalVisible={setIsVisible}
              data={categories}
              onPress={item => {
                setIsVisible(false),
                  props.navigation.navigate('homestack', {
                    screen: 'CategoryDetail',
                    params: {
                      item,
                    },
                  });
              }}
            /> : null
        }

        {
          isMystryShow ?
            <View style={styles.mainMystryWrapper}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => setMistryDetials(!mistryDetail)} style={styles.mainMystry}>
                <Progress.Circle progress={Math.min(Number(TotalPrice) / Number(mystryLimit), 1)} size={93} unfilledColor='#C3EDFF' color='#009DE0' borderWidth={0} thickness={5} />
                <Image source={images.mystryBox} style={{ height: 60, width: 60, position: 'absolute', top: 10, bottom: 10, left: 20, right: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} />
              </TouchableOpacity>
              {
                mistryDetail ?
                  <Animatable.View animation={'fadeInLeft'} duration={700} easing={'ease'} style={styles.mystryhorizontal}>
                    <Text style={styles.mystryupperText}>Order up to  RS {mystryLimit} &</Text>
                    <Text style={styles.mystryTextMain}>Win a Mystery Box</Text>
                  </Animatable.View> :
                  <Animatable.View animation={'bounceOutLeft'} duration={700} easing={'ease'} style={styles.mystryhorizontal}>
                    <Text style={styles.mystryupperText}>Order up to  RS {mystryLimit} &</Text>
                    <Text style={styles.mystryTextMain}>Win a Mystery Box</Text>
                  </Animatable.View>
              }
              <TouchableOpacity style={{ position: 'absolute', zIndex: 999999, top: 10, left: 0 }} activeOpacity={0.9} onPress={() => setIsMystryShow(!isMystryShow)}>
                <Image source={images.crossButton} style={{ width: 20, height: 20, }} />
              </TouchableOpacity>

            </View> : null
        }


      </>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = state => {
  return {
    userData: state.userdataReducer.userData,
  };
};
export default connect(mapStateToProps, null)(Home);
const styles = StyleSheet.create({
  mystryTextMain: {
    fontSize: 22,
    // fontWeight: '600',
    color: "#009DE0",
    fontFamily: fonts.PoppinsSemiBold
  },
  mystryupperText: {
    fontSize: 10,
    // fontWeight: '400'
    fontFamily: fonts.PoppinsRegular,
    color: Colors.black

  },
  mystryhorizontal: {
    width: 285,
    height: 54,
    backgroundColor: '#C3EDFF',
    borderRadius: 14,
    marginLeft: -45,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingStart: 55
  },
  mainMystry: {
    width: 93,
    height: 93,
    zIndex: 999,
    backgroundColor: "#C3EDFF",
    // position: 'absolute',
    // top: hp(60),
    // left: wp(5),
    borderRadius: 1000
  },
  mainMystryWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: hp(60),
    left: wp(5),

  },
  skeletonContainerProducts: {
    width: wp(44),  // Adjust width based on your design
    height: hp(30),  // Adjust height based on your design
    borderRadius: 10,  // Give a border radius to match the design
    marginHorizontal: wp(1),  // Add horizontal margin to space items
  },
  skeletonImageProducts: {
    width: '100%',  // Full width for the image placeholder
    height: '100%',  // Full height for the image placeholder
    borderRadius: 10,  // Match the border radius for a rounded effect
  },
  skeletonContainerAd: {
    width: wp(90),
    height: hp(30.68),
    marginStart: wp(5),
    borderRadius: 15,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center'
    // Add horizontal margin to space items
  },
  skeletonImageAd: {
    width: '100%',  // Full width for the image placeholder
    height: '100%',  // Full height for the image placeholder
    borderRadius: 10,  // Match the border radius for a rounded effect
  },
  skeletonWrapper: {
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
    backgroundColor: Colors.whitecolor,
    // marginLeft: 4,
  },
  skeletonImage: {
    width: wp(21),
    height: hp(10),
    borderRadius: 8,
  },
  skeletonImageFeatured: {
    marginBottom: wp(1),
    borderRadius: 8,
    width: wp(29.5),
    height: wp(30),
    borderRadius: 8,
  },
  skeletonText: {
    marginTop: 5,
    width: wp(12),
    height: hp(1.5),
    borderRadius: 4,
  },
  imageWrapper: {
    width: wp(14.88),
    height: wp(14.88),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whitecolor,
    borderRadius: 5.8,
  },
  bestSellersImage: {
    width: wp(12.88),
    height: wp(12.88),
    resizeMode: 'contain',
  },
  sellerMainStyle: {
    padding: wp(2),
    borderWidth: 1,
    borderColor: Colors.smallbtnbgcolor,
    borderRadius: 12,
  },

  imageStyle: {
    padding: 10,
    height: widthPercentageToDP(16.97),
    width: widthPercentageToDP(16.97),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  item: {
    // padding: 10,
    fontSize: 18,
    // height: 44,
    // marginHorizontal: wp(5)
    // Other styles as needed
  },
  nameStyle: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.balckText,
  },

  homeBackgroundStyle: {
    width: wp(100),
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // borderRadius: 40,
    position: 'absolute',
    // resizeMode: 'repeat',
    height:
      Platform.OS == 'ios'
        ? heightPercentageToDP(51)
        : heightPercentageToDP(47),

  },

  msgtxt: {
    color: Colors.secondaryColor,
    fontFamily: fonts.PoppinsRegular,
    marginTop: hp('0.3%'),
  },
  nametxt: {
    fontWeight: '600',
    fontSize: 25,
    color: Colors.whitecolor,
    fontFamily: fonts.PoppinsRegular,
  },
  exclusiveofer: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
  },
  exclusiveofer1: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.Primary,
    fontFamily: fonts.PoppinsRegular,
  },
  exclusiveofer2: {
    fontSize: 14,
    // fontWeight: '500',
    color: Colors.whitecolor,
    fontFamily: fonts.PoppinsMedium,
  },

  ScrollViewText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#264653',
    fontFamily: fonts.PoppinsRegular,
  },

  ScrollViewbell: {
    marginTop: heightPercentageToDP(2.5),
    backgroundColor: Colors.whitecolor,
    borderRadius: 10,
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0,
  },
  Scrollimg: {
    height: 24,
    width: 24,
    tintColor: Colors.Primary,
  },
  banner: {
    width: wp(90),
    height: hp(30.68),
    borderRadius: 15,
    resizeMode: 'contain',
  },
  viewmain: {
    paddingTop: heightPercentageToDP(2),
    borderWidth: 0,
    borderColor: 'red',
    width: Platform.OS === 'ios' ? wp(77) : wp(78),
  },

  brandtitle: {
    color: '#828282',
    fontSize: 12,
    fontFamily: fonts.PoppinsRegular,
    marginTop: hp(2),
  },
  brandsubtitle: {
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
    fontWeight: '600',
  },
});
