import React ,{useState} from "react";
import { FaUndo, FaRedo, FaBold, FaItalic, FaUnderline, FaPrint } from "react-icons/fa";
import "../styles/toolbar.css";

const Toolbar = ({ applyFormatting }) => {
   const [cellValue, setCellValue] = useState("fx");
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });



  return (
    <div className="toolbar">
      <button><FaUndo /></button>
      <button><FaRedo /></button>
      <button><FaPrint /></button>
      <select>
        <option>100%</option>
        <option>75%</option>
        <option>50%</option>
      </select>
      <select>
        <option>Arial</option>
        <option>Times New Roman</option>
        <option>Courier New</option>
      </select>
      <select>
        <option>10</option>
        <option>12</option>
        <option>14</option>
      </select>
      <button onClick={() => applyFormatting({ fontWeight: "bold" })}><FaBold /></button>
      <button onClick={() => applyFormatting({ fontStyle: "italic" })}><FaItalic /></button>
      <button onClick={() => applyFormatting({ textDecoration: "underline" })}><FaUnderline /></button>
    </div>
  );
};

export default Toolbar;
