import React from "react";
import styles from "./Layout.module.css";
import logo from "../assets/ClewLogo.svg";
import backgroundVideo from "../assets/clewbackground.mp4";

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      {/* Background Video */}
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      

      {/* Content Overlay */}
      <div className={styles.contentOverlay}>{children}</div>
    </div>
  );
}
