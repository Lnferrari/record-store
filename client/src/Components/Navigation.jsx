import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
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
        <NavLink exact to='/login' activeClassName='active'>
          Login
        </NavLink>
        <NavLink exact to='/signup' activeClassName='active'>
          Sign up
        </NavLink>
        <NavLink exact to='/profile/:id' activeClassName='active'>
          User
        </NavLink>
        <NavLink exact to='/profile/:id/orders' activeClassName='active'>
          Orders
        </NavLink>
      </div>
    </nav>
  )
}

export default Navigation
