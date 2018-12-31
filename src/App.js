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
  }

  componentDidMount() {
    this.setBoard();
    this.handleStart();
  }

  setBoard() {
    const board = [];

    for (let i = 0; i < 1980; i++) {
      board.push(Math.random() > 0.8 ? 1 : 0);
    }

    this.setState({
      board: board,
      generation: 0
    });
  }

  calculateNeighbours(i) {
    const board = this.state.board;
    let count = 0;

    let currRowIndex = Math.floor(i / 60);
    let prevRowIndex = currRowIndex - 1;
    let nextRowIndex = currRowIndex + 1;

    if (prevRowIndex === -1) {
      prevRowIndex = 32;
    }

    if (nextRowIndex === 33) {
      nextRowIndex = 0;
    }

    const prevRow = board.slice(prevRowIndex * 60, (prevRowIndex * 60) + 60);
    const currRow = board.slice(currRowIndex * 60, (currRowIndex * 60) + 60);
    const nextRow = board.slice(nextRowIndex * 60, (nextRowIndex * 60) + 60);

    const isLeftSide = i % 60 === 0;
    const isRightSide = i % 60 === 59;

    let leftIndex = (i % 60) - 1;
    let rightIndex = (i % 60) + 1;

    if (isLeftSide) {
      leftIndex = 59;
    }

    if (isRightSide) {
      rightIndex = 0;
    }

    // count left side
    if (prevRow[leftIndex]) {
      count++;
    }
    if (currRow[leftIndex]) {
      count++;
    }
    if (nextRow[leftIndex]) {
      count++;
    }

    // count right side
    if (prevRow[rightIndex]) {
      count++;
    }
    if (currRow[rightIndex]) {
      count++;
    }
    if (nextRow[rightIndex]) {
      count++;
    }

    // count remaining top and bottom
    if (prevRow[i % 60]) {
      count++;
    }
    if (nextRow[i % 60]) {
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
        return item
      }
      if (neighbours === 3) {
        return 1
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
