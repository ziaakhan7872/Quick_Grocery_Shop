import React, { useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../Splash';
import Register from '../Screens/Auth/Register';
import Login from '../Screens/Auth/Login';
import BottomTab from './BottomTab';
import ConfirmOrder from '../ConfirmOrder';
import GetStarted from '../Screens/Auth/GetStarted';
import Phonenumber from '../Screens/Auth/Phoneno';
import VerificationCode from '../Screens/Auth/VerificationCode';
import Location from '../Screens/Auth/Location';
import ResetPass from '../Screens/Auth/ResetPass';
import Myprofile from '../Screens/Profile/Myprofile';
import ChangePassword from '../Screens/Profile/ChangePassword';
import Address from '../Screens/Profile/Address';
import AddAddress from '../Screens/Profile/AddAddress';
import Wallet from '../Screens/Profile/Wallet';
import OrderHistory from '../Screens/Profile/OrderHistory';
import OrderInfo from '../Screens/Profile/OrderInfo';
import Addcard from '../Screens/Profile/Addcard';
import NewProduct from '../Screens/Profile/NewProduct';


import Help from '../Screens/Profile/Help';
import Term from '../Screens/HelpSupport/Term';
import Notifications from '../Screens/Profile/Notifications';
import Report from '../Screens/HelpSupport/Report';
import FAQ from '../Screens/HelpSupport/FAQ';
import Checkout from '../Screens/Checkout/Checkout';
import Successfulorder from '../Screens/Checkout/Successful';
import Trackorder from '../Screens/Checkout/Trackorder';
import Message from '../Screens/Checkout/Message';
import Delivered from '../Screens/Checkout/Delivered';
import Successfuldelivered from '../Screens/Checkout/Successfuldelivered';
import ShowItems from '../Screens/Home/ShowItems';
import Privacy from '../Screens/HelpSupport/Privacy';
import Return from '../Screens/HelpSupport/Return';
import Notify from '../Notify';
import SelectLocation from '../Screens/Auth/SelectLocation';
import ForgetPass from '../Screens/Auth/ForgetPass';
import CheckEmail from '../Screens/Auth/CheckEmail';
import NewPass from '../Screens/Auth/NewPass';
import CategoryDetail from '../Screens/CategoryDetail/CategoryDetail';
import BrandDetail from '../Screens/Brandldetail/Brandldetail';
import DeliveryType from '../Screens/Checkout/DeliveryType';
import PaymentMethod from '../Screens/Checkout/PaymentMethod';
import BestSellers from '../Screens/BestSellers/BestSellers';
import BestSellersDetails from '../Screens/BesSellerDetails/BestSellerDetails';
import FutureBrands from '../Screens/FutureBrands/FutureBrands';
import TopSaverDetails from '../Screens/TopSaverDetails/TopSaverDetails';
import EditAddress from '../Screens/Profile/EditAddress';
import WebView from '../Screens/Profile/WebView';
import WebViewComponent from '../Screens/Profile/WebView';
import Search from '../Search';
import MainSearch from '../MainSearch';
import ShopQuick from '../Screens/Auth/ShopQuick';
import SignUp from '../Screens/Auth/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../Home';
import SelfPickup from '../Screens/SelfPickup/SelfPickup';
import GoogleMap from '../Screens/GoogleMap/GoogleMap';
import Favourite from '../Screens/Favourite/Index';
import OnlinePickupDelivery from '../Screens/OnlinePickupDelivery/Index';

const Stack = createStackNavigator();

const StackNav = () => {
  // const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShopQuick"
          component={ShopQuick}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Phonenumber"
          component={Phonenumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerificationCode"
          component={VerificationCode}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectLocation"
          component={SelectLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPass"
          component={ResetPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onlinePickUpDeliver"
          component={OnlinePickupDelivery}
          options={{ headerShown: false }}
        />



        <Stack.Screen
          name="Myprofile"
          component={Myprofile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favourite"
          component={Favourite}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderInfo"
          component={OrderInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Addcard"
          component={Addcard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewProduct"
          component={NewProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Help"
          component={Help}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Term"
          component={Term}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQ}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Successfulorder"
          component={Successfulorder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Trackorder"
          component={Trackorder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Message"
          component={Message}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Delivered"
          component={Delivered}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Successfuldelivered"
          component={Successfuldelivered}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ShowItems"
          component={ShowItems}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Return"
          component={Return}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notify"
          component={Notify}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPass"
          component={ForgetPass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckEmail"
          component={CheckEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPass"
          component={NewPass}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DeliveryType"
          component={DeliveryType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BestSellers"
          component={BestSellers}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BestSellersDetails"
          component={BestSellersDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FutureBrands"
          component={FutureBrands}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditAddress"
          component={EditAddress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainSearch"
          component={MainSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelfPickup"
          component={SelfPickup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoogleMapScreen"
          component={GoogleMap}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNav;
