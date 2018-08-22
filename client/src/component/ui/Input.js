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
		name
	} = props;
	controlClass =
		!touch && !valid
			? controlClass + " is-valid"
			: controlClass + " is-invalid";
	return value !== undefined ? (
		<div className="form-group px-3 pb-2">
			<div className="d-flex flex-row justify-content-between align-items-center">
				<label htmlFor={id} className="control-label">
					{label}
				</label>
				{/** Render the first error if there are any errors **/}
				{hasErrors && (
					<div className="error form-hint font-weight-bold text-right m-0 mb-2">
						{errors[0]}
					</div>
				)}
			</div>
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
