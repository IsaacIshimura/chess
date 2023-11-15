import { Board } from './models/board';
import CellComponent from './CellComponent';
import React, { FC, useState, useEffect } from 'react';
import { Cell } from './models/cell';
import { Player } from './models/player';
import {King} from './models/figures/King'
import { Figure, FigureNames } from './models/figures/Figure';
import { Colors } from './models/colors';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)


    function click( cell: Cell) {
        

         if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        }
         
         else {
            if(cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell)
            }
            
         }
        
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells () {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard () {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }


    return (
        <div>
        <h3>Ход игрока: {currentPlayer?.color}</h3>
        <div className='board'>
            {board.cells.map((row, index) => 
            <React.Fragment key={index}>
                {row.map(cell => 
                    <CellComponent 
                    click={click}
                    cell={cell}
                    key={cell.id}
                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                    />
                    )}
            </React.Fragment>
            )}
        </div>
        </div>
        
    )
}

export default BoardComponent