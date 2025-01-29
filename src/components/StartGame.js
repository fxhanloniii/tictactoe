import React, { useState } from "react";
import styles from "./StartGame.module.css";
import TicText from "../assets/TIC.svg";
import TacText from "../assets/TAC.svg";
import ToeText from "../assets/TOE.svg";
import ClewLogo from "../assets/ClewLogo.svg";
import coolmintLogo from "../assets/coolmint.png";
import blueberryLogo from "../assets/blueberry.png";
import { useNavigate } from "react-router-dom";

export default function StartGame({ onStartGame }) {
  const [opponent, setOpponent] = useState("COMPUTER");
  const navigate = useNavigate();
  

  const toggleOpponent = () => {
    setOpponent(opponent === "PLAYER 2" ? "COMPUTER" : "PLAYER 2");
  };

  const startGame = () => {
    navigate("/gameplay", { state: { opponentType: opponent } });
  };

  return (
    <div className={styles.startGameContainer}>
      {/* Clew Logo */}
      <div className={styles.logoWrapper}>
        <img src={ClewLogo} alt="Clew Logo" className={styles.logo} />
      </div>

      {/* Game Title */}
      <div className={styles.titleContainer}>
        <img src={TicText} alt="TIC" className={styles.ticSvg} />
        <img src={TacText} alt="TAC" className={styles.tacSvg} />
        <img src={ToeText} alt="TOE" className={styles.toeSvg} />
      </div>

      {/* Player Selection */}
      <div className={styles.playersWrapper}>
        {/* Player 1 */}
        <div className={styles.playerContainer}>
            <div className={styles.playerCard}>
            {/* SVG Background */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.playerCardBackground}
                viewBox="0 0 407 405"
                preserveAspectRatio="none"
            >
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.50153 75.5678C2.50153 70.1644 4.68788 64.9909 8.56284 61.2251L63.6833 7.6573C67.4163 4.02948 72.4166 2 77.622 2L384.52 2C395.566 2 404.52 10.9543 404.52 22V326.844C404.52 332.148 402.413 337.235 398.662 340.986L343.375 396.273C339.624 400.024 334.537 402.131 329.233 402.131H22.5015C11.4558 402.131 2.50153 393.177 2.50153 382.131V75.5678Z"
                fill="url(#gradient1)"
                stroke="#363D4D"
                strokeWidth="4"
                />
                <defs>
                <linearGradient
                    id="gradient1"
                    x1="203.511"
                    y1="2"
                    x2="203.511"
                    y2="402.131"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#2A3444" />
                    <stop offset="1" stopColor="#191F26" />
                </linearGradient>
                </defs>
            </svg>

            {/* Player Logo */}
            <div className={styles.playerLogoContainer}>
                <img
                src={coolmintLogo}
                alt="Cool Mint Logo"
                className={styles.playerLogo}
                />
            </div>
            <div className={styles.decorativeContainer}>
    {/* Line SVG */}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.decorativeLine}
        viewBox="0 0 270 270"
        preserveAspectRatio="none"
    >
        <path
            d="M268.659 0.807617V191.231C268.659 196.408 266.652 201.383 263.059 205.11L207.555 262.699C203.786 266.61 198.587 268.82 193.155 268.82H0.646851"
            stroke="white"
            strokeWidth="2"
            fill="none"
        />
    </svg>

    {/* Circle SVG */}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.decorativeCircle}
        viewBox="0 0 26 26"
        preserveAspectRatio="none"
    >
        <circle
            cx="13.1873"
            cy="13.0113"
            r="11.2682"
            stroke="white"
            strokeWidth="2"
            fill="none"
        />
    </svg>
</div>

            {/* Player Label */}
            <div className={styles.playerLabel}>
                <text className={styles.playerText}>PLAYER 1</text>
                </div>
            </div>
        </div>

        {/* Player 2 */}
        <div className={styles.playerContainer}>
            <div className={styles.playerCard}>
            {/* SVG Background */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.playerCardBackground}
                viewBox="0 0 407 405"
                preserveAspectRatio="none"
            >
                <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.50153 75.5678C2.50153 70.1644 4.68788 64.9909 8.56284 61.2251L63.6833 7.6573C67.4163 4.02948 72.4166 2 77.622 2L384.52 2C395.566 2 404.52 10.9543 404.52 22V326.844C404.52 332.148 402.413 337.235 398.662 340.986L343.375 396.273C339.624 400.024 334.537 402.131 329.233 402.131H22.5015C11.4558 402.131 2.50153 393.177 2.50153 382.131V75.5678Z"
                fill="url(#gradient2)"
                stroke="#363D4D"
                strokeWidth="4"
                />
                <defs>
                <linearGradient
                    id="gradient2"
                    x1="203.511"
                    y1="2"
                    x2="203.511"
                    y2="402.131"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#2A3444" />
                    <stop offset="1" stopColor="#191F26" />
                </linearGradient>
                </defs>
            </svg>

            {/* Player Logo */}
            <div className={styles.playerLogoContainer}>
                <img
                src={blueberryLogo}
                alt="Blueberry Logo"
                className={styles.playerLogo}
                />
            </div>

            <div className={styles.decorativeContainer}>
    {/* Line SVG */}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.decorativeLine}
        viewBox="0 0 270 270"
        preserveAspectRatio="none"
    >
        <path
            d="M268.659 0.807617V191.231C268.659 196.408 266.652 201.383 263.059 205.11L207.555 262.699C203.786 266.61 198.587 268.82 193.155 268.82H0.646851"
            stroke="white"
            strokeWidth="2"
            fill="none"
        />
    </svg>

    {/* Circle SVG */}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles.decorativeCircle}
        viewBox="0 0 26 26"
        preserveAspectRatio="none"
    >
        <circle
            cx="13.1873"
            cy="13.0113"
            r="11.2682"
            stroke="white"
            strokeWidth="2"
            fill="none"
        />
    </svg>
</div>


            {/* Player Label */}
            <div className={`${styles.playerLabel} ${styles.pulse}`} onClick={toggleOpponent}>
                <span className={styles.playerText}>{opponent}</span>
                </div>
            </div>
        </div>
        </div>



      {/* Start Game Button */}
      <button className={styles.startButton} onClick={startGame}>
        <text className={styles.startText}>START GAME</text>
      </button>
    </div>
  );
}
