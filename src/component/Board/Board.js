import React from "react";
import Square from "../Square/Square";
import "../../App.css";

export default function Board({ squares, onClick }) {
  return (
    <div>
      <div className="board-row">
        <Square i={0} value={squares[0]} onClick={onClick} />
        <Square i={1} value={squares[1]} onClick={onClick} />
        <Square i={2} value={squares[2]} onClick={onClick} />
      </div>
      <div className="board-row">
        <Square i={3} value={squares[3]} onClick={onClick} />
        <Square i={4} value={squares[4]} onClick={onClick} />
        <Square i={5} value={squares[5]} onClick={onClick} />
      </div>
      <div className="board-row">
        <Square i={6} value={squares[6]} onClick={onClick} />
        <Square i={7} value={squares[7]} onClick={onClick} />
        <Square i={8} value={squares[8]} onClick={onClick} />
      </div>
    </div>
  );
}
