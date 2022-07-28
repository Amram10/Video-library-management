import {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import {Button,TextField, Box, useMediaQuery} from '@mui/material';
import MemberWatchedComp from './Member Watched';
import ChackPermissionsComp from '../Users/Permission Chaking';
function AllMoviesComp(props)
{
     const data = useSelector(state=>state)
     const permissins = data.userDetails.permissions
     const dispatch = useDispatch()
     const params=useParams()
     const[name,setName]= useState(null)
     const[found,setFound]= useState(false)
     const[founded,setFounded]= useState()
     const [movies,setMovies]=useState()
useEffect(()=>
{
      let movs=data.movies[0]
     setMovies(movs)
},[data.movies[0]])
useEffect(()=>
{
  if (params.id)
  {
let name = data.movies[0].find(x=>x._id===params.id).name
setName(name)
search()
  }
},[name])
     const [user,setUser] = useState([])
     const navigate=useNavigate()
     const edit_movie=(id,movie)=>
     {
     dispatch({type:"EDIT_MOVIE",payload:movie})
     navigate("/edit_movie/"+id)
     }
     const Delete_user=(id)=>
     {
       dispatch({type:"DELETE_MOVIE",payload:id})
       navigate("/main_page")  
     }

     const search=()=>
      {
        if (name)
        {
        let founde= movies.find(x=>x.name===name)
        setFounded(founde)
        if (founde)
        {
        setFound(true)
        }}
      }

return(
    <div>{movies?<div>
    Find Movie:<input type={'search'} onChange={e=>setName(e.target.value)}></input>
    {
        name?<div><input type={'button'} value={"Find"} onClick={()=>search()}></input></div>:<div></div>
    }
 {found?<div style={{width : "300px", borderStyle : "solid", borderColor : 'yellow', borderWidth : "5px"}}>

<h3>{founded.name} ,{founded.premiered.substr(0,4)}</h3>
    <h5>Genres:</h5>{founded.genres.map((it,ind)=>
    {
        return <div key={ind}>"{it}"</div>
    })}<br/>
    <img style={{width:"100px"}} src= {founded.image}/>
    <MemberWatchedComp id={founded._id}/>
   <br/> 
   {ChackPermissionsComp(permissins,"updateMovie")&&<input type={'button'} value={'Edit'} onClick={()=>edit_movie(founded._id,founded)} ></input>} &nbsp;
    {ChackPermissionsComp(permissins,"deleteMovie")&&<input type={'button'} value={'Delete'} onClick={()=>Delete_user(founded._id)}></input>} 
    </div>:<div>
{  
   movies?<div>{ movies.map((item,index)=>
 {
        return <div style={{width : "300px", borderStyle : "solid", borderColor : 'yellow', borderWidth : "5px"}} key={index}>
    <h3>{item.name} ,{item.premiered.substr(0,4)}</h3>
    <h5>Genres:</h5>{item.genres.map((it,ind)=>
  {
        return <div key={ind}>"{it}"</div>
  })}<br/>
    <img style={{width:"100px"}} src= {item.image}/>
    <MemberWatchedComp id={item._id}/> 
      <br/> 
      {ChackPermissionsComp(permissins,"updateMovie")&&<input type={'button'} value={'Edit'} onClick={()=>edit_movie(item._id,movies[index])} ></input>} &nbsp;
      {ChackPermissionsComp(permissins,"deleteMovie")&&<input type={'button'} value={'Delete'} onClick={()=>Delete_user(item._id)}></input> }
      </div>})
}</div>:<></> }   </div>  
 }   

</div>:<div></div>}</div>
)
}
export default AllMoviesComp
