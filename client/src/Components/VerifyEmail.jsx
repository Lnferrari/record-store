import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { authenticateAccount } from '../helpers/apiCalls'

const VerifyEmail = () => {
  const [ message, setMessage ] = useState(
    `We are verifying your account...`
  )
  const { token } = useParams()

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const res = await authenticateAccount(token);

        if (!res.error) {
          setMessage(`Your account with ${res.email} has been verified`);
          return
        }

        setMessage(`Ups! Something went wrong`)

      } catch (error) {
        toast(`🦄 ${error.message}`);
      }
    }
    verifyAccount();
  }, [])


  return (
    <section className='page-wrapper'>
      {message}
    </section>
  )
}

export default VerifyEmail
