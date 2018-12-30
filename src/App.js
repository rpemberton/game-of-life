import React from 'react';
import ButtonGroup from './ButtonGroup'
import Board from './Board';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isGameInPlay: false,
      board: [],
      generation: 0,
      rAF: null
    };
  }

  resetBoard = () => {
    const board = [];
    for (let i = 0; i < 1980; i++) {
      board.push(Math.random() > 0.8 ? 1 : 0);
    }

    this.setState({
      board: board,
      generation: 0
    });
  }

  calculateNeighbours = (i) => {
    const board = this.state.board;
    let count = 0;

    if (i < 60) { // cell is on top edge
      if (board[i + 1919]) {count++}
      if (board[i + 1920]) {count++}
      if (board[i + 1921]) {count++}
      if (board[i -    1]) {count++}
      if (board[i +    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i +   61]) {count++}
    }
    else if (i >= 1980 - 60) { // cell is on bottom edge
      if (board[i -   61]) {count++}
      if (board[i -   60]) {count++}
      if (board[i -   59]) {count++}
      if (board[i -    1]) {count++}
      if (board[i +    1]) {count++}
      if (board[i - 1921]) {count++}
      if (board[i - 1920]) {count++}
      if (board[i - 1919]) {count++}
    }
    else if (i % 60 === 0) { // cell is on left edge
      if (board[i -    1]) {count++}
      if (board[i -   60]) {count++}
      if (board[i -   59]) {count++}
      if (board[i +  119]) {count++}
      if (board[i +    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i +   61]) {count++}
    }
    else if (i % 60 === 59) { // cell is on right edge
      if (board[i -   61]) {count++}
      if (board[i -   60]) {count++}
      if (board[i -  119]) {count++}
      if (board[i -    1]) {count++}
      if (board[i -   59]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i +    1]) {count++}
    }
    else {
      if (board[i - 61]) {count++}
      if (board[i - 60]) {count++}
      if (board[i - 59]) {count++}
      if (board[i -  1]) {count++}
      if (board[i +  1]) {count++}
      if (board[i + 59]) {count++}
      if (board[i + 60]) {count++}
      if (board[i + 61]) {count++}
    }

    return count;
  }

  nextGeneration = () => {
    if (!this.state.isGameInPlay) {
      cancelAnimationFrame(this.state.rAF);
      return;
    }

    const board = this.state.board.map((item, i) => {
      const neighbours = this.calculateNeighbours(i);

      if (neighbours === 2) {return item}
      if (neighbours === 3) {return 1}
      return 0;
    });

    this.setState({
      board: board,
      generation: this.state.generation + 1
    });

    requestAnimationFrame(this.nextGeneration);
  }

  componentDidMount = () => {
    this.resetBoard();
    this.handleStart();
  }

  handleStart = () => {
    if (this.state.isGameInPlay) {
      return;
    }
    this.setState({
      rAF: requestAnimationFrame(this.nextGeneration),
      isGameInPlay: true
    });
  }

  handlePause = () => {
    this.setState({
      isGameInPlay: false
    });
  }

  handleClear = () => {
    this.setState({
      board: Array(1980).fill(0),
      generation: 0,
      isGameInPlay: false
    });
  }

  handleReset = () => {
    this.resetBoard();
    this.setState({
      isGameInPlay: false
    });
  }

  handleCellClick = (i) => {
    const board = this.state.board.map((cell, cellIndex) => {
      return cellIndex === 1 ? 1 : cell;
    });
    this.setState({
      board: board
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>game of life</h1>
          <p className="generation">generation: {this.state.generation}</p>
          <ButtonGroup
            onStart={this.handleStart}
            onPause={this.handlePause}
            onClear={this.handleClear}
            onReset={this.handleReset}
          />
          <Board
            board={this.state.board}
            onCellClick={this.handleCellClick}
          />
          <p className="footer">Learn about Conway's Game of Life on <a href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life">Wikipedia</a></p>
        </div>
      </div>
    );
  }
}

export default App;

/*
COMPONENT HIERARCHY
===================
-App
  -ButtonGroup
    -Button
  -Board
    -Cell

User Story: When I first arrive at the game, it will randomly generate a board and start playing.
User Story: I can start and stop the board.
User Story: I can set up the board.
User Story: I can clear the board.
User Story: When I press start, the game will play out.
User Story: Each time the board changes, I can see how many generations have gone by.
*/