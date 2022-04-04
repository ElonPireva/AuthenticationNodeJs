import axios from 'axios';
import { useState, useRef } from 'react';
import "./Register.css";
const Register = () => {
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");
    const registerStatusColor = useRef();
    const sendRegisterRequest = () => {
        if (usernameReg === '' || passwordReg === '') {
            setRegisterStatus('Please enter username / password');
            registerStatusColor.current.style.color = 'red';
        }
        else {
            axios.post("http://localhost:3001/register", {
                username: usernameReg,
                passwordReg: passwordReg
            }).then(resp => {
                console.log(resp);
                setRegisterStatus("User added succesfully");
                registerStatusColor.current.style.color = 'blue';
            }).catch(err => {
                setRegisterStatus("User couldn't be registerd");
                registerStatusColor.current.style.color = 'red';
            });
        }
    }
    return (
        <div>
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input type="text" onChange={(e) => setUsernameReg(e.target.value)} /><br />
                <label>password</label>
                <input type="password" onChange={(e) => setPasswordReg(e.target.value)} /> <br />
                <button onClick={sendRegisterRequest}>Register</button>
                <a className="goToLogin" href="/">Go to login</a>
                <h1 className="registerStatus" ref={registerStatusColor}>{registerStatus}</h1>
            </div>
        </div>
    )
};

export default Register;