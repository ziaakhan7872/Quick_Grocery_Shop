import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import {
  images,
  Colors,
  fonts,
  Header,
  Loader,
  Button,
} from './Components/Index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { _axiosGetAPI } from './Apis/Apis';
import FastImage from 'react-native-fast-image';

const Category = props => {
  const textInputRef = useRef(null);

  const [categorylist, setcategorylist] = useState([]);
  const [afterelement, setafterelement] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showLoadmore, setshowLoadmore] = useState(false);
  useEffect(() => {
    getAllCategery(afterelement);
  }, []);

  const getAllCategery = async afterElement => {
    try {
      setLoading(true);
      await _axiosGetAPI(
        `store/categories?limit=20&minimal=true&allCategories=true&afterElement=${afterElement}`,
      )
        .then(async response => {
          console.log('getAllCategery', response?.data?.data);
          setcategorylist(prev => [...prev, ...response?.data?.data]);
          setafterelement(
            response?.data?.data[response?.data?.data?.length - 1].id,
          );
          if (response?.data?.data?.length == 20) {
            setshowLoadmore(true);
          } else {
            setshowLoadmore(false);
          }
          setLoading(false);
        })
        .catch(err => {
          console.log('Err,', err);
          setLoading(false);
          setshowLoadmore(false);
        });
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false);
    }
  };
  const searchcategorybuyname = async name => {
    try {
      await _axiosGetAPI(
        `store/categories?limit=20&search=name%3D${name}&minimal=true&allCategories=true&afterElement=0`,
      )
        .then(async response => {
          setcategorylist(response?.data?.data);
          if (response?.data?.data.length < 20) {
            setshowLoadmore(false);
          } else {
            setshowLoadmore(true);
          }
        })
        .catch(err => {
          console.log('Err,', err);
        });
    } catch (error) {
      console.log('errorerrorerrorerror', error);
      setLoading(false);
    }
  };

  const renderCategory = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.mainview}
        onPress={() =>
          props.navigation.navigate('CategoryDetail', {
            item: item,
          })
        }>
        <View
          style={{ borderWidth: 0, borderColor: 'red', alignItems: 'center' }}>
          <FastImage
            style={{
              width: wp('30%'),
              height: hp('9.5%'),
              resizeMode: 'contain',
            }}
            source={{
              uri: item?.imageUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />

          <Text style={styles.titletx}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <View
        style={{
          marginHorizontal: hp('3%'),
          marginTop: hp(Platform.OS == 'ios' ? 6 : 2),
        }}>
        <Header title={'Category'} onPress={() => props.navigation.goBack()} />
      </View>
      <View
        style={{
          alignItems: 'center',
          marginHorizontal: hp('2%'),
          marginTop: hp('2%'),
          height: hp('6%'),
          borderRadius: 10,
          borderColor: '#CFCFCF',
          borderWidth: 1,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            if (textInputRef.current) {
              textInputRef.current.focus();
            }
          }}>
          <Image
            source={images.searchicon}
            style={{
              marginLeft: wp('3.5%'),
              height: hp('2.5%'),
              width: wp('5%'),
              tintColor: Colors.BtnBackground,
            }}
          />
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          placeholder="Search by items name"
          maxLength={25}
          marginLeft={'3%'}
          fontWeight={'400'}
          onChangeText={searchcategorybuyname}
          placeholderTextColor={Colors.placeholder}
          color={Colors.balckText}
          fontFamily={fonts.PoppinsRegular}
          style={{ height: hp(6), width: wp(76) }}
        />
      </View>

      {categorylist.length > 0 ? (
        <FlatList
          data={categorylist}
          keyExtractor={(item, index) => index.toString()}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: wp(3),
          }}
          numColumns={2}
          renderItem={renderCategory}
          ListFooterComponent={() =>
            showLoadmore && (
              <View>
                <Button
                  onPress={() => getAllCategery(afterelement)}
                  title={'LoadMore'}
                  btnContainer={{
                    height: hp(6),
                    width: wp(55),
                    marginTop: hp(4),
                  }}
                />
              </View>
            )
          }
        />
      ) : (
        <View
          style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
          {loading === false && (
            <Text
              style={{
                fontSize: 16,
                color: Colors.balckText,
                fontFamily: fonts.PoppinsRegular,
              }}>
              {'No category found.'}
            </Text>
          )}
        </View>
      )}

      <Loader loading={loading} />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  mainview: {
    borderColor: '#CFCFCF',
    marginTop: hp('2%'),
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    width: wp(46),
    padding: 20,
  },
  titletx: {
    color: Colors.balckText,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '500',
  },
  marginTop: hp(2),
});
