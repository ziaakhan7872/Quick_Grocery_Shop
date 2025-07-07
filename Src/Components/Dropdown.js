import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../themes/colors'; // adjust your path
import AntDesign from 'react-native-vector-icons/AntDesign';

const DropDown = ({
    label,
    data = [],
    value,
    onChange,
    placeholder = 'Select an option',
    style = {},
    containerStyle = {},
    dropdownStyle = {},
    setisFocus,
    isFocus = false,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <Dropdown
                style={[styles.dropdown, style]}
                placeholderStyle={styles.placeholder}
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.itemText}
                data={data}
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={() => setisFocus(true)}
                onBlur={() => setisFocus(false)}
                renderRightIcon={() => (
                    <AntDesign
                        name={isFocus ? 'caretup' : 'caretdown'}
                        size={16}
                        color={Colors.Primary} // 👈 Blue color here
                    />
                )}
            />
        </View>
    );
};

export default DropDown;

const styles = StyleSheet.create({
    container: {
        marginVertical: hp(1),
    },
    label: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: Colors.grayText,
        marginBottom: hp(0.5),
        marginLeft: 10,
    },
    dropdown: {
        height: hp(6),
        borderColor: Colors.BtnBackground,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: wp(3),
        
    },
    placeholder: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: Colors.BtnBackground,
        paddingLeft:wp(3)
    },
    selectedText: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: Colors.BtnBackground,
         paddingLeft:wp(3)
    },
    itemText: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        color: Colors.black,
    },
});
