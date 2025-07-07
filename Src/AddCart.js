import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { images, fonts, Colors, Header } from './Components/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { connect, useSelector } from 'react-redux';
import { AddtoCart } from './Redux/Actions/Actions';
import { openDatabase } from 'react-native-sqlite-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { newEvents } from './Components/CustomListner';
import Toast from 'react-native-simple-toast';
import { AppEventsLogger } from 'react-native-fbsdk';
import RBSheet from 'react-native-raw-bottom-sheet';
import Spacer, { HorizontalSpacer } from './Components/Spacer';
import * as Progress from 'react-native-progress';
import { _axiosGetAPI, _AxiosGetBearer, _axiosMysteryBoxId, _axiosPostAPI } from './Apis/Apis';
import { relatedProduct } from './Constant/dummyData';
import { RenderRelatedProduct, RenderSearchitem } from './Screens/BesSellerDetails/components';
import { DeleteAccountModal } from './Components/Modal';
import { RenderDeliveryComponent, RenderPickupComponent, RenderSchedluedDeliveryComponent } from './Screens/Cart/Component/Index';
import moment from 'moment';
import { daysData, timeArray } from './Constant/Time';
import useCart from './Screens/Cart/Hooks/Index';
import { DeleteCartData, getcartData, UpdateCartData } from './Helperfunctions';
import { addTOcart } from './Components/Additemstocart';


const AddCart = props => {

  const refRBSheet = useRef()
  const bottomSheetRef = useRef()
  const flatListRef = useRef();
  const flatListTimeRef = useRef();
  const navigation = useNavigation()


  const db = openDatabase(
    { name: 'Grocery.db', createFromLocation: 1 },
    successCB,
    errorCB,
    openCB,
  );
  const IsfirstInstall = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });
  const myadres = useSelector(response => {
    return response?.userdataReducer?.selectedAddress;
  });
  const userToken = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });
  const errorCB = err => {
    console.log('SQL Error: ' + err);
  };

  const successCB = () => {
    console.log('SQL executed fine');
  };
  const openCB = () => {
    console.log('Database OPENED');
  };
  const [CartData, setCartData] = useState([]);
  const [TotalPrice, setTotalPrice] = useState([]);
  const [isMystryShow, setIsMystryShow] = useState(false)
  const [mystryLimit, setMystryLimit] = useState(0)
  const [cart, setCart] = useState([])
  const [count, setcount] = useState(1);
  const [showModal, setShowModal] = useState(false)
  const [selectedBottomSheetToggle, setSelectedBottomSheetToggle] = useState('Delivery')
  const [selectedAddress, setselectedAddress] = useState(myadres);
  const [isOn, setIsOn] = useState(false);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("")
  const [selectedDeliveryDay, setSelectedDeliveryDay] = useState("")
  const [focus, setFocus] = useState(false)
  const [slot, setSlot] = useState([])
  const [selectedDayIndex, setSelectedDayIndex] = useState(1);
  const [selectedDayItem, setSelectedDayItem] = useState(daysData[1]);

  const [selectedTimeIndex, setSelectedTimeIndex] = useState(1);
  const [selectedTimeItem, setSelectedTimeItem] = useState();
  const [DeliveryType, setDeliveryType] = useState('Delivery');
  const [snacksRelatedProduct, setSnacksRelatedProduct] = useState([])
  const [heartPressed, setHeartPressed] = useState({});
  const [errorMessage, seterrorMessage] = useState("")
  const [showCalender,setShowCalender]=useState(false)
  const [selectedDate,setSelectedDate]=useState("")
  const [selected, setSelected] = useState('');



  useEffect(() => {
  if (daysData.length > 0 && selectedDayIndex !== null && flatListRef.current) {
    flatListRef.current.scrollToIndex({
      index: selectedDayIndex,
      animated: true,
      viewPosition: 0.5, // Center the selected item
    });
  }
}, []);

