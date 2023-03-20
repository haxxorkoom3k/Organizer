import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">Органайзер</Link>
          <div className='navLinksStyle'>
          <Link to='/user/login'>Авторизация</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar