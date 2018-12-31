import React from 'react';
import Cell from '../Cell/Cell';
import styles from './Board.module.css';

const Board = ({ board, onCellClick }) => (
	<div className={styles.board}>
		{board.map((item, i) => {
			return(
				<Cell
					key={i}
					isAlive={item}
					onClick={() => onCellClick(i)}
				/>
			)
		})}
	</div>
);

export default Board;
