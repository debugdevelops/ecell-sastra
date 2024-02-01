import React from "react";
import ecell from "../../assets/icons/ecell.png";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <>
      <div className={styles.loading}>
        <div className={styles["black-box"]}>
          <img src={ecell} alt="ECell" />
        </div>
        <h2>
          Loading<span className={styles["dot-one"]}>.</span>
          <span className={styles["dot-two"]}>.</span>
          <span className={styles["dot-three"]}>.</span>
        </h2>
      </div>
    </>
  );
}
