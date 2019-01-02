import React, { PureComponent } from 'react';
// import Cell from '../Cell/Cell';
import styles from './Board.module.css';

class Board extends PureComponent {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<canvas
				className={styles.board}
				width="720"
				height="396">
				{/* {this.props.board.map((item, i) => {
					return(
						<Cell
							key={i}
							isAlive={item}
							onClick={() => this.props.onCellClick(i)}
						/>
					)
				})} */}
			</canvas>
		);
	}
};

export default Board;
