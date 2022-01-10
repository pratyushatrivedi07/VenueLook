import React, { Component } from 'react';
import image from '../img/t1.jpg';
import gif from '../img/cat.gif';
import 'bootstrap/dist/css/bootstrap.css';
import {Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Register.css';
import UserService from '../services/UserService';


class Register extends Component {

    constructor(props){
        super(props)

        this.state = {
            errors: {},
            name: '',
            email: '',
            password: '',
            isOpen: false
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.register = this.register.bind(this);   
    }
    
    // VALIDATIONS
    handleValidation() {
        let nm = this.state.name;
        let em = this.state.email;
        let pwd = this.state.password;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!nm){
            formIsValid = false;
            errors["name"] = "Name is required";
          }

        //Email
        if (!em) {
          formIsValid = false;
          errors["email"] = "Email is required";
        }
    
        //Password
        if (!pwd) {
            formIsValid = false;
            errors["password"] = "Password is required";
          }
        this.setState({ errors: errors });
        return formIsValid;
    }


    //REGISTER
    register = (e) =>{
        e.preventDefault();
        if (this.handleValidation()) {
        let user = {name: this.state.name, email: this.state.email, password: this.state.password};
        console.log('user =>' + JSON.stringify(user));

        UserService.registerUser(user).then(res =>{
            this.setState({
                errors: {},
                name: '',
                email: '',
                password: '',
                isOpen: true
            });
        });
    }   
    }

    changeNameHandler = (event) =>{
        this.setState({name: event.target.value});
    }

    changeEmailHandler = (event) =>{
        this.setState({email: event.target.value});
    }

    changePasswordHandler = (event) =>{
        this.setState({password: event.target.value});
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {
        return (
            <div>
                <img className="ImgR" src={image} alt="photo"></img>
                <div className="text-box4">
                    <h3 className="title1">List Your Business on VenueLook</h3>
                </div>
                <div class="jumbotron jumbotron-fluid">
                    <p className="banner-login">Join us as we cater to our customer's EVERY need!</p>                        
                    <h5>Already Registered? <Link to="/login" className="signIn">Sign In</Link></h5>
                    <h4>OR</h4>
                    <h5 className="fill-form">Fill the Form below to get started</h5>

                    <div class="register-photo">
                        <div class="form-container">
                            <div class="image-holder"></div>
                                <form>
                                    <h2 class="text-center">Create an account.</h2>
                                    <div class="form-group">
                                        <input class="form-control" type="text" name="name" required value={this.state.name} onChange={this.changeNameHandler} placeholder="Name"/>
                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="email" name="email" required value={this.state.email} onChange={this.changeEmailHandler} placeholder="Email"/>
                                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="password" name="password" required value={this.state.password} onChange={this.changePasswordHandler} placeholder="Password"/>
                                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                    </div>
                                    <br></br>
                                    <div class="form-group">
                                        <button class="btnrg" type="submit" onClick={this.register}>Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>	
                    </div> 

                    <Modal size="md" aria-labelledby="contained-modal-title-vcenter"
      centered show={this.state.isOpen} onHide={this.closeModal}>
          <div className="modal-body">
              <h2>Registration Successful</h2>

              <img className='image' src={gif} alt='cat'></img>

              <div className='md-foot'>
                  <p>Click here to go to <Link className='btn2' to="/login">Login Page</Link></p>
              </div>
    
            </div>
            </Modal> 
               
        </div>
        );
    }
}

export default Register;