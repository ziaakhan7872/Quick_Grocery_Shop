import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet,FlatList, Platform } from 'react-native'
import {Colors,fonts,Header,images} from"../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";



const FAQ = (props) => {

    const Faqdata=[
        {
            id:1,
            question:'01. Excepteur sint occaecat fugiat cillum dolore?',
            discreption:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    
    
    },
    {
        id:2,
        question:'02. Sed quia non numquam eius tempora incidunt?',
        discreption:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'


},
{
    id:3,
    question:'03. Quis nostrum exercitationem ullam corporis?',
    discreption:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'


},
{
    id:4,
    question:'04. Vel illum qui dolorem eum fugiat quo?',
    discreption:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'


},
{
    id:5,
    question:'05. At vero eos et accusamus et iusto odio?',
    discreption:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'


}

    ]
  const [selectedIdss, setselectedIdss] = useState('1')
    
const Expendhandle=(item)=>{
    if (selectedIdss==item) {
        setselectedIdss('')
        
    } else {
        setselectedIdss(item)
        
    }

}
    const renderfaq=({item,index})=>{
        return(
            <View style={{ marginTop: hp('2%')}}>
            <View style={styles.mainView}>
                <View style={styles.subView}>
                    <Text style={styles.txt}>
                        {item.question}</Text>
                </View>
                <TouchableOpacity onPress={()=>Expendhandle(item.id)} style={styles.touchablemain}>
                    <Image source={selectedIdss==item.id?images.arrowup:images.arrowdown} style={styles.img} />
                </TouchableOpacity>
            </View>
            {selectedIdss==item.id &&(
            <View style={styles.textview}>
                <Text style={styles.textstyle}>{item.discreption}</Text>
            </View>
            )}
            <View style={styles.bottomline}></View>
           
        </View>
        )

    }

    return (
        <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
            <View style={{ marginHorizontal: hp('3%'),  marginTop: hp(Platform.OS=='ios'?6:2) }}>
            <Header
                    title={'FAQs'}
                    onPress={() => props.navigation.goBack()}
                />
            </View>
            
<View style={{borderWidth:0,paddingBottom:hp(10)}}>
<FlatList
                    data={Faqdata}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: hp('2%') }}
               
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderfaq}
                />
</View>
      
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        marginTop: hp('5%'),
        borderColor: 'blue',
        borderWidth: 0,
        marginHorizontal: hp('3%')
    },
    mainViewtwo: {
        flexDirection: 'row',
        marginTop: hp('3%'),
        borderColor: 'blue',
        borderWidth: 0,
        marginHorizontal: hp('3%')
    },
    subView: {
        borderColor: 'red',
        borderWidth: 0,
        width: wp('68%')
    },
    txt: {
        fontSize: 16,
        fontWeight: '600',
        color:Colors.balckText,
        fontFamily:fonts.PoppinsRegular
    },
    touchablemain: {
        borderColor: 'red',
        borderWidth: 0,
        width: wp('15%')
    },
    img: {
        height: hp('2%'),
        width: wp('6%'),
        alignSelf: 'flex-end',
        tintColor:Colors.BtnBackground
    },
    textview: {
        marginHorizontal: hp('3%'),
        marginTop: hp('3%'),
        borderWidth: 0,
        borderColor: 'red'
    },
    textstyle: {
        color: Colors.grayText,
        fontFamily:fonts.PoppinsRegular,
        fontSize:14
    },
    bottomline: {
        borderBottomWidth: 1.25,
        borderBottomColor: '#F5F5F5',
        marginTop: hp('3%')
    }
});
export default FAQ;