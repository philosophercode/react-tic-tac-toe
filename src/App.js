import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
}

function TicTacToe() {
  const TABLE_DEFAULT = [
    ['--', '--', '--'],
    ['--', '--', '--'],
    ['--', '--', '--']
  ];

  const [table, setTable] = useState(TABLE_DEFAULT);

  const [XO, setXO] = useState('X');

  const transposeArr = arr =>
    arr[0].map((_, colIdx) => arr.map(row => row[colIdx]));

  const diagonalArrLR = table =>
    table.reduce((diagonal, row, rowIdx) => [...diagonal, row[rowIdx]], []);

  const diagonalArrRL = table =>
    table.reduceRight(
      (diagonal, row, rowIdx, tableArr) => [
        ...diagonal,
        row[tableArr.length - rowIdx - 1]
      ],
      []
    );

  const diagonalArr = (table, right = false) =>
    table[right ? 'reduceRight' : 'reduce'](
      (diagonal, row, rowIdx, tableArr) => [
        ...diagonal,
        row[right ? tableArr.length - rowIdx - 1 : rowIdx]
      ],
      []
    );
  const allEqual = (arr, xo) => arr.every(v => v === xo);
  const allEqualO = arr => arr.every(v => v === 'O');
  const allEqualX = arr => arr.every(v => v === 'X');

  const winDetector = table => {
    const tableFlipped = transposeArr(table);
    const tableDiagonalLR = diagonalArr(table);
    const tableDiagonalRL = diagonalArr(table, true);
    console.table(tableDiagonalLR);
    console.table(tableDiagonalRL);
    if (allEqualO(tableDiagonalLR)) alert('O wins');
    if (allEqualO(tableDiagonalRL)) alert('O wins');
    if (allEqualX(tableDiagonalLR)) alert('X wins');
    if (allEqualX(tableDiagonalRL)) alert('X wins');

    if (table.map(allEqualO).some(x => x === true)) alert('O wins');
    if (tableFlipped.map(allEqualO).some(x => x === true)) alert('O wins');
    if (table.map(allEqualX).some(x => x === true)) alert('X wins');
    if (tableFlipped.map(allEqualX).some(x => x === true)) alert('X wins');
  };

  useEffect(() => {
    winDetector(table);
  }, [winDetector, table]);

  const handleClick = (row, col) => {
    let newTable = table;
    newTable[row][col] = XO;
    setTable([...newTable]);
    setXO(currXO => (currXO === 'X' ? 'O' : 'X'));
  };

  const handleReset = () => setTable(TABLE_DEFAULT);

  const ColCell = ({ row, col, value }) => (
    <span
      className="col"
      id={value}
      onClick={value === '--' ? () => handleClick(row, col) : null}
    >
      {value}
    </span>
  );

  return (
    <>
      <h2>Current User: {XO}</h2>
      <div className="container">
        {table.map((row, rowIdx) => (
          <div className="row" key={rowIdx}>
            {row.map((xoValue, colIndex) => (
              <ColCell
                key={colIndex}
                row={rowIdx}
                col={colIndex}
                value={xoValue}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
