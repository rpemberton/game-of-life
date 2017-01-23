import React, { Component } from 'react';
import ButtonGroup from './ButtonGroup'
import Board from './Board';
import './App.css';

//const totalCells = 1980;
//const rowLength = 60;

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameInPlay: false,
      board: [],
      generation: 0,
      interval: ''
    }
  }

  handleGenerationUpdate = () => {
    this.setState({
      generation: this.state.generation + 1
    })
  }

  setBoard = () => {
    let board = [];
    for (let i = 0; i < 1980; i++) {
      board.push(Math.random() > 0.8 ? 1 : 0);
    }

    this.setState({
      board: board,
      generation: 0,
      gameInPlay: true
    });
  }

  calculateNeighbours = (i) => {
    const board = this.state.board.slice(); 
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

  nextGeneration = () => {
    const board = this.state.board.map((item, i) => {
      const neighbours = this.calculateNeighbours(i);

      if (neighbours === 2) {return item}
      if (neighbours === 3) {return 1}
      return 0;
    });

    this.setState({
      board: board,
    })

    this.handleGenerationUpdate();
  }

  componentDidMount = () => {
    this.setBoard();
    const interval = setInterval(() => {
        this.nextGeneration();
    }, 100);
    this.setState({
      interval: interval
    })
  }

  handleStart = () => {
    if (!this.state.gameInPlay) {
      const interval = setInterval(() => {
          this.nextGeneration();
      }, 100);
      this.setState({
        interval: interval,
        gameInPlay: true
      })
    }
  }

  handlePause = () => {
    clearInterval(this.state.interval);
    this.setState({
      gameInPlay: false
    })
  }

  handleClear = () => {
    clearInterval(this.state.interval);
    this.setState({
      board: Array(1980).fill(0),
      generation: 0,
      gameInPlay: true
    })
  }

  handleReset = () => {
    clearInterval(this.state.interval);
    this.setBoard();
    this.setState({
      gameInPlay: false
    })
  }

  handleCellClick = (i) => {
    const board = this.state.board.slice();
    board[i] = 1;
    this.setState({
      board: board,
      gameInPlay: false
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <p>Generation: {this.state.generation}</p>
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