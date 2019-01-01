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
    this.start();
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

  setNextGeneration = () => {
    if (!this.state.rAF) {
      return;
    }

    this.setState((prevState) => ({
      board: prevState.board.map((item, i) => {
        const neighbourCount = getNeighbourCount(prevState.board, i);
        if (neighbourCount === 2) {
          return item;
        }
        if (neighbourCount === 3) {
          return 1;
        }
        return 0;
      }),
      generation: prevState.generation + 1
    }));

    requestAnimationFrame(this.setNextGeneration);
  }

  start = () => {
    if (this.state.rAF) {
      return;
    }

    if (!this.state.board.includes(1)) {
      this.setBoard();
    }

    this.setState({
      rAF: requestAnimationFrame(this.setNextGeneration),
    });
  }

  pause = () => {
    cancelAnimationFrame(this.state.rAF);
    this.setState({
      rAF: null
    });
  }

  clear = () => {
    cancelAnimationFrame(this.state.rAF);
    this.setState({
      board: Array(1980).fill(0),
      generation: 0,
      rAF: null,
    });
  }

  reset = () => {
    this.pause();
    this.setBoard();
  }

  toggleCellState = (i) => {
    this.setState((prevState) => ({
      board: prevState.board.map((cell, cellIndex) => {
        if (cellIndex === i) {
          return cell ? 0 : 1;
        }
        return cell;
      })
    }));
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
                ? <Button onClick={this.pause} text="Pause"/>
                : <Button onClick={this.start} text={this.state.generation ? 'Resume' : 'Start'}/>
            }
            <Button onClick={this.clear} text="Clear"/>
            <Button onClick={this.reset} text="Reset"/>
          </div>

          <Board
            board={this.state.board}
            onCellClick={this.toggleCellState}
          />

          <footer className="footer">
            <p>Learn about Conway's Game of Life on <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia</a>.</p>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;


function getNeighbourCount(board, i) {
  const numCellsRow = 60;
  const numRows = board.length / numCellsRow;

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