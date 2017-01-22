import React, { Component } from 'react';
import ButtonGroup from './ButtonGroup'
import Board from './Board';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <ButtonGroup />
        <Board />
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