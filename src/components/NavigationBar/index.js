import React from 'react';
import Context from '../../Context';

import { Navbar, Nav, Button, Form , FormControl} from 'react-bootstrap';

const NavigationBar = ({requestSignIn, requestSignOut, login}) => {
  const onClick = login ? requestSignOut : requestSignIn;  
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Habit Whatever</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Create New</Nav.Link>
        </Nav>
        <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
        <Button onClick={onClick}> {login ? 'Logout' : 'Login'} </Button>
      </Navbar>
    </>
  )
};

export default NavigationBar;