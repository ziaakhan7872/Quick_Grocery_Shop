import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { images, Colors, fonts, Button } from '../../Components/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { _axiosGetAPI, _axiosPostAPI } from '../../Apis/Apis';
import { openDatabase } from 'react-native-sqlite-storage';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-simple-toast';
import { DeleteCartData, UpdateCartData, getcartData } from '../../Helperfunctions';
import { RenderSearchitem } from '../BesSellerDetails/components';
import { HorizontalSpacer } from '../../Components/Spacer';
import { newEvents } from '../../Components/CustomListner';
import { useIsFocused } from '@react-navigation/native';
import { addTOcart } from '../../Components/Additemstocart';
import { useSelector } from 'react-redux';

const ShowItems = props => {
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
  const userToken = useSelector(response => {
    return response?.userdataReducer?.userData?.userToken;
  });

  const [count, setcount] = useState(1);
  const [countLocal, setcountLocal] = useState(1);
  const [productdetail, setproductdetail] = useState([]);
  const [relatedItem, setrelatedItem] = useState([]);
  const [cart, setCart] = useState([])
  const [data, setData] = useState(props?.route?.params?.data)
  const [heartPressed, setHeartPressed] = useState({});

  // let data = props?.route?.params?.data;
  // const addTOcart = (Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity) => {
  //   console.log(
  //     'Productid, ImageUrl, ProductName, quantity, Price',
  //     Productid,
  //     ImageUrl,
  //     ProductName,
  //     quantity,
  //     Price,
  //     TotalQuantity,
  //   );
  //   newEvents.emit('addCart', 'addCart')

  //   try {
  //     db.transaction(function (tx) {
  //       // Check if the Productid already exists in the database
  //       tx.executeSql(
  //         'SELECT * FROM cartTable WHERE Productid = ?',
  //         [Productid],
  //         (tx, results) => {
  //           if (results.rows.length > 0) {
  //             newEvents.emit('addCart', 'addCart')

  //             // If the item already exists, update the quantity
  //             const newQuantity = quantity;
  //             tx.executeSql(
  //               'UPDATE cartTable SET quantity = ? WHERE Productid = ?',
  //               [newQuantity, Productid],
  //               (tx, results) => {
  //                 console.log('Item quantity updated in cartTable', results);
  //                 // props.navigation.navigate('AddCart');
  //                 // Toast.show(
  //                 //   'The product has been successfully added to your cart 🛒.',
  //                 //   Toast.TOP,
  //                 // );
  //               },
  //               error => {
  //                 console.log(
  //                   'Error updating item quantity in cartTable',
  //                   error,
  //                 );
  //               },
  //             );
  //           } else {
  //             newEvents.emit('addCart', 'addCart')

  //             // If the item does not exist, insert a new row into the cartTable
  //             tx.executeSql(
  //               'INSERT INTO cartTable(Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity) VALUES (?,?,?,?,?,?)',
  //               [Productid, ImageUrl, ProductName, quantity, Price, TotalQuantity],
  //               (tx, results) => {
  //                 console.log('New item added to cartTable', results);
  //                 // props.navigation.navigate('AddCart');
  //                 // Toast.show(
  //                 //   'The product has been successfully added to your cart 🛒.',
  //                 //   Toast.LONG,
  //                 // );
  //               },
  //               error => {
  //                 console.log('Error inserting new item into cartTable', error);
  //               },
  //             );
  //           }
  //         },
  //         error => {
  //           console.log('Error selecting item from cartTable', error);
  //         },
  //       );
  //     });
  //   } catch (error) {
  //     console.log('Error in transaction', error);
  //   }
  // };

  console.log("datapf this item", data)

  useEffect(() => {
    getProductdetailBuyid(data);
  }, [data]);

  const getProductdetailBuyid = async data => {
    try {
      // setLoading(true)
      await _axiosGetAPI(`store/products/${data}`)
        .then(async response => {
          console.log('getProductdetailBuyid', response?.data?.data);
          setproductdetail(response?.data?.data);
          getRelatedproduct(response?.data?.data?.category[0]);
        })
        .catch(err => {
          console.log('Err,', err);
        });
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false);
    }
  };

  const getRelatedproduct = async id => {
    console.log("idddddd", id)
    try {
      console.log('idididid', encodeURIComponent);
      // setLoading(true)
      await _axiosGetAPI(

        `store/products?offset=1&limit=30&categoryName=${encodeURIComponent(id.name)}&filter=isPublish=eq:true`, null, userToken
      )
        .then(async response => {
          console.log('getRelatedproduct', response);
          let related = response?.data?.data?.products.filter(i => i.id != id?.productCategoriesConjuction?.productId)
          const product = response?.data?.data?.products
          setrelatedItem(related);
          const initialHeartState = {};

          product.forEach(p => {
            initialHeartState[p.id] = p.favourite;
          });
          setHeartPressed(initialHeartState);
        })
        .catch(err => {
          console.log('Err,', err);
        });
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false);
    }
  };


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
      Toast.show('Added successfuly')

    }

    await addTOcart(
      item?.id,
      item?.imageUrl,
      item?.name,
      1,
      item?.price,
      item?.quantity - Number(item?.outOfStockThreshold),
      props.navigation,
    )
  }


  const onPressMinus = async (item) => {
    console.log(item, 'itemasdf')
    let finditem = await cart?.find(i => i?.Productid == item?.id)
    if (finditem?.quantity > 1) {
      await UpdateCartData(finditem?.quantity - 1, finditem?.id, data => {
        console.log("uasdfasdfasdfas", data)
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
  useEffect(() => {
    CartData()

  }, [useIsFocused(), productdetail])

  const CartData = () => {

    getcartData(data => {
      console.log("dadsfasdfasdfasdfasdfasdfasfasd", data)
      let thisItem = data?.find(i => i?.Productid == productdetail.id)?.quantity ?? 1
      console.log("this item", thisItem)
      setcount(thisItem)
      setCart(data)
    })
  }


  const AddToCartButton = () => {
    if (count > (productdetail?.quantity - Number(productdetail.outOfStockThreshold))) {

      Toast.show(`The Product Quantity is only ${productdetail?.quantity - Number(productdetail.outOfStockThreshold)}`)
      setcount(productdetail?.quantity - Number(productdetail.outOfStockThreshold))

    } else {
      // Toast.show(`The Product Quantity is only nor ${productdetail?.quantity}`)
      addTOcart(
        productdetail?.id,
        productdetail?.imageUrl,
        productdetail?.name,
        count,
        productdetail?.price,
        productdetail?.quantity - Number(productdetail.outOfStockThreshold),
      )
      Toast.show('Added successfully')
    }
  }
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

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={images.leftarrow} style={{ height: 24, width: 24 }} />
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Image source={images.hearticon} style={{height:24,width:24,tintColor:Colors.BtnBackground}}/> */}
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: hp(20) }}
        showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.imageview}>
            <FastImage
              style={{
                width: wp(40),
                height: wp(40),
              }}
              source={{
                uri: productdetail?.imageUrl,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>

          <View style={styles.main}>
            <View
              style={{
                borderWidth: 0,
                borderColor: 'red',
                marginTop: hp('2%'),
                flexDirection: 'row',
              }}>
              <View style={{ width: wp(90), borderColor: 'red', borderWidth: 0 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.name}>{productdetail?.name}</Text>

                  {/* {productdetail?.quantity && (
                    <View
                      style={{
                        ...styles.instok,
                        backgroundColor:
                          productdetail?.quantity >
                            productdetail?.outOfStockThreshold
                            ? '#0DD675'
                            : 'red',
                      }}>
                      <Text style={styles.stocktext}>
                        {productdetail?.quantity >
                          productdetail?.outOfStockThreshold
                          ? 'In stock'
                          : 'Out of stock'}
                      </Text>
                    </View>
                  )} */}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0,
                borderColor: 'red',
                alignContent: 'center',
              }}>
              <Text style={styles.price}>Rs. {productdetail?.price}</Text>
            </View>
            <View
              style={{
                borderBottomColor: '#E5E5E5',
                borderBottomWidth: 0.5,
                marginTop: hp('2%'),
              }}></View>
            <View>
              <View style={{ marginTop: hp('1.5%') }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: Colors.balckText,
                    fontFamily: fonts.PoppinsRegular,
                  }}>
                  Product Details
                </Text>
              </View>
              <View style={{ marginTop: hp('0.5%') }}>
                <Text
                  style={{
                    color: Colors.grayText,
                    fontFamily: fonts.PoppinsRegular,
                  }}>
                  {productdetail?.description}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: hp('1.5%') }}>
            <Text style={styles.populeritem}>Related Products</Text>

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
                    onPressPlus={() => cart?.find(i => i?.Productid == item?.id).quantity < (item?.quantity - Number(item.outOfStockThreshold)) ?
                      onPressPlus(item) : Toast.show(`The Product Quantity is only ${item?.quantity - Number(item.outOfStockThreshold)}`)}
                    count={cart?.find(i => i?.Productid == item?.id)?.quantity}
                    onPressAdd={() => {
                      onPressPlus(item)
                    }}
                    setCart
                    isCart={cart?.find(i => i?.Productid == item?.id)?.quantity > 0 ? true : false}
                    item={item}
                    onPress={() => setData(item.id)} />
                )
              }}
            />
          </View>
        </View>
      </ScrollView>
      {productdetail?.quantity > productdetail?.outOfStockThreshold && (
        <View style={styles.rowview}>
          <View style={styles.countview}>
            <TouchableOpacity
              onPress={() => setcount(count == 1 ? 1 : count - 1)}
              style={styles.countbtn}>
              <Image
                source={images.minus}
                style={{ height: hp('2'), width: wp('2%') }}
              />
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: wp('8%'),
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.balckText,
                  fontFamily: fonts.PoppinsRegular,
                }}>
                {count}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setcount(count + 1)}
              style={styles.countbtn}>
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
          <Button
            onPress={AddToCartButton}
            title={'Add to Cart'}
            btnContainer={{
              paddingVertical: 1,
              height: wp(11.5),
              width: wp(37),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      )}
    </View>
  );
};
export default ShowItems;

