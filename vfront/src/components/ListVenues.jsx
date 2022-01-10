import React, { Component} from 'react';
import {Card,Modal} from 'react-bootstrap';
import {FaPhoneAlt} from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import image from '../img/img2.jpg'
import axios from 'axios'
import { faUsers, faDotCircle, faSearch} from '@fortawesome/free-solid-svg-icons'
import emailjs from 'emailjs-com';
import VenueService from '../services/VenueService';
import './ListVenue.css'


class ListVenues extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            venues: [],
            isOpen: false,
            city: '',
            cityVenue: [],
            isSearch: false,
        }
    }

    //SEARCH BY CITY
    Search =() =>{
      if(this.state.city == ''){
          this.setState({"isSearch": false});
      }
      else{
      let newData = this.state.city;
      axios.get("http://localhost:9600/api/venues/city/" + newData)
      //axios.get("http://venue-env.eba-3kmimed3.ap-south-1.elasticbeanstalk.com/api/venues/city/" + newData) --- AWS EBS LINK
      .then((res) =>{
        this.setState({
            cityVenue: res.data, 
            "isSearch": true, 
            });
      });}
    }
    
    //EMAIL JS Service
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
    
    //GET ALL VENUES
    componentDidMount(){
        VenueService.getVenues().then((res) => {
            this.setState({venues: res.data});
        });
    }

    changeSearchHandler =(e) =>{
        this.setState({city: e.target.value});
    }

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    render() {
        if(!this.state.isSearch){
        return (
        <div className='body'>
            <header>
                <img className="mainImg" src={image} alt='image'></img>
                <div className="text-box3 text-center">
                    <h3 className="title1">Plan Your Wedding with<br></br> India's best Wedding Co.</h3>
                    <div>
                        <input class="searchBar" type="search" onChange={this.changeSearchHandler} placeholder="Search Venue by City..." ></input>
                            <span class="input-group-append">
                                <button class="searchBtn" onClick={this.Search} type="button">
                                <FontAwesomeIcon className="iconSearch" icon={faSearch}></FontAwesomeIcon>
                                </button>
                            </span>
                    </div>
                </div>
            </header>

            <div>
                <p className="banner">Thousands of venues and variety of ranges only for YOU and your Special Day!</p>
            </div>

            <div className="col-md-12">
                <h2 className="home-title text-center">Browse Wedding Venues</h2>
            </div> 
{

   this.state.venues.map(
    venue => 
    <div>
    <div className="container-fluid col-md-6 ">
    <Card border="dark" class="card" style={{backgroundColor: 'rgba(225,225,225,0.1)', borderRadius: '1rem'}} key = {venue.id}>
    <Card.Body>
      <Card.Title>{venue.name}</Card.Title>
      <Card.Subtitle className="subtitle">{venue.area}, {venue.city}</Card.Subtitle>
      <Card.Text>
      <br></br>
      {venue.description}
      <br></br>
      <br></br>
      <p className="guest"><FontAwesomeIcon icon={faUsers}/>  {venue.noOfGuests}</p>
      <p className="price"><FontAwesomeIcon className="vegIcon" icon={faDotCircle}/>   ₹ {venue.veg} /Plate</p>
      <p className="price"><FontAwesomeIcon className="nvegIcon" icon={faDotCircle}/>  ₹ {venue.nonVeg} /Plate</p>
      <br></br>
      <a class="visit" href={venue.website}>Visit Us</a> | <a class="enquire" onClick={this.openModal}>Get in Touch</a> | <FaPhoneAlt style={{color: 'blueviolet'}}/><a href= "tel:" class="phone"> {venue.number}</a>
      </Card.Text>
    </Card.Body>
    </Card>
    </div>
    </div>
   )}

<Modal size="lg" aria-labelledby="contained-modal-title-vcenter"
      centered show={this.state.isOpen} onHide={this.closeModal}>
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
        )}
else{
    return(
        <div className='body'>
            <header>
                <img className="mainImg" src={image} alt='image'></img>
                <div className="text-box3 text-center">
                    <h3 className="title1">Plan Your Wedding with<br></br> India's best Wedding Co.</h3>
                    <div>
                        {/* <SearchByCity></SearchByCity> */}
                        <input class="searchBar" type="search" onChange={this.changeSearchHandler} placeholder="Search Venue by City..." ></input>
                            <span class="input-group-append">
                                <button class="searchBtn" onClick={this.Search} type="button">
                                <FontAwesomeIcon className="iconSearch" icon={faSearch}></FontAwesomeIcon>
                                </button>
                            </span>
                    </div>
                </div>
            </header>

            <div>
                <p className="banner">Thousands of venues and variety of ranges only for YOU and your Special Day!</p>
            </div>

            <div className="col-md-12">
                <h2 className="home-title text-center">Browse Wedding Venues</h2>
            </div> 
{
this.state.cityVenue.map(
   
    cityVenue => 
 <div>
 <div className="container-fluid col-sm-6 ">
 <Card border="dark" class="card" style={{backgroundColor: 'rgba(225,225,225,0.1)', borderRadius: '1rem'}} key = {cityVenue.id}>
 <Card.Body>
   <Card.Title>{cityVenue.name}</Card.Title>
   <Card.Subtitle className="subtitle">{cityVenue.area}, {cityVenue.city}</Card.Subtitle>
   <Card.Text>
   <br></br>
   {cityVenue.description}
   <br></br>
   <br></br>
   <p className="guest"><FontAwesomeIcon icon={faUsers}/>  {cityVenue.noOfGuests}</p>
   <p className="price"><FontAwesomeIcon className="vegIcon" icon={faDotCircle}/>   ₹ {cityVenue.veg} /Plate</p>
   <p className="price"><FontAwesomeIcon className="nvegIcon" icon={faDotCircle}/>  ₹ {cityVenue.nonVeg} /Plate</p>
   <br></br>
   <a class="visit" href={cityVenue.website}>Visit Us</a> | <a class="enquire" onClick={this.openModal}>Get in Touch</a> | <FaPhoneAlt style={{color: 'blueviolet'}}/><a href= "tel:" class="phone"> {cityVenue.number}</a>
   </Card.Text>
 </Card.Body>
 </Card>
 </div>
 </div>
   )}

<Modal size="lg" aria-labelledby="contained-modal-title-vcenter"
      centered show={this.state.isOpen} onHide={this.closeModal}>
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
    }
}

export default ListVenues;