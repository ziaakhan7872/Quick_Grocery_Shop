import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { _axiosGetAPIAUTH, _AxiosGetBearer, _axiosPostAPI } from '../../../Apis/Apis';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { addTOcart } from '../../../Components/Additemstocart';
import { DeleteCartData, UpdateCartData, db, getcartData, requestUserPermission } from '../../../Helperfunctions';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { newEvents } from '../../../Components/CustomListner';



export const UseFavourite = (props) => {
    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });
    const [loading, setLoading] = useState(false);
    const [favouriteProducts, setFavouriteProducts] = useState([]);
    const [heartPressed, setHeartPressed] = useState(true);
    const [cart, setCart] = useState([])




    useEffect(() => {
       getFavouriteProducts()
    }, [userToken]);

    const getFavouriteProducts = async () => {
        try {
            const response = await _AxiosGetBearer("store/products/favourite-products?limit=10&offset=1", userToken);
            const favorites = response?.data?.favorites || [];
            setFavouriteProducts(favorites);
            console.log("🔥 Favourite products fetched successfully", favorites) ;
        }
        catch (error) {
            console.log("❌ GET error", error);
        }
    };
    // useEffect(() => {
    //         newEvents.on('addCart', function (proposal) {
    //             CartData();
    //         });
    //     }, []);
    // useEffect(() => {
    //     const heartMap = {};
    //     favouriteProducts.forEach(item => {
    //         const id = item?.id;
    //         if (id) heartMap[id] = true;
    //     });
    //     setHeartPressed(heartMap); // ✅ All hearts = true
    //     console.log("✅ Heart state updated:", heartPressed);
    // }, [heartPressed,favouriteProducts]);

    useFocusEffect(
        React.useCallback(() => {
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
        console.log('itemitemitemitem', item);
        console.log('cartcart', cart);
        const productId = item?.product?.id || item?.id;
        const cartCopy = [...cart];
        const filter = cartCopy.filter(i => i?.Productid !== productId);
        const find = cartCopy.find(i => i?.Productid === productId);

        if (find) {
            find.quantity += 1;
            filter.push(find);
            setCart(filter);
        }
        const finalPrice = item?.product?.discountedPrice ? item?.product?.discountedPrice : item?.product?.price;



        try {
            await addTOcart(
                item?.id,
                item?.product?.imageUrl,
                item?.product?.name,
                1,
                finalPrice,
                item?.product?.quantity - Number(item?.product?.outOfStockThreshold),
            );
            CartData();
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
        console.log("item", item);
        try {
            const response = await _axiosPostAPI(
                `store/products/favourite-products`,
                { productId: String(item.productId) },
                userToken
            );

            if (response?.data?.statusCode === 200) {
                console.log("response", response?.data);
                // Toggle only after success
                setHeartPressed(prev => ({
                    ...prev,
                    [item.id]: !prev[item.id]
                }));

                Toast.show(response?.data?.message || 'Favourite updated');
                await getFavouriteProducts()
            }
        } catch (error) {
            console.log("💥 Favourite toggle error:", error);
        }
    };

    return {
        favouriteProducts,
        setFavouriteProducts,
        handleToggleHeart,
        heartPressed,
        setHeartPressed,
        onPressPlus,
        onPressMinus,
        cart,
        setCart,
        getcartDataPrice,
        loading,
        setLoading
    }
}


