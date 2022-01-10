import React, { Component } from 'react';
import {FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaHome, FaEnvelope, FaPhoneAlt} from 'react-icons/fa';
import logo from '../img/logo.png'
import emailjs from 'emailjs-com';
import './Footer.css';

class Footer extends Component {

    sendEmail(e){
        e.preventDefault();
    
        emailjs.sendForm('gmail', 'template_xdrzl96', e.target, 'user_D0Bd1c8AhUX14eDieBVX7')
          .then((result) => {
              console.log("SUCCESS", result.text);
              alert("Feedback Sent Successfully!");
          }, (error) => {
              console.log("FAILED",error.text);
              alert("FAILED!")
          });
          e.target.reset()
    }

    render() {
        return (
            <div>
                <footer class="text-center text-lg-start bg-dark" style={{color: 'white'}}>
                    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                        <div class="me-5 d-none d-lg-block">
                            <span>Get connected with us on social networks:</span>
                        </div>
                        <div>
                            <a href="" class="me-4 text-reset"><FaFacebookF></FaFacebookF></a>
                            <a href="" class="me-4 text-reset"><FaTwitter></FaTwitter></a>
                            <a href="" class="me-4 text-reset"><FaGoogle></FaGoogle></a>
                            <a href="" class="me-4 text-reset"><FaInstagram></FaInstagram></a>
                            <a href="https://www.linkedin.com/in/pratyusha-trivedi-b1b64316b/" class="me-4 text-reset"><FaLinkedin></FaLinkedin></a>
                            <a href="https://github.com/pratyushatrivedi07" class="me-4 text-reset"><FaGithub></FaGithub></a>
                        </div>
                    </section>

                    <section>
                        <div class="container text-center text-md-start mt-5">
                            <div class="row mt-3">
                                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    <a href="./App"><img class="logo" src={logo} alt="logo"/></a>
                                    <p class="first">
                                        A one stop website for you to select best venue for your special day.  
                                    </p>
                                    <p class="second">
                                        Compare Prices | Enquire and Get Quotes 
                                    </p>
                                </div>
                                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 class="text-uppercase fw-bold mb-4">Contact Us</h6>
                                    <p><FaHome/> Mumbai, MH, India</p>
                                    <p><FaEnvelope/> info@example.com</p>
                                    <p><FaPhoneAlt/> + 01 234 567 89</p>
                                </div>

                                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    <h6 class="text-uppercase fw-bold mb-4">Feedback</h6>
                                    <form onSubmit={this.sendEmail} class="form">
                                    <div>
                                        <div>
                                            <input type="text" className="form-control" required placeholder="Name" name="name"/>
                                        </div>
                                        <br></br>
                                        <div>
                                            <input type="email" className="form-control" required placeholder="Email Address" name="email"/>
                                        </div>
                                        <br></br>
                                        <div>
                                        <select className="form-control" name="option" id="feedbackValue" required>
                                            <option value="select" selected>Select Category...</option>
                                            <option value="Like">Like</option>
                                            <option value="Problem">Problem</option>
                                            <option value="Question">Question</option>
                                            <option value="Suggestion">Suggestion</option>
                                        </select>
                                        </div>
                                        <br></br>
                                        <div>
                                            <textarea className="form-control" cols="30" required rows="5" placeholder="Your Message" name="message"/>
                                        </div>
                                        <div>
                                            <input type="submit" className="feedbtn" value="Send"/>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                        © 2021 Copyright
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;