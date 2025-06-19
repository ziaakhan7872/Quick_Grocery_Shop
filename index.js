/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const componentName = Platform.OS === 'ios' ? 'GroceryApp' : appName;
console.log('📱 Registering App Component:', componentName);

const db = openDatabase({ name: 'Grocery.db', createFromLocation: 1 });

const setupNotifications = async () => {
  try {
    await notifee.requestPermission();
    await notifee.createChannel({
      id: 'cart-reminder',
      name: 'Cart Reminder',
    });
    console.log('🔔 Notification channel set up');
  } catch (err) {
    console.error('❌ Notification setup failed:', err);
  }
};

const checkCartItems = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM cartTable',
      [],
      async (_, results) => {
        if (results.rows.length > 0) {
          console.log('🛒 Cart has items, sending notification...');
          await notifee.displayNotification({
            title: '🛒 Items still in your cart!',
            body: 'Complete your order before they’re gone!',
            android: {
              channelId: 'cart-reminder', // ✅ fixed
              smallIcon: 'ic_launcher',   // ✅ must exist in `android/app/src/main/res/drawable`
              pressAction: { id: 'default' },
            },
            ios: {
              sound: 'default',
            },
          });
        } else {
          console.log('✅ Cart is empty');
        }
      },
      (error) => {
        console.error('❌ Error reading cartTable:', error);
      }
    );
  });
};

// ✅ Run notification setup and polling
setupNotifications();
setInterval(checkCartItems, 2 * 60 * 60 *1000); // Every 1 min (for testing)

AppRegistry.registerComponent(componentName, () => App);
