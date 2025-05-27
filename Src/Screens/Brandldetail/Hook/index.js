import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { _axiosGetAPI, _axiosGetAPI1 } from '../../../Apis/Apis'
import { addTOcart } from '../../../Components/Additemstocart'
import { DeleteCartData, UpdateCartData, getcartData } from '../../../Helperfunctions'
import { useIsFocused } from '@react-navigation/native'

const useBrandDetails = (props) => {
    const [productlist, setproductlist] = useState([])
    const [afterelement, setafterelement] = useState(1)
    const [loading, setLoading] = useState(false);
    const [showLoadmore, setshowLoadmore] = useState(false);
    const [cart, setCart] = useState([])
    const [hasmore, setHasMore] = useState(true)




    let id = props?.route?.params?.item?.id
    useEffect(() => {
        getallBrands(afterelement)
    }, [])



    const isFocused = useIsFocused();
    useEffect(() => {
        getcartData(data => {
            if (data?.length) setCart(data)
        })
    }, [useIsFocused()])

    const getallBrands = async (offset) => {
        if (hasmore) {
            try {
                // setLoading(true)
                // await _axiosGetAPI(`brands/${id}/products?limit=20&offset=${offset}`)
                await _axiosGetAPI1(`https://prod-api.quick.shop/products/store/products?offset=${offset}&limit=28&filter=brandId=in:[${id}];isPublish=eq:true`)
                    .then(async response => {
                        console.log('getallBrands', response);
                        setproductlist((prev) => [...prev, ...response?.data?.data?.products])
                        let ofst = afterelement + 1
                        setafterelement(ofst)
                        if (response?.data?.data?.brandProducts?.length == 20) {
                            setshowLoadmore(true)
                            setHasMore(true)
                        }
                        else {
                            setshowLoadmore(false)
                            setHasMore(false)

                        }
                        setLoading(false)
                    })
                    .catch(err => {
                        console.log('Err,', err);
                        setLoading(false)
                        setshowLoadmore(false)
                        setHasMore(false)

                    });
            } catch (error) {
                console.log('errorerrorerrorerror', error);
                setLoading(false)

            }
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
            // console.log("data", data)
            // setCart(data)
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
        productlist, hasmore, setproductlist, afterelement, setafterelement, loading, showLoadmore, setshowLoadmore, id, getallBrands, onPressPlus, onPressMinus, cart
    }
}

export default useBrandDetails