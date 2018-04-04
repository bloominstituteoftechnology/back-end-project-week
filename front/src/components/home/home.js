import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
    const noteMap = props.allNotes.map((noteObj, i) => {
        return (
            <ul className="home__list" key={i}>
                <div className="home__list__cards">
                    <li className="home__list__cards__title">{noteObj.title}</li>
                    <li className="home__list__cards__note">{noteObj.content}</li>
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