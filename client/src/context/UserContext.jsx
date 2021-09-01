import { useState, createContext, useEffect } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [records, setRecords] = useState([])

  return (
    <UserContext.Provider value={{ records, setRecords }}>
      {children}
    </UserContext.Provider>
  )
}