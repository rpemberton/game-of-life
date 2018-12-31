import React from 'react';

const Cell = (props) => {
	return (
		<button
			className={"cell" + (props.isAlive ? " cell--alive" : "")}
			onClick={props.handleCellClick}>
			<div></div>
		</button>
	)
};

export default Cell;