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

  const saveToAsync = async () => {
    if (number) {

      await AsyncStorage.setItem('@number', JSON.stringify(number));
    }
  };


  handleNumber = async () => {
    try {
      const jsonString = await AsyncStorage.getItem('@number');
      const value = await JSON.parse(jsonString);
      if (value !== null) {
        setNumber(value);
      }
    } catch (e) {
      console.log(e);
    }

  };

  useEffect(() => {
    saveToAsync();
    handleNumber();

  }, [number])

  return (
    <UserContext.Provider value={{ username, setUsername, password, setPassword, company, setCompany, userCTI, setUserCTI, passCTI, setPassCTI, soneURL, setSoneURL, number, setNumber }}>
      {children}
    </UserContext.Provider>

  )

}