import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Console, log } from 'console';


const useGoogleMap = (route) => {
    const ref = useRef(null);
    const refRBSheet = useRef();
    const mapRef = useRef(null);
    const API_KEY = 'AIzaSyBNOZn8be1ix47uhHa8cRc385pJhsW8OEs';



    const [markerPosition, setMarkerPosition] = useState(DEFAULT_REGION);
    const [region, setRegion] = useState(DEFAULT_REGION);
    const [myAddress, setMyAddress] = useState('');
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    const MIN_DELTA = 0.078;   // zoomed in ~street level
    const MAX_DELTA = 0.08;


    const DEFAULT_REGION = {

        latitude: route?.params?.item?.latitude, // Example latitude (San Francisco)
        longitude: route?.params?.item?.longitude, // Example longitude
        latitudeDelta: MIN_DELTA,
        longitudeDelta: MAX_DELTA,
    };
    console.log("default region", route?.params?.item)
    console.log("default region", DEFAULT_REGION)
    console.log("market postion", markerPosition)


    useEffect(() => {
        if (route?.params?.item?.latitude) {
            handleMapPress(route?.params?.item?.latitude, route?.params?.item?.longitude)
        } else {
            getOneTimeLocation();
        }

    }, [])

    useEffect(() => {
        if (query.length > 0) {
            let x = setTimeout(() => {
                searchLocation(query).then(data => {
                    console.log("data of address", data?.length)
                    console.log("datadatadatadata", data)
                    // setDropDownHandler(true);
                    setResult([...data]);
                });
            }, 200);
        } else {
            setResult([]);
        }
    }, [query]);

    const searchLocation = query => {
        //  ------------------New Code------------------
        console.log("this is query", query)
        let qry = query.trim();
        return new Promise((resolve, reject) => {
            fetch(
                // `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`,
                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`,
            )
                .then(res => res.json())
                .then(data => {
                    const address = [];
                    data.results.map(feature => {
                        address.push({
                            id: feature.place_id,
                            place_name: feature.name,
                            place_address: feature?.formatted_address,
                            center: feature.geometry?.location,
                        });
                    });
                    resolve(address);
                })
                .catch(err => reject(err, 'error'));
        });
    };



    const handleMapPress = (latitude, longitude) => {
        // Update marker position on map press

        if (latitude & longitude) {
            setMarkerPosition({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 });
            setRegion({ latitude, longitude, latitudeDelta: 0.01, longitudeDelta: 0.01 })

            console.log("karachi", longitude);

            mapRef?.current?.animateToRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: MIN_DELTA,
                longitudeDelta: MAX_DELTA,
            });
            getLocationNmaebuyCurentLoc(latitude, longitude);
            console.log('🗺️ Map pressed at Lat:', latitude, 'Lng:', longitude);
        }

    };

    // const handleRegionChangeComplete = (newRegion) => {
    //     // Update the region state only if there's a real change
    //     if (newRegion?.latitude !== region?.latitude || newRegion?.longitude !== region?.longitude) {
    //         setRegion(newRegion);
    //         // setMarkerPosition(newRegion)
    //     } else {
    //         setRegion(DEFAULT_REGION);
    //     }
    // };


    const handleRegionChangeComplete = (newRegion) => {
        if (
            newRegion?.latitude !== region?.latitude ||
            newRegion?.longitude !== region?.longitude
        ) {
            setRegion(newRegion);
            setMarkerPosition(newRegion); // Optional: keep this for future use
            getLocationNmaebuyCurentLoc(newRegion.latitude, newRegion.longitude); // ✅ Trigger address fetch
            console.log('🧭 Center Lat:', newRegion.latitude, 'Lng:', newRegion.longitude);
        }
    };



    // const getOneTimeLocation = () => {
    //     try {
    //         Geolocation.getCurrentPosition(
    //             //Will give you the current location
    //             position => {

    //                 //getting the Longitude from the location json
    //                 const currentLongitude = position?.coords?.longitude;
    //                 //getting the Latitude from the location json
    //                 const currentLatitude = position?.coords?.latitude;

    //                 getLocationNmaebuyCurentLoc(currentLatitude, currentLongitude);
    //                 if (currentLatitude && currentLongitude) {
    //                     console.log("this is currennt latiture and  lonngitude", currentLatitude, currentLongitude)
    //                     setRegion({
    //                         latitude: currentLatitude,
    //                         longitude: currentLongitude,
    //                         latitudeDelta: 0.01,
    //                         longitudeDelta: 0.01,
    //                     });
    //                     setMarkerPosition({
    //                         latitude: currentLatitude,
    //                         longitude: currentLongitude,
    //                         latitudeDelta: 0.01,
    //                         longitudeDelta: 0.01,
    //                     })
    //                 } else {
    //                     console.log("this is currennt latiture and  lonngitude only",)

    //                     setRegion(DEFAULT_REGION);
    //                     setMarkerPosition(DEFAULT_REGION)
    //                     getLocationNmaebuyCurentLoc(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    //                 }
    //             },
    //             error => {
    //                 setRegion(DEFAULT_REGION);
    //                 setMarkerPosition(DEFAULT_REGION)
    //                 getLocationNmaebuyCurentLoc(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    //             },
    //             {
    //                 enableHighAccuracy: false,
    //                 timeout: 100000,
    //             },
    //         );
    //     } catch (error) {
    //         console.log("this is google map error", error);

    //     }


    // };


    // const getOneTimeLocation = () => {
    //     try {
    //         Geolocation.getCurrentPosition(
    //             position => {
    //                 const currentLatitude = position?.coords?.latitude;
    //                 const currentLongitude = position?.coords?.longitude;

    //                 if (currentLatitude && currentLongitude) {
    //                     console.log("📍 Current Location:", currentLatitude, currentLongitude);

    //                     const region = {
    //                         latitude: currentLatitude,
    //                         longitude: currentLongitude,
    //                         latitudeDelta: 0.01,
    //                         longitudeDelta: 0.01,
    //                     };

    //                     setRegion(region);
    //                     setMarkerPosition(region);
    //                     getLocationNmaebuyCurentLoc(currentLatitude, currentLongitude);

    //                     // ✅ Animate map to user's location
    //                     mapRef?.current?.animateToRegion(region, 1000);
    //                 } else {
    //                     console.log("⚠️ Coordinates missing, using default");
    //                     setRegion(DEFAULT_REGION);
    //                     setMarkerPosition(DEFAULT_REGION);
    //                     getLocationNmaebuyCurentLoc(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    //                 }
    //             },
    //             error => {
    //                 console.log("❌ Geolocation error:", error.message);
    //                 setRegion(DEFAULT_REGION);
    //                 setMarkerPosition(DEFAULT_REGION);
    //                 getLocationNmaebuyCurentLoc(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    //             },
    //             {
    //                 enableHighAccuracy: true, // ✅ Recommend true for better accuracy
    //                 timeout: 10000,
    //                 maximumAge: 1000,
    //             }
    //         );
    //     } catch (error) {
    //         console.log("❌ Google map error:", error);
    //     }
    // };



    const getOneTimeLocation = () => {
        const watchId = Geolocation.watchPosition(
            position => {
                const currentLatitude = position.coords.latitude;
                const currentLongitude = position.coords.longitude;
                const accuracy = position.coords.accuracy;

                console.log('📍 Got location:', currentLatitude, currentLongitude, 'Accuracy:', accuracy);

                // Optional: wait for accuracy to be good enough
                if (accuracy < 100) { // You can change threshold
                    const region = {
                        latitude: currentLatitude,
                        longitude: currentLongitude,
                        latitudeDelta: MIN_DELTA,
                        longitudeDelta: MAX_DELTA,
                    };

                    setRegion(region);
                    setMarkerPosition(region);
                    getLocationNmaebuyCurentLoc(currentLatitude, currentLongitude);
                    mapRef?.current?.animateToRegion(region, 1000);

                    // ✅ Stop watching after first accurate fix
                    Geolocation.clearWatch(watchId);
                }
            },
            error => {
                console.log("❌ Location error:", error.message);
                fallbackToDefaultLocation();
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 1000,
                fastestInterval: 500,
            }
        );
    };

    const fallbackToDefaultLocation = () => {
        setRegion(DEFAULT_REGION);
        setMarkerPosition(DEFAULT_REGION);
        getLocationNmaebuyCurentLoc(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    };

    // const fallbackToDefaultLocation = () => {
    //     setRegion(DEFAULT_REGION);
    //     setMarkerPosition(DEFAULT_REGION);
    //     getLocationNmaebuyCurentLoc(DEFAULT_REGION.latitude, DEFAULT_REGION.longitude);
    // };



    const getLocationNmaebuyCurentLoc = (LATITUDE, LONGITUDE) => {
        console.log("LATITUDELATITUDELATITUDE", LATITUDE, LONGITUDE)

        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LATITUDE},${LONGITUDE}&key=${API_KEY}`,
        )
            .then(response => response.json())
            .then(data => {

                const address = data.results[0].formatted_address;
                setMyAddress(address)

            })
            .catch(error => console.error('errorerrorerrorerror', error));
    };


    return {
        ref, refRBSheet, markerPosition, setMarkerPosition, mapRef, getLocationNmaebuyCurentLoc, handleMapPress,
        region, setRegion, handleRegionChangeComplete, myAddress, result, setResult, isOpen, setIsOpen, DEFAULT_REGION,
        query, setQuery, getOneTimeLocation
    }
}

export default useGoogleMap