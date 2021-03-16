import React from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'

const NavbarComponent = () => {
  return (
    <Navbar bg='dark' expand='lg' className='fixed-top navbar-dark'>
      <Navbar.Brand href='#home'>Social Media App</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'></Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
