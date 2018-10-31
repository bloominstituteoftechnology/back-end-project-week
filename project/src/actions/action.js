import axios from 'axios';
export const VIEWALL = 'VIEWALL';
export const VIEWONE = 'VIEWONE';
export const VIEWMY= "VIEWMY";
export const ADDING = "ADDING";
export const CREATING = "CREATING";
export const EDITING = "EDITING";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGGING_IN = "LOGGING_IN";
export const ERROR = "ERROR";
export const REGISTERED = "NEWUSER";
export const REGISTER = "REGISTER";
export const DATA = "DATA";

export const get_notes = (token) => {
return dispatch => {
axios.get('http://localhost:3300/api/posts',{headers:{Authorization:token}})
	.then(response => {
	dispatch({type:DATA,payload:response.data});
	})
	.catch(err => {
	dispatch({type:ERROR,payload:err});	
	})
}
}

export const register = () => {
return ({type:REGISTER})
}

export const registered = (user) => {
return dispatch =>{
axios.post('http://localhost:3300/api/register', {
username:user.username,	
password:user.password	
})
	.then(res => {
	dispatch({type:REGISTERED});
	})
	.catch(err => {
	dispatch({type:ERROR,payload:err});	
	})
}
}

export const viewall = () => {
return ({type:VIEWALL});
}

export const viewone = (index) => {
return ({type:VIEWONE,payload:index});
}

export const deleteNote = (id,token) => {
return dispatch => {
axios.delete(`http://localhost:3300/api/posts/${id}`,{headers:{Authorization:token}})
	.then(res => {
			axios.get('http://localhost:3300/api/posts',{headers:{Authorization:token}})
		.then(response => {
		dispatch({type:DATA,payload:response.data});
		})
		.catch(err => {
		dispatch({type:ERROR,payload:err});	
		})
	}
	)
	.catch(err => {
	dispatch({type:ERROR,payload:err});	
	})
}
}

export const addNew = () => {
return ({type:ADDING});
}

export const createNote = (poster,title,content,token) => {
return dispatch => {
axios.post('http://localhost:3300/api/posts',{poster:poster,title:title,content:content},{headers:{Authorization:token}})
	.then(response => {
	dispatch({type:CREATING});
	})
	.catch(err => {
	dispatch({type:ERROR,payload:err});	
	})
}
}

export const editNote = (id) => {
return({type:EDITING,payload:id});
}

export const edit = (id,title,content,token) => {
return dispatch => {
axios.put(`http://localhost:3300/api/posts/${id}`,{title:title,content:content},{headers:{Authorization:token}})
	.then(res => {
	dispatch({type:VIEWALL})
	})
	.catch(err => {
	dispatch({type:ERROR,payload:err});	
	})
}
}

export const login = (user) => {
return dispatch => {
dispatch({type:LOGGING_IN});
axios.post('http://localhost:3300/api/login', {
username:user.username,	
password:user.password})
	.then(response => {
	dispatch({type:LOGIN,payload:response.data});
	})
	.catch(err => {
	dispatch({type:ERROR,payload:err});
	})
	};
}

export const viewmy = () => {
return {type:VIEWMY}
}

export const logout= () => {
return ({type:LOGOUT})
}