import React, { Component } from 'react';
// import Board from './components/Board/Board';
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
    const canvas = this.refs.canvas;
    this.canvas = canvas;

    // Make canvas look good on retina displays
    canvas.width = 1440;
    canvas.height = 792;
    canvas.style.width = "720px";
    canvas.style.height = "396px";
    canvas.getContext('2d').scale(2,2);

    const board = [];

    for (let i = 0; i < this.numCellsBoard; i++) {
      const cell = Math.random() > 0.8 ? 1 : 0;
      board.push(cell);
    }

    this.setState({
      board: board,
      generation: 0
    }, this.drawGeneration);
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
    }), this.drawGeneration);

    requestAnimationFrame(this.setNextGeneration);
  }

  drawGeneration() {
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');

    this.state.board.forEach((cell, i) => {
      const x = Math.floor(i * 12) % 720;
      const y = Math.floor(i / 60) * 12;

      if (cell) {
        ctx.fillStyle = '#009cde';
        ctx.fillRect(x, y, 12, 12);
      } else {
        ctx.fillStyle = '#f7f7f7';
        ctx.fillRect(x, y, 12, 12);
      }
    });
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
      board: [],
      generation: 0,
      rAF: null,
    });
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
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

          <canvas
            ref="canvas"
            className="board"
            width="720"
            height="396">
          </canvas>

          <footer className="footer">
            <p>Learn about Conway&#39;s Game of Life on <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia</a>.</p>
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
  let prevRowIndex = (currRowIndex - 1 + numRows) % numRows;
  let nextRowIndex = (currRowIndex + 1 + numRows) % numRows;

  function getRow(rowIndex) {
    return board.slice(rowIndex * numCellsRow, (rowIndex * numCellsRow) + numCellsRow);
  }

  const prevRow = getRow(prevRowIndex);
  const currRow = getRow(currRowIndex);
  const nextRow = getRow(nextRowIndex);

  const isLeftSide = i % numCellsRow === 0;
  const isRightSide = i % numCellsRow === numCellsRow - 1;

  let leftIndex = (i % numCellsRow) - 1;
  let rightIndex = (i % numCellsRow) + 1; // (i + 1) % 60 + Math.floor(i - i % 60)

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