import React from 'react'; 
import "..//App.css";

export default function Search (props) {
    return (
        <div className="search">
            <form onSubmit={props.submitHandlerSearch}>
                <input 
                    type="text"
                    className="search-input"
                    name="search"
                    onChange={props.inputHandlerSearch}
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