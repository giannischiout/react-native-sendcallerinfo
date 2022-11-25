import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const useAsync = (key, value) => {
//   const [asyncData, setAsyncData] = useState(null);

//   const saveToAsync = async () => {
//     try {
//       const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
//       await AsyncStorage.setItem(key, valueToStore);
//     } catch (e) {
//       console.log(e)
//     }
//   };
//   saveToAsync();

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const jsonString = await AsyncStorage.getItem(key);
//         const value = await JSON.parse(jsonString);
//         if (value !== null) {
//           setNum(value);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     getData();
//   }, [data])



// }

// export const useAsyncStorage = (key, initialValue) => {
//   const [storedValue, setStoredValue] = useState();

//   async function getStoredItem(key, initialValue) {
//     try {
//       const item = await AsyncStorage.getItem(key);
//       const value = item ? JSON.parse(item) : initialValue;
//       setStoredValue(value);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getStoredItem(key, initialValue);
//   }, [key, initialValue]);

//   const setValue = async (value) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [storedValue, setValue];
// }