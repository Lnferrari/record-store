import { useState, createContext, useEffect } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [ records, setRecords ] = useState([])
  const [ user, setUser ] = useState(null)

  return (
    <UserContext.Provider value={{ records, setRecords, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}