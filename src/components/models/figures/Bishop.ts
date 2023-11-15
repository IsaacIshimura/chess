import { Cell } from "../cell";
import { Colors } from "../colors";
import { Figure, FigureNames } from "./Figure";

import blacklogo from '../../../assets/black-bishop.png';
import whitelogo from '../../../assets/white-bishop.png';


export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blacklogo : whitelogo;
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell) : boolean{
        if(!super.canMove(target)){
            return false
        }
        if(this.cell.isEmptyDiagonal(target)){
            return true
        }
        return false
    }
    
}