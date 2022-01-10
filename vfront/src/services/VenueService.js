import axios from 'axios';

//AWS EBS VENUE SERVICE LINK
//const Venue_API_BASE_URL = "http://venue-env.eba-3kmimed3.ap-south-1.elasticbeanstalk.com/api/venues";

const Venue_API_BASE_URL = "http://localhost:9600/api/venues";

class VenueService{

    getVenues(){
      return axios.get(Venue_API_BASE_URL);
    }

    postVenue(venue){
      const userDetail = JSON.parse(localStorage.getItem('userCredentials'))
      const authAxios = axios.create({baseURL: Venue_API_BASE_URL , headers:{jwt: `${userDetail.token}`}})
        return authAxios.post('/newVenue', venue)
    }

    getVenueById(){
      const userDetail = JSON.parse(localStorage.getItem('userCredentials'))
      const authAxios = axios.create({baseURL: Venue_API_BASE_URL , headers:{jwt: `${userDetail.token}`}})
      return authAxios.get(Venue_API_BASE_URL + '/byId');
    }

    updateVenue(venue){
      const userDetail = JSON.parse(localStorage.getItem('userCredentials'))
      const authAxios = axios.create({baseURL: Venue_API_BASE_URL , headers:{jwt: `${userDetail.token}`}})
      return authAxios.put(Venue_API_BASE_URL + '/up-venue', venue)
    }

    deleteVenue(venueId){
      const userDetail = JSON.parse(localStorage.getItem('userCredentials'))
      const authAxios = axios.create({baseURL: Venue_API_BASE_URL , headers:{jwt: `${userDetail.token}`}})
      return authAxios.delete(Venue_API_BASE_URL + '/del-venue')
    }

}

export default new VenueService()