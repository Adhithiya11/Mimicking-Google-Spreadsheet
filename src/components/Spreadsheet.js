import React, { useState, useEffect } from "react";
import "../styles/spreadsheet.css";

const ROWS = 100;
const COLS = 26;

const getColumnLabel = (index) => String.fromCharCode(65 + index);

const parseCellReference = (ref) => {
  const match = ref.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  const col = match[1].charCodeAt(0) - 65;
  const row = parseInt(match[2], 10) - 1;
  return { row, col };
};

const evaluateFormula = (formula, data) => {
  if (!formula.startsWith("=")) return formula;
  const match = formula.match(/^=(SUM|AVERAGE|MAX|MIN|COUNT)\(([^)]+)\)$/i);
  if (!match) return "ERROR";
  const [, func, range] = match;
  const cells = range.split(",").map(parseCellReference).filter(Boolean);
  const values = cells.map(({ row, col }) => parseFloat(data[row]?.[col]) || 0);

  switch (func.toUpperCase()) {
    case "SUM": return values.reduce((acc, val) => acc + val, 0);
    case "AVERAGE": return values.length ? values.reduce((acc, val) => acc + val, 0) / values.length : 0;
    case "MAX": return Math.max(...values);
    case "MIN": return Math.min(...values);
    case "COUNT": return values.filter((v) => !isNaN(v)).length;
    default: return "ERROR";
  }
};

const Spreadsheet = () => {
  const [data, setData] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill("")));
  const [formulas, setFormulas] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [formatting, setFormatting] = useState({});
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (row, col, value) => {
    const newData = [...data];
    const newFormulas = { ...formulas };

    if (value.startsWith("=")) {
      newFormulas[`${row},${col}`] = value;
      newData[row][col] = evaluateFormula(value, data);
    } else {
      delete newFormulas[`${row},${col}`];
      newData[row][col] = value;
    }

    setData(newData);
    setFormulas(newFormulas);
  };

  useEffect(() => {
    const newData = [...data];
    Object.keys(formulas).forEach((key) => {
      const [row, col] = key.split(",").map(Number);
      newData[row][col] = evaluateFormula(formulas[key], data);
    });
    setData(newData);
  }, [data, formulas]);

  const applyStyle = (style) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    setFormatting({ ...formatting, [`${row},${col}`]: style });
  };

  const handleMouseDown = (row, col) => {
    setDragStart({ row, col, value: data[row][col] });
    setIsDragging(true);
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging && dragStart) {
      const newData = [...data];
      newData[row][col] = dragStart.value;
      setData(newData);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  return (
    <div className="spreadsheet-container" onMouseUp={handleMouseUp}>
      <table className="spreadsheet">
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: COLS }, (_, colIndex) => (
              <th key={colIndex}>{getColumnLabel(colIndex)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th>{rowIndex + 1}</th>
              {row.map((cell, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`} onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}>
                  <input
                    type="text"
                    value={formulas[`${rowIndex},${colIndex}`] || cell}
                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    style={formatting[`${rowIndex},${colIndex}`] || {}}
                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="toolbar">
        <button onClick={() => applyStyle({ fontWeight: "bold" })}>Bold</button>
        <button onClick={() => applyStyle({ fontStyle: "italic" })}>Italic</button>
        <button onClick={() => applyStyle({ fontSize: "20px" })}>Increase Font</button>
      </div>
    </div>
  );
};

export default Spreadsheet;
