import React, { useState } from 'react'
import "../RegisterPage/RegisterPage.css"
import {AiOutlineUser} from "react-icons/ai"
import {FiMail} from "react-icons/fi"
import {RiLockPasswordLine} from "react-icons/ri"
import { Link, useNavigate } from 'react-router-dom'
import validation from './Validation'
import axios from "axios";
const SignUp = () => {
    axios.defaults.baseURL="http://localhost:3500";
    const navigate =useNavigate()
    const [error,setError] =useState({})  
    const [data,setData] =useState({
        username:"",
        email:"",
        password:"",
        confirmpassword:"",
    })

    const handleChange=(e)=>{
        const newObj={...data,[e.target.name]:e.target.value}
        setData(newObj)
    }
 
    const handleSignUp=async(e)=>{
        e.preventDefault()
        const response=await axios.post("/SignUp",data);
        setError(validation(data))
       console.log(response);
       if(response.data.success){
           alert(response.data.message);
           navigate("/")
        }
        else alert(response.data.message);
    }
  return (
    <div className="container">
    <div className="container-form">
        <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <p>Please fill the input below here.</p>

            <div className="inputBox">
                <AiOutlineUser className='fullName'/>
                <input type='text' 
                        name="username" 
                        id="fullname" 
                        onChange={handleChange}
                        placeholder='Full Name' required
                /> 
            </div>
            {error.fullname && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.fullname}</span>}

            <div className="inputBox">
                <FiMail className='mail'/>
                <input type="email"
                        name="email" 
                        id="email" 
                        onChange={handleChange}
                        placeholder='Email' required
                /> 
            </div>
            {error.email && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.email}</span>}
            
            <div className="inputBox">
                <RiLockPasswordLine className='password'/>
                <input type="password" 
                        name="password" 
                        id="password" 
                        onChange={handleChange}
                        placeholder='Password' required
                />
            </div>
            {error.password && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.password}</span>}

            
            <div className="inputBox">
                <RiLockPasswordLine className='password'/>
                <input type="password" 
                        name="confirmpassword" 
                        id="confirmPassword" 
                        onChange={handleChange}
                        placeholder='Confirm Password' required
                />
            </div>
            {error.confirmpassword && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.confirmpassword}</span>}

            

            <div className='divBtn'>
                <small className='FG'>Forgot Password?</small>
                <button className='loginBtn'>SIGN UP</button>
            </div>
            
        </form>

        <div className='dont'>
            <p>Already have a account? <Link to="/"><span>Sign in</span></Link></p>
        </div>
    </div>
</div>
  )
}

export default SignUp