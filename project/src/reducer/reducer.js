import { VIEWALL,VIEWONE,ADDING,CREATING,EDITING,LOGIN,VIEWMY,LOGOUT,LOGGING_IN,REGISTERED,REGISTER,DATA } from '../actions/action';

const initial = {
notes : [],
error:null,
view:'all',
editing:null,
adding:false,
loggedIn:null,
loggingIn:false,
registering:false,
token:null,
}

const reducer = (state=initial,action) => {
switch(action.type){
case DATA:
return({...state, error:null, view:'all', editing:null, adding:false,notes:action.payload});
case REGISTER:
return({...state,registering:true});
case REGISTERED:
return({...state,registering:false});
case LOGGING_IN:
return({...state,loggingIn:true});
case VIEWONE:
return({...state,view:action.payload});
case VIEWALL:
return({...state, error:null, view:'all', editing:null, adding:false});
case ADDING:
return({...state,adding:true,view:null,editing:null})
case CREATING:
return({...state,view:'all',adding:false})
case EDITING:
return({...state,view:null,editing:action.payload})
case LOGIN:
return ({...state,loggedIn:action.payload.username,token:action.payload.token})
case VIEWMY:
return ({...state,view:'my',adding:false,editing:null,})
case LOGOUT:
return ({...state,error:null,view:'all',editing:null,adding:false,loggedIn:null,token:null,})
default:
return state
}
}

export default reducer;