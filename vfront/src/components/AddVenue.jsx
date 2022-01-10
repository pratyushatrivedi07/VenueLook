import React, { Component } from 'react';
import VenueService from '../services/VenueService';
import './AddVenue.css'

class AddVenue extends Component {
    constructor(props){
        super(props)

        this.state = {
            errors: {},
            name: '',
            description: '',
            email: '',
            noOfGuests: 0,
            veg: 0,
            nonVegPrice: 0,
            area: '',
            city: '',
            website: '',
            number: '',
            //selectedFile: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBgxUwAAU+n3sIAAAAASUVORK5CYII='
        }
        this.changeVenueNameHandler = this.changeVenueNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeGuestsHandler =this.changeGuestsHandler.bind(this);
        this.changeVegHandler = this.changeVegHandler.bind(this);
        this.changeNonVegHandler =this.changeNonVegHandler.bind(this);
        this.changeAreaHandler =this.changeAreaHandler.bind(this);
        this.changeCityHandler =this.changeCityHandler.bind(this);
        this.changeWebsiteHandler =this.changeWebsiteHandler.bind(this);
        this.changePhoneHandler =this.changePhoneHandler.bind(this);
        this.saveVenue = this.saveVenue.bind(this);
    }

    //ADD VENUE
    saveVenue = (e) =>{
        e.preventDefault();
        if (this.handleValidation()) {
        let venue = {name: this.state.name,
            email: this.state.email, 
            description: this.state.description,
            noOfGuests: this.state.noOfGuests,
            veg: this.state.veg,
            nonVeg: this.state.nonVeg,
            area: this.state.area,
            city: this.state.city,
            website: this.state.website,
            number: this.state.number,
            };

            let image = {selectedFile: this.state.selectedFile}
        
        console.log('venue =>' + JSON.stringify(venue));
        VenueService.postVenue(venue).then(res =>{
            window.location.assign("/user")
        });

        }
    }

    //VALIDATIONS
    handleValidation() {
        let vnm = this.state.name;
        let em = this.state.email;
        let desc = this.state.description;
        let g = this.state.noOfGuests;
        let veg = this.state.veg;
        let nveg= this.state.nonVeg;
        let ar = this.state.area;
        let ct = this.state.city;
        let web = this.state.website;
        let ph = this.state.number;
        let errors = {};
        let formIsValid = true;

        //VenueName
        if(!vnm){
            formIsValid = false;
            errors["name"] = "Venue Name is required";
          }
          else if(!vnm.length == 0){
            const regex = /^(?:(?!abc|ABC|xyz|XYZ)[a-z])+$/i;
            if(!this.state.name || regex.test(this.state.name) === false){
                  errors["name"] = "Invalid Venue Name";
            }
        }

        //Description
        if (!desc) {
        formIsValid = false;
        errors["description"] = "Description is required";
        }
        this.setState({ errors: errors });
        
    
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

        //Guest
        if(!g){
            formIsValid = false;
            errors["noOfGuests"] = "Number of Guests is required";
        }

        //Veg
        if(!veg){
            formIsValid = false;
            errors["veg"] = "Required";
        }

        //NonVeg
        if(!nveg){
            formIsValid = false;
            errors["nonVeg"] = "Required";
        }

        //Area
        if(!ar){
            formIsValid = false;
            errors["area"] = "Area is required";
          }
          else if(!ar.length == 0){
            const regex = /^(?:(?!abc|ABC|xyz|XYZ)[a-z])+$/i;
            if(!this.state.area || regex.test(this.state.area) === false){
                  errors["area"] = "Invalid Area";
            }
        }

        //City
        if(!ct){
            formIsValid = false;
            errors["city"] = "City is required";
          }
          else if(!ar.length == 0){
            const regex = /^(?:(?!abc|ABC|xyz|XYZ)[a-z])+$/i;
            if(!this.state.city || regex.test(this.state.city) === false){
                  errors["City"] = "Invalid City";
            }
        }
        //Website
        if (!web) {
            formIsValid = false;
            errors["website"] = "Website is required";
            }
            this.setState({ errors: errors });

        //Phone
        if (!ph) {
            formIsValid = false;
            errors["number"] = "Phone Number is required";
          }
          else if(!ph.length == 0){
              const regex = /^[6-9]\d{9}$/i;
              if(!this.state.number || regex.test(this.state.number) === false){
                    errors["number"] = "Invalid Phone Number";
              }
          }
    
    return formIsValid;
       
      }
    

