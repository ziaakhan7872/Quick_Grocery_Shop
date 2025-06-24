import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { _axiosGetAPI } from '../../../Apis/Apis';
import { useEffect } from 'react';
import { addTOcart } from '../../../Components/Additemstocart';
import { DeleteCartData, UpdateCartData, db, getcartData } from '../../../Helperfunctions';

const useBestSellersDetails = (props) => {
    const [PopulerItems, setPopulerItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([])
    const [heartPressed, setHeartPressed] = useState(false)


    const handleToggleHeart = async () => {
    try {
      setHeartPressed(prev => !prev);

    //   // Call API
    //   if (!isFavorite) {
    //     await favoriteAPI(item.id); // 💡 Your "add to favorite" API
    //   } else {
    //     await unfavoriteAPI(item.id); // 💡 Your "remove from favorite" API
    //   }
    } catch (error) {
      console.log('Favorite toggle failed:', error);
    }
  };


    useEffect(() => {
        getPopulerItem()
    }, [])

    useEffect(() => {
        getcartData(data => {
            // console.log("dadsfasdfasdfasdfasdfasdfasfasd", data)
            if (data?.length) setCart(data)
        })
    }, [])

    const getPopulerItem = async () => {
        try {
            setLoading(true)
            await _axiosGetAPI('store/products/best-seller?limit=40&offset=1')
                .then(async response => {
                    setPopulerItems(response?.data?.data?.products);
                    setLoading(false);
                })
                .catch(err => {
                    console.log('Err,', err);
                    setLoading(false);
                });
        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false);
        }
    };

    const onPressPlus = async (item) => {

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


    return {
        PopulerItems, loading, cart, setCart, onPressPlus, onPressMinus,heartPressed,setHeartPressed,handleToggleHeart
    }
}

export default useBestSellersDetails