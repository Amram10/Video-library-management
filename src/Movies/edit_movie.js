import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
function EditmovieComp()
{
  let dispatch=useDispatch()
  let navigate=useNavigate()
  const movie = useSelector(state=>state.editMovie)
  const [upmovie,setUpmovie]= useState({_id:movie._id, genres:movie.genres, image:movie.image, name:movie.name, premiered:movie.premiered})
  console.log(upmovie);
  const update=()=>
  {
    dispatch({type:"UPDATE_MOVIE",payload:upmovie})
    navigate("/movies")
  }
  const cancel=()=>
  {
    navigate("/movies")
  }

return(
  <div><h2>Edit movie: {movie.name}</h2>
   Name :   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type={"text"} defaultValue={movie.name} onChange={e=>setUpmovie({...upmovie,name:e.target.value})}></input><br/>
   Genres : &nbsp;&nbsp;&nbsp;&nbsp;<input type={"text"}  defaultValue={movie.genres}onChange={e=>setUpmovie({...upmovie,genres:e.target.value.split(',')})}></input><br/>
   Image url : <input type={"text"} defaultValue={movie.image} onChange={e=>setUpmovie({...upmovie,image:e.target.value})}></input><br/>
   premiered:<input type={"text"} defaultValue={movie.premiered} onChange={e=>setUpmovie({...upmovie,premiered:e.target.value})}></input><br/>
  <input type={'button'} value={'update'} onClick={update} ></input>&nbsp;
  <input type={'button'} value={'cancel'} onClick={cancel}></input>
  </div>
)
}
export default EditmovieComp