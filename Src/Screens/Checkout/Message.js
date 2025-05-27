import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, SafeAreaView} from 'react-native'
import images from "../../Components/Images";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import  {GiftedChat,Send}  from 'react-native-gifted-chat'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const Message = props=> {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
           
          },
        },
      ])
    }, [])
    const renderSend=(props)=> {
        return (
          <Send {...props}>
            <View style={{  justifyContent: 'center',borderWidth:0,marginRight:wp(5),
    alignItems: 'center'}}>
              <Image source={images.flymessage} style={styles.flyicon} />
            </View>
          </Send>
        );
      }
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    return (
        <View style={{flex:1}}>
 <View style={styles.touch}>
                <View style={styles.subView}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.touchnav}>
                        <Image source={images.leftarrow} style={styles.arrow} />
                    </TouchableOpacity>
                    <View style={styles.userProfileView}>
                        <View style={{ borderWidth: 0, borderColor: 'red', justifyContent: 'center' }}>
                            <Image source={images.Profilerider} style={styles.profile} />
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={{ fontWeight: '600', fontSize: 16, color:'black' }}>John Stewart</Text>
                            <Text style={{ marginTop: hp('0.5%'), color: '#D0D0D0',fontWeight: '400', fontSize: 14, }}>Rider</Text>
                        </View>
                        <View style={{ borderWidth: 0, borderColor: 'red', flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.touchphone}>
                                <Image source={images.colouredphone} style={styles.phoneicon} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
      
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          showUserAvatar={false}
          alwaysShowSend
          renderSend={renderSend}
        />
        </View>
      )


  
}
const styles = StyleSheet.create({

    mainView: {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    arrow: {
        height: hp('3%'),
        width: wp('3%'),
        alignSelf: 'center'
    },
    touch: {
       
        marginTop: hp('5%'),
        borderWidth:0,
        paddingHorizontal:wp(3),
        backgroundColor:'white',
        justifyContent:'center'
    },
    userProfileView: {
        borderWidth: 0,
        marginTop: hp('2%'),
        borderColor: 'red',
        flexDirection: 'row',
        marginHorizontal: hp('2%')
    },
    subView: {
        flexDirection: 'row',
        borderWidth:0,
        justifyContent:'center'
    },
    touchnav: {
        borderWidth: 0,
        borderColor: 'red',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: hp('2%'),
        width: wp('10%'),
        height: hp('7%')
    },

    profile: {
        height: 43, 
        width: 43,
        // width: Platform.OS === 'ios' ? wp(11) : wp(15.2),
        // height: Platform.OS === 'ios' ? hp(5) : hp(7.5),
    },
    userInfo: {
        borderWidth: 0,
        marginLeft: hp('1%'),
        borderColor: 'red',
        justifyContent: 'center',
        width: wp('48%')
    },
    touchphone: {
        justifyContent: 'center',
        marginLeft: hp('1%'),
        //width: wp('8.5%'), 
        alignItems: 'center',
        //height: hp('3.75%'), 
        // width: Platform.OS === 'ios' ? wp(8.5) : wp(9),
        // height: Platform.OS === 'ios' ? hp(3.75) : hp(5),
        height:32,
        width:32,
        alignSelf: 'center',
        borderRadius: 6,
        borderColor: 'green',
        borderWidth: 1
    },
    phoneicon: {
        // height: hp('2.5%'), 
        // width: wp('5%'),
        // width: Platform.OS === 'ios' ? wp(5) : wp(5),
        // height: Platform.OS === 'ios' ? hp(2.5) : hp(3.5),
        height:24,
        width:24
    },
    flymessage: {
        justifyContent: 'center',
        backgroundColor: '#53B175',
        
        //width: wp('11%'), 
        alignItems: 'center',
        //height: hp('5%'), 
        borderRadius: 8,
        // width: Platform.OS === 'ios' ? wp(11) : wp(10),
        // height: Platform.OS === 'ios' ? hp(5) : hp(5.5),
        height:45,
        width:45
    },
    flyicon: {
        // height: hp('3%'), 
        // width: wp('5.5%'),
        // width: Platform.OS === 'ios' ? wp(6) : wp(6),
        // height: Platform.OS === 'ios' ? hp(3) : hp(3.5),
        height:hp(5),
        width:wp(10)
    },
    txt: {
        backgroundColor: '#53B175',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 10,
        marginTop: hp('2%'),
        //height:hp('7%'),
        width: Platform.OS === 'ios' ? wp(50) : wp(65),
        height: Platform.OS === 'ios' ? hp(7) : hp(9),
    },
    txtt: {
        backgroundColor: '#53B175',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderRadius: 10,
        marginTop: hp('2%'),
        // height:hp('4%'),
        // width:wp('30%'),
        width: Platform.OS === 'ios' ? wp(30) : wp(30),
        height: Platform.OS === 'ios' ? hp(4) : hp(5),
    }
})
export default Message;
