import React,{useEffect,useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios';
import {Box, Button, InputLabel, TextField, Typography} from"@mui/material"



const labelStyles={mb:1,mt:2,fontSize:'65px',fontWeight:"bold"}
const BlogDetails = () => {
  const navigate= useNavigate()
  const [blog, setBlog] = useState()

  const id=useParams().id;
  //const id=localStorage.getItem("userId")
  console.log(id);

  const[ inputs, setInputs] = useState({
    
  })
  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }

  const fetchDetails=async()=>{
    const res=await axios.get(`https://fulltack-socialmedia.onrender.com/api/blog/${id}`).catch((e)=>console.log(e))
    const data =await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then(data=>{
      setBlog(data.blog)
    setInputs({
      title:data.blog.title,
      description:data.blog.description,
    })
    })
  },[id]);

  const sendRequest=async ()=>{
    const rest=await axios.put(`https://fulltack-socialmedia.onrender.com/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
    }).catch((e)=>console.log(e));

    const data=await rest.data;
    return data;
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate(`/myBlogs/${id}`))
  }
  return (<div>
  {inputs &&
    
       <form 
       onSubmit={handleSubmit}>

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

   

     <Button
      sx={{mt:2, borderRadius:4}} variant="contained "
      color="warning"
      type ="submit">Submit</Button>
    </Box>
     </form>}</div>
  )
}

export default BlogDetails