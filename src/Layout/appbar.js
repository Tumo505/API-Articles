import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";


const NavBar = () => {
    
        return (
            <Navbar bg="dark" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link >Home</Nav.Link>
            <Nav.Link >About</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
            //   onChange={this.handleSearchInput}
            //   value={this.state.searchText}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-info">
              Search
            </Button>
          </Form>
        </Navbar>
        )
    }


export default NavBar;