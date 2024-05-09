import React, { useState,useEffect} from 'react'
import {FiMail} from "react-icons/fi"
import {RiLockPasswordLine} from "react-icons/ri"
import "../RegisterPage/RegisterPage.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
    const [currLocation, setCurrLocation] = useState({});
    const [currLocationJs, setCurrLocationJs] = useState({});
    
    useEffect(() => {
      getLocation();
      getLocationJs();
    }, []);
    
    const getLocation = async () => {
      const location = await axios.get("https://ipapi.co/json");
      setCurrLocation(location.data);
    };
    
    const getLocationJs = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrLocationJs({ latitude, longitude });
      });
    };
    const navigate =useNavigate()
    const [error,setError] =useState({})
    axios.defaults.baseURL="http://localhost:3500";
    const [data,setData] =useState({
        email:"",
        password:"",
    })

    const handleChange=(e)=>{
        const newObj={...data,[e.target.name]:e.target.value}
        setData(newObj)
    }
    const handleSignIn=async(e)=>{
        e.preventDefault()
        const locationData = {
            longitude:currLocation.longitude,
            latitude: currLocation.latitude,
            city: currLocation.city, 
            state: currLocation.region,
            country: currLocation.country_name,
        };
        const response=await axios.post("/SignIn",data);
        setError(validationLogin(data))
       if(response.data.success){
           if(response.data.redirectToAdmin){
               alert(response.data.message);
               navigate("/AdminPanel");
        }
        else{
          alert(response.data.message);
          navigate('/home');
          await axios.post("/userLoginDetails",locationData);
        }
      }
      else alert(response.data.message);

    }
   function validationLogin(data){
        const error ={}

        const emailPattern= /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const passwordPattern= /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g;

        if(data.email === ""){
            error.email ="* Email is Required"
        }
        else if(!emailPattern.test(data.email)){
            error.email="* Email did not match"
        }

        
        if(data.password === ""){
            error.password = "* Password is Required"
        }
        else if(!passwordPattern.test(data.password)){
            error.password="* Password not valid"
        }
        
        return error
   }
  return (
    <div className="container">
        <div className="container-form">
            <form onSubmit={handleSignIn}>
                <h1>Login</h1>
                <p>Please sign in to continue.</p>
                <div className="inputBox">
                    <FiMail className='mail'/>
                    <input type="email"  autoFocus
                            name="email" 
                            id="email"  required
                            onChange={handleChange}
                            placeholder='Email'/> 
                </div>
                {error.email && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.email}</span>}

                <div className="inputBox">
                    <RiLockPasswordLine className='password'/>
                    <input type="password" 
                            name="password" required
                            id="password" 
                            onChange={handleChange}
                            placeholder='Password'/>
                </div>
                {error.password && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.password}</span>}
                <div className='divBtn'>
                    <small className='FG'>Forgot Password?</small>
                    <button type='submit' className='loginBtn'>LOGIN</button>
                </div>
            </form>
            <div className='dont'>
                <p>Don't have an account? <Link to="/signup"><span>Sign up</span></Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login