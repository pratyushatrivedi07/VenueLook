import React, { Component } from 'react';
import image1 from '../img/FK.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
import UserService from '../services/UserService';

class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            errors: {},
            email: '',
            password: '',
        }
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.signin = this.signin.bind(this);
    }

    //VALIDATIONS
    handleValidation() {
        let em = this.state.email;
        let pwd = this.state.password;
        let errors = {};
        let formIsValid = true;

        //Email
        if (!em) {
          formIsValid = false;
          errors["email"] = "Email is required";
        }
        else if(!em.length == 0){
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(!this.state.email || regex.test(this.state.email) === false){
                  errors["email"] = "Invalid Email";

        }
    }
        //Password
        if (!pwd) {
            formIsValid = false;
            errors["password"] = "Password is required";
          }
    
        this.setState({ errors: errors });
        return formIsValid;
    }
    
    //LOGIN
    signin = (e) =>{
        e.preventDefault();
        if (this.handleValidation()) {
            let user = { email: this.state.email, password: this.state.password};
            UserService.loginUser(user).then(res =>{
            let userCre = { email: this.state.email, password: this.state.password, token: res.data.message}
            localStorage.setItem('userCredentials', JSON.stringify(userCre));
            window.location.assign('/user')
            
            this.setState({
                email: '',
                password: '',
            });
        });
          }
    }

    changeEmailHandler = (event) =>{
        this.setState({email: event.target.value});
    }

    changePasswordHandler = (event) =>{
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div>
                <head>
                <script type="text/javascript">
                    window.history.forward();
                    function noBack() {
                        window.history.forward()
                    }
                </script>
                </head>
                <img className="Img" src={image1} alt="photo"></img>
                <div className="text-box">
                <div class="register-photolg">
                        <div class="form">
                            <div class="image-holderlg"></div>
                                <form>
                                    <h2 class="text-center">Sign In</h2>
                                    <div class="form-group">
                                        <input class="form-control" required type="email" name="email" value={this.state.email} onChange={this.changeEmailHandler} placeholder="Email"/>
                                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" required type="password" name="password" value={this.state.password} onChange={this.changePasswordHandler} placeholder="Password"/>
                                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                    </div>
                                    <br></br>
                                    <div class="form-group">
                                        <button class="btnlg" type="submit" onClick={this.signin}>Log In</button>
                                    </div>
                                </form>
                            </div>
                </div>	
                </div>
                </div>
    
        );
    }
}

export default Login;