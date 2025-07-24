import * as React from 'react';
import { StatusBar, LogBox, View, Platform } from 'react-native';
import StackNav from './Src/Navigations/stackNaviagtions';
import { Provider } from 'react-redux';
import { persistor, store } from './Src/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openDatabase } from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';


const db = openDatabase({ name: 'Grocery.db', createFromLocation: 1 });

const App = () => {
  LogBox.ignoreAllLogs();

  const [isNotificationActive, setIsNotificationActive] = React.useState(false);

  React.useEffect(() => {
    setupNotifications();
    
    const interval = setInterval(() => {
      if (!isNotificationActive) {  
        checkCartItems();
      }
    }, 2 * 60 * 60 * 1000); 

    return () => clearInterval(interval);
  }, [isNotificationActive]);

  const setupNotifications = async () => {
    await notifee.requestPermission();  
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
            if (results.rows.length > 0 && !isNotificationActive) {
              console.log("cart has items ✅");
              setIsNotificationActive(true);

              await notifee.displayNotification({
                title: '🛒 Items still in your cart!',
                body: 'Complete your order before they’re gone!',
                android: {
                  channelId: 'cart-reminder',
                  pressAction: { id: 'default' },
                },
                ios: {
                  sound: 'default',
                },
              });

              // Optional: Set a timeout to reset the notification state after 15 minutes
              setTimeout(() => {
                setIsNotificationActive(false); // Reset state after 15 minutes
              }, 15 * 60 * 1000);
            } else {
              console.log("No items in cart");
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



React.useEffect(() => {
  const askPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const status = await getTrackingStatus();

        if (status === 'not-determined') {
          const newStatus = await requestTrackingPermission();
          console.log('ATT requested, status:', newStatus);
        } else {
          console.log('ATT status:', status);
        }
      } catch (error) {
        console.log('ATT error:', error);
      }
    }
  };

  askPermission();
}, []);

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
