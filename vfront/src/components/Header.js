import React, { Component } from 'react';
import logo from '../img/logo.png'
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { NavLink, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'

class Header extends Component {
    constructor(props){
        super(props)

        this.state= {
            userDetail: {},
            isLoggedIn: false,
        } 
    }

    //GET LOGGED IN USER
    componentDidMount(){   
        const userDetail = JSON.parse(localStorage.getItem('userCredentials'));
        if(userDetail){
            console.log(userDetail);
            this.setState({
                "userDetail": userDetail,
                "isLoggedIn": true,
            });
        }
    }

    //LOGOUT
    logOut(){
        localStorage.removeItem('userCredentials');
        this.setState({"isLoggedIn": false});
    }
    
    render() {

        if(this.state.isLoggedIn){
            return(

                
                <Navbar className="navbar nav navbar-dark" collapseOnSelect expand="sm" variant="light">
                <Container>
                    <Link to="/user"><img class="logo" src={logo} alt="logo"/></Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="basic-navbar-nav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Navbar.Collapse id="responsive-navbar-nav" >
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <p className="nav_hi"  style={{color: 'white'}}>Hi, {(this.state.userDetail && this.state.userDetail.email)}</p>
                            <NavLink className="nav_logout" to="/" onClick={this.logOut}>Logout</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            


            )
        }

        else{
            
        return (
            <div>
                <Navbar className="navbar nav navbar-dark" collapseOnSelect expand="sm" variant="light">
                    <Container>
                        <Link to="/"><img class="logo" src={logo} alt="logo"/></Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" >
                            <Nav className="me-auto"></Nav>
                            <Nav>
                                <NavLink className="nav_link" to="/register">List a Business</NavLink>
                                <NavLink className="nav_login" to="/login">Login</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>     
            </div>
            
                
        );}
    }
}

export default Header;
