import React, { Component } from "react";
import Input from "../../component/ui/Input";
import zxcvbn from "zxcvbn";
import { validate } from "isemail";

// css
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.css";
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
			errors: [],
			validation: {}
		},
		username: {
			type: "text",
			value: "",
			required: true,
			placeholder: "Email",
			name: "username",
			label: "User name",
			errors: [],
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
			errors: [],
			valid: false,
			validation: {
				strength: 0,
				minLength: 7
			}
		},
		formValid: false
	};

	inputHandler = (e, id) => {
		let updateState = { ...this.state };

		updateState[id].value = e.target.value;
		updateState[id].touch = true;
		if (id === "password") {
			let result = this.passwordValidetor(e.target.value);
			let validate = result[1] >= 3;
			if (result[1] >= 3) {
				updateState[id].valid = true;
				updateState[id].errors = [];
			} else {
				updateState[id].errors.push(result[0]);
				updateState[id].valid = false;
			}
			updateState[id].validation.strength = result[1];
		}
		if (id === "name") {
			if (this.validateFullname(e.target.value)) {
				console.log("passed");
				updateState[id].valid = true;
				updateState[id].errors = [];
			} else {
				console.log("failed");
				updateState[id].errors.push("Please Enter Full Name");
				updateState[id].valid = false;
			}
		}
		if (id === "username") {
			if (this.validateEmail(e.target.value)) {
				console.log("passed");
				updateState[id].valid = true;
				updateState[id].errors = [];
			} else {
				console.log("failed");
				updateState[id].errors.push("Please Enter Full Name");
				updateState[id].valid = false;
			}
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
		let score = zxcvbn(password).score;
		let error = [];
		if (!isEmpity) {
			error.push("Password is required");
		} else if (password.length < 6) {
			error.push("Length should be more than 6");
		} else if (score < 3) {
			error.push(`Password is weak : ${score}`);
		} else if (score >= 3) {
			error = [];
		}

		return [error, score];
	};
	validateFullname = value => {
		const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
		return regex.test(value) ? true : false;
	};
	validateEmail = value => {
		return validate(value) ? true : false;
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
					errors={i[1].errors}
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
				<span className="d-block form-hint">
					To conform with our Strong Password policy, you are reqired to use a
					sufficiently strong password. Password must be more than{" "}
					{this.state.password.validation.minLength} characters.
				</span>
			</form>
		);
	}
}
export default Auth;
