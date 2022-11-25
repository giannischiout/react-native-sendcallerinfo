import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const UserContext = createContext()


export const Layout = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState(null);
  const [userCTI, setUserCTI] = useState('');
  const [passCTI, setPassCTI] = useState('');
  const [soneURL, setSoneURL] = useState('');
  const [number, setNumber] = useState('')
  const [storeNum, setStoreNum] = useState(null)
  const [num2, setNum2] = useState()


  console.log(`TEST NUMBER: ${num2}`);

  const saveToAsync = async () => {
    if (number) {
      let num = number.replace('+30', '')
      await AsyncStorage.setItem('@number', JSON.stringify(num));
    }
  };


  handleNumber = async () => {
    console.log('call 2')
    try {
      const jsonString = await AsyncStorage.getItem('@number');
      const value = await JSON.parse(jsonString);

      if (value !== null) {
        setNumber(value);
        console.log('value' + value)
      }
    } catch (e) {
      console.log(e);
    }

  };

  useEffect(() => {
    let num = number.replace('+30', '');
    setNumber(num)
    saveToAsync();
    handleNumber();

  }, [number])

  return (
    <UserContext.Provider value={{ username, setUsername, password, setPassword, company, setCompany, userCTI, setUserCTI, passCTI, setPassCTI, soneURL, setSoneURL, number, setNumber }}>
      {children}
    </UserContext.Provider>

  )

}