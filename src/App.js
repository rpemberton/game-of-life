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

    this.numCellsInRow = 60;
    this.numRows = 33;
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

    for (let i = 0; i < this.numRows; i++) {
      const row = [];
      for (let j = 0; j < this.numCellsInRow; j++) {
        row.push(Math.random() > 0.8 ? 1 : 0);
      }
      board.push(row);
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
      board: getUpdatedBoard(prevState.board),
      generation: prevState.generation + 1
    }), this.drawGeneration);

    requestAnimationFrame(this.setNextGeneration);
  }

  drawGeneration() {
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');

    this.state.board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const x = Math.floor(cellIndex * 12);
        const y = Math.floor(rowIndex * 12);

        if (cell) {
          ctx.fillStyle = '#009cde';
          ctx.fillRect(x, y, 12, 12);
        } else {
          ctx.fillStyle = '#f7f7f7';
          ctx.fillRect(x, y, 12, 12);
        }
      });
    });
  }

  start = () => {
    if (this.state.rAF) {
      return;
    }

    // Populate board if no cells alive
    if (!this.state.board.some(row => row.includes(1))) {
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
      board: Array(33).fill(Array(60).fill(0)),
      generation: 0,
      rAF: null,
    });
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  reset = () => {
    this.pause();
    this.setBoard();
  }

  toggleCellState = (e) => {
    e.persist();

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.x;
    const y = e.clientY - rect.y;

    const cellIndex = Math.floor(x / 12);
    const rowIndex = Math.floor(y / 12);

    this.setState({
      board: this.state.board.map((row, i) => {
        if (i === rowIndex) {
          return row.map((cell, j) => {
            if (j === cellIndex) {
              return cell ? 0 : 1;
            }
            return cell;
          })
        }
        return row;
      })
    }, this.drawGeneration);
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
            onClick={e => this.toggleCellState(e)}
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


function getUpdatedBoard(board) {
  return board.map((row, rowIndex) => {
    const prevRow = board[rowIndex - 1] || board[board.length - 1];
    const nextRow = board[rowIndex + 1] || board[0];

    return row.map((cell, cellIndex) => {
      let count = 0;

      let leftIndex = cellIndex - 1;
      let rightIndex = cellIndex + 1;

      if (leftIndex < 0) {
        leftIndex = row.length - 1;
      }

      if (rightIndex > row.length - 1) {
        rightIndex = 0;
      }

      // Count left (L) side
      if (prevRow[leftIndex]) {
        count++;
      }
      if (row[leftIndex]) {
        count++;
      }
      if (nextRow[leftIndex]) {
        count++;
      }

      // Count right (R) side
      if (prevRow[rightIndex]) {
        count++;
      }
      if (row[rightIndex]) {
        count++;
      }
      if (nextRow[rightIndex]) {
        count++;
      }

      // Count remaining top (T) and bottom (B)
      if (prevRow[cellIndex]) {
        count++;
      }
      if (nextRow[cellIndex]) {
        count++;
      }

      if (count === 2) {
        return cell;
      }
      if (count === 3) {
        return 1;
      }
      return 0;
    });
  });
}
