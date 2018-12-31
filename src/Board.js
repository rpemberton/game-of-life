import React from 'react';
import Cell from './Cell';

const Board = ({ board, onCellClick }) => {
	const cells = board.map((item, i) => {
		return(
			<Cell
				key={i}
				isAlive={item}
				onClick={() => onCellClick(i)}
			/>
		);
	});

	return(
		<div className="board">
			{cells}
		</div>
	)
}

export default Board;