import React, {useState} from "react";
import {View, Text, Image,StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { heightPercentageToDP } from "react-native-responsive-screen";
import Container from "../../Components/Container";
import {images, Button, fonts, Colors} from "../../Components/Index";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import InputField from "../../Components/InputField";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const NewPass =(props, { navigation })=> {

    const [hide, setHide] = useState(true)
    const [eye, seteye] = useState(true)
    const secureEntry = () => {
      setHide(!hide)
  
    }
    const showeyes = () => {
      seteye(!eye)
    }


    const [email, setEmail] = useState('');
    const [enableshift , setenableshift] = useState(false)

return(

    <KeyboardAwareScrollView behavior="position" enabled={enableshift} style={{backgroundColor:Colors.backgroundColor, flex:1}}>
    <View style={{justifyContent:'center', alignItems:'center', marginTop:75}}>
       <Image source={images.newpass} style={{height:274, width:274}} />
    </View>
    <View style={{paddingHorizontal:hp('3%'), marginTop:hp(5)}}>
        <Text style={{color:Colors.balckText,fontFamily:fonts.PoppinsRegular, fontSize:24, fontWeight:'600'}}>Create New Password</Text>
        <View style={{marginTop:hp(1)}}>
        <Text style={{color:Colors.grayText,fontFamily:fonts.PoppinsRegular, fontSize:14,}}>Your new password must be different from previously used passwords</Text>
    </View>
    <View style={styles.inputView}>
          <InputField
            placeholder="New Password"
            maxLength={25}
            fontWeight={'500'}
            placeholderTextColor={Colors.placeholder}
            color={Colors.balckText}
            fontFamily={fonts.PoppinsRegular}
            secureText
            secureTextEntry={hide}
            onPress={secureEntry}
            borderWidth={0}
            onFocus={()=> setenableshift(true)}
          />
        </View>
        <View style={styles.inputViewto}>
          <InputField
            placeholder="Confirm Password"
            maxLength={25}
            fontWeight={'500'}
            placeholderTextColor={'#C8C8C8'}
            secureText
            secureTextEntry={eye}
            onPress={showeyes}
            borderColor={'red'}
            borderWidth={0}
          />
        </View>
 
            <Button onPress={() => props.navigation.navigate('BottomTab')}
                    title={"Submit"}
                    btnContainer={{
                   
                     
                        height: hp(6),
                     marginTop:hp(10)
                       
                    }}

                />
    </View>
   
    </KeyboardAwareScrollView>
    
)

}
const styles = StyleSheet.create({
  
    formViewtwo: {
        alignItems: 'center',
        marginTop: hp('4%'),
        height: Platform.OS === 'ios' ? hp(6) : hp(7),
        borderRadius: 10,
        borderColor: '#CFCFCF',
        borderWidth: 1,
        flexDirection: 'row'
      },
      emailiconimg:{
        marginLeft: hp(1), 
        height: 24, 
        width: 24, 
        justifyContent: 'center'
      },
      signuptext:{
        fontSize: 13,
        color:'black',
        marginLeft:hp(0.2)
      },
      button: {
        marginTop: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#53B175',
        width: wp('90%'),
        height: Platform.OS === 'ios' ? hp(5.5) : hp(7),
        borderRadius: 25,
        alignSelf: 'center'
    },
    buttontxt:{
        textAlign: 'center', 
        color: '#FFFFFF', 
        fontSize: 18, 
        fontWeight: '600'
    },
    inputView: {

        marginTop: hp(3)
      },
      inputViewto: {

        marginTop: hp(2)
      },
})   

export default NewPass;