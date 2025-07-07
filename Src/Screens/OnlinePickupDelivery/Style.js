import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { fonts } from "../../Constant/Fonts";
import Colors from "../../themes/colors";


export const style = StyleSheet.create({
    modalBackground: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  text: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: fonts.PoppinsRegular,
    color: Colors.balckText
  },
  subView: {
    marginHorizontal: hp(4),
    marginTop: hp(1)
  },
  standerdbtn: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
    marginHorizontal: wp(4)
  },
})