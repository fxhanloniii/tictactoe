import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Gameplay.module.css";
import ClewLogo from "../assets/ClewLogo.svg";
import coolmintLogo from "../assets/coolmint.png";
import blueberryLogo from "../assets/blueberry.png";

export default function Gameplay() {
  const location = useLocation();
  const navigate = useNavigate();
  const opponentType = location.state?.opponentType || "PLAYER 2";

  const [board, setBoard] = useState(Array(9).fill(null)); // 3x3 grid
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isTie, setIsTie] = useState(false);

  // Function to check for a winner
  const checkWinner = useCallback((newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  }, []);

  // Minimax logic for AI
  const evaluateBoard = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a] === blueberryLogo ? 10 : -10; // 10 for computer win, -10 for player win
      }
    }

    if (newBoard.every((cell) => cell !== null)) {
      return 0; // Draw
    }

    return null; // Game still ongoing
  };

  const minimax = useCallback((newBoard, depth, isMaximizing) => {
    const score = evaluateBoard(newBoard);
  
    if (score !== null) {
      return score - depth;
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = blueberryLogo;
          const moveScore = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(bestScore, moveScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = coolmintLogo;
          const moveScore = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(bestScore, moveScore);
        }
      }
      return bestScore;
    }
  }, [evaluateBoard]);
  

  // Computer's move
  const makeComputerMove = useCallback(() => {
    const availableCells = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((val) => val !== null);

    if (availableCells.length === 0 || winner) return;

    let bestScore = -Infinity;
    let bestMove = null;

    for (let index of availableCells) {
      const newBoard = [...board];
      newBoard[index] = blueberryLogo;
      const moveScore = minimax(newBoard, 0, false);
      newBoard[index] = null;

      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = index;
      }
    }

    if (bestMove !== null) {
      const newBoard = [...board];
      newBoard[bestMove] = blueberryLogo;
      setBoard(newBoard);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner("Computer");
      } else if (newBoard.every((cell) => cell !== null)) {
        setIsTie(true);
      } else {
        setIsPlayerOneTurn(true);
      }
    }
  }, [board, winner, minimax]);

  // Handle player clicks
  const handleClick = (index) => {
    if (board[index] || winner || isTie) return;

    const newBoard = [...board];
    newBoard[index] = isPlayerOneTurn ? coolmintLogo : blueberryLogo;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner === coolmintLogo ? "Player 1" : opponentType === "COMPUTER" ? "Computer" : "Player 2");
    } else if (newBoard.every((cell) => cell !== null)) {
      setIsTie(true);
    } else {
      setIsPlayerOneTurn(!isPlayerOneTurn);
    }
  };

  // Trigger computer move
  useEffect(() => {
    if (!isPlayerOneTurn && opponentType === "COMPUTER" && !winner && !isTie) {
      const timeout = setTimeout(() => makeComputerMove(), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isPlayerOneTurn, opponentType, winner, isTie, makeComputerMove]);

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerOneTurn(true);
    setWinner(null);
    setIsTie(false);
    navigate("/");
  };

  return (
    <div className={styles.gameplayContainer}>
      <div className={styles.logoWrapper}>
        <img src={ClewLogo} alt="Clew Logo" className={styles.logo} />
      </div>
      {winner || isTie ? (
  <div className={styles.overlay}>
    {/* Overlay Content */}
    <div className={styles.overlayContent}>
      {/* Player Labels */}
            {isTie ? (
            <div className={styles.tieLabelWrapper}>
                <div className={styles.labelContainer}>
                <div className={styles.label}>PLAYER 1</div>
                </div>
                <div className={styles.labelContainer}>
                <div className={styles.label}>
                    {opponentType === "COMPUTER" ? "COMPUTER" : "PLAYER 2"}
                </div>
                </div>
            </div>
            ) : (
            <div className={styles.labelContainer}>
                <div className={styles.label}>
                {winner === "Computer" ? "COMPUTER" : winner.toUpperCase()}
                </div>
            </div>
            )}

            {/* Main Winner/Tie Message */}
            <div
            className={`${styles.winnerMessage} ${
                isTie ? styles.tieMessage : styles.winMessage
            }`}
            >
            {isTie ? "IT'S A TIE!" : "WINNER!"}
            </div>
        </div>

     {/* New Game Button */}
     <div className={styles.newGameButtonContainer}>
          <button onClick={resetGame} className={styles.newGameButton}>
            <span className={styles.newGameButtonText}>NEW GAME</span>
          </button>
        </div>
      </div>
    ) : (
      // Turn Message for Active Game
      <div className={styles.turnMessage}>
        {isPlayerOneTurn
          ? "PLAYER 1'S TURN"
          : opponentType === "COMPUTER"
          ? "COMPUTER'S TURN"
          : "PLAYER 2'S TURN"}
      </div>
    )}



      <div className={styles.grid}>
        {board.map((cell, index) => (
          <div
            key={index}
            className={styles.cell}
            onClick={() =>
              !winner &&
              !isTie &&
              (isPlayerOneTurn || opponentType !== "COMPUTER") &&
              handleClick(index)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.cellBackground}
              viewBox="0 0 304 304"
              preserveAspectRatio="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 59.2452C2 53.8581 4.1732 48.6988 8.02762 44.9353L46.1724 7.69012C49.9085 4.04216 54.9231 2 60.1448 2L282 2C293.046 2 302 10.9543 302 22V243.507C302 248.795 299.906 253.868 296.175 257.616L257.864 296.109C254.11 299.88 249.009 302 243.688 302H22C10.9543 302 2 293.046 2 282V59.2452Z"
                fill="url(#paint0_linear)"
                stroke="#363D4D"
                strokeWidth="4"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="152"
                  y1="2"
                  x2="152"
                  y2="302"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#2A3444" />
                  <stop offset="1" stopColor="#191F26" />
                </linearGradient>
              </defs>
            </svg>
            {cell && <img src={cell} alt="Player Icon" className={styles.cellIcon} />}
          </div>
        ))}
      </div>
    </div>
  );
}

