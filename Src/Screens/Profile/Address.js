import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, ScrollView, Platform, TextInput } from 'react-native'
import { Button, Colors, fonts, Header, images, Loader } from "../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSelector } from "react-redux";
import { _AxiosDeleteBearer, _AxiosGetBearerAUTH, _axiosdeleteAPIAUTH } from "../../Apis/Apis";
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Saveactiveaddress } from "../../Redux/Actions/Actions";


const Address = (props) => {

    const [loading, setLoading] = useState(false);
    const [Data, srtData] = useState([]);
    const dispatch = useDispatch();

    const userData = useSelector(response => {
        return response?.userdataReducer?.userData;
    });

    const selectedAddress = useSelector(response => {
        return response?.userdataReducer?.selectedAddress;
    });

    useFocusEffect(
        React.useCallback(() => {
            getalladdresses()

            return () => {
                // Do something when the screen loses focus
            };
        }, [])
    );

    const deleteAddress = async (id) => {
        try {
            setLoading(true)
            await _axiosdeleteAPIAUTH(`address/${id}`, userData?.userToken)
                .then(async response => {
                    console.log('getalladdresses', response);
                    getalladdresses()
                    setLoading(false)
                })
                .catch(err => {
                    console.log(':::::Err:::::', err);
                    setLoading(false)


                });
        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false)

        }
    };

    const getalladdresses = async (afterElement) => {
        try {
            setLoading(true)
            await _AxiosGetBearerAUTH(`address`, userData?.userToken)
                .then(async response => {
                    console.log('getalladdresses', response.data);
                    srtData(response.data)
                    setLoading(false)
                })
                .catch(err => {
                    console.log('Err::::::::::', err);
                    setLoading(false)


                });
        } catch (error) {
            console.log('errorerrorerrorerror', error);
            setLoading(false)

        }
    };


    const renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => { dispatch(Saveactiveaddress(item)), props.route?.params?.confirmbtn ? props.route?.params?.setselectedAddress(item) : null }} style={{ ...styles.mainflatlist, borderColor: item.id == selectedAddress.id ? Colors.Primary : '#D9F0FA' }}>
                <View style={styles.flatlistsyb}>

                    <View style={{ width: wp('67%'), borderWidth: 0, borderColor: 'red', justifyContent: 'center' }}>
                        <Text style={styles.name}>{item.name}</Text>

                    </View>
                    {/* <TouchableOpacity onPress={() => props.navigation.navigate('EditAddress', { */}
                    <TouchableOpacity onPress={() => props.navigation.navigate('GoogleMapScreen', {
                        item: item
                    })} style={styles.editicon}>
                        <Image source={images.editable} style={{ width: wp('4%'), height: hp('2.5%') }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteAddress(item.id)} style={styles.deleteicon}>
                        <Image source={images.trash} style={{ width: wp('4.25%'), height: hp('2.5%') }} />
                    </TouchableOpacity>

                </View>

                <View style={styles.addrestype}>
                    <Image source={{ uri: item?.addressType?.iconUrl }} style={{ width: wp(5), height: wp(5), marginRight: 6, tintColor: Colors.BtnBackground }} />
                    <Text style={styles.home}>{item?.addressType?.name}</Text>

                </View>

                <View style={{ marginLeft: hp('0%'), marginTop: hp('1%') }}>
                    <Text style={styles.address}>{item.address}{' '}{item.city} </Text>
                </View>
                <View style={{ marginLeft: hp('0%'), marginTop: hp('1%') }}>
                    <Text style={styles.address}>{item.contactNo} </Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
            <View style={{ marginHorizontal: hp('3%'), marginTop: hp(Platform.OS == 'ios' ? 6 : 2) }}>

                <Header
                    title={'Address'}
                    onPress={() => props.navigation.goBack()}
                />

            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: hp(20) }}
                showsVerticalScrollIndicator={false}>

                <FlatList
                    data={Data}

                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: hp('3%') }}
                    horizontal={false}
                    paddingHorizontal={hp('0.5%')}
                    // paddingLeft={hp('3%')}
                    renderItem={renderItem}
                />


                <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity onPress={() => props.navigation.navigate('AddAddress')} style={styles.Addbutton}> */}
                    <TouchableOpacity onPress={() => props.navigation.navigate('GoogleMapScreen')} style={styles.Addbutton}>
                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('AddAddress1')} style={styles.Addbutton}> */}
                        <Image source={images.add} style={{ width: wp('5%'), height: hp('3%'), alignSelf: 'center', tintColor: Colors.BtnBackground }} />
                        <Text style={styles.btntext}>{'Add new Address'} </Text>
                    </TouchableOpacity>
                </View>


                {props.route?.params?.confirmbtn &&
                    <Button onPress={() => props.navigation.goBack()}
                        title={"Confirm"}
                        btnContainer={{
                            backgroundColor: Colors.BtnBackground,
                            height: hp(7),
                            marginTop: hp(5)

                        }}
                    />}

                <Loader loading={loading} />

            </ScrollView>
        </View>
    )
}

export default Address;

const styles = StyleSheet.create({
    flatlistsyb: { flexDirection: 'row', borderWidth: 0, borderColor: 'red' },
    deleteicon: { width: wp('7%'), borderWidth: 0, borderColor: 'red', justifyContent: 'center', alignItems: 'center' },
    mainflatlist: {
        borderWidth: 2,
        paddingHorizontal: wp(5),
        borderColor: Colors.Primary,
        marginHorizontal: wp(3),
        borderRadius: 5,
        padding: 10,
        marginTop: hp(1)
    },
    editicon: { flexDirection: 'row', width: wp('7.5%'), borderWidth: 0, borderColor: 'red', justifyContent: 'center', alignItems: 'center' },
    address: { fontSize: 14, fontWeight: '400', color: Colors.grayText, width: wp(65), fontFamily: fonts.PoppinsRegular },
    name: { color: Colors.balckText, fontFamily: fonts.PoppinsRegular, fontSize: 18, fontWeight: '500' },
    img: {
        alignSelf: 'center',
        height: Platform.OS === 'ios' ? hp(15) : hp(18),
        width: Platform.OS === 'ios' ? wp(43) : wp(45),
    },
    addrestype: {

        marginTop: hp(1),
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FBFE',
        width: wp(25),
        borderWidth: 1,
        borderColor: '#DCF2FB',
        borderRadius: 5
    },
    Addbutton: {
        // position: 'absolute',

        backgroundColor: '#F5FBFE',
        borderRadius: 30,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DCF2FB',
        marginHorizontal: wp(4)
    },
    buttonContainer: {
        justifyContent: 'center',
        marginTop: hp(2)

    },
    home: {
        fontSize: 14,
        fontFamily: fonts.PoppinsRegular,
        color: Colors.Primary
    },
    btntext: {
        fontSize: 18,
        color: Colors.BtnBackground,
        fontFamily: fonts.PoppinsRegular,
        marginLeft: 5
    }
})