const styles = StyleSheet.create({
  imageview: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
  },
  header: {
    marginTop: hp(Platform.OS == 'ios' ? 6 : 2),
    flexDirection: 'row',
    marginHorizontal: hp('2'),
    justifyContent: 'space-between',
  },
  main: { paddingHorizontal: hp('2%'), backgroundColor: Colors.backgroundColor },
  countview: {
    borderColor: 'red',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countbtn: {
    backgroundColor: Colors.whitecolor,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.BtnBackground,
    fontFamily: fonts.PoppinsRegular,
  },
  name: {
    fontSize: 20,
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '500',
    width: wp(73),
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderTopWidth: 1,
    paddingHorizontal: wp(4),
    borderColor: Colors.borderColor,

    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    width: wp(100),
  },
  instok: {
    backgroundColor: '#0DD675',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stocktext: {
    fontFamily: fonts.Poppins,
    fontSize: 8,
    color: Colors.whitecolor,
  },
  populeritem: {
    marginTop: hp('3%'),
    fontSize: 18,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '600',
    color: Colors.balckText,
  },

  flatliststyle: {
    // height: Platform.OS === 'ios' ? hp(25) : hp(25),
    width: Platform.OS === 'ios' ? wp(42) : wp(42),
    borderColor: '#CFCFCF',
    // width: wp('42%'),
    // height: hp('30%'),
    paddingBottom: hp('2%'),
    borderRadius: 10,
    marginLeft: hp('1%'),
    marginTop: hp('2%'),
    borderWidth: 0.5,
  },
  imageviewflatlist: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
    padding: 5,
  },
  image: {
    width: wp(30),
    height: wp(30),
  },
  ScrollViewText: {
    fontWeight: '600',
    fontSize: 15,
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    // marginTop: hp(2),
  },
});
