import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className='navigation'>
      <div className='logo'>
        <h5>RECORD SHOP</h5>
      </div>
      
      <div className="menu">
        <NavLink exact to='/' activeClassName='active' >Home</NavLink>
        <NavLink exact to='/shop' activeClassName='active' >Shop</NavLink>
      </div>
    </nav>
  )
}

export default Navigation
