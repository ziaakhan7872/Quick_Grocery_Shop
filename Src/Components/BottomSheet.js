import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// import colors if needed

const BottomSheet = forwardRef(({
  children,
closeOnDragDown = true,
  closeOnPressMask = true,
  customContainerStyle = {},
}, ref) => {
    console.log("BottomSheet rendered",ref);
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={closeOnDragDown}
      closeOnPressMask={closeOnPressMask}
    //   height={height}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(52, 52, 52, 0.3)',
        },
        draggableIcon: {
          backgroundColor: "#E4E4E4",
          width: wp('30%'),
        },
        container: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          ...customContainerStyle,
        },
      }}
    >
      {children}
    </RBSheet>
  );
});

export default BottomSheet;
