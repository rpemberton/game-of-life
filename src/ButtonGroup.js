import React from 'react';
import Button from './Button'

const ButtonGroup = (props) => {
	return(
		<div>
			<Button onClick={props.onStart} btnTxt="start"/>
			<Button onClick={props.onPause} btnTxt="stop"/>
			<Button onClick={props.onClear} btnTxt="clear"/>
			<Button onClick={props.onReset} btnTxt="reset"/>
		</div>
	)
}

export default ButtonGroup;