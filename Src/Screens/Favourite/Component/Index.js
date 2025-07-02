import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen';
import { FlatList } from 'react-native';
import Spacer, { HorizontalSpacer } from '../../../Components/Spacer';
import Toast from 'react-native-simple-toast';
import { RenderSearchitem } from '../../BesSellerDetails/components';
import { style } from '../Style';
import FastImage from 'react-native-fast-image';
import { BorderesButton } from '../../../Components/Button';
import Colors from '../../../themes/colors';
import Ionicon from "react-native-vector-icons/Ionicons"
import { Image } from 'react-native';
import images from '../../../Components/Images';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';






export const CustomFavouriteList = ({
  relatedItem,
  handleToggleHeart,
  heartPressed,
  onPressMinus,
  cart,
  onPressPlus,
}) => {
  console.log("relatedItem", relatedItem);
  const navigation = useNavigation()
 

  return (
    <View style={{ marginHorizontal: wp(5), flex: 1, paddingBottom: hp(3), backgroundColor: 'transparent' }}>
      <FlatList
        data={relatedItem || []}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: hp('2%') }}
        numColumns={2}
        ItemSeparatorComponent={() => <Spacer height={wp(1)} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => {
          const matchedCartItem = cart?.find(i => i?.Productid == item?.id);
          const quantityInCart = matchedCartItem?.quantity || 0;
          const maxAvailable = item?.product?.quantity - Number(item?.product?.outOfStockThreshold || 0);

          return (
            <RenderFavouriteProduct
              handleToggleHeart={() => handleToggleHeart(item)}
              heartPressed={heartPressed}
              onPressMinus={() => onPressMinus(item)}
              onPressPlus={() => {
                if (matchedCartItem) {
                  Toast.show('Added successfully');
                }

                if (quantityInCart < maxAvailable) {
                  onPressPlus(item);
                } else {
                  Toast.show(`The Product Quantity is only ${maxAvailable}`);
                }
              }}
              count={quantityInCart}
              onPressAdd={() => {
                Toast.show('Added Successfully');
                onPressPlus(item);
              }}
              setCart
              isCart={quantityInCart > 0}
              item={item}
              onPress={() =>
                navigation.navigate('ShowItems', {
                  data: item?.product.id,
                })
              }
            />
          );
        }}
      />
    </View>
  );
};

export const RenderFavouriteProduct = ({ item, onPress, isCart, onPressAdd, onPressMinus, onPressPlus, count, heartPressed, handleToggleHeart }) => {

    // const { heartPressed, setHeartPressed, handleToggleHeart } = useBestSellersDetails()
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={style.flatliststyle}>
                <View style={style.ScrollMainView2}>
                    <View
                        style={{
                            alignItems: 'center',

                            // marginTop: hp(5),
                        }}>
                        <View style={{ height: wp(40), width: wp(40), alignItems: 'center', justifyContent: 'center', borderRadius: 5.8 }}>
                            <FastImage
                                style={style.flatlistimg}
                                source={{
                                    uri: item?.product?.imageUrl || item?.imageUrl,
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </View>
                    </View>
                    <Spacer height={hp(1)} />
                    <View
                        style={{ justifyContent: 'center', paddingHorizontal: wp('3%') }}>
                        <Text numberOfLines={1} style={style.ScrollViewText}>
                            {item?.name || item?.product?.name || ''}
                        </Text>
                        <Text style={{ color: '#92A2A9', fontSize: 12 }}>
                            {(item?.description || item?.product?.description || '').slice(0, 15)}
                            {(item?.description || item?.product?.description)?.length > 15 ? '...' : ''}
                        </Text>
                        <Spacer />
                    </View>
                    <View style={[style.ScrollSubView, { justifyContent: 'space-between' }]}>
                        <View style={style.ScrollLastView}>
                            {(item.product.discountedPrice || item.discountedPrice) ? (
                                <View>
                                    <Text style={{ fontSize: 12, color: Colors.Primary, fontWeight: '600' }}>
                                        Rs. {item?.discountedPrice || item?.product?.discountedPrice}
                                    </Text>
                                    <Text style={{ fontSize: 12, color: Colors.redcolor, fontWeight: '600', textDecorationColor: Colors.redcolor, textDecorationLine: "line-through" }} >
                                        Rs. {item?.price || item?.product?.price}
                                    </Text>
                                </View>

                            ) : (
                                <Text style={{ fontSize: 12, color: Colors.Primary, fontWeight: '600' }}>
                                    Rs. {item?.price || item?.product?.price}
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


