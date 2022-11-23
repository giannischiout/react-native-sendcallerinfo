import React, { useState, createContext } from "react";
export const UserContext = createContext()


export const Layout = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState(null);
  const [showPass, setShowPass] = useState(true);
  //Store Password Checkbox -> File: LoginButtons/LoginCheckbox
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [test, setTest] = useState('transfer data')

  return (
    // <UserContext.Provider value={{ test, setTest }}>
    //   {children}
    // </UserContext.Provider>
    <UserContext.Provider value={{ username, setUsername, password, setPassword, company, setCompany, showPass, setShowPass, isChecked, setIsChecked, loading, setLoading }}>
      {children}
    </UserContext.Provider>

  )

}