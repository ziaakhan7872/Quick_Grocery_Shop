/**
 * @format
 */
import 'react-native-gesture-handler';

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

console.log(("this is  running", appName))


AppRegistry.registerComponent(Platform.OS == 'ios' ? "GroceryApp" : appName, () => App);
