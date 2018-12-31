import React from 'react';
import Cell from './Cell';

const Board = (props) => {
	const cells = props.board.map((item, i) => {
		return(
			<Cell
				key={i}
				isAlive={item}
				handleCellClick={() => props.handleCellClick(i)}
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