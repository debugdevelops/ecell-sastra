import React, { useState } from "react";
import styles from "./Footer.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instagram from "../../assets/icons/instagram.svg";
import linkedin from "../../assets/icons/linkedin.svg";
import twitter from "../../assets/icons/twitter.svg";
import heart from "../../assets/icons/heart.svg";
import facebook from "../../assets/icons/facebook.svg";
import github from "../../assets/icons/github.png";

export default function Footer() {
  const GOOGLE_SPREADSHEET_APP =
    "https://script.google.com/macros/s/AKfycbxyG0JttUC8SqS0r7VPixqMvl2n9J-PMdLYx7ZzfiG0wY4LRws/exec";
  const [email, setEmail] = useState("");

  const notifyError = (toastMessage) =>
    toast.error("🤦‍♀️" + toastMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      progress: undefined,
    });
  const notifySuccess = (toastMessage) =>
    toast.success(toastMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      progress: undefined,
    });

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Please Wait...");
    if (!email) {
      notifyError("Please provide your email address");
      return;
    }
    if (!validateEmail(email)) {
      notifyError("Please enter a valid email address");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    fetch(GOOGLE_SPREADSHEET_APP, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        notifySuccess(
          "🚀 Your have successfully subscribed to our awesome content"
        );
        setEmail("");
      })
      .catch(() => notifyError("💀 Oops, There was a server error"));
  };

  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.address}>
          <h2>ENTREPRENEURSHIP CELL SASTRA</h2>
          <p>
            SASTRA Deemed to be University
            <br />
            Thirumalaisamudram,
            <br />
            Thanjavur, Tamil Nadu
          </p>
          <div className={styles.social}>
            <img
              src={instagram}
              alt="Instagram"
              width="25px"
              onClick={() => window.open("https://instagram.com/ecell_sastra")}
              style={{ cursor: "pointer" }}
            />
            <img
              src={linkedin}
              alt="Linkedin"
              width="25px"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/ecell-sastra-36421118a"
                )
              }
              style={{ cursor: "pointer" }}
            />
            <img
              src={twitter}
              alt="Twitter"
              width="25px"
              onClick={() => window.open("https://twitter.com/ecell_sastra")}
              style={{ cursor: "pointer" }}
            />
            <img
              src={facebook}
              alt="Facebook"
              width="25px"
              onClick={() => window.open("https://www.facebook.com/ecellsas/")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className={styles.links}>
          <Link to="/home" className={styles.link}>
            Home
          </Link>
          <Link to="/teams" className={styles.link}>
            Teams
          </Link>
          <Link to="/events" className={styles.link}>
            Events
          </Link>
          <Link to="/about" className={styles.link}>
            About
          </Link>
          <Link
            className={styles.link}
            onClick={() => window.open("https://medium.com/@ecellsastrauniv")}
          >
            Blog
          </Link>
        </div>
        <div className={styles.contact}>
          <p>Subscribe</p>
          <form>
            <div className={styles.email}>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email ID</label>
            </div>
            <Button variant="outline-secondary" onClick={handleSubmit}>
              <span className={styles.button}>Submit</span>
            </Button>
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        <h2>
          Developed with <img src={heart} alt="heart" width="20px" /> by
        </h2>
        <div className={styles.developers}>
          <div className={styles.developer}>
            <p>Deepakh Srinivasan</p>
            <div className={styles["developer-contact"]}>
              <img
                src={github}
                alt="github"
                width="20px"
                onClick={() =>
                  window.open("https://github.com/deepakhsrinivasan")
                }
                style={{ cursor: "pointer" }}
              />
              <img
                src={linkedin}
                alt="Linkedin"
                width="20px"
                onClick={() =>
                  window.open("https://www.linkedin.com/in/srinivasan-deepakh/")
                }
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
