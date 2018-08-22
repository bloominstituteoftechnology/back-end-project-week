import React, { Component } from "react";
import Input from "../../component/ui/Input";
import zxcvbn from "zxcvbn";

// css
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.css";
import { Z_DEFAULT_STRATEGY } from "zlib";
class Auth extends Component {
	state = {
		name: {
			type: "text",
			value: "",
			required: true,
			placeholder: "Full name",
			name: "name",
			label: "Full name",
			touch: false,
			valid: false,
			validation: {}
		},
		username: {
			type: "text",
			value: "",
			required: true,
			placeholder: "Email",
			name: "username",
			label: "User name",
			touch: false,
			valid: false,
			validation: {}
		},
		password: {
			type: "password",
			value: "",
			required: true,
			placeholder: "Password",
			name: "password",
			label: "Password",
			touch: false,
			valid: false,
			validation: {
				strength: 2,
				minLength: 6
			}
		},
		formValid: false
	};

	inputHandler = (e, id) => {
		let updateState = { ...this.state };

		// updateState[id] = { ...this.state[id] };
		updateState[id].value = e.target.value;
		updateState[id].touch = true;
		if (id === "password") {
			let result = this.passwordValidetor(e.target.value);
			let validate = result[1] > 2;
			if (result[1] >= 3) {
				console.log("passed");
				updateState[id].valid = true;
			} else {
				console.log("falied");
			}
			console.log("strength ", result[1]);
		}
		this.setState({ ...updateState });
	};
	handleSubmit = e => {
		e.preventDefault();

		// this.setState({
		// 	passwordError: result[0],
		// 	passwordStrength: result[1]
		// });
	};

	passwordValidetor = password => {
		const isEmpity = password.length > 0;
		let error = [];
		let score = zxcvbn(password).score;
		if (!isEmpity) {
			error.push("Password is required");
		} else if (password.length < 6) {
			error.push("Length should be more than 6");
		} else if (score < 3) {
			error.push(`failed b/c password strength: ${score}`);
		} else {
			error = [];
		}

		return [error, score];
	};

	render() {
		let arr = Object.entries(this.state);
		let inputElement = arr.map((i, idx, arr) => (
			<div className="form__group" key={i[0]}>
				<Input
					type={i[1].type}
					name={i[1].name}
					id={i[1].name}
					placeholder={i[1].placeholder}
					onChange={e => this.inputHandler(e, i[0])}
					value={i[1].value}
					label={i[1].label}
					validation={i[1].validation}
					valid={i[1].valid}
					touch={i[1].touch}
					controlClass="form-control"
					formValid={arr[3][1]}
				/>
			</div>
		));
		return (
			<form onSubmit={this.handleSubmit} className="main-form-container ">
				<button type="submit"> Join </button>
				{inputElement}
			</form>
		);
	}
}
export default Auth;
