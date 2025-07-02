import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Colors from '../../../themes/colors';
import images from '../../../Components/Images';
import { style } from '../Style';
import Spacer from '../../../Components/Spacer';
import ToggleSwitch from 'toggle-switch-react-native';
import DropDown from '../../../Components/Dropdown';
import { daysData, timeArray } from '../../../Constant/Time';
import Button from '../../../Components/Button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FlatList } from 'react-native';
import moment from 'moment';
import { ScrollView } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH / 3;







export const RenderDeliveryComponent = ({ selectedAddress, setselectedAddress, onpress, isOn, setIsOn, setSelectedTime, selectedTime, isFocus, setisFocus, data, checkOut }) => {
    return (
        <View>
            <Spacer />
            {selectedAddress == '' ? (
                <TouchableOpacity
                    onPress={onpress}
                    style={[style.btnadres, { backgroundColor: Colors.Primary }]}>
                    <View style={style.touchView}>
                        <Image source={images.locateicon} style={[style.imglocate, { tintColor: Colors.whitecolor }]} />
                    </View>

                    <View style={style.viewDelivery}>
                        <Text style={[style.deliveryAddress, { color: Colors.whitecolor }]}>
                            Select Delivery Address
                        </Text>
                    </View>
                </TouchableOpacity>

            ) : (
                <View>
                    <TouchableOpacity activeOpacity={0.9}
                        onPress={onpress}
                        style={[style.containView, { backgroundColor: Colors.Primary, borderWidth: 0 }]}>
                        <View style={style.containSubView}>
                            <TouchableOpacity style={style.touchView}>
                                <Image source={images.locateicon} style={[style.imglocate, { tintColor: Colors.whitecolor }]} />
                            </TouchableOpacity>
                            <View style={style.viewDelivery}>
                                <Text style={[style.deliveryAddress, { color: Colors.whitecolor }]}>Delivery Address</Text>
                            </View>
                            <TouchableOpacity
                                onPress={onpress}
                                style={style.touchimg}>
                                <Image source={images.edituncolor} style={[style.edituncolor, { tintColor: Colors.whitecolor }]} />
                            </TouchableOpacity>
                        </View>
                        <View style={style.addressView}>
                            <Text style={[style.addressTxt, { color: Colors.whitecolor }]}>{selectedAddress?.address}</Text>
                        </View>
                    </TouchableOpacity>
                    <Spacer />
                    <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: Colors.borderColor, borderRadius: 10, padding: 10 }}>
                        <ToggleSwitch
                            isOn={isOn}
                            onColor={Colors.BtnBackground}
                            offColor={Colors.grayText}
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="small"
                            onToggle={isOn => setIsOn(isOn)}
                        />
                        <Text style={style.scheduleLable}>Schedule</Text>
                    </View>
                    <Spacer />
                    {isOn && (
                        <DropDown data={data} value={selectedTime} setisFocus={setisFocus} isFocus={isFocus} onChange={item => setSelectedTime(item.value)} />
                    )}
                    <Spacer height={hp(10)} />
                    <Button onPress={checkOut} title={"Check out"} height={wp(12)} />

                </View>

            )}
        </View>
    )
}

export const RenderPickupComponent = ({ selectedDayIndex, setSelectedDayIndex, selectedDayItem, setSelectedDayItem, daysData, selectedTimeIndex, setSelectedTimeIndex, setSelectedTimeItem, timeArray, selectedTimeItem, flatListRef, flatListTimeRef, onScrollEndDay, onScrollEndTime, checkOut }) => {



    return (
        <View>
            <Spacer height={hp(3)} />
            <View style={style.pickUpBox}>

                {/* Day Selector */}
                <View style={style.box}>
                    <FlatList
                        ref={flatListRef}
                        data={daysData}
                        keyExtractor={(item) => item.key}
                        showsVerticalScrollIndicator={false}
                        bounces={true}
                        scrollEnabled={true}
                        snapToInterval={hp(6)}
                        decelerationRate="fast"
                        onScrollEndDrag={onScrollEndDay}
                        onMomentumScrollEnd={onScrollEndDay}
                        getItemLayout={(data, index) => ({
                            length: hp(6),
                            offset: hp(6) * index,
                            index,
                        })}
                        contentContainerStyle={{
                            paddingTop: hp(5),
                            paddingBottom: hp(6 * 1)
                        }}
                        renderItem={({ item, index }) => {
                            const isSelected = index === selectedDayIndex;
                            return (
                                <View style={{ height: hp(6), justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={isSelected ? style.dayTextSelected : style.dayText}>
                                        {item.label}
                                    </Text>
                                </View>
                            );
                        }}
                    />

                </View>

                {/* Time Selector */}
                <View style={style.box}>
                    <FlatList
                        ref={flatListTimeRef}
                        data={timeArray}
                        keyExtractor={(item) => item.key}
                        showsVerticalScrollIndicator={false}
                        bounces={true}
                        scrollEnabled={true}
                        snapToInterval={hp(6)}
                        decelerationRate="fast"
                        onScrollEndDrag={onScrollEndTime}
                        onMomentumScrollEnd={onScrollEndTime}
                        getItemLayout={(data, index) => ({
                            length: hp(6),
                            offset: hp(6) * index,
                            index,
                        })}
                        contentContainerStyle={{
                            paddingTop: hp(6),   // 1 item height above
                            paddingBottom: hp(6 * 1) // 1 item height below
                        }}
                        renderItem={({ item, index }) => {
                            const isSelected = index === selectedTimeIndex;
                            return (
                                <View style={{ height: hp(6), justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={isSelected ? style.dayTextSelected : style.dayText}>
                                        {item.label}
                                    </Text>
                                </View>
                            );
                        }}
                    />
                </View>

            </View>
            <Spacer height={hp(10)} />
            <Button onPress={checkOut} title={"Check out"} height={wp(12)} />
        </View>
    );
};



