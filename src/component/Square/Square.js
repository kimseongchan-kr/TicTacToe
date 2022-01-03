import React from "react";
import "../../App.css";

const Square = ({ i, value, onClick }) => {
  return (
    <button className="square" onClick={() => onClick(i)}>
      {value}
    </button>
  );
};

export default React.memo(Square);
