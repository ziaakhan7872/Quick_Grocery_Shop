import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { _axiosGetAPI, _axiosGetAPI1, _axiosGetAPITesting, _AxiosGetBearer, _AxiosGetBearerAUTH, _axiosPostAPI } from '../../../Apis/Apis';
import { addTOcart } from '../../../Components/Additemstocart';
import { DeleteCartData, UpdateCartData, db, getcartData, requestUserPermission } from '../../../Helperfunctions';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { newEvents } from '../../../Components/CustomListner';
import { getMessaging } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';


const useHome = (props) => {
    const dispatch = useDispatch();
    const userToken = useSelector(response => {
        return response?.userdataReducer?.userData?.userToken;
    });
    const app = getApp(); // Get the default Firebase app instance
    const messaging = getMessaging(app);
    const [PopulerItems, setPopulerItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [searchText, setSearchText] = useState('')
    const [topSaver, setTopSaver] = useState([])
    const [TotalPrice, setTotalPrice] = useState(0);
    const [isMystryShow, setIsMystryShow] = useState(false)
    const [mystryLimit, setMystryLimit] = useState(0)
    const [heartPressed, setHeartPressed] = useState({})


    useEffect(() => {



        _axiosGetAPI1('https://prod-api.quick.shop/products/store/products/top-saver?limit=20&offset=1').then(res => {
            console.log("this is top saver", res?.data?.data)
            setTopSaver(res?.data?.data?.products)
        }).catch(error => {
            console.log("this is error", error)
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        console.log("userToken", userToken)
        if (userToken) {
            _AxiosGetBearer("discounts/mystery/box", userToken).then(res => {
                console.log("res", res)
                setIsMystryShow(res?.data?.length ? res?.data[0]?.isPublish : false)
                setMystryLimit(res?.data?.length ? res?.data[0]?.cap : 0)

            }).catch(error => {
                console.log("error", error)
            })
        }

    }, [userToken, mystryLimit])

    useFocusEffect(
        React.useCallback(() => {
            getcartDataPrice();

            return () => {
                // Do something when the screen loses focus
            };
        }, []),
    );

    // useEffect for get fcm token and save it into firebase
    useEffect(() => {
        if (userToken) requestUserPermission(userToken)

    }, [userToken])


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

    // Foreground message handler
    useEffect(() => {
        const unsubscribe = messaging.onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        messaging
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state:', remoteMessage.notification);
                }
            });

        const unsubscribe = messaging.onNotificationOpenedApp(remoteMessage => {
            console.log('Notification caused app to open from background state:', remoteMessage.notification);
        });

        return unsubscribe;
    }, []);


    // Background message handler
    messaging.setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });

    useEffect(() => {
        getPopulerItem()
    }, [])

    const getPopulerItem = async () => {
        try {
            // setLoading(true)
            await _axiosGetAPI('store/products/best-seller?limit=40&offset=1')
                .then(async response => {
                    setPopulerItems(response?.data?.data?.products);
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false);
        }
    };
    const onPressPlus = async (item) => {
        console.log('itemitemitemitem', item);

        const cartCopy = [...cart];
        const filter = cartCopy.filter(i => i?.Productid !== item?.id);
        const find = cartCopy.find(i => i?.Productid === item?.id);

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
            CartData()
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
        } catch (error) {
            console.log("💥 Favourite toggle error:", error);
        }
    };


    const onChangeText = (text) => {
        setSearchText(text)
        if (text?.length) {
            _axiosGetAPI1(`https://prod-api.quick.shop/products/store/products/?&limit=10&offset=1&search=name=${text}&&filter=isPublish=eq:true`).then(res => {
                if (res?.data?.data?.products?.length > 0) setSearchResults(res?.data?.data?.products)
                else setSearchResults([])
            })
        } else setSearchResults([])

    }


    return {
        PopulerItems, setPopulerItems, loading, setLoading, cart, setCart, onPressMinus, onPressPlus, searchResults, onChangeText, topSaver, searchText, setSearchText, setSearchResults,
        TotalPrice, setTotalPrice, isMystryShow, setIsMystryShow, mystryLimit, setMystryLimit, heartPressed, handleToggleHeart,setHeartPressed
    }
}

export default useHome