import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup';
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Login from './Login';
import Home from './Home';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/register" element={<Signup />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/home" element={<Home />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
