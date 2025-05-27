import React from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, FlatList } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import {images,Colors,fonts,Header} from "../../Components/Index";


const CHAINDATA = [
    {
        Img: images.eggbasketone,
        Title: 'Egg Red',
        Subtitle: '1 Dozen',
        Prices: 'Rs.190',
        basket: images.shoppingcart,
    },
    {
        Img: images.eggbaskettwo,
        Title: 'Egg Red',
        Subtitle: '2 Dozen',
        Prices: 'Rs.170',
        basket: images.shoppingcart,
    },
    {
        Img: images.eggmayo,
        Title: 'Egg Red',
        Subtitle: '2 Dozen',
        Prices: 'Rs.170',
        basket: images.shoppingcart,
    },
    {
        Img: images.eggbasketone,
        Title: 'Egg Red',
        Subtitle: '2 Dozen',
        Prices: 'Rs.170',
        basket: images.shoppingcart,
    },
    {
        Img: images.eggmayo,
        Title: 'Egg Red',
        Subtitle: '2 Dozen',
        Prices: 'Rs.170',
        basket: images.shoppingcart,
    },
    {
        Img: images.eggbaskettwo,
        Title: 'Egg Red',
        Subtitle: '2 Dozen',
        Prices: 'Rs.170',
        basket: images.shoppingcart,
    },

]


const Favourite = (props) => {
const renderItem=({item,index})=>{
    return(
      
        <TouchableOpacity onPress={()=>props.navigation.navigate('ShowItems')}  style={styles.mainflatlist}>
        <View style={styles.ScrollMainView2}>
            <View style={styles.imgview}>
                <Image source={item.Img} style={{ height: hp('7%'), width: wp('25%') }} />
            </View>
            <View style={styles.txtview}>
                <Text style={styles.ScrollViewText}>{item.Title}</Text>
                <Text style={styles.ScrollViewSubText}>{item.Subtitle}</Text>
            </View>
            <View style={styles.ScrollSubView}>
                <View style={styles.ScrollLastView}>
                    <Text style={styles.Scrolltext}>{item.Prices}</Text>
                </View>
                <TouchableOpacity onPress={()=>props.navigation.navigate('ShowItems')} style={styles.ScrollViewlast}>
                    <Image source={item.basket} style={styles.Scrollimg} />
                </TouchableOpacity>
            </View>

        </View>


    </TouchableOpacity>

    )
}
    return (
        <View style={{ flex: 1, backgroundColor:  Colors.backgroundColor }}>
            <View style={{ marginHorizontal: hp('3%'), marginTop: hp('6%') }}>
             
                <Header
                title={'Favourite'}
                onPress={() => props.navigation.goBack()}
                />
            </View>

            <FlatList
                data={CHAINDATA}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginTop: hp('3%') }}
                numColumns={2}
                horizontal={false}
                paddingHorizontal={hp('0.5%')}
                // paddingLeft={hp('3%')}
                renderItem={renderItem}
            />




        </View>
    )

}
const styles = StyleSheet.create({
mainflatlist:{ marginTop: hp('2%'), marginLeft: hp('2%') },
imgview:{ alignItems: 'center', height: hp('10%'), marginTop: hp('2%') },
txtview:{ justifyContent: 'center', paddingHorizontal: wp('3%') },
    Scrolcontainer: {
        marginTop: hp('3%'),
    },
    ScrollMainView: {
        borderWidth: 0.5,
        borderColor: '#CFCFCF',
        width: wp('42%'),
        height: hp('24%'),
        borderRadius: 10,
        // paddingHorizontal:hp('3%'),
        justifyContent: 'center',
    },
    ScrollMainView2: {
        borderWidth: 0.5,
        borderColor: '#CFCFCF',
        width: wp('42%'),
        height: hp('24%'),
        borderRadius: 10,
        // paddingHorizontal:hp('3%'),
        justifyContent: 'center',
        //marginLeft:hp('2%')
    },
    ScrollViewimg: {
        height: hp('12%'),
        width: wp('19%'),
    },
    ScrollViewText: {
        fontWeight: '600',
        fontSize: 15,
        color:Colors.balckText,
        fontFamily:fonts.PoppinsRegular
    },
    ScrollViewSubText: {
        fontWeight: '400',
        fontSize: 14,
        color:Colors.grayText,
        fontFamily:fonts.PoppinsRegular
    },
    ScrollSubView: {
        flexDirection: 'row',
        marginTop: hp('1.5%'),
        height: hp('4.5%'),
        // borderWidth:1,
        //  borderColor:'red',
        paddingHorizontal: wp('3%'),
    },
    ScrollLastView: {
        width: wp('26%'),
        justifyContent: 'center',
        //  borderColor:'red',
        //  borderWidth:1
    },
    Scrolltext: {
        fontWeight: '400',
        fontSize: 17,
        color:Colors.BtnBackground,
        fontFamily:fonts.PoppinsRegular
    },
    ScrollViewlast: {
        backgroundColor: Colors.BtnBackground,
        borderRadius: 10,
        width: wp('10%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    Scrollimg: {
        height: hp('2.75%'),
        width: wp('5.5%'),
        tintColor: Colors.whitecolor
    }


});


export default Favourite;