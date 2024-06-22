import React, { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BlurCircular } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
export default function Login() {

    const navigate = useNavigate();
    const loginNavigate = () =>{
        navigate("/register")
    }
    const email = useRef()
    const Password = useRef()
    const {
        user,
        isFetching,
        error, 
        dispatch
    } = useContext(AuthContext)
        const Handlerclick=(e)=>{
     e.preventDefault()
    loginCall({email:email.current.value,password:Password.current.value},dispatch)
    console.log(user);
    }
    return (
        <div className="login">
            <div className="loginwrapper">
                <div className="loginright">
                    <h2 className="vigi">Social Media</h2>
                    <span style={{ fontSize: "20px" }}>Connect with friends all around the world <br />at our social media</span>
                </div>
                <div className="loginleft">
                <h2  className="lohgo">Social Media</h2>
                    <br />
                    <div className="loginbox">

                        <input ref={email}  className="email" type="text" placeholder="Email or Phone Number" />
                        <input minLength="6" ref={Password} style={{ marginTop: '14px' }} className="email" type="password" placeholder="Password" />
                        <button onClick={Handlerclick} style={{ width: "390px", height: "50px", margin: "0 auto", marginTop: "14px", fontWeight: "700" }} className="btn btn-primary">{isFetching ? <CircularProgress />  : "Log In"}</button>
                        <h5 style={{ color: "blue", marginTop: "30px" }}>Forgot password?</h5>
                    </div>
                    <button onClick={()=>loginNavigate()} style={{ width: "200px", height: "50px", marginLeft: "130px", marginTop: "30px", fontWeight: "700" }} className="btn btn-success">Create New Account</button>
                </div>
            </div>
        </div>
    );
}