import React,{ Component } from 'react';
import './Login.css';
import posed from 'react-pose';

const Fader = posed.div({
gone:{ opacity:0 },
back:{ opacity:1 }
});

class Login extends Component {
constructor(props){
super(props);
this.state={
userName:'',
password:'',
repeat:'',
isVisable:false,
}
}

componentDidMount(){
setTimeout(()=>{
	this.setState({isVisable:!this.state.isVisable});
},100);
}

changeHandler = (e) => {
this.setState({[e.target.name]:e.target.value});
}

loginQuerry = (e) => {
e.preventDefault();
if(this.state.password && this.state.userName){this.props.login({username:this.state.userName,password:this.state.password});}
else{alert('please fill in a username and password')}
}

registerQuerry = (e) => {
e.preventDefault();
if(this.state.password === this.state.repeat && this.state.userName){
this.props.registered({username:this.state.userName,password:this.state.password});
}
else{alert('please fill in a username and password')}
}

render(){
if(!this.props.registering){
return(
<Fader className="loginScreen" pose={this.state.isVisable?'back':'gone'}>
<div>
<form onSubmit={(e)=>this.loginQuerry(e)} className="flex_row">
<input name="userName" value={this.state.userName} onChange={(e)=>this.changeHandler(e)} placeholder="username" />
<input name="password" value={this.state.password} onChange={(e)=>this.changeHandler(e)} placeholder="password" />
<input className="login_button" type="submit" value="login" />
</form>
</div>
<div className="cooking" onClick={()=>this.props.register()}>create new account</div>
</Fader>
)}
else{
return(
<Fader className="loginScreen" pose={this.state.isVisable?'back':'gone'}>
<div>
<form onSubmit={(e)=>this.registerQuerry(e)} className="flex_row">
<input name="userName" value={this.state.userName} onChange={(e)=>this.changeHandler(e)} placeholder="username" />
<input name="password" value={this.state.password} onChange={(e)=>this.changeHandler(e)} placeholder="password" />
<input name="repeat" value={this.state.repeat} onChange={(e)=>this.changeHandler(e)} placeholder="repeat password" />
<input className="login_button" type="submit" value="register" />
</form>
</div>
</Fader>
)
}
}
}

export default Login

