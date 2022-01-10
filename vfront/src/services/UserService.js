import axios from 'axios';

//AWS EBS AUTH SERVICE URL
//const User_API_BASE_URL = "http://auth-env.eba-uapm2ake.ap-south-1.elasticbeanstalk.com/api";

const User_API_BASE_URL = "http://localhost:8000/api";

class UserService{

    registerUser(user){
      return axios.post(User_API_BASE_URL +'/register', user);
    }

    loginUser(user){
      return axios.post(User_API_BASE_URL + '/login', user);
    }

    getUser(){
      const token = JSON.parse(localStorage.getItem('userCredentials'))
      const authAxios = axios.create({baseURL: User_API_BASE_URL , headers:{jwt: `${token.token}`}})
      return authAxios.get('/user')
    }


}

export default new UserService()