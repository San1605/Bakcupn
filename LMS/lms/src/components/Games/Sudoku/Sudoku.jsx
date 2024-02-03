import React, { useEffect } from 'react'
import { useState } from 'react';

const Sudoku = () => {

    function isSudokuValid(board) {
        console.log(board)
        for (let i = 0; i < 9; i++) {
            let rowSet = new Set();
            let colSet = new Set();
            let subgridSet = new Set();

            for (let j = 0; j < 9; j++) {
                if(board[i][j]==='0' || board[j][i]==='0')return false
                const rowVal = board[i][j];
                const colVal = board[j][i];
                const subgridVal = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)];
                if (rowVal !== '0' && rowSet.has(rowVal)) return false;
                if (colVal !== '0' && colSet.has(colVal)) return false;
                if (subgridVal !== '0' && subgridSet.has(subgridVal)) return false;
                rowSet.add(rowVal);
                colSet.add(colVal);
                subgridSet.add(subgridVal);
            }
        }
        return true;
    }

    const initialGrid = [
        ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
        ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
        ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
        ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
        ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
        ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
        ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
        ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
        ['3', '4', '5', '2', '8', '6', '1', '7', '9'],
    ];
    const initialArray = [
        ['5', '3', '0', '0', '7', '0', '0', '0', '0'],
        ['6', '0', '0', '1', '9', '5', '0', '0', '8'],
        ['0', '9', '8', '0', '0', '0', '0', '6', '0'],
        ['8', '0', '0', '0', '6', '0', '0', '0', '3'],
        ['4', '0', '0', '8', '0', '3', '0', '0', '1'],
        ['7', '0', '0', '0', '2', '0', '0', '0', '6'],
        ['0', '6', '0', '0', '0', '0', '2', '8', '0'],
        ['0', '0', '0', '4', '1', '9', '0', '0', '5'],
        ['0', '0', '0', '0', '8', '0', '0', '7', '9']
    ];



    const [grid, setGrid] = useState(initialArray);
    const handleInput = (e, row, col) => {
        const value = e.target.textContent;
        const inputValue = parseInt(value);

        if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 9) {
            const updatedGrid = [...grid];
            updatedGrid[row][col] = inputValue;
            setGrid(updatedGrid);
        } else {
            e.target.textContent = '';
        }
    }
    const shuffleArray = () => {
        const newArray = JSON.parse(JSON.stringify(grid));
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            console.log(j,"jjjjjjjjjjj")
        }
        console.log(newArray, "newarray")
        setGrid(newArray);
        console.log(grid, "grid")
    }
    return (
        <div>
            {
                grid.map((row, rowIndex) => (
                    <div key={rowIndex}
                        style={{
                            display: "flex",
                            flexDirection: "row"
                        }}>
                        {
                            row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    id={`id-${rowIndex}-${colIndex}`}
                                    style={{
                                        border: "1px solid black",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "30px",
                                        width: "30px",
                                        maxWidth: '30px',
                                        maxHeight: "30px",
                                        overflow: "hidden"
                                    }}
                                    contentEditable={cell === '0'}
                                    onInput={(e) => handleInput(e, rowIndex, colIndex)}
                                    dangerouslySetInnerHTML={{ __html: cell }}
                                ></div>
                            ))
                        }
                    </div>
                ))
            }
            <button onClick={shuffleArray}>shuffle Array</button>
            <button onClick={() => {
                if (isSudokuValid(grid)) {
                    alert('Sudoku is valid!');
                } else {
                    alert('Sudoku is not valid.');
                }
            }}>Submit</button>
        </div>
    )
}
export default Sudoku


// const messageElement = document.getElementById(`id-${row}-${col}`)
// if (validSudoku(updatedGrid)) {

//     setGrid(updatedGrid);
// }
// else {
//     messageElement.classList.add('highlighted-message');
//     setTimeout(() => {
//         messageElement.classList.remove('highlighted-message');
//     }, 500)
// }



 // const isValid = (grid, char, row, col) => {
    //     for (let i = 0; i < 9; i++) {
    //         if (grid[i][col] === char) {
    //             console.log("insdie first")
    //             return false;
    //         } else if (grid[row][i] === char) {
    //             console.log("insdie second")
    //             return false;
    //         } else if (grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === char) {
    //             console.log("insdie third")
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    // const isSudokuValid = (grid) => {
    //     for (let row = 0; row < 9; row++) {
    //         for (let col = 0; col < 9; col++) {
    //             const char = grid[row][col];
    //             if (char === 0 || !isValid(grid, char, row, col)) {
    //                 return false;
    //             }
    //         }
    //     }
    //     return true;
    // };