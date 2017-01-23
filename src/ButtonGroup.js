import React from 'react';
import Button from './Button'

const ButtonGroup = (props) => {
	return(
		<div>
			<Button onClick={props.onStart} btnTxt="Start"/>
			<Button onClick={props.onPause} btnTxt="Stop"/>
			<Button onClick={props.onClear} btnTxt="Clear"/>
			<Button onClick={props.onReset} btnTxt="Reset"/>
		</div>
	)
}

export default ButtonGroup;