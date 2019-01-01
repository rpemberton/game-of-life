import React from 'react';
import styles from './Cell.module.css';

const Cell = ({isAlive, onClick}) => (
	<button
		className={[styles.cell, isAlive && styles['cell--alive']].join(' ')}
		onClick={onClick}>
	</button>
);

export default Cell;
