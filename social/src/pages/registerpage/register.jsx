import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import axios from "axios";

import "./register.css";
import { BaseUrl } from "../../../utills/domain";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const Cpassword = useRef();

    const navigate = useNavigate();
    const registerNavigate = () => {
        navigate("/Login");
    };

    const Handleclick = async (e) => {
        e.preventDefault();
        if (password.current.value !== Cpassword.current.value) {
            Cpassword.current.setCustomValidity("Password Did not match");
        
        } else {
            const user = {
                userName: username.current.value,
                email: email.current.value,
                password: password.current.value,
            };
            try {
               await axios.post(`${BaseUrl}/auth/signup`, user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="Register">
            <div className="Registerwrapper">
                <div className="Registerright">
                    <h2 className="Vigi" style={{ fontWeight: "900", fontSize: "60px", color: "#1877f2" }}>Social Media</h2>
                    <span style={{ fontSize: "20px" }}>Connect with friends all around the world <br />at our social media</span>
                </div>
                <div className="Registerleft">
                <h2  className="lohgo">Social Media</h2>
                    <br />
                    <form>
                        <div className="Registerbox">
                            <input ref={username} className="email" type="text" placeholder="Username" />
                            <input ref={email} style={{ marginTop: '14px' }} className="email" type="text" placeholder="Email" />
                            <input ref={password} style={{ marginTop: "14px" }} id="hello" className="email" type="password" placeholder="Password" />
                            <input ref={Cpassword} style={{ marginTop: '14px'  }} className="email" type="password" placeholder="Password again" />
                            <button style={{ width: "380px", height: "50px", marginTop: "20px", fontWeight: "700" }} className="btn btn-primary" onClick={Handleclick}>sign In</button>
                            <h5 style={{ color: "#1877f2", marginTop: "30px" }}>Forgot password?</h5>
                        </div>
                    </form>
                    <button onClick={registerNavigate} style={{ width: "200px", height: "50px", marginLeft: "130px", marginTop: "30px", fontWeight: "700" }} className="btn btn-success">Login into Account</button>
                </div>
            </div>
        </div>
    );
}
