import { Dimensions, Platform, StyleSheet } from "react-native";
import Colors from "../../themes/colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { fonts } from "../../Constant/Fonts";

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH / 3;

export const style = StyleSheet.create({
  btnadres: {
    backgroundColor: Colors.BtnBackground,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp(5),
    // marginTop: hp(5),
  },
  touchView: {
    width: wp(6),
    justifyContent: 'center',
  },
  touchimg: {
    width: wp(6),
    justifyContent: 'center',
    height: hp(3),
    alignSelf: 'center',
  },
  imglocate: {
    width: 18,
    height: 18,
    tintColor: Colors.whitecolor
    // width: Platform.OS === 'ios' ? wp(4) : wp(4),
    // height: Platform.OS === 'ios' ? hp(2) : hp(2.5),
  },
  viewDelivery: {
    width: wp(70),
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  deliveryAddress: {
    color: Colors.whitecolor,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
    fontWeight: '500',
  },
  containView: {
    borderWidth: 1,
    paddingHorizontal: hp(2),
    backgroundColor: Colors.BtnBackground,
    borderRadius: 10,
    paddingBottom: hp(2),
    borderColor: Colors.BtnBackground,
    // marginTop: hp(5),
  },
  containSubView: {
    flexDirection: 'row',
    marginTop: hp(2),
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  addressView: {
    width: wp(72),
    marginTop: hp(2),
    borderWidth: 0,
    borderColor: 'red',
    justifyContent: 'center',
  },
  addressTxt: {
    color: Colors.whitecolor,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 13.5,
  },
  edituncolor: {
    width: Platform.OS === 'ios' ? wp(4) : wp(4),
    height: Platform.OS === 'ios' ? hp(2) : hp(2.5),
  },
  scheduleLable: {
    color: Colors.grayText,
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "400"
  },
  pickUpBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  box: {
    flex: 1,
    marginHorizontal: wp(1),
    borderWidth: 1.5,
    borderColor: Colors.BtnBackground,
    borderRadius: wp(2),
    height: hp(20),
  },
  eror: {
    fontSize: 14,
    alignSelf: "center",
    marginTop: hp(5),
    fontFamily: fonts.PoppinsRegular,
    color: 'red'
  },
  dayItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(10),
  },
  dayText: {
    fontSize: 10,
    color: Colors.BtnBackground,
    opacity: 0.7,
    fontWeight: "400"
  },
  dayTextSelected: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.BtnBackground,
  },
  timeItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timeText: {
    fontSize: 16,
  },
  bottomSheetBox: {
    flexDirection: "row",
    alignItems: "center",
    height: hp(6),
    borderColor: Colors.BtnBackground,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: wp(1),
    justifyContent:"space-between"
  },
  selectedText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: Colors.BtnBackground,
    paddingLeft: wp(1)
  },
  dropdownRow: {
    flexDirection: 'row',  // Align items horizontally
    alignItems: 'center',  // Vertically align items
    width: "100%",  // Set full width
  },
  icon: {
    position: "absolute",
    marginLeft: wp(1)
  },
  dropdown: {
    flex: 1,  // Make DropDown take the available space
    borderWidth: 1,  // Add border if needed
    borderRadius: 8,  // Optional: Add border radius to make it look more polished
    paddingHorizontal: wp(3),
    width: wp(90)
  },
})