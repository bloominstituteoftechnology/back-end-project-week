import React from 'react'; 


export default function Register(props){

        return (
            <div>
                <div className="form-title">Enter Information Below to Register</div>
                <form onSubmit={props.onRegisterHandler}>
                    <input 
                        type="text"
                        className="form-input"
                        value={props.username}
                        onChange={props.inputHandler}
                        name="username"
                        placeholder="username"></input>
                    <input 
                        type="password"
                        className="form-input"
                        value={props.password}
                        onChange={props.inputHandler}
                        name="password"
                        placeholder="password"></input>
                    <button
                        className="form-button">Submit</button>            
                </form>
            </div>
        )
}