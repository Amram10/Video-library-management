//const permissins = useSelector(state=>state.userDetails.permissions)
function ChackPermissionsComp(permissions,action) 
{
    switch (action)
    {
      case "sys_admin":
            if (permissions[0].ViewSubscriptions===true&&permissions[1].CreatSubscriptions===true&&permissions[2].DeleteSubscriptions===true&&permissions[3].UpdateSubscriptions===true&&permissions[4].ViewMovies===true&&permissions[5].CreatMovies===true&&permissions[6].DeleteMovies===true&&permissions[7].UpdateMovies===true)
         {
            return true
         }
         return false;
      case "movies":
        if (permissions[4].ViewMovies===true)
        {
            return true
        }
         return false;
      case "subscriptions":
        if (permissions[0].ViewSubscriptions===true)
        {
            return true
        }
         return false;
     case "addSub":
        if (permissions[1].CreatSubscriptions===true)
        {
            return true
        }
         return false;
     case "deleteSub":
        if (permissions[2].DeleteSubscriptions===true)
        {
            return true
        }
         return false;
     case "updateSub":
        if (permissions[3].UpdateSubscriptions===true)
        {
            return true
        }
         return false;
     case "updateMovie":
        if (permissions[7].UpdateMovies===true)
        {
            return true
        }
         return false;
     case "addMovie":
        if (permissions[5].CreatMovies===true)
        {
            return true
        }
         return false;
     case "deleteMovie":
        if (permissions[6].DeleteMovies===true)
        {
            return true
        }
         return false;
     
    }
          
}
export default ChackPermissionsComp