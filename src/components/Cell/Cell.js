import React from 'react';
import styles from './Cell.module.css';

const Cell = ({isAlive, onClick}) => {
	return (
		<button
			className={[styles.cell, isAlive && styles['cell--alive']].join(' ')}
			onClick={onClick}>
			<div></div>
		</button>
	)
};

export default Cell;
