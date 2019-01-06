import React, { Component } from 'react';
import Button from './components/Button';
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
    this.cellWidthPx = 12;

    this.canvas = React.createRef();
    this.ctx = null;
  }

  componentDidMount() {
    // Make canvas look good on retina displays
    this.canvas.current.width = 1440;
    this.canvas.current.height = 792;
    this.canvas.current.style.width = '720px';
    this.canvas.current.style.height = '396px';

    const ctx = this.canvas.current.getContext('2d');
    ctx.scale(2,2);
    this.ctx = ctx;

    this.setBoard();
    this.start();
  }

  setBoard() {
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
    const canvas = this.canvas.current;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.state.board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          const x = Math.floor(cellIndex * this.cellWidthPx);
          const y = Math.floor(rowIndex * this.cellWidthPx);
          ctx.fillStyle = '#009cde';
          ctx.fillRect(x, y, this.cellWidthPx, this.cellWidthPx);
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
      board: Array(this.numRows).fill(Array(this.numCellsInRow).fill(0)),
      generation: 0,
      rAF: null,
    }, this.drawGeneration);
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

    const cellIndex = Math.floor(x / this.cellWidthPx);
    const rowIndex = Math.floor(y / this.cellWidthPx);

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
            ref={this.canvas}
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
