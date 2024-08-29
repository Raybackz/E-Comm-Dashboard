import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }

    })
    const collecData = async () => {
        console.log(name, email, password)
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        console.log(result)
        if (result) {
            localStorage.setItem('user', JSON.stringify(result.result))
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/')
        }
    }
    return (
        <div className="register">
            <div >
                <h1>Register</h1>
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="inputBox"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="inputBox"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <p className="haveAnAccount">Already have an account? <span className="loginspan"><Link to='/login'>Login</Link></span></p>

                <button className="app-button" type="button" onClick={collecData}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Signup;
