import React, { Component, useState } from 'react'
import image from '../img/img2.jpg'
import {Card,Modal} from 'react-bootstrap';
import {FaPhoneAlt} from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faDotCircle, faSearch} from '@fortawesome/free-solid-svg-icons'
import VenueService from '../services/VenueService';
import emailjs from 'emailjs-com';
import './UserPage.css'
import AddVenue from './AddVenue';

 class UserPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            venues: [],
            isOpen: false,
        }
    }

    // EMAIL JS Service

    sendEmail(e){
        e.preventDefault();
    
        emailjs.sendForm('gmail', 'template_fxpb6wh', e.target, 'user_D0Bd1c8AhUX14eDieBVX7')
          .then((result) => {
              console.log("SUCCESS", result.text);
              alert("Enquiry Sent Successfully!");
          }, (error) => {
              console.log("FAILED",error.text);
              alert("FAILED!")
          });
          e.target.reset()
    }

    //EDIT VENUE
    editVenue(id){
        window.location.assign('/updateVenue');
    }

    //DELETE VENUE
    deleteVenue(id){
        VenueService.deleteVenue().then((res) =>{
            window.location.assign('/newVenue');
            alert('Venue Deleted!')
        }).catch(error =>{
            console.log(error);
        })  
    }

    //GET A VENUE 
    componentDidMount(){
        VenueService.getVenueById().then((res)=>{
            this.setState({venues: res.data});
            console.log(res);
        })
    }

    
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    

    render() {
        if(this.state.venues){
        return (
            <div className='body'>
                <script type="text/javascript">
            window.history.forward();
            function noBack() {
                window.history.forward()
            }
            </script>
            <header>
                <img className="mainImg" src={image} alt='image'></img>
                <div className="text-box2 text-center">
                    <h3 className="title1">Plan Your Wedding with<br></br> India's best Wedding Co.</h3>
                </div>
            </header>

            <div>
                <p className="banner">Thousands of venues and variety of ranges only for YOU and your Special Day!</p>
            </div>

            <div className="col-md-12">
                <h2 className="home-title text-center">Browse Wedding Venues</h2>
            </div> 
            <div>
                <div className="container-fluid col-md-6 ">
                    <Card border="dark" class="card" style={{backgroundColor: 'rgba(225,225,225,0.1)', borderRadius: '1rem'}} key = {(this.state.venues.id)}>
                        <Card.Body>
                            <Card.Title>{(this.state.venues.name)}</Card.Title>
                                <Card.Subtitle className="subtitle">{(this.state.venues.area)}, {(this.state.venues.city)}</Card.Subtitle>
                                <Card.Text>
                                    <br></br>
                                    {(this.state.venues.description)}
                                    <br></br>
                                    <br></br>
                                    <p className="guest"><FontAwesomeIcon icon={faUsers}/>  {(this.state.venues.noOfGuests)}</p>
                                    <p className="price"><FontAwesomeIcon className="vegIcon" icon={faDotCircle}/>   ₹ {(this.state.venues.veg)} /Plate</p>
                                    <p className="price"><FontAwesomeIcon className="nvegIcon" icon={faDotCircle}/>  ₹ {(this.state.venues.nonVeg)} /Plate</p>
                                    <br></br>
                                    <a class="visit" href={(this.state.venues.website)}>Visit Us</a> | <a class="enquire" onClick={this.openModal}>Get in Touch</a> | <FaPhoneAlt style={{color: 'blueviolet'}}/><a href= "tel:" class="phone"> {(this.state.venues.number)}</a>
                                    <br></br>
                                    <br></br>
                                    <a class="bn11" onClick={this.editVenue}>Update</a> | <a class="bn12" onClick={this.deleteVenue}>Delete</a>
                                </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={this.state.isOpen} onHide={this.closeModal}>
                <div className="modal-body">
                    <Modal.Header closeButton>
                        <Modal.Title class="title">Enquiry Form...</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={this.sendEmail} class="form">
                        <div className="row pt-5 mx-auto">
                            <div className="col-8 form-group mx-auto">
                                <input type="text" className="form-control" required placeholder="Name" name="name"/>
                            </div>
                            <div className="col-8 pt-2 form-group mx-auto">
                                <input type="email" className="form-control" required placeholder="Email Address" name="email"/>
                            </div>
                            <div className="col-8 pt-2 form-group mx-auto">
                                <input type="text" className="form-control" value="Venue Enquiry" hidden disabled name="subject"/>
                            </div>
                            <div className="col-8 pt-2 form-group mx-auto">
                                <textarea className="form-control" cols="30" required rows="8" placeholder="Your Message" name="message"/>
                            </div>
                            <div className="col-8 pt-3 mx-auto">
                                <input type="submit" className="Sendbtn btn-success" value="Send"/>
                            </div>
                            </div>
                    </form>
                </div>
            </Modal>    
        </div>
        )
        }
        else{
            return(
                <AddVenue></AddVenue>
            )
        }
    }
}

export default UserPage;