// Component for time selection
useEffect(() => {
  if (slot.length > 0 && selectedTimeIndex !== null && flatListTimeRef.current) {
    flatListTimeRef.current.scrollToIndex({
      index: selectedTimeIndex,
      animated: true,
      viewPosition: 0.5, // Center the selected item
    });
  }
}, []);


  const onScrollEndDay = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / hp(6)); // each item is hp(6) tall
    setSelectedDayIndex(index);
    setSelectedDayItem(daysData[index]);
  };

  const onScrollEndTime = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / hp(6));
    const item = slot[index];
    console.log("item", item)
    setSelectedTimeIndex(index);
    setSelectedTimeItem(item); // ✅ store actual time
  };

  useEffect(() => {
      setSelected(new Date().toISOString().split('T')[0])
  
    }, [])







  useEffect(() => {
    if (userToken) {
      _AxiosGetBearer("discounts/mystery/box", userToken)
        .then(res => {
          const mysteryBox = res?.data?.[0];
          if (mysteryBox) {
            setIsMystryShow(mysteryBox.isPublish);
            setMystryLimit(mysteryBox.cap)

          }
        })
        .catch(error => {
          console.log("❌ GET error", error);
        });
    }
  }, [userToken]);

  useEffect(() => {
    setselectedAddress(myadres)
  }, [myadres])


  useFocusEffect(
    React.useCallback(() => {
      const handler = () => {
        gettingCardData();
      };

      newEvents.addListener('addCart', handler); // ✅ Add listener on focus
      gettingCardData(); // also load on screen open

      return () => {
        newEvents.removeListener('addCart', handler); // 🧹 Clean up on unfocus
      };
    }, [])
  );




  // ----------------------View Content----------------------
  // useEffect(() => {
  //   AppEventsLogger.logEvent('View content', {
  //     pageName: 'AddCart',
  //   });
  // })


  const handleCheckoutSchedulePress = () => {
    if (!selectedDeliveryTime || !selected) {
      seterrorMessage("Please Select Time or Date")
      return

    }
    seterrorMessage("")
    bottomSheetRef?.current?.close();

    setTimeout(() => {
      props.navigation.navigate(
        IsfirstInstall ? 'Checkout' : 'Login',
        {
          deliveryOption: "Delivery",
          deliveryTime: {
            selectedTimeItem: selectedDeliveryTime,
            selectedDayItem: selected
          }
        }
      );
      console.log("Cart is not empty, checkout initiated");
    }, 200); // ⏳ delay allows smooth bottom sheet close
  }
   const handleCheckoutDeliveryPress = () => {
   
    seterrorMessage("")
    bottomSheetRef?.current?.close();

    setTimeout(() => {
      props.navigation.navigate(
        IsfirstInstall ? 'Checkout' : 'Login',
        {
          deliveryOption: "Delivery",
          deliveryTime: {
            selectedTimeItem: null,
            selectedDayItem: null
          }
        }
      );
    }, 200); // ⏳ delay allows smooth bottom sheet close
  }


  const handlePickUpCheckoutPress = () => {
    if (!selectedDayItem || !selectedTimeItem) {
      seterrorMessage("Please select date and time");
      return;
    }
    console.log(selectedDayItem,selectedTimeIndex)

    seterrorMessage("");

    bottomSheetRef?.current?.close();

    setTimeout(() => {
      props.navigation.navigate(
        IsfirstInstall ? 'Checkout' : 'Login',
        {
          deliveryOption: "pickup",
          deliveryTime: {
            selectedDayItem: selectedDayItem.key,
            selectedTimeItem: selectedTimeItem.label
          }
        }
      );
      console.log("Cart is not empty, pickup checkout initiated");
    }, 200);
  };



  useEffect(() => {
    getSnacksRelatedProduct()
  }, [])

  const getSnacksRelatedProduct = async () => {
    try {
      const response = await _axiosGetAPI(`store/products?offset=1&limit=20&categoryName=${encodeURIComponent("Breakfast & Bakery")}&filter=isPublish=eq:true`, null, IsfirstInstall);
      console.log("Related Products Response:", response);
      const product = response.data.data.products
      console.log("Related Products:", product);
      setSnacksRelatedProduct(product);
      const initialHeartState = {};
      product.forEach(p => {
        initialHeartState[p.id] = p.favourite;
      });
      setHeartPressed(initialHeartState);

    } catch (error) {
      console.log("Error fetching related products:", error);
    }
  }



  // const getcartData = () => {
  //   try {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         'SELECT * FROM cartTable',
  //         [],
  //         (tx, results) => {
  //           const data = [];
  //           let total = 0;
  //           for (let i = 0; i < results.rows.length; i++) {
  //             const item = results.rows.item(i);
  //             data.push(item);
  //             // console.log(item, 'itemitem');
  //             total += item.Price * item.quantity;
  //           }
  //           console.log("cartData", data)
  //           setCartData(data);
  //           setTotalPrice(total);
  //         },
  //         error => {
  //           console.log('Error fetching data in checkout from cartTable', error);
  //         },
  //       );
  //     });
  //   } catch (error) {
  //     console.log('Error in transaction', error);
  //   }
  // };


  const onPressPlus = async (item) => {
    console.log('itemitemitemitem', item, "cart", cart);

    const cartCopy = [...cart];
    const filter = cartCopy.filter(i => i?.Productid !== item?.id);
    console.log('filter', filter);
    const find = cartCopy.find(i => i?.Productid === item?.id);
    console.log('find', find);

    if (find) {
      find.quantity += 1;
      filter.push(find);
      setCart(filter);
    }
    const finalPrice =
      item?.discountedPrice &&
        !(Array.isArray(item.discountedPrice) && item.discountedPrice.length === 0)
        ? item.discountedPrice
        : item?.price;


    try {
      await addTOcart(
        item?.id,
        item?.imageUrl,
        item?.name,
        1,
        finalPrice,
        item?.quantity - Number(item?.outOfStockThreshold),
      );
      gettingCardData()
      getcartDataPrice(); // ✅ Now runs only after insert/update is finished
    } catch (error) {
      Toast.show('Error adding item to cart');
      console.log('addTOcart error:', error);
    }
  };


  const getcartDataPrice = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM cartTable',
          [],
          (tx, results) => {
            const data = [];
            let total = 0;
            for (let i = 0; i < results.rows.length; i++) {
              const item = results.rows.item(i);
              data.push(item);
              // console.log(item, 'itemitem');
              total += item.Price * item.quantity;
            }

            setTotalPrice(total);
          },
          error => {
            console.log('Error fetching data from cartTable', error);
          },
        );
      });
    } catch (error) {
      console.log('Error in transaction', error);
    }
  };

  const onPressMinus = async (item) => {
    console.log('cartcart', cart);
    let finditem = await cart?.find(i => i?.Productid == item?.id)
    console.log("finditem", finditem?.quantity - 1, finditem)
    if (finditem?.quantity > 1) {
      await UpdateCartData(finditem?.quantity - 1, finditem?.id, data => {
        console.log("call back", data)
        setCart(data)
        Toast.show('Remove successfully')
        getcartDataPrice()
      })
    } else {
      let deleteCartItem = await cart?.filter(i => i?.Productid !== item?.id)
      setCart(deleteCartItem)
      DeleteCartData(finditem?.id)
      Toast.show('Remove successfully')
      getcartDataPrice()
    }

  }

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



  // const updateCartItemQuantity = (id, quantity) => {
  //   try {
  //     db.transaction(tx => {
  //       tx.executeSql(
  //         'UPDATE cartTable SET quantity = ? WHERE id = ?',
  //         [quantity, id],
  //         (tx, results) => {
  //           console.log('Quantity updated successfully');
  //           getcartData();
  //           // Do something else after updating the quantity
  //         },
  //         error => {
  //           console.log('Error updating quantity', error);
  //         },
  //       );
  //     });
  //   } catch (error) {
  //     console.log('Error in transaction', error);
  //   }
  // };


  const updateCartItemQuantity = (id, quantity) => {
    // ----------------------NEW-CODE----------------------
    try {

      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE cartTable SET quantity = ? WHERE id = ?',
          [quantity, id],
          (tx, results) => {
            gettingCardData();

            // Determine if the quantity was increased or decreased
            if (quantity > (CartData.find(item => item.id === id)?.quantity || 0)) {
              Toast.show('Added successfully')
            } else if (quantity < (CartData.find(item => item.id === id)?.quantity || 0)) {
              Toast.show('Remove successfully');
            }

            // Log the AddToCart event only when adding an item to the cart (incrementing the quantity)
            if (quantity > 1) {
              const addedItem = CartData.find(item => item.id === id);

              // AppEventsLogger.logEvent('Add to cart', {
              //   productName: 'apple',
              //   content_id: item?.id.toString(),
              //   currency: 'PKR', // Adjust the currency if needed
              //   value: item?.price, // Assuming price is in the same currency
              // });

            }
            // Do something else after updating the quantity
          },
          (error) => {
            console.log('Error updating quantity', error);
          }
        );
      });
    } catch (error) {
      console.log('Error in transaction', error);
    }
    // ----------------------NEW-CODE----------------------
  }

  const getFilteredTimeArray = () => {
    const now = moment();

    const today = moment().format('YYYY-MM-DD');

    const filtered = timeArray.filter(item => {
      const fullTimeStr = `${today} ${item.value}`;
      const fullTime = moment(fullTimeStr, 'YYYY-MM-DD hh:mm A');
      return fullTime.isAfter(now);
    });
    console.log(filtered[2],"filtered")
    setSlot(filtered);
  };

  useEffect(() => {
    getFilteredTimeArray();
  }, []);

  const deleteCartItem = id => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM cartTable WHERE id = ?',
          [id],
          (tx, results) => {
            // Do something else after deleting the row
            gettingCardData();
            newEvents.emit('addCart', 'addCart');
            if (CartData.length == 1) {
              props.navigation.navigate('BottomTab', {
                screen: 'Home',
              });
            }
          },
          error => {
            console.log('Error deleting row', error);
          },
        );
      });
    } catch (error) {
      console.log('Error in transaction', error);
    }
  };

  const onPressDeleteCart = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM cartTable',  // Delete all rows
          [],
          (tx, results) => {
            // Do something after deleting all rows
            gettingCardData(); // Update the cart data
            newEvents.emit('addCart', 'addCart');
            setTimeout(() => {
              refRBSheet?.current?.close()
            }, 500);

            // props.navigation.navigate('BottomTab', {
            //   screen: 'Home',
            // });
          },
          error => {
            console.log('Error deleting all rows', error);
          }
        );
      });
    } catch (error) {
      console.log('Error in transaction', error);
    }
  }



  const gettingCardData = () => {
    getcartData(data => {
      console.log("cart data in useEffect", data);

      // ✅ Update state
      setcount(data.length);
      setCart(data);

      // ✅ Calculate total price from all cart items
      const total = data.reduce((sum, item) => {
        return sum + (item.Price * item.quantity);
      }, 0);

      console.log("Total price:", total);


      // If you have a totalPrice state:
      setTotalPrice(total);
    });
  };


  const onPressDeliverAddress = () => {
    bottomSheetRef?.current?.close();

    setTimeout(() => {
      props.navigation.navigate(
        'Address', {
        confirmbtn: true,
        setselectedAddress,
      })
    }, 200);


  }
  // console.log("parseInt(Number(TotalPrice) / 10000)", parseFloat(Number(TotalPrice) / {mystryLimit}0))
  const renderCart = ({ item, index }) => {
    return (
      <View
        style={{
          borderColor: 'blue',
          borderWidth: 0,
          marginHorizontal: wp(1),
          marginTop: hp('2%'),
          paddingHorizontal: wp(1),
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              borderWidth: 0,
              justifyContent: 'center',
            }}>
            <FastImage
              style={styles.capsicum}
              source={{
                uri: item?.ImageUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp(73) }}>
            <View
              style={{
                borderWidth: 0,

                // width: wp(60),
                // backgroundColor: 'green',
                paddingHorizontal: hp('1%'),
                justifyContent: 'center',
              }}>
              <View style={{ borderWidth: 0 }}>
                <Text
                  style={{
                    width: wp(55),
                    fontWeight: '500',
                    fontSize: 16,
                    color: Colors.balckText,
                    fontFamily: fonts.PoppinsRegular,
                  }}>
                  {item.ProductName}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 0,
                  flexDirection: 'row',
                  marginTop: hp('2%'),

                }}>
                <TouchableOpacity
                  disabled={item?.quantity == 1}
                  style={styles.touchadd}
                  onPress={() => {
                    updateCartItemQuantity(item.id, item?.quantity - 1)
                  }
                  }>
                  <Image
                    source={images.minus}
                    style={{ height: hp('2'), width: wp('2%') }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: wp(8),
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Colors.balckText,
                      fontFamily: fonts.PoppinsRegular,
                    }}>
                    {item?.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.touchleft}
                  onPress={() => {

                    Number(item.TotalQuantity) > item?.quantity ?
                      updateCartItemQuantity(item.id, item?.quantity + 1) : Toast.show('This Product have no more items')
                  }
                  }>
                  <Image
                    source={images.add}
                    style={{
                      height: hp('2'),
                      width: wp('2%'),
                      tintColor: Colors.BtnBackground,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                borderColor: 'red',
                borderWidth: 0,
                // marginLeft: wp(0),
                // backgroundColor: 'red'

              }}>
              <TouchableOpacity
                onPress={() => deleteCartItem(item.id)}
                style={{
                  borderColor: 'red',
                  borderWidth: 0,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: hp('5%'),
                }}>
                <Image
                  source={images.crossicon}
                  style={{ height: hp('2.5%'), width: wp('4%') }}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderColor: 'red',
                  borderWidth: 0,
                  // height: hp('6%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'red'
                }}>
                <Text
                  style={{
                    color: Colors.BtnBackground,
                    fontFamily: fonts.PoppinsSemiBold,
                    // fontWeight: '600',
                    marginTop: hp('1%'),
                    lineHeight: 16,
                    // marginRight:hp
                  }}>
                  {'Rs.' + item.quantity * item.Price + ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ ...styles.sepreator, marginTop: hp(2) }}></View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <View
        style={{
          marginHorizontal: wp(2),
          marginTop: hp(Platform.OS == 'ios' ? 6 : 2),
        }}>
        <Header title={'My Cart'} onPress={() => props.navigation.goBack()} righticon={images.trash} onrightPress={() => {
          console.log('💡 Opening Bottom Sheet');
          if (refRBSheet?.current) {
            refRBSheet.current.open();
            console.log('💡 Opening Bottom Sheet', refRBSheet.current);

          }
        }}

        />
      </View>

      {cart.length > 0 ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(20) }} showsVerticalScrollIndicator={false}>
          <View>
            <Spacer height={hp(2)} />
            <View style={{ marginHorizontal: hp('1.5%') }}>
              <TouchableOpacity style={styles.esimatedBox}>
                <View style={styles.estimateInnerView}>
                  <Image source={images.bike} style={{ height: wp(20), width: wp(20), resizeMode: 'contain' }} />
                  <View style={{ justifyContent: "center", marginLeft: wp(3) }}>

                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('onlinePickUpDeliver', {
                          setDeliveryType,
                          DeliveryType,
                        })
                      }
                      }>
                      <Text style={styles.estimateTextButton}>{DeliveryType}</Text>

                    </TouchableOpacity>
                    <Text style={styles.estimateText}>Change</Text>

                  </View>
                </View>
              </TouchableOpacity>
              <Text style={styles.populeritem}>Related Products</Text>
              <Spacer height={hp(1)} />

              <FlatList
                data={snacksRelatedProduct}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                // renderItem={renderItem}
                ItemSeparatorComponent={() => <HorizontalSpacer />}
                renderItem={({ item, index }) => {
                  return (
                    <RenderRelatedProduct
                      handleToggleHeart={() => handleToggleHeart(item)}
                      heartPressed={heartPressed[item.id]}
                      onPressMinus={() => onPressMinus(item)}
                      onPressPlus={() => cart?.find(i => i?.Productid == item?.id).quantity < (item?.quantity - Number(item.outOfStockThreshold)) ?
                        onPressPlus(item) : Toast.show(`The Product Quantity is only ${item?.quantity - Number(item.outOfStockThreshold)}`)}
                      count={cart?.find(i => i?.Productid == item?.id)?.quantity}
                      onPressAdd={() => {
                        onPressPlus(item)
                      }}
                      setCart
                      isCart={cart?.find(i => i?.Productid == item?.id)?.quantity > 0 ? true : false}
                      item={item}
                      onPress={() =>
                        props.navigation.navigate('ShowItems', {
                          data: item.id,
                        })
                      }

                    />

                  )
                }}
              />
            </View>
            <View style={styles.sepreator}></View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={cart}
              renderItem={renderCart}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>

      ) : (
        <View
          style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.balckText,
              fontFamily: fonts.PoppinsRegular,
            }}>
            {'No item in cart.'}
          </Text>
        </View>
      )}




      {cart.length > 0 && (

        <View style={styles.botoomview}>
          {
            isMystryShow ?
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.mystryMain, { backgroundColor: parseFloat(TotalPrice) >= Number(mystryLimit) ? '#E8FFDF' : '#C3EDFF' }]}>
                  <Image source={images.mystryBox} style={{ height: wp(20), width: wp(20), marginVertical: hp(-3.5), marginHorizontal: wp(5) }} />
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={[styles.mystryupperText]}>Order up to  RS {mystryLimit} &</Text>
                    <Text style={[styles.mystryTextMain, { color: parseFloat(TotalPrice) >= Number(mystryLimit) ? '#6DBF4D' : '#009DE0' }]}>{parseFloat(TotalPrice) <= Number(mystryLimit) ? "Win a Mystery Box" : "Mystery Box Added"}</Text>
                  </View>

                </View>

                <Progress.Bar progress={Math.min(Number(TotalPrice) / Number(mystryLimit), 1)} color={parseFloat(TotalPrice) >= Number(mystryLimit) ? '#6DBF4D' : '#009DE0'} borderColor='#C3EDFF' borderWidth={0} width={wp(90)} style={{ marginTop: -15, }} />
                <Spacer />
              </View> : null
          }

          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                marginHorizontal: hp('2%'),
                justifyContent: 'center',
                borderWidth: 0,

                width: wp(39),
              }}>
              <Text
                style={{
                  color: Colors.balckText,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                Total
              </Text>
              {/* TODO: */}
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.BtnBackground,
                  fontFamily: fonts.PoppinsRegular,
                  fontWeight: '500',
                }}>
                Rs. {parseFloat(TotalPrice).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => bottomSheetRef?.current?.open()}
              style={styles.touchbtn}>
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.whitecolor,
                  fontSize: 18,
                  fontWeight: '500',
                }}>
                Go to checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}



      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        // height={hp(60)}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
          },
          draggableIcon: {
            backgroundColor: "#E4E4E4",
            width: wp('30%')

          },
          container: {
            // alignItems: 'center',
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}
      >
        <View style={{ paddingHorizontal: wp(5) }}>
          <Spacer />
          <Text style={styles.RBStitle}>Are you sure you want to empty your cart?</Text>
          <Spacer height={hp(5)} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

            <TouchableOpacity onPress={() => refRBSheet?.current?.close()} activeOpacity={0.9} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDeleteCart} activeOpacity={0.9} style={styles.deleteBtnn}>
              <Text style={styles.deleteText}>Yes i’m sure</Text>
            </TouchableOpacity>

          </View>

        </View>

      </RBSheet>

      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        dragFromTopOnly={true}
        height={hp(60)}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(52, 52, 52, 0.3)',
          },
          draggableIcon: {
            backgroundColor: "#E4E4E4",
            width: wp('30%')

          },
          container: {
            // alignItems: 'center',
            backgroundColor: '#fff',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          },
        }}
      >
        <View style={{ paddingHorizontal: wp(5) }}>
          <Spacer />
          {DeliveryType === "Delivery" ? (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp(90) }}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedBottomSheetToggle("Delivery")} style={{ borderBottomWidth: selectedBottomSheetToggle === "Delivery" ? 1 : 0, borderBottomColor: selectedBottomSheetToggle === "Delivery" ? Colors.halfBlack : 'transparent', width: wp(30), paddingBottom: hp(1) }} >
                <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 12, fontWeight: '500', color: Colors.halfBlack, textAlign: "center" }}>Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedBottomSheetToggle("Scheduled Delivery")} style={{ borderBottomWidth: selectedBottomSheetToggle === "Scheduled Delivery" ? 1 : 0, borderBottomColor: selectedBottomSheetToggle === "Scheduled Delivery" ? Colors.halfBlack : 'transparent', width: wp(30), paddingBottom: hp(1) }} >
                <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 12, fontWeight: '500', color: Colors.halfBlack, textAlign: "center" }} numberOfLines={1}>Scheduled Delivery</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity activeOpacity={0.9} onPress={() => setSelectedBottomSheetToggle("Pickup")} style={{ borderBottomWidth: 1, borderBottomColor: Colors.halfBlack, width: wp(50), paddingBottom: hp(1), alignSelf: "center" }} >
              <Text style={{ fontFamily: fonts.PoppinsRegular, fontSize: 12, fontWeight: '500', color: Colors.halfBlack, textAlign: "center" }}>Self Pick-Up</Text>
            </TouchableOpacity>
          )}

          {DeliveryType === "Delivery" ? (
            <>
              {selectedBottomSheetToggle == "Delivery" ? (
                <RenderDeliveryComponent seterrorMessage={seterrorMessage} errorMessage={errorMessage} checkOut={handleCheckoutDeliveryPress} data={slot} isFocus={focus} setisFocus={setFocus} selectedTime={selectedDeliveryTime} setSelectedTime={setSelectedDeliveryTime} isOn={isOn} setIsOn={setIsOn} onpress={onPressDeliverAddress} selectedAddress={selectedAddress} setselectedAddress={setselectedAddress} />

              ) : (
                <RenderSchedluedDeliveryComponent setShowCalendar={setShowCalender} shwCalendar={showCalender} selected={selected} setSelected={setSelected} seterrorMessage={seterrorMessage} errorMessage={errorMessage} checkOut={handleCheckoutSchedulePress} data={slot} isFocus={focus} setisFocus={setFocus} selectedTime={selectedDeliveryTime} setSelectedTime={setSelectedDeliveryTime} isOn={isOn} setIsOn={setIsOn} onpress={onPressDeliverAddress} selectedAddress={selectedAddress} setselectedAddress={setselectedAddress} />

              )}
            </>

          ) : (
            <RenderPickupComponent errorMessage={errorMessage} checkOut={handlePickUpCheckoutPress} selectedDayIndex={selectedDayIndex} setSelectedDayIndex={setSelectedDayIndex} daysData={daysData} selectedTimeIndex={selectedTimeIndex} setSelectedTimeIndex={setSelectedTimeIndex} timeArray={slot} flatListRef={flatListRef} flatListTimeRef={flatListTimeRef} onScrollEndDay={onScrollEndDay} onScrollEndTime={onScrollEndTime} />
          )}
          <Spacer height={hp(2)} />


        </View>

      </RBSheet>
    </View>
  );
};
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
  mystryMain: {
    width: wp(90),
    height: 64,
    backgroundColor: '#C3EDFF',
    marginHorizontal: wp(5),
    marginBottom: hp(1),
    // borderRadius: 14,
    borderTopEndRadius: 14,
    borderTopStartRadius: 14,
    flexDirection: 'row'
  },
  cancelButton: {
    backgroundColor: Colors.greyBtn,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(44),
    height: hp(6),
    borderRadius: 100
  },
  deleteBtnn: {
    backgroundColor: Colors.redcolor,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(44),
    height: hp(6),
    borderRadius: 100
  },
  RBStitle: {
    fontSize: 20,
    fontFamily: fonts.PoppinsMedium,
    textAlign: 'center'
  },
  cancelText: {
    fontSize: 15,
    fontFamily: fonts.PoppinsMedium,
    textAlign: 'center'
  },
  deleteText: {
    fontSize: 15,
    fontFamily: fonts.PoppinsMedium,
    textAlign: 'center',
    color: Colors.whitecolor
  },
  capsicum: {
    //height:hp('7%'),
    height: Platform.OS === 'ios' ? hp(7) : hp(9),
    width: wp('18%'),
  },
  botoomview: {
    // marginTop: Platform.OS == 'ios' ? 0 : hp(7),
    position: 'absolute',
    bottom: hp(0),
    // borderTopWidth: 1,
    paddingTop: hp(2),
    alignSelf: 'center',
    borderColor: '#CFCFCF',
    backgroundColor: 'white',
    width: wp(95),
  },
  sepreator: {
    borderBottomWidth: 1,
    marginTop: hp(4),
    marginHorizontal: wp(3),
    borderColor: '#EFEFEF',
  },
  touchbtn: {
    justifyContent: 'center',
    backgroundColor: Colors.BtnBackground,
    width: wp('40%'),
    // marginBottom: 10,
    marginStart: wp(5),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 25,
    alignSelf: 'center',
  },
  touchadd: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    // width:wp('7.5%'),
    // height:hp('3.5%'),
    // height:Platform.OS === 'ios' ?  hp(3.5) : hp(3.7),
    // width:Platform.OS === 'ios' ?  wp(7.5) : wp(6),
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  touchleft: {
    backgroundColor: Colors.whitecolor,
    borderWidth: 1,
    borderColor: Colors.borderColor,

    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: hp(0.5),
  },
  populeritem: {
    marginTop: hp('3%'),
    fontSize: 18,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '600',
    color: Colors.balckText,
  },
  esimatedBox: {
    width: wp(95),
    borderRadius: 10,
    borderWidth: 1,
    padding: hp(1.5),
    borderColor: "#EFEFEF",
  },
  estimateInnerView: {
    flexDirection: 'row',
  },
  estimateText: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: Colors.grayText,
    fontWeight: "400"
  },
  estimateTextButton: {
    fontSize: 16,
    fontFamily: fonts.PoppinsRegular,
    color: Colors.BtnBackground,
    fontWeight: "600"
  },
  deleverytype: {
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    padding: 15,
    paddingVertical: 18,
    marginHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingtext: {
    color: Colors.balckText,
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '600',
  },
  headingtext2: {
    color: Colors.BtnBackground,
    fontSize: 13,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '600',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    AddtoCart: data => dispatch(AddtoCart(data)),
  };
};
const mapStateToProps = state => {
  // console.log('state===>>>', state);
  return {
    cartItem: state.userdataReducer.cartItem,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCart);
