import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
import {Colors,fonts,Header} from"../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

const Privacy = (props) => {

    return (
        <View style={{ backgroundColor: Colors.backgroundColor, flex: 1 }}>
            <View style={{ marginHorizontal: hp('3%'),  marginTop: hp(Platform.OS=='ios'?6:2) }}>
            <Header
                    title={'Our Privacy Policy'}
                    onPress={() => props.navigation.goBack()}
                />
            
            </View>
            <ScrollView style={{ marginTop: hp('2%') }}>
                <View style={{ marginTop: hp('3%'), marginHorizontal: hp('2.5%') }}>
                    <Text style={{ fontSize: 16, fontWeight: '500',color:Colors.balckText,fontFamily:fonts.PoppinsRegular }}>Our Privacy Policy</Text>
                </View>
                <View style={{ justifyContent: 'center', marginHorizontal: hp('2.5%'), marginTop: hp('2%') }}>
                    <Text style={{ fontSize: 14, color:Colors.grayText,fontFamily:fonts.PoppinsRegular }}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </Text>
                    <Text style={{ fontSize: 14, color:Colors.grayText,fontFamily:fonts.PoppinsRegular , marginTop: hp('2%'), justifyContent: 'center' }}>sed quia consequuntur magni dolores eos qui ratione voluptatem sequi cum nesciunt.
                    </Text>
                    <Text style={{ fontSize: 14, color:Colors.grayText,fontFamily:fonts.PoppinsRegular , marginTop: hp('2%') }}>

                        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                    </Text>
                    <Text style={{ fontSize: 14, color:Colors.grayText,fontFamily:fonts.PoppinsRegular , marginTop: hp('2%') }}>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

                    </Text>
                </View>
                <View style={{ marginTop: hp('2%'), marginHorizontal: hp('2.5%') }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' , color:Colors.balckText,fontFamily:fonts.PoppinsRegular }}>Scope and Application</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: hp('2.5%'), marginTop: hp('2%') }}>
                    <Text style={{ fontSize: 14,  color:Colors.grayText,fontFamily:fonts.PoppinsRegular  }}>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                    </Text>
                    <Text style={{ fontSize: 14,  color:Colors.grayText,fontFamily:fonts.PoppinsRegular , marginTop: hp('2%') }}>sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    </Text>
                    <Text style={{ fontSize: 14,  color:Colors.grayText,fontFamily:fonts.PoppinsRegular , marginTop: hp('2%') }}>

                        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
                    </Text>
                    <Text style={{ fontSize: 14,  color:Colors.grayText,fontFamily:fonts.PoppinsRegular , marginTop: hp('2%') }}>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

                    </Text>
                </View>
            </ScrollView>

        </View>
    )


}
export default Privacy;