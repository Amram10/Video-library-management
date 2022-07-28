import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import axios from "axios"
import AllMembersComp from './allMembers';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

//const url ="http://192.168.68.101:5000/"
const url = "http://192.168.1.110:5000/"
function AddMemberComp(props)
{
     const dispatch =useDispatch()
     const navigate= useNavigate()
     const [member,setMember]=useState({_id:"",name:"",email:"",city:""})
     const [back,setBack]=useState(true)
const save_member=()=>
{
axios.post(url+"members",member).then((data)=>
{
 let newsub = {member_id:data.data, movies:[]}
 axios.post(url+"/subscriptions",newsub).then((sub)=>
 {
   let id=data.data
   newsub = {_id:sub.data,member_id:id, movies:[]}
 const add_member=({...member,_id:id})
 let payload = {newsub:newsub,add_member:add_member}
 console.log(payload);
 dispatch({type:"ADD_MEMBER", payload:payload})
 props.callback()
 alert("Added")
 })


})

}

   return(
   <div>{back?<div>
    <h2>ADD NEW MEMBER</h2>
   Name:&nbsp; <input type={"text"} onChange={e=>setMember({...member,name:e.target.value})}></input><br/>
   Email :&nbsp;&nbsp;<input type={"text"} onChange={e=>setMember({...member,email:e.target.value})}></input><br/>
   City  :    &nbsp;&nbsp;&nbsp;<input type={"text"} onChange={e=>setMember({...member,city:e.target.value})}></input><br/>
   
   <input type={'button'} value={"Save"} onClick={save_member}></input>
   </div>:<></> } </div>

   )

}
export default AddMemberComp