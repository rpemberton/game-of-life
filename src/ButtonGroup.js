import React from 'react';
import Button from './Button'

const ButtonGroup = (props) => {
	return(
		<div>
			<Button btnTxt="Start"/>
			<Button btnTxt="Pause"/>
			<Button btnTxt="Clear"/>
			<Button btnTxt="Reset"/>
		</div>
	)
}

export default ButtonGroup;