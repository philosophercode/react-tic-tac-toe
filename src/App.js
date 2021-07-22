import React, { useState, useEffect } from "react";
import "./style.css";

export default function App() {
  return (
    <div>
      <TicTacToe />
    </div>
  );
}

function TicTacToe() {
  const xoCell = (row = null, col = null) => ({
    value: "",
    col,
    row,
  });

  const arrayOfN = (n) => [...Array(n).keys()];

  const TABLE_DEFAULT = arrayOfN(3).map((row) => [
    ...arrayOfN(3).map((col) => xoCell(row, col)),
  ]);

  // const TABLE_DEFAULT = [
  //   [{}, {}, {}],
  //   [{}, {}, {}],
  //   [{}, {}, {}],
  // ];

  const [table, setTable] = useState(TABLE_DEFAULT);
  const [XO, setXO] = useState("X");
  const [winArr, setWinArr] = useState([]);

  const transposeArr = (arr) =>
    arr[0].map((_, colIdx) => arr.map((row) => row[colIdx]));

  const diagonalArr = (table) => {
    const diagonalRL = table.reduceRight(
      (diagonal, row, rowIdx, tableArr) => [
        ...diagonal,
        row[tableArr.length - rowIdx - 1],
      ],
      [],
    );

    const diagonalLR = table.reduce(
      (diagonal, row, rowIdx) => [...diagonal, row[rowIdx]],
      [],
    );

    return [diagonalRL, diagonalLR];
  };

  const winArrEval = (arr) => {
    const { value } = arr[0];
    const xoArr = ["X", "O"];
    const [xWin, oWin] = xoArr.map((xo) =>
      arr.every(({ value }) => value === xo),
    );

    if (xWin || oWin) {
      console.log(`${value} Wins!`);
      return arr;
    }
    return false;
  };

  const tableToArray = (table) => {
    const tableFlipped = transposeArr(table);
    const [diagonalLR, diagonalRL] = diagonalArr(table);
    let allArrays = [...table, ...tableFlipped, diagonalLR, diagonalRL];
    return allArrays.map(winArrEval).filter(Boolean).flat();
  };

  const handleClick = (row, col) => {
    const newTable = table;
    newTable[row][col].value = XO;
    const winArray = tableToArray(newTable);
    setWinArr([...winArray]);
    setTable([...newTable]);
    setXO((currXO) => (currXO === "X" ? "O" : "X"));
  };

  const handleReset = () => {
    setTable(TABLE_DEFAULT);
    setWinArr([]);
  };

  const classNamer = (celRow, cellCol) => {
    const win = winArr.some(
      ({ row, col }) => row === celRow && col === cellCol,
    );
    if (win) {
      return "col win";
    }
    return "col";
  };

  const ColCell = ({ row, col, value }) => (
    <span
      className={classNamer(row, col)}
      id={value}
      onClick={!value ? () => handleClick(row, col) : null}
    >
      {value}
    </span>
  );

  return (
    <>
      <div className="header">
        <h1>Tic Tac Toe</h1>
        <h2>
          Current User: <span id={XO}>{XO}</span>
        </h2>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="container">
        {table.map((row, rowIdx) => (
          <div className="row" key={rowIdx}>
            {row.map(({ value }, colIdx) => (
              <ColCell key={colIdx} row={rowIdx} col={colIdx} value={value} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
