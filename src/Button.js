import React from 'react';

const Button = ({ btnTxt, onClick }) => {
	return(
		<button
			className="ctrl-btn"
			onClick={onClick}>
			{btnTxt}
		</button>
	);
}

export default Button;