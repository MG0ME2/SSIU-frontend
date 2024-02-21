import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // User token
  const [userToken, setUserToken] = useState(null)
  // User Data
  const [userData, setUserData] = useState({})

  // console.log('context t: ', userToken);
  // console.log('context d: ', userData);

  return (
    <AppContext.Provider value={{
      userToken,
      setUserToken,
      userData,
      setUserData
    }}>
        { children }
    </AppContext.Provider>
  )
};
