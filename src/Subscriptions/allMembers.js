import {useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Routes, Link, useNavigate, useParams } from "react-router-dom";
import {Button,TextField, Box, useMediaQuery} from '@mui/material';
import WatchedComp from './Watched Movies';
function AllMembersComp(props)
{
     const data = useSelector(state=>state)
     const dispatch = useDispatch()
     const params=useParams()
     const[name,setName]= useState(null)
     const[found,setFound]= useState(false)
     const[founded,setFounded]= useState()
     const [members,setMembers]=useState()
useEffect(()=>
{
      let membrs=data.members[0]
     setMembers(membrs)
     console.log(data.members)
},[data.members[0]])

     const [member,setMember] = useState([])
     const navigate=useNavigate()

     useEffect(()=>
{
  if (params.id)
  {
let name = data.members[0].find(x=>x._id===params.id).name
setName(name)
search()
  }
},[name])
     const edit_member=(id,member)=>
     {
     dispatch({type:"EDIT_MEMBER",payload:member})
     navigate("/edit_member/"+id)
     }
     const Delete_member=(id)=>
     {
       dispatch({type:"DELETE_MEMBER",payload:id})
       navigate("/subscriptions")  
     }

     const search=()=>
      {
        if (name)
        {
        let founde= members.find(x=>x.name===name)
        setFounded(founde)
        let id= founde._id
        if (founde)
        {
          navigate("/member/"+id)
        setFound(true)
        }}
      }

return(
    <div>{members?<div>
    Find Member:<input type={'search'} onChange={e=>setName(e.target.value)}></input>
    {
        name?<div><input type={'button'} value={"Find"} onClick={()=>search()}></input></div>:<div></div>
    }
 {found?<div style={{width : "400px", borderStyle : "solid", borderColor : 'black', borderWidth : "5px"}}>

<h3>{founded.name} </h3>
   Email : {founded.email}<br/>
    City : {founded.city}
   <br/> <input type={'button'} value={'Edit'} onClick={()=>edit_member(founded._id,founded)} ></input> &nbsp;
    <input type={'button'} value={'Delete'} onClick={()=>Delete_member(founded._id)}></input>
    <WatchedComp id={founded._id}/> 
    </div>:<div>
{  
   members?<div>{ members.map((item,index)=>
 {
        return <div style={{width : "400px", borderStyle : "solid", borderColor : 'black', borderWidth : "5px"}} key={index}>
    <h3>{item.name} </h3>
    Email : {item.email}<br/>
    City : {item.city}
  
      <br/> <input type={'button'} value={'Edit'} onClick={()=>edit_member(item._id,members[index])} ></input> &nbsp;
      <input type={'button'} value={'Delete'} onClick={()=>Delete_member(item._id)}></input> 
  <WatchedComp id={item._id}/> 
      </div>})
}</div>:<></> }   </div>  
 }   

</div>:<div></div>}</div>
)
}
export default AllMembersComp
