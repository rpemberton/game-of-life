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

  componentDidMount = () => {
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

    //  cell is top left corner
    if (i === 0) {
      if (board[i +    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i +   61]) {count++}
      if (board[i +  119]) {count++}
      if (board[i + 1920]) {count++}
      if (board[i + 1921]) {count++}
      if (board[i + 1979]) {count++}
    }
    //  cell is top right corner
    else if (i === 59) {
      if (board[i -    1]) {count++}
      if (board[i +    1]) {count++}
      if (board[i -   59]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i + 1861]) {count++}
      if (board[i + 1919]) {count++}
      if (board[i + 1920]) {count++}
    }
    //  cell is bottom left corner
    else if (i === 1920) {
      if (board[i +    1]) {count++}
      if (board[i -    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i -   59]) {count++}
      if (board[i -   60]) {count++}
      if (board[i - 1861]) {count++}
      if (board[i - 1919]) {count++}
      if (board[i - 1920]) {count++}
    }
    //  cell is bottom right corner
    else if (i === 1979) {
      if (board[i -    1]) {count++}
      if (board[i -   59]) {count++}
      if (board[i -   60]) {count++}
      if (board[i -   61]) {count++}
      if (board[i -  119]) {count++}
      if (board[i - 1920]) {count++}
      if (board[i - 1921]) {count++}
      if (board[i - 1979]) {count++}
    }
    // cell is on top edge
    else if (i < 60) {
      if (board[i + 1919]) {count++}
      if (board[i + 1920]) {count++}
      if (board[i + 1921]) {count++}
      if (board[i -    1]) {count++}
      if (board[i +    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i +   61]) {count++}
    }
    // cell is on bottom edge
    else if (i >= 1979 - 59) {
      if (board[i -   61]) {count++}
      if (board[i -   60]) {count++}
      if (board[i -   59]) {count++}
      if (board[i -    1]) {count++}
      if (board[i +    1]) {count++}
      if (board[i - 1921]) {count++}
      if (board[i - 1920]) {count++}
      if (board[i - 1919]) {count++}
    }
    // cell is on left edge
    else if (i % 60 === 0) {
      if (board[i -    1]) {count++}
      if (board[i -   60]) {count++}
      if (board[i -   59]) {count++}
      if (board[i +  119]) {count++}
      if (board[i +    1]) {count++}
      if (board[i +   59]) {count++}
      if (board[i +   60]) {count++}
      if (board[i +   61]) {count++}
    }
    // cell is on right edge
    else if (i % 60 === 59) {
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
                ? <Button onClick={this.handlePause} btnTxt="Pause"/>
                : <Button onClick={this.handleStart} btnTxt="Start"/>
            }
            <Button onClick={this.handleClear} btnTxt="Clear"/>
            <Button onClick={this.handleReset} btnTxt="Reset"/>
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
