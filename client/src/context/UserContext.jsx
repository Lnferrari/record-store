import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { authenticateUser } from '../helpers/apiCalls';
import { toast } from 'react-toastify';

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [ records, setRecords ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ authIsDone, setAuthIsDone ] = useState(false)


  useEffect(() => {
    console.log('context trying to auth the cookie');
    const authMe = async () => {
      try {
        const res = await authenticateUser();

        if (!res.error) {
          setUser(res);
          setAuthIsDone(true)
          return
        }

        setUser(null)
        setAuthIsDone(true)

      } catch (error) {
        toast(`🦄 ${error.message}`);
      }
    }
    authMe();
  }, [])

  return (
    <UserContext.Provider value={{ records, setRecords, user, setUser, authIsDone, setAuthIsDone }}>
      {children}
    </UserContext.Provider>
  )
}