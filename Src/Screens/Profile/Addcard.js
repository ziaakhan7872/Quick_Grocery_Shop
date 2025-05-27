import React from "react";
import { View, Text, TouchableOpacity, Image, TextInput ,StyleSheet} from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors, fonts, Header, Button, images } from "../../Components/Index";


const Addcard = (props) => {

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ marginHorizontal: hp('3%'), marginTop: hp('6%') }}>
              

                <Header
                title={'Add card'}
                onPress={() => props.navigation.goBack()}
                />
                </View>
                <View style={styles.inputview}>

                    <TextInput
                        placeholder="Name on the card"
                        maxLength={25}
                        placeholderTextColor={Colors.placeholder}
                        color={Colors.balckText}
                        fontFamily={fonts.PoppinsRegular}
                        fontWeight={'400'}
                        fontSize={17}
                        justifyContent={'center'}
                        alignItems={'center'}
                        marginLeft={wp('3%')}
                      width= {wp(85)}
                       
                        

                    />
                </View>
                <View style={styles.inputview}>

                    <TextInput
                        placeholder="Card number"
                        maxLength={25}
                        placeholderTextColor={Colors.placeholder}
                        color={Colors.balckText}
                        fontFamily={fonts.PoppinsRegular}
                        fontWeight={'400'}
                        fontSize={17}
                        justifyContent={'center'}
                        alignItems={'center'}
                        marginLeft={wp('3%')}
                        width= {wp(85)}
                       
                        

                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.inputview}>

                        <TextInput
                            placeholder="MMM/YYY"
                            maxLength={6}
                          
                            fontWeight={'400'}
                            fontSize={17}
                            justifyContent={'center'}
                            alignItems={'center'}
                            marginLeft={wp('3%')}
                            placeholderTextColor={Colors.placeholder}
                            color={Colors.balckText}
                            fontFamily={fonts.PoppinsRegular}
                            width= {wp(45)}
                            
                            

                        />
                    </View>
                    <View style={styles.twoview}>

                        <TextInput
                            placeholder="CVV"
                            maxLength={4}
                            fontWeight={'400'}
                            fontSize={17}
                            justifyContent={'center'}
                            alignItems={'center'}
                            marginLeft={wp('3%')}
                            placeholderTextColor={Colors.placeholder}
                            color={Colors.balckText}
                            fontFamily={fonts.PoppinsRegular}
                            width= {wp(27)}
                        
                        />
                    </View>
                </View>
                <View style={{ marginHorizontal: hp('3%'), marginTop: hp('3%') }}>
                    <Text style={{ color: Colors.grayText,fontFamily:fonts.PoppinsRegular, justifyContent: 'center', fontSize: 14 }}>{'Ut enim ad minim veniam, quis nostrud'}{'\n'}{'exercitation ullamco laboris nisi ut aliquip epi'}
                        {'ea commodo consequat.'}</Text>
                </View>
                <Button onPress={() => props.navigation.navigate('Account')}
                    title={"Add Card"}
                    btnContainer={{

                      position:'absolute',
                        height: hp(6),
                        bottom: hp(8)

                    }}

                />
               
            </View>
        </View>
    )

}

export default Addcard;



const styles = StyleSheet.create({
   inputview:{ alignItems: 'center', marginTop: hp('4%'),
    marginHorizontal: hp('2.5%'), 
    height: hp('6.5%'), borderRadius: 10,
     borderColor: '#CFCFCF', borderWidth: 0.5,
      flexDirection: 'row' },
      twoview:{ 
        alignItems: 'center',
       marginTop: hp('4%'),
        width: wp('33%'),
       height: hp('6.5%'), 
       borderRadius: 10, 
       borderColor: '#CFCFCF', 
       borderWidth: 0.5,
        flexDirection: 'row' },
})