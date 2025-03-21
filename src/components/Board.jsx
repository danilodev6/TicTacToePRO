import { useState } from "react";
import { Square } from "./Square";
import { players } from "../assets/utils/players.js";
import { Turns } from "../assets/utils/turns";
import { WinnerModal } from "./WinnerModal.jsx";
import { MouseFollower } from "./MouseFollower.jsx";
import { checkWinner } from "../assets/utils/checkWinner.js";

export const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [currentPlayer, setCurrentPlayer] = useState(players.player1);

  const [winner, setWinner] = useState(null);

  const [player1Pieces, setPlayer1Pieces] = useState([]);
  const [player2Pieces, setPlayer2Pieces] = useState([]);

  const isOldestPiece = (index) => {
    const currentPieces =
      currentPlayer === players.player1 ? player1Pieces : player2Pieces;
    return currentPieces.length === 3 && currentPieces[0] === index;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer(players.player1);
    setWinner(null);
    setPlayer1Pieces([]);
    setPlayer2Pieces([]);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const currentPieces =
      currentPlayer === players.player1 ? player1Pieces : player2Pieces;

    if (!board[index] && currentPieces.length < 3) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (currentPlayer === players.player1) {
        setPlayer1Pieces([...player1Pieces, index]);
      } else {
        setPlayer2Pieces([...player2Pieces, index]);
      }

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      }

      const newPlayer =
        currentPlayer === players.player1 ? players.player2 : players.player1;
      setCurrentPlayer(newPlayer);
    } else if (!board[index] && currentPieces.length === 3) {
      const newBoard = [...board];
      const oldPosition = currentPieces[0];

      newBoard[oldPosition] = null;
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (currentPlayer === players.player1) {
        setPlayer1Pieces([...player1Pieces.slice(1), index]);
      } else {
        setPlayer2Pieces([...player2Pieces.slice(1), index]);
      }

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      }

      const newPlayer =
        currentPlayer === players.player1 ? players.player2 : players.player1;
      setCurrentPlayer(newPlayer);
    }
  };

  return (
    <div className="game">
      <section className="board">
        {board.map((_, index) => {
          return (
            <Square
              isisOindex
              key={index}
              updateBoard={updateBoard}
              isSelected={isOldestPiece(index)}
              index={index}
            >
              {board[index]}
            </Square>
          );
        })}
        <MouseFollower />
      </section>
      <Turns currentPlayer={currentPlayer} />
      <button className="resetButton" onClick={resetGame} type="">
        Reset Game
      </button>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </div>
  );
};
