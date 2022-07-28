import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import AllMoviesComp from './AllMovies';
import AddMovieComp from './AddMovie';
import ChackPermissionsComp from '../Users/Permission Chaking';
function Movies_page()
{
     const [all,setAll]= useState(true)
     const [add,setAdd]= useState(false)
    let permissions = useSelector(state=>state.userDetails.permissions)
const All_movies=()=>
    {
     setAll(!all)
     setAdd(false)
    }

const Add_movie=()=>
    {
     setAdd(!add)
     setAll(false)
    }
const Cancel=()=>
    {
     setAdd(!add)
     setAll(true)
    }

return(
    <div>
    <h1>Movies</h1>
    <input type={'button'} value={"All Movies"} onClick={All_movies}></input>
   {ChackPermissionsComp(permissions,"addMovie")&&<input type={'button'} value={"Add Movie"} onClick={Add_movie}></input>}
   

    {
        all?<div><AllMoviesComp/></div>:<div></div>
    }
    {
        add?<div><AddMovieComp callback={data=>All_movies(data)}/><input type={'button'} value={'Cancel'} onClick={Cancel}></input> </div>:<div></div>
    }
    
    

</div>
)
}
export default Movies_page