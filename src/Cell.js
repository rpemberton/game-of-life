import React from 'react';

const Cell = (props) => (
	<div 
		id={props.id}
		value={props.value}
		className={"cell " + props.status}
		onClick={() => props.onCellClick(props.id)}
	/>
);


export default Cell;