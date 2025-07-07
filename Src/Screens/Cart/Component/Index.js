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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Calendar } from 'react-native-calendars';


const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SCREEN_WIDTH / 3;







export const RenderDeliveryComponent = ({ seterrorMessage, selectedAddress, setselectedAddress, onpress, isOn, setIsOn, setSelectedTime, selectedTime, isFocus, setisFocus, data, checkOut, errorMessage }) => {
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



                    <Spacer height={hp(10)} />
                    <Button onPress={checkOut} title={"Check out"} height={wp(12)} />

                </View>

            )}
        </View>
    )
}
export const RenderSchedluedDeliveryComponent = ({ shwCalendar, setShowCalendar, selected, setSelected, seterrorMessage, calendarSelected, selectedAddress, setselectedAddress, onpress, isOn, setIsOn, setSelectedTime, selectedTime, isFocus, setisFocus, data, checkOut, errorMessage }) => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: hp(10) }}>
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
                    <TouchableOpacity onPress={() => setShowCalendar(!shwCalendar)} style={style.bottomSheetBox}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FontAwesome5 name="calendar-alt" size={20} color={Colors.BtnBackground} />
                            <Text style={style.selectedText}>
                                {selected ? moment(selected).format('dddd, MMMM Do') : "Select Date"}
                            </Text>
                        </View>
                        <View style={{ paddingRight: wp(2) }}>
                            <AntDesign
                                name={shwCalendar ? 'caretup' : 'caretdown'}
                                size={16}
                                color={Colors.Primary} // 👈 Blue color here
                            />
                        </View>


                    </TouchableOpacity>
                    {shwCalendar && (
                        <Calendar
                            onDayPress={day => {
                                setSelected(day.dateString);
                            }}
                            markedDates={{
                                [selected]: { selected: true, disableTouchEvent: false, selectedDotColor: 'red' }
                            }}

                            style={{ borderWidth: 1, borderRadius: 10, borderColor: '#D9F0FA' }}
                            hideExtraDays
                            minDate={todayDate}
                            theme={{
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: Colors.balckText,
                                textSectionTitleDisabledColor: Colors.balckText,
                                dayTextColor: Colors.balckText,
                                todayTextColor: Colors.BtnBackground,
                                selectedDayTextColor: 'white',
                                monthTextColor: 'black',
                                indicatorColor: 'black',
                                selectedDayBackgroundColor: Colors.BtnBackground,
                                arrowColor: Colors.balckText,
                                // textDisabledColor: 'red',
                                stylesheet: {
                                    calendar: {
                                        header: {
                                            week: {
                                                marginTop: 20,
                                                marginHorizontal: 12,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                borderTopWidth: 1,
                                                backgroundColor: 'red'
                                            }

                                        }
                                    }
                                }
                            }}
                        />
                    )}

                    <Spacer />

                    <View style={style.dropdownRow}>
                        <FontAwesome5 name="clock" size={20} color={Colors.BtnBackground} style={style.icon} />
                        <DropDown
                            placeholder="Select Time"
                            data={data}
                            value={selectedTime}
                            setisFocus={setisFocus}
                            isFocus={isFocus}
                            onChange={item => setSelectedTime(item.value)}
                            style={[style.dropdown]} // Added marginLeft for spacing

                        />
                    </View>




                    {(errorMessage.length) > 0 &&
                        <Text style={style.eror}>{errorMessage}</Text>}
                    <Spacer height={hp(10)} />
                    <Button onPress={checkOut} title={"Check out"} height={wp(12)} />

                </View>

            )}
        </ScrollView>
    )
}

export const RenderPickupComponent = ({ errorMessage, selectedDayIndex, setSelectedDayIndex, selectedDayItem, setSelectedDayItem, daysData, selectedTimeIndex, setSelectedTimeIndex, setSelectedTimeItem, timeArray, selectedTimeItem, flatListRef, flatListTimeRef, onScrollEndDay, onScrollEndTime, checkOut }) => {



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
                        snapToInterval={hp(6)} // Height of each item
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
                            paddingBottom: hp(6),
                        }}
                        renderItem={({ item, index }) => {
                            const isSelected = index === selectedDayIndex;
                            return (
                                <View
                                    style={{
                                        height: hp(6),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Colors.BtnBackground,
                                    }}
                                >
                                    <Text style={isSelected ? style.dayTextSelected : style.dayText}>
                                        {item.label}
                                    </Text>
                                </View>
                            );
                        }}
                    />
                </View>

                <View style={style.box}>
                    <FlatList
                        ref={flatListTimeRef}
                        data={timeArray}
                        keyExtractor={(item) => item.key}
                        showsVerticalScrollIndicator={false}
                        bounces={true}
                        scrollEnabled={true}
                        snapToInterval={hp(6)} // Height of each item
                        decelerationRate="fast"
                        onScrollEndDrag={onScrollEndTime}
                        onMomentumScrollEnd={onScrollEndTime}
                        getItemLayout={(data, index) => ({
                            length: hp(6),
                            offset: hp(6) * index,
                            index,
                        })}
                        contentContainerStyle={{
                            paddingTop: hp(5),   // 1 item height above
                            paddingBottom: hp(6 * 1), // 1 item height below
                        }}
                        renderItem={({ item, index }) => {
                            const isSelected = index === selectedTimeIndex;
                            return (
                                <View
                                    style={{
                                        height: hp(6),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderBottomWidth: 1,
                                        borderBottomColor: Colors.BtnBackground,
                                    }}
                                >
                                    <Text style={isSelected ? style.dayTextSelected : style.dayText}>
                                        {item.label}
                                    </Text>
                                </View>
                            );
                        }}
                    />
                </View>

            </View>
            {(errorMessage.length) > 0 &&
                <Text style={style.eror}>{errorMessage}</Text>}
            <Spacer height={hp(10)} />
            <Button onPress={checkOut} title={"Check out"} height={wp(12)} />
        </View>
    );
};



