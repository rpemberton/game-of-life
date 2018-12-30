import React from 'react';

const Cell = (props) => (
	<button
		id={props.id}
		value={props.value}
		className={"cell " + props.status}
		onClick={() => props.onCellClick(props.id)}>
	</button>
);

export default Cell;