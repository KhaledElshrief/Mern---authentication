import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";


const Home = () => {
  axios.defaults.withCredentials =true;

  useEffect(()=>{
    axios.get('http://localhost:3001/home')
    .then((res) => {console.log(res)
        if (res.data !== "success"){
            Navigate('/login')
        } })
        .catch((err) => console.log(err));
  },[])
  return (
    <h1>
      Home
    </h1>
  )
}

export default Home
