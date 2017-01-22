import React from 'react';

const Cell = (props) => (
	<div 
		id={props.id}
		value={props.value}
		className={"cell " + props.status} 
	/>
);


export default Cell;