    changeVenueNameHandler =(event) =>{
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler = (e) =>{
        this.setState({description: e.target.value});
    }

    changeEmailHandler = (e) =>{
        this.setState({email: e.target.value});
    }

    changeWebsiteHandler = (e) =>{
        this.setState({website: e.target.value});
    }

    changeGuestsHandler =(e) =>{
        this.setState({noOfGuests: e.target.value});
    }

    changeVegHandler =(e) =>{
        this.setState({veg: e.target.value});
    }

    changeNonVegHandler =(e) =>{
        this.setState({nonVeg: e.target.value});
    }

    changeAreaHandler =(e) =>{
        this.setState({area: e.target.value});
    }

    changeCityHandler =(e) =>{
        this.setState({city: e.target.value});
    }

    changePhoneHandler =(e) =>{
        this.setState({number: e.target.value});
    }

    // fileSelectedHandler = event =>{
    //     const reader = new FileReader();
    // reader.onload = () =>{
    //   if(reader.readyState === 2){
    //     this.setState({selectedFile: reader.result})
    //   }
    // }
    // reader.readAsDataURL(event.target.files[0])  
    // }


    render() {
        const {selectedFile} = this.state;
        return (
            <div className='body'>
                <script type="text/javascript">
            window.history.forward();
            function noBack() {
                window.history.forward()
            }
            </script>
                <div className="container">
                    <div className='row'>
                        <div className='card col-md-8 offset-md-2 offset-md-2'>
                            <h3 className='text-center'>Add Venue</h3>
                            <div className='card-body'>
                                <form>
                                <div className='row'>
                                <div class="column">
                                    <div className='form-group'>
                                        <label >Venue Name: </label>
                                        <input placeholder='Venue Name' type="text" name="name" className='form-control'
                                        value={this.state.name} onChange={this.changeVenueNameHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>Venue Description: </label>
                                        <textarea placeholder='Description' name='description' className='form-control' cols='5' rows="7"
                                        value={this.state.description} onChange={this.changeDescriptionHandler}></textarea>
                                        <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>Email: </label>
                                        <input placeholder='Email' type="email" name='email' className='form-control'
                                        value={this.state.email} onChange={this.changeEmailHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>Website:  </label>
                                        <input placeholder='Website Link' type="url" name='website' className='form-control'
                                        value={this.state.website} onChange={this.changeWebsiteHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["website"]}</span>
                                    </div>
                                    {/* <div className='form-group'>
                                        <label>Image:  </label>
                                        <input type="file" className='form-control'
                                        onChange={this.fileSelectedHandler} accept='image/*'></input>
                                        <img src={selectedFile} alt="" className="img"></img>
                                    </div>   */}
                                </div>
                                
                                <div class="column">
                                    <div className='form-group'>
                                        <label>No. of Guests: </label>
                                        <input placeholder='Number of Guests' min={100} type="number" name='noOfGuests' className='form-control'
                                        value={this.state.noOfGuests} onChange={this.changeGuestsHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["noOfGuests"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>Veg Price /plate: </label>
                                        <input placeholder='Rate per plate' type="number" min={400} name='veg' className='form-control'
                                        value={this.state.veg} onChange={this.changeVegHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["veg"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>Non-Veg Price /plate: </label>
                                        <input placeholder='Rate per plate' type="number" min={500} name='nonVeg' className='form-control'
                                        value={this.state.nonVeg} onChange={this.changeNonVegHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["nonVeg"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>Area: </label>
                                        <input placeholder='Area' type="text" name='area' className='form-control'
                                        value={this.state.area} onChange={this.changeAreaHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["area"]}</span>
                                    </div>
                                    <div className='form-group'>
                                        <label>City:  </label>
                                        <input placeholder='City' type="text" name='city' className='form-control'
                                        value={this.state.city} onChange={this.changeCityHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["city"]}</span>
                                    </div>

                                    <div className='form-group'>
                                        <label>Phone Number:  </label>
                                        <input placeholder='Phone Number' type="tel" name='number' className='form-control'
                                        value={this.state.number} onChange={this.changePhoneHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["number"]}</span>
                                    </div>
                                </div> 
                                <div>
                                        <button className='btn btn-success' onClick={this.saveVenue}>Save</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        );
    }
}

export default AddVenue;