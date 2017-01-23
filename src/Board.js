import React from 'react';
import Cell from './Cell';

const Board = (props) => {
	const cells = props.board.map((item, i) => {
		const alive = item === 1 ? "alive" : "dead";
		return(
			<Cell 
				id={i}
				key={'c' + i}
				value={item}
				status={alive}
				onCellClick={props.onCellClick}
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