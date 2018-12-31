import React from 'react';

const Cell = ({isAlive, onClick}) => {
	return (
		<button
			className={"cell" + (isAlive ? " cell--alive" : "")}
			onClick={onClick}>
			<div></div>
		</button>
	)
};

export default Cell;