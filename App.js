import * as React from 'react';
import { StatusBar, LogBox, View } from 'react-native'; // Import StatusBar
import StackNav from './Src/Navigations/stackNaviagtions';
import { Provider } from 'react-redux';
import { persistor, store } from './Src/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';


const App = props => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* Set StatusBar style and backgroundColor */}
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={{ backgroundColor: 'green', flex: 1 }}>
          <StackNav />
        </View>

        {/* Render your navigation stack */}

      </PersistGate>
    </Provider>
  );
};

export default App;
