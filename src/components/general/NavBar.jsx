// import React, {Component} from 'react';
// import {LinkContainer} from "react-router-bootstrap";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import {getCurrentUser} from "../../services/authService";
//
// class NavBar extends Component {
//     render() {
//         const user = getCurrentUser();
//         return (
//             <React.Fragment>
//                 <Navbar
//                     className="navbar navbar-expand-md navbar-light bg-white shadow-sm justify-content-between"
//                     expand="lg">
//
//                     <LinkContainer to="/">
//                         <Navbar.Brand href="/">
//                             <img
//                                 alt="website icon"
//                                 src="/rocket-icon.svg"
//                                 width="30"
//                                 height="30"
//                                 className="d-inline-block align-top"
//                             />
//                         </Navbar.Brand>
//                     </LinkContainer>
//
//                     <Navbar.Toggle aria-controls="basic-navbar-nav"/>
//                     <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
//
//                         <Nav>{/* placeholder */}</Nav>
//
//                         <Nav>
//                             <LinkContainer to="/tasklists">
//                                 <Nav.Link>
//                                     Tasklists
//                                 </Nav.Link>
//                             </LinkContainer>
//                             <LinkContainer to="#">
//                                 <Nav.Link>Tasks</Nav.Link>
//                             </LinkContainer>
//                             <LinkContainer to="#">
//                                 <Nav.Link>Due</Nav.Link>
//                             </LinkContainer>
//                         </Nav>
//
//                         <Nav>
//                             {user ? (
//                                 <NavDropdown id="account" title="Account">
//                                     <LinkContainer to="#">
//                                         <NavDropdown.Item>Profile</NavDropdown.Item>
//                                     </LinkContainer>
//                                     <LinkContainer to="#">
//                                         <NavDropdown.Item>Settings</NavDropdown.Item>
//                                     </LinkContainer>
//                                     <NavDropdown.Divider/>
//                                     <LinkContainer to="/accounts/logout">
//                                         <NavDropdown.Item>Logout</NavDropdown.Item>
//                                     </LinkContainer>
//                                 </NavDropdown>
//                             ) : (
//                                 <React.Fragment>
//                                     <LinkContainer to="/accounts/login">
//                                         <Nav.Link>Login</Nav.Link>
//                                     </LinkContainer>
//                                     <LinkContainer to="/accounts/register">
//                                         <Nav.Link>
//                                             Register
//                                         </Nav.Link>
//                                     </LinkContainer>
//                                 </React.Fragment>
//                             )}
//                         </Nav>
//
//                     </Navbar.Collapse>
//
//                 </Navbar>
//             </React.Fragment>
//         );
//     }
// }
//
// export default NavBar;