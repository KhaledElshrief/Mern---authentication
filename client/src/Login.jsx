
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials =true;

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login',{ email, password })
        .then((res) => {console.log(res)
            if (res.data == "success"){
                navigate('/home')
            }
            
        })
        .catch((err) => console.log(err));
        console.log({  email, password });
    };

    return (
        <div className="container" style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2 className="text-center">Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button  type="submit" className="btn btn-primary btn-block">Log In</button>
            </form>
            <p className="text-center mt-3">Do not have an account? <a href="#">Sign up</a></p>
        </div>
    );
};

export default Login;
