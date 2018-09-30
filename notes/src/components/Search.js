import React from 'react'; 
import "..//App.css";

export default function Search (props) {
    return (
        <div className="search">
            <form onSubmit={props.onHandlerSearch}>
                <input 
                    type="text"
                    className="search-input"
                    name="search"
                    onChange={props.inputHandler}
                    value={props.search}>
                </input>
                
                <button 
                    className="search-button"> 
                    Search 
                </button>    
            </form>
        </div>
    )
}