import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { DeleteCartData, getcartData, UpdateCartData } from '../../../Helperfunctions';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { addTOcart } from '../../../Components/Additemstocart';

const useCart = () => {
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [heartPressed, setHeartPressed] = useState({});
    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });


    useFocusEffect(
        useCallback(() => {
            CartData();
        }, [])
    );

    const CartData = () => {

        getcartData(data => {
            console.log("cart data in useeffect", data)
            setCart(data)
        })
    }
    const onPressPlus = async (item) => {
        console.log('itemitemitemitem', item.name,"cart",cart);

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
            getcartData()
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
    return {
        cart,
        setCart,
        totalPrice,
        setTotalPrice,
        heartPressed,
        setHeartPressed,
        userToken,
        onPressPlus,
        onPressMinus,
        handleToggleHeart,
        getcartDataPrice
    }
}

export default useCart

