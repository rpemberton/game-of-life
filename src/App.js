import React, { Component } from 'react';
import Board from './components/Board/Board';
import Button from './components/Button/Button';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      generation: 0,
      rAF: null
    };

    this.numCellsBoard = 1980;
  }

  componentDidMount() {
    this.setBoard();
    this.handleStart();
  }

  setBoard() {
    const board = [];

    for (let i = 0; i < this.numCellsBoard; i++) {
      board.push(Math.random() > 0.8 ? 1 : 0);
    }

    this.setState({
      board: board,
      generation: 0
    });
  }

  calculateNeighbours(i) {
    const numCellsRow = 60;
    const numRows = this.numCellsBoard / numCellsRow;
    const { board } = this.state;

    let count = 0;

    let currRowIndex = Math.floor(i / numCellsRow);
    let prevRowIndex = currRowIndex - 1;
    let nextRowIndex = currRowIndex + 1;

    if (prevRowIndex < 0) {
      prevRowIndex = numRows - 1;
    }

    if (nextRowIndex === numRows) {
      nextRowIndex = 0;
    }

    function getRow(rowIndex) {
      return board.slice(rowIndex * numCellsRow, (rowIndex * numCellsRow) + numCellsRow);
    }

    const prevRow = getRow(prevRowIndex);
    const currRow = getRow(currRowIndex);
    const nextRow = getRow(nextRowIndex);

    const isLeftSide = i % numCellsRow === 0;
    const isRightSide = i % numCellsRow === numCellsRow - 1;

    let leftIndex = (i % numCellsRow) - 1;
    let rightIndex = (i % numCellsRow) + 1;

    if (isLeftSide) {
      leftIndex = numCellsRow - 1;
    }

    if (isRightSide) {
      rightIndex = 0;
    }

    /*
    L, T, R
    L, X, R
    L, B, R
    */

    // Count left (L) side
    if (prevRow[leftIndex]) {
      count++;
    }
    if (currRow[leftIndex]) {
      count++;
    }
    if (nextRow[leftIndex]) {
      count++;
    }

    // Count right (R) side
    if (prevRow[rightIndex]) {
      count++;
    }
    if (currRow[rightIndex]) {
      count++;
    }
    if (nextRow[rightIndex]) {
      count++;
    }

    // Count remaining top (T) and bottom (B)
    if (prevRow[i % numCellsRow]) {
      count++;
    }
    if (nextRow[i % numCellsRow]) {
      count++;
    }

    return count;
  }

  nextGeneration = () => {
    if (!this.state.rAF) {
      return;
    }

    const board = this.state.board.map((item, i) => {
      const neighbours = this.calculateNeighbours(i);
      if (neighbours === 2) {
        return item;
      }
      if (neighbours === 3) {
        return 1;
      }
      return 0;
    });

    this.setState((state) => ({
      board: board,
      generation: state.generation + 1
    }));

    requestAnimationFrame(this.nextGeneration);
  }

  handleStart = () => {
    if (this.state.rAF) {
      return;
    }

    const isBoardPopulated = this.state.board.includes(1);

    if (!isBoardPopulated) {
      this.setBoard();
    }

    this.setState({
      rAF: requestAnimationFrame(this.nextGeneration),
    });
  }

  handlePause = () => {
    cancelAnimationFrame(this.state.rAF);
    this.setState({
      rAF: null
    });
  }

  handleReset = () => {
    this.handlePause();
    this.setBoard();
  }

  handleClear = () => {
    this.setState({
      board: Array(1980).fill(0),
      generation: 0,
      rAF: null,
    });
  }

  handleCellClick = (i) => {
    const updatedBoard = this.state.board.slice();
    updatedBoard[i] = updatedBoard[i] ? 0 : 1;

    this.setState({
      board: updatedBoard
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Game of Life</h1>
          <p className="generation">Generation: {this.state.generation}</p>

          <div>
            {
              this.state.rAF
                ? <Button onClick={this.handlePause} text="Pause"/>
                : <Button onClick={this.handleStart} text={this.state.generation ? 'Resume' : 'Start'}/>
            }
            <Button onClick={this.handleClear} text="Clear"/>
            <Button onClick={this.handleReset} text="Reset"/>
          </div>

          <Board
            board={this.state.board}
            onCellClick={this.handleCellClick}
          />

          <footer className="footer">
            <p>Learn about Conway's Game of Life on <a href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life">Wikipedia</a>.</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
