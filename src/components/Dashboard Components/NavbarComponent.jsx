import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const NavbarComponent = ({ handleLogout }) => {
  return (
    <Navbar bg='dark' expand='lg' className='sticky-top navbar-dark'>
      <Navbar.Brand href='#home'>Chat App</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <div className='ml-auto'>
          <Link to='/update-profile' className='btn btn-warning btn-sm'>
            Update Profile
          </Link>

          <button
            onClick={handleLogout}
            className='btn btn-outline-light btn-sm mx-1'
          >
            logout
          </button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
