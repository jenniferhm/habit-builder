import React from 'react';
import Context from '../../Context';

import { Navbar, Nav, Button } from 'react-bootstrap';

const NavigationBar = ({ requestSignIn, requestSignOut, login }) => {
  const onClick = login ? requestSignOut : requestSignIn;
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Habit Whatever</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/create">Create New</Nav.Link>
        </Nav>
        <Button onClick={onClick}> {login ? 'Logout' : 'Login'} </Button>
      </Navbar>
    </>
  )
};

export default NavigationBar;