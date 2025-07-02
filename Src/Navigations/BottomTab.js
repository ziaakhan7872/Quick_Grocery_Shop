import React, { useCallback, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import Home from '../Home';
import Account from '../Account';
import AddCart from '../AddCart';
import images from '../Components/Images';
import Category from '../Category';
import Search from '../Search';
import Myprofile from '../Screens/Profile/Myprofile';
import Favourite from '../Screens/Profile/Favourtie';
import ShowItems from '../Screens/Home/ShowItems';
import Checkout from '../Screens/Checkout/Checkout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import Colors from '../themes/colors';
import BrandDetail from '../Screens/Brandldetail/Brandldetail';
import { openDatabase } from 'react-native-sqlite-storage';
import CategoryDetail from '../Screens/CategoryDetail/CategoryDetail';
import { CategoryModal } from '../Components/Modal';
import { getAllCategery, getCategaryMinimal } from '../Apis/Apis';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { newEvents } from '../Components/CustomListner';
import TopSaverDetails from '../Screens/TopSaverDetails/TopSaverDetails';
import ShopQuick from '../Screens/Auth/ShopQuick';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getcartData } from '../Helperfunctions';

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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export const Homestack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ShowItems" component={ShowItems} />
      <Stack.Screen name="BrandDetail" component={BrandDetail} />
      <Stack.Screen name="TopSaverDetails" component={TopSaverDetails} />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetail}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};
const BottomTab = () => {
  const isFocused = useIsFocused();

  const [totalcart, settotalcart] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  useEffect(() => {
    getCategaryMinimal(setLoading, setCategories);
  }, []);
  useFocusEffect(
  useCallback(() => {
    checkCartItems(); // ✅ Runs every time screen is focused

    const handleCartUpdate = () => {
      checkCartItems(); // ✅ Respond to events
    };

    newEvents.addListener('addCart', handleCartUpdate);

    return () => {
      newEvents.removeListener('addCart', handleCartUpdate); // ✅ Cleanup
    };
  }, [checkCartItems]) // 👈 Add stable reference if needed
);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Hide the tab bar
        setIsTabBarVisible(false);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Show the tab bar
        setIsTabBarVisible(true);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const checkCartItems = async () => {

        getcartData(data => {
          console.log("cart data in useEffect", data);
    
          // ✅ Update state
          settotalcart(data.length);
    
         
        });
  
    
  };

  const navigation = useNavigation();
  const EmptyScreen = () => null

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,

          tabBarStyle: {
            backgroundColor: Colors.backgroundColor,
            borderTopWidth: 0.5,
            borderTopColor: Colors.Primary,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            elevation: 10,


            // position: 'absolute',
            // bottom: -30,
          },
        }}>
        <Tab.Screen
          name="homestack"
          component={Homestack}
          options={{
            headerShown: false,
            tabBarLabel: '',

            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={images.filledHome}
                  style={{
                    height: wp('6%'),
                    width: wp('6%'),
                    marginTop: 15,
                    tintColor: Colors.BtnBackground,
                  }}
                />
              ) : (
                <Image
                  source={images.unfillhome}
                  style={{ height: wp('6%'), width: wp('6%'), marginTop: 15 }}
                />
              ),
          }}
        />



        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            tabBarLabel: '',

            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={images.searchfilled}
                  style={{
                    height: wp('6%'),
                    width: wp('6%'),
                    marginTop: 15,
                    tintColor: Colors.BtnBackground,
                  }}
                />
              ) : (
                <Image
                  source={images.search}
                  style={{ height: wp('6%'), width: wp('6%'), marginTop: 15 }}
                />
              ),
          }}
        />
        {/* <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Image
                source={images.searchfilled}
                style={{
                  height: wp('6%'),
                  width: wp('6%'),
                  marginTop: 15,
                  tintColor: Colors.BtnBackground,
                }}
              />
            ) : (
              <Image
                source={images.search}
                style={{ height: wp('6%'), width: wp('6%'), marginTop: 15 }}
              />
            ),
        }}
      /> */}

        {isTabBarVisible && (
          <Tab.Screen
            name="Category"
            component={EmptyScreen}
            options={{
              tabBarIcon: () => (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsVisible(!isVisible)}
                    style={{
                      backgroundColor: Colors.Primary,
                      borderRadius: 100,
                      width: Platform.OS == 'ios' ? wp(16.53) : wp(16.53),
                      height: Platform.OS == 'ios' ? wp(16.53) : wp(16.53),
                      // marginTop: 10,
                      marginBottom: wp(6.265),
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: Colors.Primary,
                      shadowOffset: { width: 3, height: 5 },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      overflow: 'visible',
                      elevation: 10,

                      // backgroundColor: 'white'
                    }}>
                    <Image
                      source={images.element}
                      style={{
                        height: wp(8),
                        width: wp(8),
                        marginTop: 15,
                        tintColor: Colors.whitecolor,
                        marginBottom: wp(4.1),
                      }}
                    />
                  </TouchableOpacity>
                  {
                    isVisible ?
                      <CategoryModal
                        backdropOpacity={0.3}
                        backdropColor={'#00000099'}
                        isModalVisible={isVisible}
                        setIsModalVisible={setIsVisible}
                        data={categories}
                        onPress={item => {
                          setIsVisible(false),
                            navigation.navigate('homestack', {
                              screen: 'CategoryDetail',
                              params: {
                                item,
                              },
                            });
                        }}
                      /> : null
                  }


                </View>
              ),
              tabBarLabel: '',
            }}
          />
        )}

        <Tab.Screen
          name="AddCart"
          component={AddCart}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarBadge: totalcart > 0 ? totalcart : undefined,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <ImageBackground
                  source={images.filledcart}
                  style={{
                    height: wp('6%'),
                    width: wp('6%'),
                    marginTop: 15,
                    tintColor: Colors.BtnBackground,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* {totalcart > 0 && <View style={{ width: 10, height: 10, borderRadius: 12, backgroundColor: 'red' }} />} */}
                </ImageBackground>
              ) : (
                <ImageBackground
                  source={images.shoppingcart}
                  style={{
                    height: wp('6%'),
                    width: wp('6%'),
                    marginTop: 15,
                    tintColor: Colors.BtnBackground,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* {totalcart > 0 && <View style={{ width: 10, height: 10, borderRadius: 12, backgroundColor: 'red' }} />} */}
                </ImageBackground>
              ),
          }}
        />

        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Image
                  source={images.userfilled}
                  style={{
                    height: wp('6%'),
                    width: wp('6%'),
                    marginTop: 15,
                    tintColor: Colors.BtnBackground,
                  }}
                />
              ) : (
                <Image
                  source={images.userunfill}
                  style={{ height: wp('6%'), width: wp('6%'), marginTop: 15 }}
                />
              ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export const Profile = () => {
  return (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name="ShowItems" component={ShowItems} /> */}
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Myprofile" component={Myprofile} />
      <Stack.Screen name="Favourite" component={Favourite} />
      {/* <Stack.Screen name="Checkout" component={Checkout} /> */}
    </Stack.Navigator>
  );
};
// export const Mainhome = () =>{
//     return (

//         <Stack.Navigator   headerMode="none">

//             <Stack.Screen name="ShowItems" component={ShowItems} />

//         </Stack.Navigator>
//       );
// };
export default BottomTab;
