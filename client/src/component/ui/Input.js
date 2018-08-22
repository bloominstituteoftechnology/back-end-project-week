import React from "react";

const Input = props => {
	let {
		id,
		hasErrors,
		touch,
		errors,
		valid,
		label,
		type,
		controlClass,
		placeholder,
		value,
		onChange,
		name,
		validation
	} = props;
	controlClass =
		!touch || valid ? controlClass + " is-valid" : controlClass + " is-invalid";
	const strengthClass = [
		"strength-meter mt-2",
		value && value.length > 0 ? "visible" : "invisible"
	]
		.join(" ")
		.trim();
	let strengthMeter =
		name === "password" ? (
			<div className={strengthClass}>
				<div
					className="strength-meter-fill"
					data-strength={validation.strength}
				/>
			</div>
		) : null;
	return value !== undefined ? (
		<div className="form-group px-3 pb-2">
			<div className="d-flex flex-row justify-content-between align-items-center">
				<label htmlFor={id} className="control-label">
					{label}
				</label>
				{/** Render the first error if there are any errors **/}
				{!valid &&
					errors.length > 0 && (
						<div className="error form-hint font-weight-bold text-right m-0 mb-2">
							{errors[errors.length - 1]}
						</div>
					)}
			</div>
			{strengthMeter}
			<input
				type={type}
				className={controlClass}
				id={id}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete="off"
			/>
		</div>
	) : null;
};
export default Input;
