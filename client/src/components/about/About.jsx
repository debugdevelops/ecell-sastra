import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

import InputGroup from "react-bootstrap/InputGroup";
import mail from "../../assets/icons/mail.svg";
import message from "../../assets/icons/message.svg";
import name from "../../assets/icons/name.svg";
import phone from "../../assets/icons/phone.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./About.module.css";

export default function About() {
  const [contactName, setContactName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
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

  function validateNumber(email) {
    const re = /^[0-9]{10}$/;
    return re.test(email);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Please wait...");
    if (!(contactName && number && email && contactMessage)) {
      notifyError("Please fill in all fields");
      return;
    }
    if (!validateEmail(email)) {
      notifyError("Please enter a valid email address");
      return;
    }
    if (!validateNumber(number)) {
      notifyError("Please enter a valid phone number");
      return;
    }
    axios
      .post(process.env.REACT_APP_BACKEND + "/contacts", {
        name: contactName,
        message: contactMessage,
        email: email,
        number: number,
      })
      .then(
        () => {
          notifySuccess("🚀 Your response has been recorded!");
          setContactMessage("");
          setNumber("");
          setContactName("");
          setEmail("");
        },
        () => notifyError("💀 Oops, There was a server error")
      );
  };
  return (
    <>
      <div className={styles["landing-page"]}>
        <h2>ABOUT US</h2>
      </div>
      <div className={styles["info-para"]}>
        <p>
          E-Cell SASTRA is expanding and touching new heights and we are looking
          for people who will get us there. E-Cell SASTRA is coming up with the
          official E-Cell wesbite and we are looking for Web Developers and App
          Developers who would like to use their skills to conjure up a sleek
          website. For further details, contact:
        </p>
      </div>
      <div className={styles.form}>
        <h2>Get in touch</h2>
        <p>Let's talk about your ideas</p>
        <Form>
          <div className={styles["form-flex"]}>
            <InputGroup className={styles["input-group"]}>
              <InputGroup.Prepend>
                <InputGroup.Text className={styles["input-icon"]}>
                  <img src={name} height="20px" width="20px" alt="Name" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Name"
                className={styles["input"]}
                onChange={(e) => setContactName(e.target.value)}
                value={contactName}
              />
            </InputGroup>
            <InputGroup className={styles["input-group"]}>
              <InputGroup.Prepend>
                <InputGroup.Text className={styles["input-icon"]}>
                  <img src={mail} height="20px" width="20px" alt="Email" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Email"
                className={styles["input"]}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </InputGroup>
            <InputGroup className={styles["input-group"]}>
              <InputGroup.Prepend>
                <InputGroup.Text className={styles["input-icon"]}>
                  <img
                    src={phone}
                    height="20px"
                    width="20px"
                    alt="Mobile Number"
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                placeholder="Mobile Number"
                className={styles["input"]}
                onChange={(e) => setNumber(e.target.value)}
                value={number}
              />
            </InputGroup>
          </div>
          <InputGroup className={styles["input-group"]}>
            <InputGroup.Prepend>
              <InputGroup.Text className={styles["message-icon"]}>
                <img src={message} height="20px" width="20px" alt="Message" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as="textarea"
              rows="4"
              placeholder="Message"
              className={styles["text-area"]}
              onChange={(e) => setContactMessage(e.target.value)}
              value={contactMessage}
            />
          </InputGroup>
          <Button
            variant="dark"
            className={styles.button}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </>
  );
}
