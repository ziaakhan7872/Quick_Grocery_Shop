import * as React from 'react';
import { StatusBar, LogBox, View } from 'react-native';
import StackNav from './Src/Navigations/stackNaviagtions';
import { Provider } from 'react-redux';
import { persistor, store } from './Src/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';


const db = openDatabase({ name: 'Grocery.db', createFromLocation: 1 });

const App = () => {
  LogBox.ignoreAllLogs();

  React.useEffect(() => {
    setupNotifications();

    const interval = setInterval(() => {
      checkCartItems();
    }, 2 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const setupNotifications = async () => {
    await notifee.requestPermission(); // ✅ Ask permission
    await notifee.createChannel({
      id: 'cart-reminder',
      name: 'Cart Reminder',
    });
  };

  const checkCartItems = async () => {
    try {
      db.transaction(function (tx) {
        tx.executeSql(
          'SELECT * FROM cartTable',
          [],
          async (tx, results) => {
            if (results.rows.length > 0) {
              console.log("cart has items ✅");
              // Toast.show('Your items are still in your cart. Don’t forget to checkout!')


              await notifee.displayNotification({
                title: '🛒 Items still in your cart!',
                body: 'Complete your order before they’re gone!',
                android: {
                  channelId: 'cart-reminder',
                  pressAction: {
                    id: 'default',
                  },
                },
                ios: {
                  sound: 'default',
                },
              });


            } else {
              console.log("no item")
            }
          },
          error => {
            console.log('Error selecting item from cartTable', error);
          },
        );
      });
    } catch (error) {
      console.log('Error in transaction', error);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={{ backgroundColor: 'green', flex: 1 }}>
          <StackNav />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
