import React from 'react';

const Button = (props) => {
	return(
		<button onClick={() => props.onClick()}>{props.btnTxt}</button>
	);
}

export default Button;