import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


const Navigation = () => {
  const { user } = useContext(UserContext)
  
  const amountOfItems = user?.cart?.reduce(
    (total, item) => (total + item.qty)
  ,0)

  return (
    <nav className='navigation'>
      <div className='logo'>
        <h5>RECORD SHOP</h5>
      </div>
      
      <div className="menu">
        <NavLink exact to='/' activeClassName='active'>
          Home
        </NavLink>
        <NavLink exact to='/shop' activeClassName='active'>
          Shop
        </NavLink>
        {
          !user
          ? <>
              <NavLink exact to='/login' activeClassName='active'>
                Login
              </NavLink>
              <NavLink exact to='/signup' activeClassName='active'>
                Sign up
              </NavLink>
            </>
          : <>
              <NavLink exact to={`/profile/${user._id}/orders`} activeClassName='active'>
                Orders
              </NavLink>
              <NavLink exact to={`/profile/${user._id}/cart`} activeClassName='active'>
                Cart ({amountOfItems})
              </NavLink>
              <NavLink exact to={`/profile/${user._id}` }activeClassName='active' className='avatar'>
                <img src={user.avatar} alt="avatar" />
              </NavLink>
            </>
        }
      </div>
    </nav>
  )
}

export default Navigation
