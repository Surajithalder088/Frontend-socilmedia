import React,{useState} from 'react'
import {Box, Button, InputLabel, TextField, Typography} from"@mui/material"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const labelStyles={mb:1,mt:2,fontSize:'65px',fontWeight:"bold"}
const AddBlog = () => {
  const navigate=useNavigate()
  const[ inputs, setInputs] = useState({
    title:"",
   description:"",
    imageURL:""
  })
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  // to sending all data to backend
const sendRequest =async ()=>{
  const res=await axios.post("https://fulltack-socialmedia.onrender.com/api/blog/add",{
    title:inputs.title,
    description:inputs.description,
    image:inputs.imageURL,
    user:localStorage.getItem("userId")
  }).catch((e)=>console.log(e))
  const data=await res.data;
  return data;
}

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/blogs"))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
       <Box border={3} borderColor={"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(177,22,126,1) 35%, rgba(0,212,255,1) 100%)"} borderRadius={5} boxShadow="10px 10px 20px #cccc" paddding={3} margin ={"auto"}
       marginTop={3}
       display="flex" flexDirection={"column"} width={"80%"}>
        <Typography fontWeight={"bold"} padding={3} color="grey" variant="h3" textAlign={"center"}>
          Post Your Blog
        </Typography>
        <InputLabel sx={{ labelStyles}}>Title</InputLabel>
        <TextField name="title" onChange={handleChange} value={inputs.title} margin ="auto" variant="outlined"/>
        <InputLabel sx={{ labelStyles}}>Description</InputLabel>
        <TextField name="description" onChange={handleChange} value={inputs.description} margin ="normal" variant="outlined"/>
        <InputLabel sx={{ labelStyles}}>ImageURL</InputLabel>
        <TextField name="imageURL" onChange={handleChange} value={inputs.imageURL} margin ="normal" variant="outlined"/>

        <Button 
         sx={{mt:2, borderRadius:4}} variant="contained "
         color="warning"
         type ="submit">Submit</Button>
       </Box>
        </form>
    </div>
  )
}

export default AddBlog