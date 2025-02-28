import React, { useState } from "react";
import "../styles/formulaBar.css";

const FormulaBar = ({ selectedCell, cellValue, onFormulaChange }) => {
  const cellLabel = `${String.fromCharCode(65 + selectedCell.col)}${selectedCell.row + 1}`;

  return (
    <div className="formula-bar">
      <div className="cell-label">{cellLabel}</div>  {/* FIXED */}
      <input type="text" value={cellValue} onChange={(e) => onFormulaChange(e.target.value)} />
    </div>
  );
};

export default FormulaBar;
