import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate } from "react-router-dom";
import {Button,TextField, Box} from '@mui/material';
import axios from "axios"

function MemberWatchedComp(props)
{
     const members = useSelector(state=>state.members[0])
     const subscriptions = useSelector(state=>state.subscriptions[0])
     const [arrSub,setArrSub]=useState([])

    useEffect(()=>
{
    let subsc=[]
    let movieid = props.id
    subscriptions.forEach(sub=>{
      let exist = sub.movies.find(e=>e.movie_id===movieid)
       if (exist)
    {
    let name = members.find(x=>x._id===sub.member_id)
     subsc.push({name:name.name,id:sub.member_id, date:exist.date})
    }
   })
setArrSub(subsc)
},[])
   return(
   <div> 
  {arrSub?<div><h5>Subscriptions Watced</h5> {arrSub.map((item,index)=>
   {
      return <li key={index}><Link to={"/member/"+item.id}>{item.name}&nbsp;</Link>&nbsp;{item.date}</li>
   })}</div>:<></>}
 </div>

   )

}
export default MemberWatchedComp