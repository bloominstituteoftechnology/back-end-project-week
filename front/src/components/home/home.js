import React from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

const Home = (props) => {
    const noteMap = props.allNotes.map((noteObj, i) => {
        return (
            <ul className="home__list" key={i}>
                    <div className="home__list__cards">
                        <Link to={{pathname: "/viewnote", state: {title: noteObj.title, content: noteObj.content, id: noteObj._id}}}>
                            <li className="home__list__cards__title">{noteObj.title}</li>
                            <li className="home__list__cards__note">{noteObj.content}</li>
                        </Link>
                    </div>
            </ul>
        )
    })

    return(
        <div className = "home">
            <div className="home__header">
                <p>Your Notes:</p>
            </div>

            {noteMap}
        </div>
    )
}

export default Home;