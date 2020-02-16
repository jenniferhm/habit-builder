import React from 'react';
import Context from '../../Context';

import { Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';

const NavigationBar = ({requestSignIn, requestSignOut, login}) => {
  const onClick = login ? requestSignOut : requestSignIn;  
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Habit Whatever</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Button onClick={onClick}> {login ? 'Logout' : 'Login'} </Button>
      </Navbar>
    </>
  )
};

export default NavigationBar;