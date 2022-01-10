import React, {useState, useEffect} from 'react'
import { Link, useParams} from 'react-router-dom';
import VenueService from '../services/VenueService';
import './AddVenue.css'

const UpdateAVenue = () => {
    const [name, setName] = useState('')
    const [description, setDesc] = useState('')
    const[email, setEmail]= useState('')
    const[noOfGuests, setGuests] = useState('')
    const[veg, setVeg] = useState('')
    const[nonVeg, setNVeg] = useState('')
    const[area, setArea]  = useState('')
    const[city, setCity]  = useState('')
    const[website, setWeb]  = useState('')
    const[number, setNum]  = useState('')
    

    useEffect(() => {
        VenueService.getVenueById().then((res) =>{
           setName(res.data.name) 
           setDesc(res.data.description)
           setEmail(res.data.email)
           setGuests(res.data.noOfGuests)
           setVeg(res.data.veg)
           setNVeg(res.data.nonVeg)
           setArea(res.data.area)
           setCity(res.data.city)
           setWeb(res.data.website)
           setNum(res.data.number)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    //UPDATE VENUE
    const updateVenue = (e) =>{
        e.preventDefault();
        const venue = {name,description, email, noOfGuests, veg, nonVeg, 
            area, city, website, number }

                VenueService.updateVenue(venue)
                .then((res) =>{
                    console.log(res)
                    window.location.assign('/user')

                }).catch(error =>{
                    console.log(error);
                })   
    }

    return (
        <div className='body'>
                <div className="container">
                    <div className='row'>
                        <div className='card col-md-8 offset-md-2 offset-md-2'>
                            <h3 className='text-center'>Update Your Venue Details</h3>
                            <div className='card-body'>
                                <form>
                                <div className='row'>
                                <div class="column">
                                    <div className='form-group'>
                                        <label >Venue Name: </label>
                                        <input placeholder='Venue Name' type="text" name="name" className='form-control'
                                        value={name} onChange={(e) => setName(e.target.value)}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Venue Description: </label>
                                        <textarea placeholder='Description' name='description' className='form-control' cols='5' rows="7"
                                        value={description} onChange={(e) => setDesc(e.target.value)}></textarea>
                                    </div>
                                    <div className='form-group'>
                                        <label>Email: </label>
                                        <input placeholder='Email' type="email" name='email' className='form-control'
                                        value={email} onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Website:  </label>
                                        <input placeholder='Website Link' type="url" name='website' className='form-control'
                                        value={website} onChange={(e) => setWeb(e.target.value)}></input>
                                    </div>
                                </div>
                                
                                <div class="column">
                                    <div className='form-group'>
                                        <label>No. of Guests: </label>
                                        <input placeholder='Number of Guests' min={100} type="number" name='noOfGuests' className='form-control'
                                        value={noOfGuests} onChange={(e) => setGuests(e.target.value)}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Veg Price /plate: </label>
                                        <input placeholder='Rate per plate' type="number" min={400} name='veg' className='form-control'
                                        value={veg} onChange={(e) => setVeg(e.target.value)}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Non-Veg Price /plate: </label>
                                        <input placeholder='Rate per plate' type="number" min={500} name='nonVeg' className='form-control'
                                        value={nonVeg} onChange={(e) => setNVeg(e.target.value)}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Area: </label>
                                        <input placeholder='Area' type="text" name='area' className='form-control'
                                        value={area} onChange={(e) => setArea(e.target.value)}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>City:  </label>
                                        <input placeholder='City' type="text" name='city' className='form-control'
                                        value={city} onChange={(e) => setCity(e.target.value)}></input>
                                    </div>
                                    <div className='form-group'>
                                        <label>Phone Number:  </label>
                                        <input placeholder='Phone Number' type="tel" name='number' className='form-control'
                                        value={number} onChange={(e) => setNum(e.target.value)}></input>
                                    </div>
                                </div> 
                                <div>
                                        <button className='btn btn-success' onClick={(e) => updateVenue(e)}>Update</button>
                                        <Link className='btn btn-danger' to="/user" style={{marginLeft: '10px'}}>Cancel</Link>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
    )
}

export default UpdateAVenue
