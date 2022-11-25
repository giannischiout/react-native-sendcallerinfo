import React, { useState, createContext } from "react";
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

  return (
    <UserContext.Provider value={{ username, setUsername, password, setPassword, company, setCompany, userCTI, setUserCTI, passCTI, setPassCTI, soneURL, setSoneURL, number, setNumber }}>
      {children}
    </UserContext.Provider>

  )

}