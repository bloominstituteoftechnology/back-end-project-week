import React from "react";
import { Link } from "react-router-dom";
const Note = ({ text, id, user_id }) => (
	<div>
		<Link to={`/notes/${id}/user/${user_id}`}> heading </Link>
		<div>{text}</div>
	</div>
);
export default Note;
