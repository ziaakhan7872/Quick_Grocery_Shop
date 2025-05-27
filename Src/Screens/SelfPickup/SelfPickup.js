import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, FlatList, Modal, Platform } from 'react-native'
import React, { useState, useEffect } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { images, Button, fonts, Colors, iconPath, Container } from "../../Components/Index";
import Spacer from '../../Components/Spacer';

const SelfPickup = (props) => {
    const [selected, setSelected] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Select Delivery Time');
    const [items, setItems] = useState([]);
    const [errorMesssage, seterrorMesssage] = useState('');

    useEffect(() => {
        getTime(new Date().toISOString().split('T')[0])
        setSelected(new Date().toISOString().split('T')[0])

    }, [])


    const confirmDeliveryType = () => {
        seterrorMesssage('')

        if (selectedItem != 'Select Delivery Time') {
            console.log("selected + ' ' + selectedItem", selected + ' ' + selectedItem)
            props.route.params.setPickupTime(combineDateTimeLocal(selected, selectedItem))
            props.navigation.goBack()
        }
        else {
            console.log('select Time');
            seterrorMesssage('Please select pickup Time')
        }
    }



    function combineDateTimeLocal(date, time) {
        // Split date into year, month, and day
        const [year, month, day] = date.split('-').map(Number);

        // Split time into hour and minute, and determine AM/PM
        const [timePart, meridian] = time.split(' ');
        let [hour, minute] = timePart.split(':').map(Number);

        // Adjust hour based on AM/PM
        if (meridian === "PM" && hour !== 12) {
            hour += 12;
        } else if (meridian === "AM" && hour === 12) {
            hour = 0;
        }

        // Format to "YYYY-MM-DDTHH:mm:ss" in local time
        const formattedDateTime = `${year.toString().padStart(4, '0')}-${month
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour
                .toString()
                .padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;

        return formattedDateTime;
    }
    const getTime = (selectedDate) => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        const openingHour = 8; // Opening hour (9 AM)
        const closingHour = 0; // Closing hour (12 AM)

        const times = [];
        const currentDate = new Date().toISOString().split('T')[0];

        if (selectedDate === currentDate) {
            // If the selected date is the current date, generate the times dynamically
            for (let hour = openingHour; hour !== closingHour; hour = (hour + 1) % 24) {
                for (let minute = 0; minute < 60; minute += 30) {
                    // Check if the current time is before the current hour and minute
                    if (hour < currentHour || (hour === currentHour && minute <= currentMinute)) {
                        continue; // Skip adding past times
                    }

                    const hourString =
                        hour === 0 ? '12' : (hour % 12 === 0 ? 12 : hour % 12).toString().padStart(2, '0');
                    const minuteString = minute.toString().padStart(2, '0');
                    const meridiem = hour < 12 ? 'AM' : 'PM';

                    const timeLabel = `${hourString}:${minuteString} ${meridiem}`;
                    const timeValue = `${hourString}:${minuteString} ${meridiem}`;

                    times.push({ label: timeLabel, value: timeValue });
                }
            }

            // Add the last closing time (12 AM)
            times.push({ label: '12:00 AM', value: '12:00 AM' });
        } else {
            // If the selected date is not the current date, use the previous list of times
            times.push(
                { label: '8:00 AM', value: '8:00 AM' },
                { label: '8:30 AM', value: '8:30 AM' },
                { label: '9:00 AM', value: '9:00 AM' },
                { label: '9:30 AM', value: '9:30 AM' },
                { label: '10:00 AM', value: '10:00 AM' },
                { label: '10:30 AM', value: '10:30 AM' },
                { label: '11:00 AM', value: '11:00 AM' },
                { label: '11:30 AM', value: '11:30 AM' },
                { label: '12:00 PM', value: '12:00 PM' },
                { label: '12:30 PM', value: '12:30 PM' },
                { label: '1:00 PM', value: '1:00 PM' },
                { label: '1:30 PM', value: '1:30 PM' },
                { label: '2:00 PM', value: '2:00 PM' },
                { label: '2:30 PM', value: '2:30 PM' },
                { label: '3:00 PM', value: '3:00 PM' },
                { label: '3:30 PM', value: '3:30 PM' },
                { label: '4:00 PM', value: '4:00 PM' },
                { label: '4:30 PM', value: '4:30 PM' },
                { label: '5:00 PM', value: '5:00 PM' },
                { label: '5:30 PM', value: '5:30 PM' },
                { label: '6:00 PM', value: '6:00 PM' },
                { label: '6:30 PM', value: '6:30 PM' },
                { label: '7:00 PM', value: '7:00 PM' },
                { label: '7:30 PM', value: '7:30 PM' },
                { label: '8:00 PM', value: '8:00 PM' },
                { label: '8:30 PM', value: '8:30 PM' },
                { label: '9:00 PM', value: '9:00 PM' },
                { label: '9:30 PM', value: '9:30 PM' },
                { label: '10:00 PM', value: '10:00 PM' },
                { label: '10:30 PM', value: '10:30 PM' },
                { label: '11:00 PM', value: '11:00 PM' },
                { label: '11:30 PM', value: '11:30 PM' },
                { label: '12:00 AM', value: '12:00 AM' },
            );
        }

        // Update the state with the generated or previous times array
        setItems(times);
    };



    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];

    const handleDropdownPress = () => {
        setIsOpen(!isOpen);
    };

    const handleItemPress = (item) => {
        setSelectedItem(item.value);
        setIsOpen(false);
    };

    return (
        <Container>
            <View style={styles.modalBackground}>
                <View style={styles.subView}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row' }}>
                        <View>
                            <Image source={images.leftarrow} style={{ height: hp('3%'), width: wp('3.5%') }} />
                        </View>
                        <View style={{ alignSelf: 'center', width: wp('80%'), justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontWeight: '600', fontSize: 18, color: Colors.balckText, fontFamily: fonts.PoppinsRegular }}>Self Pickup</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Spacer />



                <View style={{ marginHorizontal: wp(4), marginTop: hp(1) }}>

                    <Calendar
                        onDayPress={day => {
                            setSelected(day.dateString);
                            getTime(day.dateString);
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
                </View>



                <TouchableOpacity onPress={handleDropdownPress} style={styles.dropdown}>
                    <Image
                        source={iconPath.timeclock}
                        style={{ width: wp(5), height: wp(5) }}
                    />


                    <Text style={styles.text}>
                        {selectedItem}
                    </Text>

                    <Image
                        source={iconPath.arrowdown}
                        style={{ width: wp(5), height: wp(5), position: 'absolute', right: 20 }}
                    />
                </TouchableOpacity>
                {isOpen && (
                    <View style={styles.dropdownContainer}>
                        <FlatList
                            data={items}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => { seterrorMesssage(''), handleItemPress(item) }} style={styles.item}>
                                    <Text style={{ ...styles.itemText, color: selectedItem?.label == item.label ? Colors.BtnBackground : Colors.balckText }}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
                {errorMesssage.length > 0 &&
                    <Text style={{ ...styles.eror, color: 'red' }}>{errorMesssage}</Text>}

            </View>
            <Button onPress={() => confirmDeliveryType()}
                title={"Confirm"}
                btnContainer={{
                    height: hp(6),
                    marginTop: hp(2)

                }}


            />
        </Container>
    )
}

const styles = StyleSheet.create({
    dropdownContainer: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: Colors.BtnBackground,
        borderRadius: 5,
        maxHeight: 250,
        marginHorizontal: wp(4),
        paddingHorizontal: 10,


    },
    eror: {
        fontSize: 14,
        alignSelf: "center",
        marginTop: hp(5),
        fontFamily: fonts.PoppinsRegular,
        color: 'red'
    },
    item: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D9F0FA',
    },
    itemText: {
        fontSize: 16,
        color: 'black'
    },

    mainView: {
        backgroundColor: Colors.backgroundColor,
    },
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
    standerdbtn2: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        padding: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1),
        marginHorizontal: wp(4)
    },
    dropdown: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.BtnBackground,
        padding: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1),
        marginHorizontal: wp(4)
    },


    txt: {
        color: Colors.balckText,
        fontFamily: fonts.PoppinsRegular,
    },


})
export default SelfPickup;
