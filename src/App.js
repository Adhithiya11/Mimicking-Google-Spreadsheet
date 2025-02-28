import React, { useState } from "react";
import Menubar from "./components/Menubar";
import Toolbar from "./components/Toolbar";
import FormulaBar from "./components/FormulaBar";
import Spreadsheet from "./components/Spreadsheet";

function App() {
  const [formatting, setFormatting] = useState({});
  const [cellValue, setCellValue] = useState("fx");
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });

  
  
  const applyFormatting = (style) => {
    if (selectedCell) {
      const key = `${selectedCell.row},${selectedCell.col}`;
      setFormatting((prev) => ({
        ...prev,
        [key]: {
          ...(prev[key] || {}),
          ...style,
        },
      }));
    }
  };
  
  

  return (
    <div>
      <Menubar />
      <Toolbar applyFormatting={applyFormatting} />
      <FormulaBar selectedCell={selectedCell} cellValue={cellValue} onFormulaChange={setCellValue} />

      <Spreadsheet
  selectedCell={selectedCell}
  setSelectedCell={setSelectedCell}
  formatting={formatting}
  setFormatting={setFormatting}
/>

    </div>
  );
}

export default App;
