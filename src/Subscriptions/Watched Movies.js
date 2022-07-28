import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import axios from "axios"
import AllMembersComp from './allMembers';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { shouldForwardProp } from '@mui/styled-engine';

function WatchedComp(props)
{
     const movies = useSelector(state=>state.movies[0])
     const subscriptions = useSelector(state=>state.subscriptions[0])
     const dispatch =useDispatch()
     const navigate= useNavigate()
     const [sub,setSub]=useState(false)
     const [AddSubs,setAddSub]=useState([])
     const [newsub,setNewsub]=useState([])

 useEffect(()=>
{
    let arrsub = []
let memberid = props.id
let submember = subscriptions.find(x=>x.member_id===memberid)
submember.movies.forEach(e=>{
let movie =  movies.find(x=>x._id===e.movie_id)
if (movie)
{
    let arr = {name:movie.name, id:movie._id,date:e.date}
arrsub.push(arr)
}    
})
setAddSub(arrsub)
console.log(arrsub);
},[sub])
   
  
//console.log(AddSubs)
const AddSub=()=>
   {
    setSub(!sub)
   }
const save=()=>
   {
    let memberId=props.id
    dispatch({type:"SUBSCRIBE" ,payload:{...newsub,member_id:memberId}})
    setSub(!sub)
   }
   return(
   <div> <h2>Movies Watced</h2>
  <div>
{AddSubs.length?<div>  {AddSubs.map((item,index)=>
   {
return <li key={index}><Link to={"/movies/"+item.id} >{item.name}&nbsp;</Link>&nbsp;{item.date}</li>
   })}</div>:<></>}
<input type={'button'} value={"Subscribe to new movie"} onClick={AddSub}></input><br/>
   {
   sub?<div style={{borderStyle : "solid", borderColor : 'red', borderWidth : "5px"}}>
    <h3>Add a new movie</h3>
    <select onClick={e=>setNewsub({...newsub,movie_id:e.target.value})}>{movies.map((item,index)=>{
        return <option key={index} value={item._id}>{item.name}</option>
    })}</select>
    <input type={'date'} onChange={e=>setNewsub({...newsub,date:e.target.value})}/><br/>
    <input type={'button'} value={"Subscribe"} onClick={save}></input>

   </div>:<></> }

   </div></div>

   )

}
export default WatchedComp