import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {Box, TextField, Typography ,Button} from "@mui/material"
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from '../store'
const Auth = () => {
  const navigate=useNavigate()
  const dispath=useDispatch()
  const[ inputs, setInputs] = useState({
    name:"",
    email:"",
    password:""
  })
  const [isSignup, setIsSignup] = useState(false)
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const sendRequset=async(type="login")=>{
   const res=await axios.post(`https://fulltack-socialmedia.onrender.com/api/user/${type}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password
    }).catch((err)=>console.log(err))
    const data = await res.data;
    console.log(data);
    return data;
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs)
    if(isSignup){
     sendRequset("signup").then((data)=>localStorage.setItem("userId",data.user._id))
     .then(()=>dispath(authActions.login())).then(()=>navigate("/blogs"))
     .then(data=>console.log(data))
    }else{
      sendRequset().then((data)=>localStorage.setItem("userId",data.user._id)).then(()=>dispath(authActions.login())).then(()=>navigate("/blogs")).then(data=>console.log(data))
    }
    
  } // npm i axios to connect body data with backend
  return (
    <div>
      <form  onSubmit={handleSubmit} >
       <Box maxWidth={400}
       display="flex" flexDirection="column" alignItems="center" margin={"auto"} justifyContent={"center"}
       boxShadow={"70px 70px 70px 70px #ccc"}
       padding={3}
       marginTop={5}
       borderRadius={5}
       >
        <Typography variant="h3" padding ={3 }textAlign="center"> {isSignup ? "Signup" : "Login"}</Typography>

     {isSignup &&  <TextField name="name" onChange={handleChange} value={inputs.name} placeholder='Name' margin="normal"/>}

        <TextField name="email" onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin="normal"/>

        <TextField name="password" onChange={handleChange} value={inputs.password} type={'password'} placeholder='Password' margin="normal"/>

        <Button type={"submit"} variant="contained"  sx={{borderRadius:3, marginTop:3}} color="warning">Submit</Button>

        <Button onClick={()=>setIsSignup(!isSignup)} sx={{borderRadius:3,marginTop:3}}  LinkComponent={Link} to="/auth">Go to {isSignup ? "Login" : "Signup"}</Button>
       </Box>
      </form>
    </div>
  )
}

export default Auth