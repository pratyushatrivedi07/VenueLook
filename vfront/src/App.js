import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/jquery/dist/jquery.min.js";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListVenues from './components/ListVenues';
import Footer from './components/Footer';
import Header from './components/Header';
import Register from './components/Register';
import Login from './components/Login';
import AddVenue from './components/AddVenue';
import './App.css'
import UpdateAVenue from './components/UpdateAVenue';
import UserPage from './components/UserPage';

function App() {
  return (
    
      <div className="App">
        <Router>
          <Header/>
          <Routes>
            <Route exact path= '/' element = {<ListVenues/>}></Route>
            <Route exact path= '/venues' element ={<ListVenues/>}></Route>
            <Route exact path= '/user' element ={<UserPage/>}></Route>
            <Route exact path= '/register' element ={<Register/>}></Route>
            <Route exact path= '/login' element ={<Login/>}></Route>
            <Route exact path= '/newVenue' element ={<AddVenue/>}></Route>
            <Route exact path= '/updateVenue' element ={<UpdateAVenue/>}></Route>
          </Routes>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
