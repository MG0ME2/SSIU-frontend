import {createContext, useState, useEffect} from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
  // User token
  const [userToken, setUserToken] = useState(null)
  // User Data
  const [userData, setUserData] = useState({})
  // User Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <AppContext.Provider value={{
      userToken,
      setUserToken,
      userData,
      setUserData,
      isLoggedIn,
      setIsLoggedIn
    }}>
      {children}
    </AppContext.Provider>
  )
};
