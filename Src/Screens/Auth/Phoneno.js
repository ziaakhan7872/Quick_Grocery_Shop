import React, { useState,useRef } from "react";
import { View, Text, StatusBar, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { _axiosPostAPI } from '../../Apis/Apis'
import Container from "../../Components/Container";
import { CommonActions } from "@react-navigation/routers";
import {Loader,Button,fonts,Colors} from "../../Components/Index";


const Phonenumber = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(false)
    const [apiErrorMsg, setApiErrorMsg] = useState('')
    const [number, setChangeNumber] = useState('');
    const [errormsg, seterrormsg] = useState('');
  
    const ResisterPhone = async () => {
        navigation.navigate('VerificationCode')
//         setApiError(false)
// if(!number){
//     seterrormsg('Enter Phone  number')
// }
// else{
//         // navigation.navigate('VerificationCode', { phonenumber: number })
//         setLoading(true)
//         let data = {}
//         data['phoneNumber'] = ('92' + number)
//         console.log(data);
//         await _axiosPostAPI('auth/phone-number', data)
//             .then( (response) => {
//                 setLoading(false)
//                 console.log("RESponse", response.data);
//                 if(response.data.statusCode==201){
//                 //  navigation.navigate('VerificationCode', { phonenumber: number })
//                  navigation.dispatch(
//                     CommonActions.reset({
//                       index: 0,
//                       routes: [
//                         {
//                           name: "VerificationCode",
//                           params: {
//                             number:number
//                           },
   
//                         },

//                       ],
                     

//                     })
//                   );
                    
//                 }
//                 else{
//                     setApiError(true)
//                     setApiErrorMsg(response.data.message)
//                 }
//             })
//             .catch((err) => {
//                 setLoading(false)
//                 setApiError(true)
//                 setApiErrorMsg(err.data.message)
//                 console.log("Err,", err);
//             })
//         }
    }

    return (
        <Container style={{ backgroundColor: Colors.backgroundColor}}>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View>
            <View style={styles.mainView}>
                <Text style={styles.phonenumber}>Enter your mobile number</Text>
                <Text style={styles.confirmcode}>We will send you confirmation code</Text>
            </View>
            <View style={styles.inputmainView}>

                <Text style={styles.countryCode}>+92</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>{setChangeNumber(text),seterrormsg('')}}
                    value={number}
                    // placeholder="enter number"
                    keyboardType='numeric'
                    maxLength={10}
                    width={'75%'}
                />
              
            </View>
           
            <View
                style={styles.underLine}
            />
            <Text style={{alignSelf:'center',marginTop:10,color:'red'}}>{errormsg}</Text>
            {apiError==true && (
                <Text
                    style={styles.errorText}
                >
                    {apiErrorMsg}
                </Text>
            )}
<Button onPress={() =>ResisterPhone()} style={styles.button}
        title= {"Next"}
        btnContainer={{
         
          marginTop:hp(15),
          height:hp(6),
          bottom:hp(1)
          
        }}
      
      />
            
            <Loader loading={loading} />
            </View>
            </TouchableWithoutFeedback>
        </Container>
    )
}
const styles = StyleSheet.create({
    
    mainView:{
        marginTop: hp('22%'), 
        paddingHorizontal: wp('8%'), 
        alignItems: 'center' 
    },
    phonenumber:{
        fontWeight: '600', 
        fontSize: 22, 
        color: Colors.balckText, 
        fontFamily:fonts.PoppinsRegular
    },
    confirmcode:{
        color: Colors.grayText, 
        fontSize: 14, 
        marginTop: hp('1.5%'),
        fontFamily:fonts.PoppinsRegular

    },
    inputmainView:{
        flexDirection: 'row', 
        width: wp('45%'), 
        alignSelf: 'center', 
        marginTop: hp('5%'), 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    countryCode:{
        fontSize: 18, 
        color: '#CFCFCF'
    },
    input: {
        color: '#000',
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        borderWidth:0
    },
    underLine:{
        borderBottomColor: '#CFCFCF',
        borderBottomWidth: 1,
        width: wp('42%'),
        alignSelf: 'center',
        marginTop: Platform.OS === 'ios' ? hp(1) : hp(0),
    },
    button: {
        marginTop: hp('8%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#53B175',
        width: wp('80%'),
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
    errorText: {
        color: 'red',
        fontSize: 13,
        marginLeft: 12,
        textAlign: 'center',
        marginBottom: wp(5),
        marginTop: wp(3),
    }
});

export default Phonenumber;