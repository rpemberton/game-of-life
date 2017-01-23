import React from 'react';
import Cell from './Cell';

class Board extends React.Component {
	constructor() {
		super();
		this.state = {
			board: [],
			generations: 1
		}
	}

	setBoard() {
		let board = [];
		for (let i = 0; i < 1980; i++) {
			board.push(Math.random() > 0.8 ? 1 : 0);
		}

		this.setState({
			board: board
		});
	}

	calculateNeighbours(i) {
		const board = this.state.board;
		let count = 0;

		if (i < 60) { // cell is on top edge
			if(board[i + 1919]){count++}
			if(board[i + 1920]){count++}
			if(board[i + 1921]){count++}
			if(board[i -    1]){count++}
			if(board[i +    1]){count++}
			if(board[i +   59]){count++}
			if(board[i +   60]){count++}
			if(board[i +   61]){count++}
		}
		else if (i >= 1980 - 60) { // cell is on bottom edge
			if(board[i -   61]){count++}
			if(board[i -   60]){count++}
			if(board[i -   59]){count++}
			if(board[i -    1]){count++}
			if(board[i +    1]){count++}
			if(board[i - 1921]){count++}
			if(board[i - 1920]){count++}
			if(board[i - 1919]){count++}
		}
		else if (i % 60 === 0) { // cell is on left edge
			if(board[i -    1]){count++}
			if(board[i -   60]){count++}
			if(board[i -   59]){count++}
			if(board[i +  119]){count++}
			if(board[i +    1]){count++}
			if(board[i +   59]){count++}
			if(board[i +   60]){count++}
			if(board[i +   61]){count++}
		}
		else if (i % 60 === 59) { // cell is on right edge
			if(board[i -   61]){count++}
			if(board[i -   60]){count++}
			if(board[i -  119]){count++}
			if(board[i -    1]){count++}
			if(board[i -   59]){count++}
			if(board[i +   59]){count++}
			if(board[i +   60]){count++}
			if(board[i +    1]){count++}
		}
		else {
			if(board[i - 61]){count++}
			if(board[i - 60]){count++}
			if(board[i - 59]){count++}
			if(board[i -  1]){count++}
			if(board[i +  1]){count++}
			if(board[i + 59]){count++}
			if(board[i + 60]){count++}
			if(board[i + 61]){count++}
		}

		return count;
	}

	nextGeneration() {
		const board = this.state.board.map((item, i) => {
			const neighbours = this.calculateNeighbours(i);

			if (neighbours === 2) {return item}
			if (neighbours === 3) {return 1}
			return 0;
		});

		this.setState({
			board: board,
			generations: this.state.generations + 1
		})
	}

	componentDidMount() {
		this.setBoard();
		setInterval(() => {
		    this.nextGeneration();
		}, 100);
	}

	render() {
		const cells = this.state.board.map((item, i) => {
			const alive = item === 1 ? "alive" : "dead";

			return(
				<Cell 
					id={i}
					key={'c' + i}
					value={item}
					status={alive} 
				/>
			);
		});
		return(
			<div className="board">
				<div>Generations: {this.state.generations}</div>
				{cells}
			</div>
		)
	}
}

export default Board;