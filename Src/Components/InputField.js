import React, { useState } from "react";
import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity, TextInput } from "react-native";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import images from "./Images";
import { useTheme } from '@react-navigation/native'
import { Colors } from "../Components/Index";

const InputField = (props) => {
    const { colors } = useTheme();
    const styles = makeStyles(colors)
    const [hide, setHide] = useState(true)

    return (
        <View
            // style={[styles.textInputStyle, props.shadow ? null : styles.boxWithShadow, {
            style={[styles.textInputStyle, props.shadow ? null : null, {
                marginTop: props.marginTop ? props.marginTop : wp(0),
                borderRadius: props.borderRadius ? props.borderRadius : 10,
                borderWidth: 1,
                borderColor: props.borderColor,
                backgroundColor: props.backgroundColor
                    ? props.backgroundColor
                    : Colors.backgroundColor
            }]} >

            {props.leftIcon &&
                <Image
                    style={{ width: 24, height: 24, marginLeft: hp(1.5), tintColor: Colors.BtnBackground }}
                    source={images.keyicon}
                // color={props.iconColor}   
                />}

            <TextInput
                {...props}
                // style={{fontFamily: fonts.LatoBold}}
                placeholder={props.placeholder}
                value={props.value}
                maxLength={props.maxLength}
                onFocus={props.onFocus}
                textAlign={props?.textAlign}
                borderColor={props.borderColor}
                secureTextEntry={hide}
                // caretHidden={true}
                // keyboardType="numeric"
                placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : "#94959B"}
                // onChangeText={text => onChangeText(text)}
                style={{
                    flex: 1, height: props.height ? props.height : 50,
                    borderRadius: props.borderRadius ? props.borderRadius : 10,
                    paddingLeft: props.paddingLeft ? props.paddingLeft : 10,
                    paddingRight: props.paddingRight ? props.paddingRight : 10,
                    backgroundColor: props.backgroundColor ? props.backgroundColor : colors.textInPutColor,
                    // fontFamily: props.fontFamily ? props.fontFamily : fonts.LatoRegular,
                    fontSize: props.fontSize ? props.fontSize : 14,
                    color: props.color ? props.color : colors.text,

                }}
            />
            {props.secureText &&
                <TouchableOpacity style={{ paddingRight: wp(1.8), }} onPress={() => setHide(!hide)}>
                    {/* <Image source={require("../Assets/Images/passwordHide.png")} style={{ width: wp(5), height: wp(5) }} resizeMode={"contain"}></Image> */}

                    <Image
                        style={{
                            width: 19.57,
                            height: 16.55,
                        }}
                        source={hide ? images.eyeclose : images.eye}
                        color={props.iconColor}


                    />
                    {/* <Text style={{color: th}}>BNB</Text> */}
                </TouchableOpacity>
            }
            {props.RightText &&
                <Text style={{
                    color: props.textColor, marginRight: wp(3),
                    // fontFamily: fonts.LatoRegular
                }}>{props.RightTextTitle}</Text>
            }

        </View>

    )
}

export const SearchInputField = (props) => {
    const { colors } = useTheme();
    const styles = makeStyles(colors)
    const [hide, setHide] = useState(true)

    return (
        <View
            // style={[styles.textInputStyle, props.shadow ? null : styles.boxWithShadow, {
            style={[styles.textInputStyle, props.shadow ? null : null, {
                marginTop: props.marginTop ? props.marginTop : wp(0),
                borderRadius: props.borderRadius ? props.borderRadius : 10,
                // borderWidth: 1,
                marginHorizontal: wp(5),
                height: hp(5.36),
                borderColor: props.borderColor,
                backgroundColor: props.backgroundColor
                    ? props.backgroundColor
                    : Colors.backgroundColor,

            }, props.styles]} >

            {props.leftIcon &&
                <Image
                    style={{ width: 24, height: 24, marginLeft: hp(1.5), tintColor: Colors.BtnBackground }}
                    source={props.leftIcon}
                // color={props.iconColor}   
                />}

            <TextInput
                {...props}
                onPressIn={props.onPress}
                // style={{fontFamily: fonts.LatoBold}}
                placeholder={props.placeholder}
                value={props.value}
                editable={props.editable}
                maxLength={props.maxLength}
                onFocus={props.onFocus}
                onChangeText={props.onChangeText}
                textAlign={props?.textAlign}
                borderColor={props.borderColor}
                secureTextEntry={props.secureTextEntry}
                // caretHidden={true}
                // keyboardType="numeric"
                placeholderTextColor={props.placeholderTextColor ? props.placeholderTextColor : "#94959B"}
                // onChangeText={text => onChangeText(text)}
                style={{
                    flex: 1, height: props.height ? props.height : 50,
                    borderRadius: props.borderRadius ? props.borderRadius : 10,
                    paddingLeft: props.paddingLeft ? props.paddingLeft : 10,
                    paddingRight: props.paddingRight ? props.paddingRight : 10,
                    backgroundColor: props.backgroundColor ? props.backgroundColor : colors.textInPutColor,
                    // fontFamily: props.fontFamily ? props.fontFamily : fonts.LatoRegular,
                    fontSize: props.fontSize ? props.fontSize : 14,
                    color: props.color ? props.color : colors.text,

                }}
            />
            {props.secureText &&
                <TouchableOpacity style={{ paddingRight: wp(1.8), }} onPress={() => setHide(!hide)}>
                    {/* <Image source={require("../Assets/Images/passwordHide.png")} style={{ width: wp(5), height: wp(5) }} resizeMode={"contain"}></Image> */}

                    <Image
                        style={{
                            width: 19.57,
                            height: 16.55,
                        }}
                        source={hide ? images.eyeclose : images.eye}
                        color={props.iconColor}


                    />
                    {/* <Text style={{color: th}}>BNB</Text> */}
                </TouchableOpacity>
            }
            {props.RightText &&
                <Text style={{
                    color: props.textColor, marginRight: wp(3),
                    // fontFamily: fonts.LatoRegular
                }}>{props.RightTextTitle}</Text>
            }
            {
                props?.isCrossIcon ?
                    <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={props?.onPressCross}>
                        <Image
                            source={images.crossicon}
                            style={{ height: hp('2%'), width: wp('2.5%'), marginEnd: wp(5) }}
                        />
                    </TouchableOpacity> : null
            }

        </View>

    )
}
export default InputField;
const makeStyles = (colors) => StyleSheet.create({
    textInputStyle: {
        flexDirection: "row",
        alignItems: "center"
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
});
