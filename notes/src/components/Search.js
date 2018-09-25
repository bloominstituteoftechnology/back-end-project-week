import React from 'react'; 

export default function Search (props) {
    return (
        <div>
            <form onSubmit={props.submitHandlerSearch}>
                <input 
                    type="text"
                    className="search-input"
                    name="search"
                    onChange={props.inputHandlerSearch}
                    placeholder="Search"
                    value={props.search}>
                </input>
                
                <button 
                    className="form-button"> 
                    Search 
                </button>    
            </form>
        </div>
    )
}