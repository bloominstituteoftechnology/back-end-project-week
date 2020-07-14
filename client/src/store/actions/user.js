import * as action from "./actionTypes";
import { add, delet } from "./error";
import axios from "axios";
const URL = "http://localhost:8800/api";

const addHandler = user => ({
	type: action.ADD__USER,
	user
});

export const addUser = data => {
	return function(dispatch) {
		axios
			.post(`${URL}/register`, data)
			.then(result => {
				dispatch(delet());
				dispatch(addHandler(result.data));
			})
			.catch(error => {
				console.log("errorr", error);
				dispatch(add(error.response.data));
			});
	};
};
