import React, { useEffect, useState } from 'react';
import './App.css'
import BoardComponent from './components/BoardComponent';
import { Board } from './components/models/board';
import { Player } from './components/models/player';
import { Colors } from './components/models/colors';
import LostFigures from './components/lostFigures';
import Timer from './components/Timer';

const App = () => {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Colors | null>(null);

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer);
  }, [])

  function restart() {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer);
    setGameOver(false);
    setWinner(null);
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  function handleCheckmate(color: Colors) {
    setGameOver(true);
    setWinner(color === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
  }

  return (
    <div className="app">
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}

      />
      
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      
      <div>
        <LostFigures
          title="Черные фигуры"
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title="Белые фигуры"
          figures={board.lostWhiteFigures}
        />
      </div>
      
    </div>
  );
};

export default App;