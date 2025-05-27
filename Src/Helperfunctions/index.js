import { openDatabase } from "react-native-sqlite-storage";
import { newEvents } from "../Components/CustomListner";
import { GoogleSignin, statusCodes, } from "@react-native-google-signin/google-signin";
import messaging from '@react-native-firebase/messaging';
import { _axiosPatchApi } from "../Apis/Apis";
import { Platform } from "react-native";

const errorCB = err => {
    console.log('SQL Error: ' + err);
};

const successCB = () => {
    console.log('SQL executed fine');
};
const openCB = () => {
    console.log('Database OPENED');
};

export const db = openDatabase(
    { name: 'Grocery.db', createFromLocation: 1 },
    successCB,
    errorCB,
    openCB,
);

export const getcartData = async (callback) => {
    try {

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM cartTable',
                [],
                (tx, results) => {
                    const data = [];
                    let total = 0;
                    for (let i = 0; i < results.rows.length; i++) {
                        const item = results.rows.item(i);
                        data.push(item);
                        // console.log(item, 'itemitem');
                        total += item.Price * item.quantity;
                    }
                    callback(data)
                    // setCartData(data);
                    // setTotalPrice(total);
                },
                error => {
                    console.log('Error fetching data from cartTable', error);
                    return false
                },
            );
        });
    } catch (error) {

        console.log('Error in transaction', error);
        return false
    }
};


export const UpdateCartData = (quantity, id, callback) => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE cartTable SET quantity = ? WHERE id = ?`,
                [quantity, id],
                (tx, results) => {
                    console.log("run")
                    tx.executeSql(
                        'SELECT * FROM cartTable',
                        [],
                        (tx, updatedResults) => {
                            console.log("tx", tx)
                            const data = [];
                            let total = 0;
                            for (let i = 0; i < updatedResults.rows.length; i++) {
                                const item = updatedResults.rows.item(i);
                                data.push(item);
                                total += item.Price * item.quantity;
                            }
                            console.log("data", data)
                            callback(data)

                        },
                        error => {
                            console.log('Error fetching updated data', error);

                            callback(false);  // Signify failure

                        }
                    );
                },
                error => {
                    console.log('Error updating quantity', error);
                },
            );
        });
        newEvents.emit('addCart', 'addCart')
    } catch (error) {
        console.log('Error in transaction', error);
    }
}


export const DeleteCartData = (id) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM cartTable WHERE id = ?',
            [id],
            (tx, results) => {
                console.log('Row deleted successfully');
                // Do something else after deleting the row
            },
            error => {
                console.log('Error deleting row', error);
            },
        );
    });
    newEvents.emit('addCart', 'addCart')
}

export const debounce = (func, delay) => {
    let inDebounce;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
};


export async function googleAuthentication() {
    // setLoading(true)
    try {
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        });

        const userInfo = await GoogleSignin.signIn();

        return userInfo

    } catch (error) {
        // setLoading(false)
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            Error('Google authentication is in progress already')
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Error('Play services not available or outdated')
            // play services not available or outdated
        } else {
            console.log("fdsfasdfasd", error)
            // some other error happened
        }
        // 
    }
}


export default async function appleAuthentication() {
    // try {
    //     const appleAuthRequestResponse = await appleAuth.performRequest({
    //         requestedOperation: appleAuth.Operation.LOGIN,
    //         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    //     });

    //     // Get user credentials
    //     console.log('appleAuthRequestResponseappleAuthRequestResponse', appleAuthRequestResponse);
    //     const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    //     console.log('credentialStatecredentialState', credentialState);

    //     // Obtain the token and user information
    //     const { user, email, identityToken, fullName } = appleAuthRequestResponse;
    //     // Return the user info
    //     return {
    //         user: {
    //             name: fullName ? `${fullName.givenName} ${fullName.familyName}` : '',
    //             email: email,
    //         },
    //         identityToken: identityToken,
    //         userId: user,
    //     };
    // } catch (error) {
    //     console.log('Apple authentication failed:', error);
    //     console.log('Error Code:', error.code);
    //     console.log('Error Message:', error.message);
    //     return null
    // }
}


export const requestUserPermission = async (userToken) => {

    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        console.log("this is enbaled", enabled)
        try {
            let fcm = await getFcmToken();
            console.log("fcm token", fcm)
            if (fcm) {
                let obj = {
                    fcmToken: fcm,
                    osName: Platform.OS == 'ios' ? 'ios' : 'android',
                }
                console.log("obj", obj, userToken)
                _axiosPatchApi('users/device-details', obj, userToken).then(res => {
                    console.log("fcm resss", res)
                }).catch(error => {
                    console.log("error of fcm", error.message)
                })
            }
        } catch (error) {
            console.log("fcm error", error)
        }

    } else {
        console.log("error of fcm n")
    }
}

// get FCM Tokern
const getFcmToken = async () => {
    try {
        console.log("run")
        let res = await messaging().getToken()
        return res
    } catch (error) {

        console.log("error of fcm", error)
        return false
    }

}