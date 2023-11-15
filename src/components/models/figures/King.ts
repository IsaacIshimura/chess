import { Colors } from "../colors";
import { Figure, FigureNames } from "./Figure";
import { Cell } from "../cell";

import blacklogo from '../../../assets/black-king.png';
import whitelogo from '../../../assets/white-king.png';


export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
        this.name = FigureNames.KING;
    }
    
    isKingUnderAttak(): boolean{
        // const {x, y} = this.cell
        // Проверяем каждую клетку на доске
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const cell = this.cell.board.getCell(i, j);

                // Если фигура на этой клетке может сделать ход на короля
                if (cell.figure && cell.figure.color !== this.color && cell.figure.canMove(this.cell)) {
                    return true; // Король находится под шахом
                }
            }
        }

        return false; // Король не находится под шахом
    }
    

    canMove(target: Cell) : boolean{
        if (!super.canMove(target)) {
            return false;
        }
        const dx = Math.abs(target.x - this.cell.x);
        const dy = Math.abs(target.y - this.cell.y);

        if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            return true;
        }

        if (dx === 1 && dy === 1) {
            return true;
        }

        return false;
    }
}