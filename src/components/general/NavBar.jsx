import React, {Component} from 'react';
import {LinkContainer} from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {getCurrentUser} from "../../services/authService";

class NavBar extends Component {
    render() {
        const user = getCurrentUser();
        return (
            <React.Fragment>
                <Navbar
                    className="navbar navbar-expand-md navbar-light bg-white shadow-sm justify-content-between"
                    expand="lg">

                    <LinkContainer to="/">
                        <Navbar.Brand href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                 fill="currentColor" className="bi bi-camera2"
                                 viewBox="0 0 16 16">
                                <path d="M5 8c0-1.657 2.343-3 4-3V4a4 4 0 0 0-4 4z"/>
                                <path
                                    d="M12.318 3h2.015C15.253 3 16 3.746 16 4.667v6.666c0 .92-.746 1.667-1.667 1.667h-2.015A5.97 5.97 0 0 1 9 14a5.972 5.972 0 0 1-3.318-1H1.667C.747 13 0 12.254 0 11.333V4.667C0 3.747.746 3 1.667 3H2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1h.682A5.97 5.97 0 0 1 9 2c1.227 0 2.367.368 3.318 1zM2 4.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zM14 8A5 5 0 1 0 4 8a5 5 0 0 0 10 0z"/>
                            </svg>
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">

                        <Nav>{/* placeholder */}</Nav>

                        <Nav>
                            <LinkContainer to="/galleries">
                                <Nav.Link>
                                    Gallery
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="#">
                                <Nav.Link>Highlights</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="#">
                                <Nav.Link>Latest</Nav.Link>
                            </LinkContainer>
                        </Nav>

                        <Nav>
                            {user ? (
                                <NavDropdown id="account" title="Account">
                                    <LinkContainer to="#">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="#">
                                        <NavDropdown.Item>Settings</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Divider/>
                                    <LinkContainer to="/accounts/logout">
                                        <NavDropdown.Item>Logout</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            ) : (
                                <React.Fragment>
                                    <LinkContainer to="/accounts/login">
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to="/accounts/register">
                                        <Nav.Link>
                                            Register
                                        </Nav.Link>
                                    </LinkContainer>
                                </React.Fragment>
                            )}
                        </Nav>

                    </Navbar.Collapse>

                </Navbar>
            </React.Fragment>
        );
    }
}

export default NavBar;