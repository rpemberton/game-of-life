import React from 'react';

const Button = (props) => {
	return(
		<button
			className="ctrl-btn"
			onClick={() => props.onClick()}>
			{props.btnTxt}
		</button>
	);
}

export default Button;