import axios from 'axios';
import { useState, useRef } from 'react';
import "./Login.css";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");
    const statusColor = useRef();
    const sendLoginRequest = () => {
        if (username === '' || password === '') {
            setLoginStatus('Please enter username / password');
            statusColor.current.style.color = 'red';
        }
        else {
            axios.post("http://localhost:3001/login", {
                username: username,
                password: password,
            }).then(resp => {
                setLoginStatus(resp.data);
                statusColor.current.style.color = 'blue';
            })
            .catch(err => {
                setLoginStatus("Bad credentials");
                statusColor.current.style.color = 'red';
            });
        }
    };
    return (
        <div>
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Username…" onChange={(e) => setUsername(e.target.value)} /> <br />
                <input type="password" placeholder="Password…" onChange={(e) => setPassword(e.target.value)} />
                <button className="loginBtn" onClick={sendLoginRequest}>Login</button>
                <a className="linkToRegister" href="/register">Go to register</a>
                <h1 className="loginStatus" ref={statusColor}>{loginStatus}</h1>
            </div>
        </div>
    )
};

export default Login;