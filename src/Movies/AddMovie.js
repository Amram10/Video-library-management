import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import axios from "axios"

//const url ="http://192.168.68.101:5000/"
const url = "http://192.168.1.110:5000/"
function AddMovieComp(props)
{
     const dispatch =useDispatch()
     const navigate= useNavigate()
     const [movie,setMovie]=useState({_id:"",genres:[],image:"",name:"",premiered:""})
     const [back,setBack]=useState(true)
const save_movie=()=>
{
console.log(movie)
axios.post(url+"movies",movie).then((data)=>
{
 let id=data.data
 const add_movie=({...movie,_id:id})
 console.log(add_movie)
 dispatch({type:"ADD_MOVIE", payload:add_movie})
  props.callback()
 alert("Added")
})
setBack(false)
}

   return(
   <div>{back?<div>
    <h2>ADD MOVIE</h2>
   Name :   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type={"text"} onChange={e=>setMovie({...movie,name:e.target.value})}></input><br/>
   Genres : &nbsp;&nbsp;&nbsp;&nbsp;<input type={"text"} onChange={e=>setMovie({...movie,genres:e.target.value.split(',')})}></input><br/>
   Image url : <input type={"text"} onChange={e=>setMovie({...movie,image:e.target.value})}></input><br/>
   premiered:<input type={"text"} onChange={e=>setMovie({...movie,premiered:e.target.value})}></input><br/>
   
   <input type={'button'} value={"Save"} onClick={save_movie}></input>
   </div>:<></> } </div>

   )

}
export default AddMovieComp