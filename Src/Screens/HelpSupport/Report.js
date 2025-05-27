import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, FlatList, Pressable } from 'react-native'
import { Colors, Container, fonts, Header, Button } from "../../Components/Index";

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { iconPath } from "../../Constant/Icons";
const DATA = [
  {
    id: 1,
    Title: 'Products are not loading',
  },
  {
    id: 2,
    Title: 'Issues with category or product',
  },
  {
    id: 3,
    Title: 'App is not working',
  },
  {
    id: 4,
    Title: 'Other',
  }
]

const Report = (props) => {
  const [count, setcount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([])

  const addCategories = async (item, index) => {
    var selectedCategoriesIdss = [...selectedCategories]
    if (selectedCategoriesIdss.includes(item.id)) {
      selectedCategoriesIdss = selectedCategoriesIdss.filter((id) => id !== item.id)
    } else {
      selectedCategoriesIdss.push(item.id)
    }
    await setSelectedCategories(selectedCategoriesIdss)
  }

  const handletxt = (txt) => {
    setcount(txt.length)
    console.log(count);
  }

  return (
    <Container style={{ backgroundColor: Colors.backgroundColor }}>
      <View style={{ marginHorizontal: hp('3%'), marginTop: hp(1) }}>
        <Header
          title={'Report Technical Complaint'}
          onPress={() => props.navigation.goBack()}
        />

      </View>
      <View style={styles.maintxtview}>
        <Text style={styles.maintxt}>We want your order experience to be perfect. If you have issues with the app or any technical problem, please submit your issues from below</Text>
      </View>


      <View style={{ marginVertical: 20 }}>


        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => addCategories(item, index)}
              style={{
                flexDirection: 'row',
                width: wp(80),
                margin: wp(2),
                marginHorizontal: wp(5),
                alignItems: 'center',

              }}
            >
              <Image
                source={
                  selectedCategories.includes(item.id)
                    ? iconPath.check
                    : iconPath.Uncheck
                }
                style={{
                  width: wp(5.5),
                  height: wp(5.5),
                  resizeMode: 'contain',
                }}
              ></Image>
              <Text
                style={{
                  color: selectedCategories.includes(item.id) ? Colors.BtnBackground : Colors.balckText,
                  fontSize: 15,
                  fontFamily: fonts.PoppinsRegular,
                  marginLeft: 7,
                }}
              >
                {item.Title}
              </Text>
            </Pressable>
          )}
        />
      </View>


      <View style={{ marginHorizontal: hp('2.5%'), height: hp('20%'), borderRadius: 10, borderColor: '#CFCFCF', borderWidth: 0.5, }}>
        <TextInput
          placeholder="Describe your issues"
          maxLength={500}
          onChangeText={(txt) => handletxt(txt)}
          fontWeight={'400'}
          fontSize={14}
          paddingLeft={wp(3)}
          placeholderTextColor={Colors.placeholder}
          color={Colors.balckText}
          fontFamily={fonts.PoppinsRegular}
          textAlign={'left'}
          marginTop={hp(1)}
          multiline={true}
          style={{ height: hp(19) }}



        />
      </View>

      <Text style={{ alignSelf: 'flex-end', marginHorizontal: hp('2.5%'), marginTop: hp('1%'), color: Colors.grayText, fontFamily: fonts.PoppinsRegular }}>{count}/500</Text>

      <Button onPress={() => props.navigation.navigate('Help')}
        title={"Submit"}
        btnContainer={{


          height: hp(6),
          marginTop: hp(15)

        }}


      />
    </Container>
  )

}
const styles = StyleSheet.create({
  container: {

    marginHorizontal: hp('2%'),
    marginTop: hp('1%')
  },
  maintxtview: { marginTop: 20, marginHorizontal: hp('2%'), borderColor: 'red', borderWidth: 0 },
  checkboxContainer: {
    flexDirection: "row",
    //marginBottom: 20,
    // justifyContent:'center',
    alignItems: 'center'
  },
  checkbox: {
    alignSelf: "center",


  },
  maintxt: { width: wp('90%'), color: Colors.grayText, fontFamily: fonts.PoppinsRegular },
  label: {
    margin: 8,
  },
});

export default Report;