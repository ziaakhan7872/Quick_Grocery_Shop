import React from 'react';
import { SafeAreaView, Image, Dimensions, StatusBar, View } from 'react-native';
function Container(props) {
  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <StatusBar
        backgroundColor={props.backgroundColor}
        barStyle="dark-content"
      />
      {props.children}
    </SafeAreaView>
  );
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
};
export default Container;
