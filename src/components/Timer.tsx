import React, { FC, useEffect, useRef, useState } from "react";
import { Player } from "./models/player";
import { Colors } from "./models/colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
  }
  
  const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(20);
    const [whiteTime, setWhiteTime] = useState(20);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<Colors | null>(null);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    
    
    useEffect(() => {
      startTimer()
    }, [currentPlayer])

    useEffect(() => {
        if (blackTime === 0) {
          handleCheckmate(Colors.BLACK);
          
        }
        if (whiteTime === 0) {
          handleCheckmate(Colors.WHITE);
        }
      }, [blackTime, whiteTime, handleCheckmate]);
  
    function startTimer() {
      if (timer.current) {
        clearInterval(timer.current)
      }
      const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
      timer.current = setInterval(callback, 1000)
    }
  
    function decrementBlackTimer() {
        setBlackTime((prev) => {
          if (prev <= 1) {
            handleCheckmate(Colors.BLACK);
            return 0;
          }
          return prev - 1;
        });
      }
    
      function decrementWhiteTimer() {
        setWhiteTime((prev) => {
          if (prev <= 1) {
            handleCheckmate(Colors.WHITE);
            return 0;
          }
          return prev - 1;
        });
      }
  
    const handleRestart = () => {
      setGameOver(false);
      setWinner(null);
      setWhiteTime(20)
      setBlackTime(20)
      restart()
    }
    function handleCheckmate(color: Colors) {
        setGameOver(true);
        setWinner(color === Colors.WHITE ? Colors.BLACK : Colors.WHITE);
        if (timer.current !== null) {
          clearInterval(timer.current);
        }
      }
  
    return (
      <div>
        <div>
          <button onClick={handleRestart}>Restart game</button>
        </div>
        <h2>Черные - {blackTime}</h2>
        <h2>Белые - {whiteTime}</h2>
        {gameOver && 
            <>
                <h3>Игра окончена.</h3>
                <h3>Победитель: {winner === Colors.WHITE ? 'Белые' : 'Чёрные'}</h3>
            </>   
             }
      </div>
    );
  };
  
  export default Timer;