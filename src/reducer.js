import axios from "axios"

//const url ="http://192.168.68.101:5000/"
const url = "http://192.168.1.110:5000/"

const AppReducer = (state = {users : [], permissions : [], usersLogin : [], movies : [], members : [], subscriptions : [], userDetails: [],editUser:[]}, action)=>
{
    switch(action.type)
    {
        case "LOAD_USERS":
            return{...state, users: action.payload}

        case "LOAD_PERMISSIONS":
            return {...state, permissions: action.payload}

        case "LOAD_USERSLOGIN":
            return {...state, usersLogin: action.payload}

        case "LOAD_MEMBERS":
            return {...state, members: action.payload}

        case "LOAD_MOVIES":
            return {...state, movies: action.payload}

        case "LOAD_SUBSCRIPTIONS":
            return {...state, subscriptions: action.payload}  

        case "DETAILS":
            let userDetail = action.payload
            return {...state, userDetails:{ IDtoken:userDetail.tokenId, userName:userDetail.User_name, isToken:userDetail.token, permissions:userDetail.permissions }}

        case "LOGOUT":
            return {...state, userDetails:[]}

        case "ADD_USERLOGIN":
            let addUserLogin = action.payload
            return {...state, usersLogin:[...state.usersLogin, addUserLogin]} 
        
        case "ADD_USER":
            let addUser= action.payload
            return {...state, users:[...state.users, addUser.user],permissions:[...state.permissions,addUser.permissins],usersLogin:[...state.usersLogin,addUser.userlogin]} 

         case "ADD_MOVIE":
            let addmovie = action.payload
            return {...state,movies:[[...state.movies[0],addmovie]]}

        case "ADD_MEMBER":
            let addmember = action.payload.add_member
            let newsub = action.payload.newsub
            console.log(addmember,newsub);
            return {...state,members:[[...state.members[0],addmember]],subscriptions:[[...state.subscriptions[0],newsub]]}

        case "EDIT_USER":
            let edit_user=action.payload
           
            return {...state,editUser:edit_user}
        case "EDIT_MOVIE":
            let edit_movie=action.payload
            return {...state,editMovie:edit_movie}

        case "EDIT_MEMBER":
            let edit_member=action.payload
            return{...state,editMember:edit_member}

        case "UPDATE_USER":
            let data=action.payload
            let userlogin={_id:data.Permissions._id,UserName:data.user.UserName, Password:data.user.Password}
            let user={first_name:data.user.first_name, last_name:data.user.last_name, SessionTimeOut:data.user.SessionTimeOut, _id:data.Permissions._id, created_date:data.user.created_date}
            let permision={_id:data.Permissions._id, permissions:data.Permissions.permissions}
            axios.put(url+"/usersLogin/"+userlogin._id,userlogin)
            axios.put(url+"/permissions/"+userlogin._id,permision)
            axios.put(url+"/users/"+userlogin._id,user)
            let uselogindex=state.usersLogin[0].findIndex(x=>x._id===userlogin._id)
            let userindex = state.users[0].findIndex(x=>x._id===userlogin._id)
            let perindex = state.permissions[0].findIndex(x=>x._id===userlogin._id)
            if (userindex>=0)
            {
                state.usersLogin[0][uselogindex]=userlogin
                state.users[0][userindex]=user
                state.permissions[0][perindex]=permision
            }
            return{...state,users:state.users,permissions:state.permissions, usersLogin:state.usersLogin}
            case "UPDATE_MOVIE":
                let upmovie=action.payload
                let movindex =state.movies[0].findIndex(x=>x._id===upmovie._id) 
                axios.put(url+"movies/"+upmovie._id,upmovie)
                console.log(upmovie);
                if (movindex>=0)
                {
                    state.movies[0][movindex]=upmovie
                }
            return {...state,movies:state.movies}

            case "UPDATE_MEMBER":
                let upmember=action.payload
                let memberInd=state.members[0].findIndex(x=>x._id===upmember._id)
                axios.put(url+"members/"+upmember._id,upmember)
                if (memberInd>=0)
                {
                    state.members[0][memberInd]=upmember
                }
            return {...state,members:state.members}

            case "DELETE_USER":
                let id =action.payload
             axios.delete(url+"/usersLogin/"+id)
             axios.delete(url+"/permissions/"+id)
             axios.delete(url+"/users/"+id)
             let userlog1 = state.usersLogin
             let user1 = state.users
             let permisio1 = state.permissions
             console.log(userlog1)
             console.log(user1)
             console.log(permisio1)
                let uselogindex1 = state.usersLogin[0].findIndex(x=>x._id===id)
                let userindex1 = state.users[0].findIndex(x=>x._id===id)
                let perindex1 = state.permissions[0].findIndex(x=>x._id===id)
            if (userindex1>=0)
               {
                userlog1[0].splice(uselogindex1,1)
                user1[0].splice(userindex1,1)
                permisio1[0].splice(perindex1,1)
                console.log(userlog1)
                console.log(user1)
                console.log(permisio1)
               }    
            return {...state,users:user1,permissions:permisio1, usersLogin:userlog1}

            case "DELETE_MOVIE":
                let movieid=action.payload
                let moviearr= state.movies
                let subsArr= state.subscriptions[0]
                subsArr.forEach(e =>
                    {
                let movind = e.movies.findIndex(x=>x.movie_id===movieid) 
                if (movind)
                {
                  e.movies.splice(movind,1)
                  let obj={...e,movies:e.movies}      
                  axios.post(url+"/subscriptions/"+e._id,obj)
                }
                    });
                let movieind= moviearr[0].findIndex(x=>x._id===movieid)
                if (movieind>=0)
                {
                 moviearr[0].splice(movieind,1) 
                 axios.delete(url+"/movies/"+movieid)  
                }
            return{...state,movies:moviearr,subscriptions:[subsArr]}

            case "DELETE_MEMBER":
                let memberid=action.payload
                let memberarr = state.members
                let memberind = memberarr[0].findIndex(x=>x._id==memberid)
                let subarr= state.subscriptions[0]
                let subarrind=subarr.findIndex(x=>x.member_id===memberid)
                if (memberind>=0)
                {
                   memberarr[0].splice(memberind,1)
                   axios.delete(url+"/members/"+memberid)   
                }
                if (subarrind)
                {
                  let subsId= subarr[subarrind]._id
                  subarr.splice(subarrind,1)
                  axios.delete(url+"/subscriptions/"+subsId) 
                }
            return {...state,members:memberarr}

            case "SUBSCRIBE":
                let sub=action.payload
                let movieSub = {movie_id:sub.movie_id, date:sub.date}
                let arrSub = state.subscriptions[0]
                console.log(arrSub);
                let memberindx = arrSub.findIndex(x=>x.member_id===sub.member_id)
                let subId=arrSub.find(x=>x.member_id===sub.member_id)._id
                if (memberindx>=0)
                {
                 arrSub[memberindx].movies.push(movieSub)
                 axios.put(url+"subscriptions/"+subId, arrSub[memberindx])
                }
                console.log(arrSub)
                return {...state,subscriptions:[arrSub]}
    default:
        return state; 
    }
}

export default AppReducer