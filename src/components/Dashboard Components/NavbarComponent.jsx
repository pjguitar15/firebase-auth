import React from 'react'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const NavbarComponent = ({ handleLogout }) => {
  return (
    <Navbar bg='dark' expand='lg' className='sticky-top navbar-dark'>
      <Navbar.Brand href='#home'>Chat App</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#link'>Link</Nav.Link>
          <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Link to='/update-profile' className='btn btn-warning btn-sm'>
          Update Profile
        </Link>

        <button
          onClick={handleLogout}
          className='btn btn-outline-light btn-sm mx-1'
        >
          logout
        </button>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
