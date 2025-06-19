import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Colors, fonts, images } from "./Index";
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { FlatList } from "react-native-gesture-handler";
import Spacer from "./Spacer";




export const CategoryModal = ({ isModalVisible, setIsModalVisible, data, onPress, backdropOpacity, backdropColor }) => {
    const gap = widthPercentageToDP(1)
    console.log(data,"data")
    return (

        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(!isModalVisible)}
            backdropColor={backdropColor ?? "#000000"}

            backdropOpacity={backdropOpacity ?? 0.9}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            avoidKeyboard={true}
            style={{ margin: 0, borderWidth: 0, height: heightPercentageToDP(60) }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000066', height: heightPercentageToDP(70) }}>
                <View style={{

                    marginHorizontal: widthPercentageToDP(2),
                    padding: widthPercentageToDP(5),
                    backgroundColor: Colors.backgroundColor,
                    maxHeight: heightPercentageToDP(60),
                    borderRadius: 15,
                }}>


                    <Text style={styles.headerStyle}>Shop by category</Text>
                    <Spacer />
                    <FlatList
                        data={data ? data : []}

                        contentContainerStyle={{
                            gap,
                            // backgroundColor:'red'
                        }}
                        ItemSeparatorComponent={() => <Spacer />}
                        numColumns={4}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{ gap }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => onPress(item)} style={{

                                    marginLeft: index % 4 !== 0 ? 4 : 0
                                }}>
                                    <Image source={{ uri: item?.imageUrl }} style={styles.imageStyle} />
                                    <Spacer height={heightPercentageToDP(1)} />
                                    <Text style={styles.nameStyle}>{item?.name?.split(' ')[0]}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />



                </View>
                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.iconWrapperStyle} >
                    <Image source={images.crossicon} style={styles.crossIcon} />
                </TouchableOpacity>
            </View>
        </Modal>
    )

}

export const DeleteAccountModal = ({ isModalVisible, setIsModalVisible, onPressSure }) => {
    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => setIsModalVisible(!isModalVisible)}
            backdropColor={"#000000"}

            backdropOpacity={0.9}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            avoidKeyboard={true} >
            <View style={styles.mainView} >
                <Spacer />
                <Text style={styles.areyouSure}>Are You Sure?</Text>
                <Spacer />
                <Text style={styles.description}>This action is irreversible. By proceeding, you will permanently lose all your account data and personal settings.</Text>
                <Spacer />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => setIsModalVisible(false)} style={{ width: widthPercentageToDP(37), borderColor: Colors.Primary, borderWidth: 1, height: heightPercentageToDP(5), justifyContent: 'center', borderRadius: 12 }}>
                        <Text style={[styles.description, { color: Colors.Primary }]} >Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressSure} style={{ width: widthPercentageToDP(37), backgroundColor: Colors.redcolor, justifyContent: 'center', borderRadius: 12 }}>
                        <Text style={styles.sure} >Sure</Text>
                    </TouchableOpacity>
                </View>
                <Spacer />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    sure: {
        fontFamily: fonts.PoppinsMedium,
        fontSize: 14,
        color: Colors.whitecolor,
        textAlign: 'center'
    },
    description: {
        fontFamily: fonts.PoppinsMedium,
        fontSize: 14,
        color: Colors.balckText,
        textAlign: 'center'
    },
    mainView: {
        backgroundColor: 'white',
        paddingHorizontal: widthPercentageToDP(5),
        borderRadius: 10,
    },
    areyouSure: {
        fontFamily: fonts.PoppinsSemiBold,
        fontSize: 18,
        color: Colors.redcolor,
        textAlign: 'center'
    },
    headerStyle: {
        fontFamily: fonts.PoppinsSemiBold,
        fontSize: 15,
        color: Colors.balckText
    },
    imageStyle: {
        padding: 6,
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(19.44),
        resizeMode: 'center',
        backgroundColor: '#E6F6FC',
        borderRadius: 10
    },
    nameStyle: {
        fontSize: 10,
        textAlign: 'center',
        color: Colors.balckText
    },
    crossIcon: {
        // padding: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        zIndex: 10,
        tintColor: 'white',
        height: heightPercentageToDP(2.5),
        width: heightPercentageToDP(2.5)
    },
    iconWrapperStyle: {
        height: widthPercentageToDP(10),
        width: widthPercentageToDP(10),
        borderRadius: 100,
        left: widthPercentageToDP(45),
        right: widthPercentageToDP(45),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: heightPercentageToDP(6.5),
        backgroundColor: '#292D32',
        zIndex: 1,
        shadowColor: Colors.Primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
        overflow: 'visible',
        elevation: 10
    }
})

