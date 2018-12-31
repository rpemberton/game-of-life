import React, { Component } from 'react';
import Board from './Board';
import Button from './Button';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      generation: 0,
      isGameInPlay: false,
      rAF: null
    };
  }

  componentDidMount = () => {
    this.resetBoard();
    this.handleStart();
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

    if (i === 0) { //  cell is top left corner
      if (board[i +    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i +   61]) {count++}
      if (board[i +  119]) {count++}
      if (board[i + 1920]) {count++}
      if (board[i + 1921]) {count++}
      if (board[i + 1979]) {count++}
    }
    else if (i === 59) { //  cell is top right corner
      if (board[i -    1]) {count++}
      if (board[i +    1]) {count++}
      if (board[i -   59]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i + 1861]) {count++}
      if (board[i + 1919]) {count++}
      if (board[i + 1920]) {count++}
    }
    else if (i === 1920) { //  cell is bottom left corner
      if (board[i +    1]) {count++}
      if (board[i -    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i -   59]) {count++}
      if (board[i -   60]) {count++}
      if (board[i - 1861]) {count++}
      if (board[i - 1919]) {count++}
      if (board[i - 1920]) {count++}
    }
    else if (i === 1979) { //  cell is bottom right corner
      if (board[i -    1]) {count++}
      if (board[i -   59]) {count++}
      if (board[i -   60]) {count++}
      if (board[i -   61]) {count++}
      if (board[i -  119]) {count++}
      if (board[i - 1920]) {count++}
      if (board[i - 1921]) {count++}
      if (board[i - 1979]) {count++}
    }
    else if (i < 60) { // cell is on top edge
      if (board[i + 1919]) {count++}
      if (board[i + 1920]) {count++}
      if (board[i + 1921]) {count++}
      if (board[i -    1]) {count++}
      if (board[i +    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i +   61]) {count++}
    }
    else if (i >= 1979 - 59) { // cell is on bottom edge
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

    this.setState((state) => ({
      board: board,
      generation: state.generation + 1
    }));

    requestAnimationFrame(this.nextGeneration);
  }

  handleStart = () => {
    if (this.state.isGameInPlay) {
      return;
    }

    const isBoardPopulated = this.state.board.includes(1);

    if (!isBoardPopulated) {
      this.resetBoard();
    }

    this.setState(() => ({
      rAF: requestAnimationFrame(this.nextGeneration),
      isGameInPlay: true
    }));
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
    const updatedBoard = this.state.board.slice();
    updatedBoard[i] = updatedBoard[i] ? 0 : 1;

    this.setState(() => ({
      board: updatedBoard
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Game of life</h1>
        <p className="generation">Generation: {this.state.generation}</p>
        {
          this.state.isGameInPlay
            ? <Button onClick={this.handlePause} btnTxt="Stop"/>
            : <Button onClick={this.handleStart} btnTxt="Start"/>
        }
        <Button onClick={this.handleClear} btnTxt="Clear"/>
        <Button onClick={this.handleReset} btnTxt="Reset"/>
        <Board
          board={this.state.board}
          handleCellClick={this.handleCellClick}
        />
        <footer className="footer">
          <p>Learn about Conway's Game of Life on <a href="http://en.wikipedia.org/wiki/Conway's_Game_of_Life">Wikipedia</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
