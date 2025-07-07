import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
  Platform,
  Linking,
} from 'react-native';
import {
  images,
  Button,
  fonts,
  Colors,
  iconPath,
  Container,
  Loader,
} from '../../Components/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';

import {
  _AxiosGetBearer,
  _AxiosGetBearerAUTH,
  _PostBearer,
} from '../../Apis/Apis';
import { AppEventsLogger } from 'react-native-fbsdk';
import Spacer from '../../Components/Spacer';
import moment from 'moment/moment';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from "@react-native-community/geolocation";
import Toast from 'react-native-simple-toast';




const Checkout = props => {
  const { deliveryOption, deliveryTime } = props.route.params || {};
  const today = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const selectedDayItem = deliveryTime?.selectedDayItem;
  const selectedTimeItem = deliveryTime?.selectedTimeItem;

  const db = openDatabase(
    { name: 'Grocery.db', createFromLocation: 1 },
    successCB,
    errorCB,
    openCB,
  );

  const errorCB = err => {
    console.log('SQL Error: ' + err);
  };

  const successCB = () => {
    console.log('SQL executed fine');
  };
  const openCB = () => {
    console.log('Database OPENED');
  };
  const myadres = useSelector(response => {
    return response?.userdataReducer?.selectedAddress;
  });



  // Method to delete all data from cartTable
  const deleteAllFromCart = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM cartTable',
          [],
          (tx, results) => {
            console.log('All items deleted from cartTable', results);
          },
          error => {
            console.log('Error deleting items from cartTable', error);
          },
        );
      });
    } catch (error) {
      console.log('Error in transaction', error);
    }
  };

  const [CartData, setCartData] = useState([]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [DeliveryType, setDeliveryType] = useState('Standard Delivery');
  const [Paymenttype, setPaymenttype] = useState('Cash On Delivery');
  const [PaymentMethodList, setPaymentMethodList] = useState([]);
  const [Promocode, setPromocode] = useState('');
  const [Promodetail, setPromodetail] = useState('');
  const [DiscountAmount, setDiscountAmount] = useState(0);
  const [deliveryCharges, setdeliveryCharges] = useState(0);
  const [Waletbalance, setWaletbalance] = useState(0);
  const [subTotalPrice, setsubTotalPrice] = useState(0);
  const [loading, setloading] = useState(false);
  const [selectedAddress, setselectedAddress] = useState(myadres);
  const [errorMessage, seterrorMessage] = useState('');
  const [selfPickup, setSelfPickup] = useState(false)
  const [pickupTime, setPickupTime] = useState('')
  const [region, setRegion] = useState({});



  console.log('selfPickupselfPickupselfPickup', pickupTime);

  useEffect(() => {
    setselectedAddress(myadres)
    console.log('myadres12356', myadres, selectedDayItem, selectedTimeItem);
  }, [myadres])

  const userToken = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });
  const getDeliveryCharges = async (latitude, longitude, total) => {
    console.log('latitude,longitude,total', latitude, longitude, total);
    try {
      // setloading(true);

      let dataparams = {
        latitude: latitude,
        longitude: longitude,
        total: total,
      };
      await _PostBearer('orders/delivery-charges', dataparams, userToken)
        .then(async response => {
          // setloading(false);
          console.log('getDeliveryCharges', response.data.deliveryCharges, userToken);
          setdeliveryCharges(isNaN(response.data.deliveryCharges) ? 0 : response.data.deliveryCharges);
          console.log('deliveryCharges', deliveryCharges);
        })
        .catch(err => {
          // setloading(false);
          console.log('Err,from getDeliveryCharges', err);

        });
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setloading(false);
    }
  };

  const getPaymentTypes = async () => {
    try {
      await _AxiosGetBearer('payments/types', userToken)
        .then(async response => {
          console.log('getPaymentTypesgetPaymentTypes', response.data);
          setPaymentMethodList(response.data);
        })
        .catch(err => {
          setloading(false);
          console.log('Err, of payment method', err);
        });
    } catch (error) {
      setloading(false);
      console.log('errorerrorerrorerror', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('calll huaaaa');
      getcartData();
      getPaymentTypes();

      return () => {
        // Do something when the screen loses focus
      };
    }, [setselectedAddress, selectedAddress]),
  );

  // View content 
  // useEffect(() => {
  //   AppEventsLogger.logEvent('View content', {
  //     pageName: 'Checkout',
  //   });
  // }, []);

  const getMybalance = async total => {
    try {
      await _AxiosGetBearerAUTH('users/my-balance', userToken)
        .then(async response => {
          console.log('RESponse-=-=-=-', response.data.totalBalance);

          console.log('TotalPrice', total);
          setWaletbalance(response.data.totalBalance);
        })
        .catch(err => {
          console.log('errerrerr', err);
        });
    } catch (error) { }
  };
  const applayPromoCode = async () => {
    try {
      if (Promocode) {
        // setloading(true);
        console.log('Promocode', Promocode);
        let data = { code: Promocode };

        console.log('data', data);
        await _PostBearer('discounts/verify-coupon', data, userToken)
          .then(async response => {
            console.log('RESponse-=-=-=-123', response.data);
            //   setPromodetail(response.data)
            console.log('TotalPrice', TotalPrice);
            if (TotalPrice >= response.data.criteria) {
              setPromodetail('Valid');
              if (response.data.type == 'percentage') {
                console.log("response.data.discountAmount", response.data.discountAmount)
                let percentage = (response.data.discountAmount / 100) * subTotalPrice
                setDiscountAmount(parseInt(percentage))
              } else {
                setDiscountAmount(response.data.discountAmount);

              }

              console.log('if ma ay');
              setloading(false);
            } else {
              setPromodetail('NotValid');
              setDiscountAmount(0)

              console.log('else ma ay');
              setloading(false);
            }
          })
          .catch(err => {
            setDiscountAmount(0)
            if (err.response.status == 404) setPromodetail('NotValid');
            console.log('Err,from promocode', err.response);
            setloading(false);
          });
      }
    } catch (error) {
      setDiscountAmount(0)
      setloading(false);
    }
  };
  const getcartData = () => {
    console.log('cal hua cartdata');
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
              total += item.Price * item.quantity;
            }
            console.log('data', data, total);
            setCartData(data);
            setTotalPrice(total);
            setsubTotalPrice(total);
            getMybalance(total);
            getDeliveryCharges(
              selectedAddress.latitude,
              selectedAddress.longitude,
              total,
            );
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

  const PlaceOrder = async () => {
    try {
      seterrorMessage(''); // Clear previous error messages
      const filteredPaymentTypes = PaymentMethodList.filter(
        type => type.value === Paymenttype,
      );
      const filteredProductList = CartData.map(item => ({
        id: item.Productid,
        quantity: item.quantity,
      }));

      // Check if payment method is valid
      if (!filteredPaymentTypes.length) {
        seterrorMessage('Invalid payment method selected.');
        return;
      }

      if (deliveryOption === 'pickup') {
        // Ensure pickup time is set
        if (!pickupTime && !selectedTimeItem) {
          seterrorMessage('Please select a valid pickup time.');
          return;
        }

        const data = {
          type: 'pickUp',
          useWalletBalance: Waletbalance > 0 ? true : false,
          paymentTypeId: filteredPaymentTypes[0].id,
          products: filteredProductList,
          device: "mobile",
          pickUpTime: selectedTimeItem ?? pickupTime,
          addressId: "655", // Replace with correct address ID
          latitude: 33.64485244270809,
          longitude: 73.02109845239706,
        };

        console.log("Pickup order data:", data);

        try {
          const response = await _PostBearer('orders', data, userToken);
          console.log('Pickup order response:', response);
          deleteAllFromCart(); // Clear cart after successful order
          props.navigation.replace('Successfulorder', {
            paymenttype: Paymenttype,
            id: response?.data?.id,
            type: 'pickUp',
          });



        } catch (err) {
          console.log('Error placing pickup order:', err);
          Toast.show(err?.data?.message || 'Error placing order. Please try again.');
          setloading(false);
        }

      } else if (selectedAddress) {
        // Handling standard delivery order
        if (DeliveryType === 'Standard Delivery') {
          const data = {
            addressId: selectedAddress?.id,
            latitude: Math.abs(selectedAddress?.latitude),
            longitude: Math.abs(selectedAddress?.longitude),
            type: 'standard',
            useWalletBalance: Waletbalance > 0 ? true : false,
            paymentTypeId: filteredPaymentTypes[0].id,
            products: filteredProductList,
            device: "mobile",
          };

          try {
            const response = await _PostBearer('orders', data, userToken);
            console.log('Standard delivery order response:', response);
            deleteAllFromCart();
            props.navigation.replace('Successfulorder', {
              paymenttype: Paymenttype,
              id: response?.data?.id,
            });



          } catch (err) {
            console.log('Error placing standard delivery order:', err);
            Toast.show(err?.data?.message || 'Error placing order. Please try again.');
            setloading(false);
          }
        } else {
          // Scheduled delivery handling
          const date = new Date(DeliveryType);
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

          const data = {
            addressId: selectedAddress?.id,
            latitude: selectedAddress?.latitude,
            longitude: selectedAddress?.longitude,
            type: 'scheduled',
            useWalletBalance: Waletbalance > 0 ? true : false,
            pickUpTime: formattedDate,
            paymentTypeId: filteredPaymentTypes[0].id,
            products: filteredProductList,
            device: 'mobile',
          };

          try {
            const response = await _PostBearer('orders', data, userToken);
            console.log('Scheduled delivery order response:', response);
            deleteAllFromCart();
            props.navigation.replace('Successfulorder', {
              paymenttype: Paymenttype,
              id: response?.data?.id,
            });


          } catch (err) {
            console.log('Error placing scheduled delivery order:', err);
            Toast.show(err?.data?.message || 'Error placing order. Please try again.');
            setloading(false);
          }
        }
      } else {
        seterrorMessage('Select Delivery Address');
      }

    } catch (error) {
      console.log("Unexpected error:", error);
      seterrorMessage('Something went wrong. Please try again later.');
      setloading(false);
    }
  };

  const handleNavigate = () => {
    const url = "https://maps.app.goo.gl/5YTuEzDysDSgkK9a8";

    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url); // Open the URL
      } else {
        Toast.show("Unable to open the URL.");
      }
    }).catch((error) => {
      Toast.show("Error occurred while opening the URL.");
      console.error("Error opening URL:", error);
    });
  };


  useFocusEffect(
    React.useCallback(() => {

      getOneTimeLocation()

    }, [])

  )

  console.log("props", props.route.params)
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        console.log('currentLongitude', position)

        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
        console.log('currentLongitude', currentLongitude);
        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        console.log('currentLatitude', currentLatitude);

        // //Setting Longitude state
        // console.log('currentLongitude',currentLongitude);

        setRegion({
          latitude: parseFloat(currentLatitude),
          longitude: parseFloat(currentLongitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        })

      },
      (error) => {
        console.log('my erroorororoor', error.message);
      },
      {

        enableHighAccuracy: true, timeout: 20000
      },
    );
  };

  return (
    <Container style={{ alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{ flexDirection: 'row' }}>
        <View>
          <Image
            source={images.leftarrow}
            style={{ height: hp(3), width: wp(3.5) }}
          />
        </View>
        <View
          style={{
            alignSelf: 'center',
            width: wp(80),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 18,
              color: Colors.balckText,
              fontFamily: fonts.PoppinsRegular,
            }}>
            Checkout
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(6) }}
        style={styles.mainView}>
        <View style={styles.subView}></View>
        <Spacer />
        {deliveryOption == 'Delivery' ? (
          selectedAddress == '' ? (
            <TouchableOpacity
              onPress={() => {
                setSelfPickup(false);
                seterrorMessage('');
                props.navigation.navigate('Address', {
                  confirmbtn: true,
                  setselectedAddress,
                });
              }}
              style={[styles.btnadres, { backgroundColor: selfPickup ? Colors.greyBG : Colors.Primary }]}>
              <View style={styles.touchView}>
                <Image source={images.locateicon} style={[styles.imglocate, { tintColor: selfPickup ? Colors.Primary : Colors.whitecolor }]} />
              </View>

              <View style={styles.viewDelivery}>
                <Text style={[styles.deliveryAddress, { color: selfPickup ? Colors.Primary : Colors.whitecolor }]}>
                  Select Delivery Address
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setSelfPickup(false);
                props.navigation.navigate('Address', {
                  confirmbtn: true,
                  setselectedAddress,
                });
              }}
              style={[styles.containView, { backgroundColor: selfPickup ? Colors.greyBG : Colors.Primary, borderWidth: 0 }]}>
              <View style={styles.containSubView}>
                <TouchableOpacity style={styles.touchView}>
                  <Image source={images.locateicon} style={[styles.imglocate, { tintColor: selfPickup ? Colors.Primary : Colors.whitecolor }]} />
                </TouchableOpacity>
                <View style={styles.viewDelivery}>
                  <Text style={[styles.deliveryAddress, { color: selfPickup ? Colors.Primary : Colors.whitecolor }]}>
                    Delivery Address
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('Address', {
                      confirmbtn: true,
                      setselectedAddress,
                    })
                  }
                  style={styles.touchimg}>
                  <Image source={images.edituncolor} style={[styles.edituncolor, { tintColor: selfPickup ? Colors.Primary : Colors.whitecolor }]} />
                </TouchableOpacity>
              </View>
              <View style={styles.addressView}>
                <Text style={[styles.addressTxt, { color: selfPickup ? Colors.Primary : Colors.whitecolor }]}>
                  {selectedAddress?.address}
                </Text>
              </View>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity onPress={handleNavigate}
            // activeOpacity={0.9}
            // onPress={() => {
            //   setSelfPickup(true);
            //   props.navigation.navigate('SelfPickup', {
            //     pickupTime,
            //     setPickupTime,
            //   });
            // }}
            style={[styles.containView, { backgroundColor: Colors.Primary, borderWidth: 0 }]}>
            <View style={styles.containSubView}>
              {/* <TouchableOpacity style={styles.touchView}>
                <Image source={images.locateicon} style={[styles.imglocate, { tintColor: selfPickup ? Colors.Primary : Colors.whitecolor }]} />
              </TouchableOpacity> */}
              <View style={styles.viewDelivery}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name='map-pin' size={20} color={Colors.whitecolor} />
                    <Text style={[styles.deliveryAddress, { color: Colors.whitecolor, marginLeft: wp(1) }]}>
                      Self Pickup
                    </Text>
                  </View>
                  <TouchableOpacity onPress={handleNavigate}>
                    <Feather name='arrow-up-right' size={20} color={Colors.whitecolor} />
                  </TouchableOpacity>

                </View>
              </View>
              <View
                // onPress={() =>
                //   props.navigation.navigate('Address', {
                //     confirmbtn: true,
                //     setselectedAddress,
                //   })
                // }
                style={styles.touchimg}>
                {/* <Image source={images.edituncolor} style={[styles.edituncolor, { tintColor: selfPickup ? Colors.Primary : Colors.whitecolor }]} /> */}
              </View>
            </View>
            <View style={styles.addressView}>
              <Text style={[styles.addressTxt, { color: Colors.whitecolor }]}>
                PLot 21, Faqir aipee Road, near NESCOM, I-11/2, Islamabad
              </Text>
            </View>
          </TouchableOpacity>
          // <View>
          //   <TouchableOpacity
          //     activeOpacity={0.9}
          //     onPress={() => {
          //       setSelfPickup(true);
          //       props.navigation.navigate('SelfPickup', {
          //         pickupTime,
          //         setPickupTime,
          //       });
          //     }}
          //     style={[styles.btnadres, { backgroundColor: selfPickup ? Colors.Primary : Colors.greyBG }]}>
          //     <View style={styles.touchView}>
          //       <Image source={images.selfPickup} style={[styles.imglocate, { tintColor: selfPickup ? Colors.whitecolor : Colors.Primary }]} />
          //     </View>

          //     <View style={[styles.viewDelivery, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          //       <Text style={[styles.deliveryAddress, { color: selfPickup ? Colors.whitecolor : Colors.Primary }]}>
          //         Self Pickup
          //       </Text>
          //       {pickupTime ? (
          //         <Text style={[styles.deliveryAddress, { color: selfPickup ? Colors.whitecolor : Colors.Primary, fontSize: 12 }]}>
          //           {moment(pickupTime).format('lll')}
          //         </Text>
          //       ) : null}
          //     </View>
          //   </TouchableOpacity>
          //   <Spacer />
          // </View>
        )}
        {deliveryOption == 'Delivery' ? (
          <>
            <TouchableOpacity
              onPress={() => {
                    setSelfPickup(false)
                    props.navigation.navigate('DeliveryType', {
                      setDeliveryType,
                      DeliveryType,
                    })
                  }
                  }
            >
              <View style={styles.deleverytype}>
                <Text style={styles.headingtext}>{'Delivery Type'}</Text>

                <TouchableOpacity
                  onPress={() => {
                    setSelfPickup(false)
                    props.navigation.navigate('DeliveryType', {
                      setDeliveryType,
                      DeliveryType,
                    })
                  }
                  }
                  >
                  {(selectedDayItem || selectedTimeItem || DeliveryType) && (
                    <Text style={styles.headingtext2}>
                      {selectedDayItem && moment(selectedDayItem).format('MMMM D, YYYY')}
                      {selectedDayItem && selectedTimeItem && ' - '}
                      {selectedTimeItem || DeliveryType}
                    </Text>
                  )}

                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <View style={styles.deleverytype}>
              <Text style={styles.headingtext}>{'Payment Method'}</Text>

              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('PaymentMethod', {
                    Paymenttype,
                    setPaymenttype,
                    PaymentMethodList,
                  })
                }>
                <Text style={styles.headingtext2}>{Paymenttype}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.inputview,
                borderColor:
                  Promodetail == 'Valid'
                    ? '#00AE11'
                    : Promodetail == 'NotValid'
                      ? 'red'
                      : Colors.borderColor,
              }}>
              <TextInput
                style={{
                  // height: 35,
                  width: wp(63),
                  color: Colors.balckText,
                  alignItems: 'center',
                }}
                onChangeText={text => setPromocode(text)}
                value={Promocode}
                placeholder="Promo Code"
                placeholderTextColor={'#D2D2D2'}
              />

              <TouchableOpacity
                onPress={() => applayPromoCode()}
                style={{
                  ...styles.aplaybtn,
                  backgroundColor:
                    Promodetail == 'Valid'
                      ? '#00AE11'
                      : Promodetail == 'NotValid'
                        ? 'red'
                        : Colors.BtnBackground,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.whitecolor,
                    fontFamily: fonts.PoppinsRegular,
                  }}>
                  {Promodetail == 'Valid' ? 'Applied' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.inputviewtext }}>
              {(Promodetail == 'Valid' || Promodetail == 'NotValid') && (
                <Text
                  style={{
                    ...styles.inputtext,
                    color:
                      Promodetail == 'Valid'
                        ? Colors.BtnBackground
                        : Promodetail == 'NotValid'
                          ? 'red'
                          : Colors.borderColor,
                  }}>
                  {Promodetail == 'Valid'
                    ? 'You are now eligible for the discount.'
                    : 'Discount coupon not valid'}
                </Text>
              )}
            </View>
          </>

        ) : (
          <TouchableOpacity
            onPress={() => {
              setSelfPickup(true);
              props.navigation.navigate('SelfPickup', {
                pickupTime,
                setPickupTime,
              });
            }}
          >
            <View style={styles.deleverytype}>
              <Text style={styles.headingtext}>{'Self Pickup'}</Text>

              <TouchableOpacity
                onPress={() => {
                  setSelfPickup(true);
                  props.navigation.navigate('SelfPickup', {
                    pickupTime,
                    setPickupTime,
                  });
                }}
              >
                {pickupTime ? (
                  <Text style={[styles.deliveryAddress, { color: Colors.Primary, fontSize: 12 }]}>
                    {moment(pickupTime).format('lll')}
                  </Text>
                ) : selectedDayItem && selectedTimeItem ? (
                  <Text style={[styles.deliveryAddress, { color: Colors.Primary, fontSize: 12 }]}>
                    {selectedDayItem} {selectedTimeItem && selectedTimeItem}
                  </Text>
                ) : null}

              </TouchableOpacity>
            </View>
          </TouchableOpacity>

        )}


        {
          selfPickup ? null :
            <>





            </>
        }





        <View style={styles.flatlistview}>
          {CartData.map((item, index) => {
            return (
              <View
                style={{
                  ...styles.flatlistmain,
                  borderBottomWidth: CartData.length - 1 == index ? 0 : 1,
                }}>
                <View style={styles.imagename}>
                  <View
                    style={{
                      width: wp(12),
                      height: wp(12),
                      borderWidth: 1,
                      borderColor: Colors.borderColor,
                      borderRadius: wp(8),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{ uri: item?.ImageUrl }}
                      style={{
                        width: wp(10),
                        height: wp(10),
                        borderRadius: wp(8),
                      }}
                    />
                  </View>
                  <View>
                    <Text numberOfLines={1} style={styles.productname}>
                      {item?.ProductName}
                    </Text>

                    <Text style={styles.quantity}>
                      Quantity : {item?.quantity}
                    </Text>
                  </View>
                </View>

                <Text style={styles.price}>
                  Rs.{item?.Price * item?.quantity}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.subtotalView}>
          <Text style={styles.subtotaltxt}>Subtotal</Text>
          <Text style={styles.txtprice}>Rs. {TotalPrice.toFixed(1)}</Text>
        </View>
        <View style={styles.deliveryChargeView}>
          <Text style={styles.deliveryChargeTxt}>Delivery Charges</Text>
          <Text style={styles.txt}>Rs. {parseFloat(deliveryCharges)?.toFixed(2)}</Text>
        </View>

        <View style={styles.deliveryChargeView}>
          <Text style={styles.deliveryChargeTxt}>Wallet Balance</Text>
          <Text style={styles.txt}>Rs. {parseFloat(Waletbalance).toFixed(2)}</Text>
        </View>

        {/* <View style={styles.Tax}>
          <Text style={styles.subtotaltxt}>Tax</Text>
          <Text style={styles.txtprice}>Rs. {TotalPrice}</Text>
        </View> */}

        {
          DiscountAmount > 0 && (
            <View style={styles.taxView}>
              <Text style={styles.taxtext}>Discount</Text>
              <Text style={styles.taxprice}>Rs -{parseFloat(DiscountAmount).toFixed(2)}</Text>
            </View>
          )
        }
        <View style={styles.lineView}></View>
        <View style={styles.totalView}>
          <Text style={styles.totalTxt}>Total</Text>
          <Text style={styles.txtPrice}>
            Rs.{' '}
            {parseFloat(Number(subTotalPrice) +
              Number(deliveryCharges) -
              Number(Waletbalance) -
              Number(DiscountAmount)).toFixed(2)}
          </Text>
        </View>

        {
          errorMessage?.length > 0 && (
            <Text style={{ color: 'red', marginTop: hp(2), alignSelf: 'center' }}>
              {errorMessage}
            </Text>
          )
        }


      </ScrollView >

      <Button
        onPress={() => PlaceOrder()}
        title={'Place Order'}
        height={hp(5)}

      />
      <Loader loading={loading} />
    </Container >
  );
};
const styles = StyleSheet.create({
  dropdownContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.BtnBackground,
    borderRadius: 5,
    maxHeight: 150,
    marginHorizontal: wp(4),
    paddingHorizontal: 10,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D9F0FA',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },

  mainView: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: hp(5),
  },
  text: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    color: Colors.balckText,
  },
  subView: {
    marginHorizontal: hp(4),
    marginTop: hp(1),
  },
  otherView: {
    flexDirection: 'row',
  },
  leftImg: {
    height: hp(3),
    width: wp(3.5),
  },
  inputtext: {
    fontSize: 14,
    fontFamily: fonts.PoppinsRegular,
    color: Colors.BtnBackground,
  },
  inputviewtext: {
    marginHorizontal: wp(4),
    marginTop: hp(2),
  },
  flatlistmain: {
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  imagename: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productname: {
    fontSize: 14,
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '500',
    width: wp(50),
    marginLeft: 10,
  },
  quantity: {
    fontSize: 14,
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '500',

    marginLeft: 10,
  },
  price: {
    fontSize: 14,
    color: Colors.BtnBackground,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '500',
  },
  inputview: {
    marginHorizontal: wp(4),
    marginTop: hp(1),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  aplaybtn: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BtnBackground,
    paddingHorizontal: 20,
  },
  standerdbtn: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginHorizontal: wp(4),
  },
  standerdbtn2: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginHorizontal: wp(4),
  },
  dropdown: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.BtnBackground,
    padding: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginHorizontal: wp(4),
  },
  containView: {
    borderWidth: 1,
    marginHorizontal: hp(2),
    paddingHorizontal: hp(2),
    backgroundColor: Colors.BtnBackground,
    borderRadius: 10,
    paddingBottom: hp(2),
    borderColor: Colors.BtnBackground,
    // marginTop: hp(5),
  },
  btnadres: {
    backgroundColor: Colors.BtnBackground,
    borderRadius: 10,
    padding: 19,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(5),
    // marginTop: hp(5),
  },
  viewDelivery: {
    width: wp(70),
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  deliveryAddress: {
    color: Colors.whitecolor,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
    fontWeight: '500',
  },
  touchView: {
    width: wp(6),
    justifyContent: 'center',
  },
  touchimg: {
    width: wp(6),
    justifyContent: 'center',
    height: hp(3),
    alignSelf: 'center',
  },
  txtPrice: {
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '500',
  },
  addressView: {
    width: wp(72),
    marginTop: hp(2),
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  totalView: {
    borderColor: 'red',
    marginTop: hp(2),
    borderWidth: 0,
    flexDirection: 'row',
    marginHorizontal: hp(2.5),
    justifyContent: 'space-between',
  },
  placeOrderTxt: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  totalTxt: {
    fontWeight: '600',
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 15,
  },
  containSubView: {
    flexDirection: 'row',
    marginTop: hp(2),
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  subtotalView: {
    borderColor: 'red',
    marginTop: hp(3),
    borderWidth: 0,
    flexDirection: 'row',
    marginHorizontal: hp(2.5),
    justifyContent: 'space-between',
  },
  Tax: {
    borderColor: 'red',
    marginTop: hp(1),
    borderWidth: 0,
    flexDirection: 'row',
    marginHorizontal: hp(2.5),
    justifyContent: 'space-between',
  },
  flatlistview: {
    marginHorizontal: wp(4),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    marginTop: hp(2),
    padding: 10,
    flex: 1,
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
  txt: {
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
  },
  subtotaltxt: {
    fontWeight: '500',
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
  },
  txtprice: {
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
  },
  taxView: {
    borderColor: 'red',
    marginTop: hp(1),
    borderWidth: 0,
    flexDirection: 'row',
    marginHorizontal: hp(2.5),
    justifyContent: 'space-between',
  },
  taxtext: {
    fontWeight: '500',
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
  },
  lineView: {
    borderBottomWidth: 0.5,
    marginTop: hp(3),
    borderColor: '#CFCFCF',
    marginHorizontal: hp(3),
  },
  taxprice: {
    color: Colors.balckText,
  },
  deliveryChargeView: {
    borderColor: 'red',
    marginTop: hp(1),
    borderWidth: 0,
    flexDirection: 'row',
    marginHorizontal: hp(2.5),
    justifyContent: 'space-between',
  },
  deliveryChargeTxt: {
    fontWeight: '500',
    color: Colors.grayText,
    fontFamily: fonts.PoppinsRegular,
  },
  checkoutView: {
    alignSelf: 'center',
    width: wp(80),
    justifyContent: 'center',
  },
  checkoutTxt: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },
  addressTxt: {
    color: Colors.whitecolor,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 13.5,
  },
  imglocate: {
    width: 18,
    height: 18,
    tintColor: Colors.whitecolor
    // width: Platform.OS === 'ios' ? wp(4) : wp(4),
    // height: Platform.OS === 'ios' ? hp(2) : hp(2.5),
  },
  edituncolor: {
    width: Platform.OS === 'ios' ? wp(4) : wp(4),
    height: Platform.OS === 'ios' ? hp(2) : hp(2.5),
  },
  btn: {
    justifyContent: 'center',
    marginTop: hp(40),
    backgroundColor: '#4CAE6F',
    width: wp(85),
    height: Platform.OS === 'ios' ? hp(6) : hp(7),
    borderRadius: 25,
    alignSelf: 'center',
  },
});

export default Checkout;
