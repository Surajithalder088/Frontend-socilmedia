import React from 'react'
import {Avatar,Card,CardHeader,CardMedia,CardContent,Typography, IconButton ,Box} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate }from "react-router-dom";
import axios from "axios"
const Blog = ({title,description,imageURL,userName,isUser,id}) => {
  const navigate=useNavigate();
  const handleEdit=(e)=>{
    navigate(`/myBlogs/${id}`)
  }

  const deleteRequest=async ()=>{
    const res =await axios.delete(`http://localhost:8000/api/blog/${id}`).catch((e)=>console.log(e));
    const data= await res.data;
    return data;
  }
  const handleDelete=(e)=>{
    deleteRequest().then((data)=>console.log(data))
  }
  return (
    <div><Card sx={{ width: "40%", margin :"auto" ,marginTop:2,boxShadow:"5px 5px 10px #ccc ",
    "hover":{
      boxShadow:"40px 40px 80px #ccc ",
    }
    
    }}>
      {
        isUser && (
          <Box display="flex">
           <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><EditIcon /></IconButton>
           <IconButton  onClick={handleDelete}><DeleteForeverIcon/></IconButton>
          </Box>
        )
      }
    <CardHeader
      avatar={
        <Avatar sx={{ backgroundColor: "red" }} aria-label="recipe">
          {userName}
        </Avatar>
      }
      
      title={title}
      
    />
    <CardMedia
      component="img"
      height="194"
      image={imageURL}
      alt="image is not available"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
      <b>  {userName}</b> {": "} {description}
      </Typography>
    </CardContent>
   
   
  </Card></div>
  )
}

export default Blog