import React from 'react';
import Cell from './Cell';


class Board extends React.Component {
	constructor() {
		super();
		this.state = {
			board: Array(1980).fill(0)
		}
	}

	setBoard() {
		const cells = this.state.board.map((item, i) => {
			return Math.random() > 0.8 ? 1 : 0;
		});

		this.setState({
			board: cells
		});
	}

	componentDidMount() {
		this.setBoard();
	}

	calculateNeighbours(i) {
		/*
		const totalCells = 1980 - 1;
		const rowLength = 60 - 1;

		top row: <= rowLength
		bot row: >= totalCells - rowLength
		lef row: 
		rig row: totalCells % rowLength
		*/

		/*
		[i - 61] [i - 60] [i - 59]
		[i - 1]    item   [i + 1]
		[i + 59] [i + 60] [i + 61]
		*/

		const temp = this.state.board.slice();

		const sum = 
			temp[i - 61] +
			temp[i - 60] +
			temp[i - 59] +
			temp[i - 1] +
			temp[i + 1] +
			temp[i + 59] +
			temp[i + 60] +
			temp[i + 61];

		return(
			sum ? sum : 0
		)
	}

	render() {
		const cells = this.state.board.map((item, i) => {
			const alive = item === 1 ? "alive" : "dead";

			const neighbours = this.calculateNeighbours(i);
			console.log(neighbours);


			const rowLength = 60;
			let count = 1;
			if (i % rowLength) {count++};

			return(
				<Cell 
					key={'c' + i}
					id={count + "," + i}
					value={item}
					status={alive} 
				/>
			);



			
		});
		return(
			<div className="board">
				{cells}
			</div>
		)
	}
}


export default Board;