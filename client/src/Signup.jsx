
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register',{ username, email, password })
        .then((res) => {console.log(res)
            navigate('/login')
        })
        .catch((err) => console.log(err));
        console.log({ username, email, password });
    };

    return (
        <div className="container" style={{ maxWidth: '400px', margin: '100px auto' }}>
            <h2 className="text-center">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                
                <button  type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
            <p className="text-center mt-3">Already have an account? <a href="#">Log in</a></p>
        </div>
    );
};

export default Signup;
