import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router'
import { UserContext } from '../context/UserContext'

const PrivateRoute = ({path, component, redirectTo = '/login'}) => {
  const { user, authIsDone } = useContext(UserContext)

  if (!authIsDone) {
    return (
      <section className='page-wrapper'>
        <h4>Loading...</h4>
      </section>
    )
  }

  if (authIsDone) {
    return user
    ? <Route path={path} component={component} />
    : <Redirect to={redirectTo} />
  }
  
}

export default PrivateRoute
