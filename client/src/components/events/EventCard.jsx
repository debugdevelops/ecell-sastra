import React, { useState } from "react";
import styles from "./EventCard.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventCard({ image, name, description, link }) {
  const GOOGLE_SPREADSHEET_APP =
    "https://script.google.com/macros/s/AKfycby099pJjonBBNqIuFUS-OCx-YTLsoh0GHEU4Jj7h5GW-lnT6Z9V/exec";

  const [show, setShow] = useState(false);
  const [formDetails, setFormDetails] = useState({
    eventName: name,
    name: "",
    number: "",
    email: "",
    college: "",
    location: "",
    year: "",
    dept: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    toast("Please Wait...");
    const { name, number, email, college, location, year, dept } = formDetails;
    if (!(name && number && email && college && location && year && dept)) {
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
    const formData = new FormData();
    for (let value in formDetails) {
      formData.append(value, formDetails[value]);
    }
    fetch(GOOGLE_SPREADSHEET_APP, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        notifySuccess("🚀 Registration successful!");
        handleClose();
        for (let field in formDetails) {
          if (field !== "eventName") {
            formDetails[field] = "";
          }
        }
      })
      .catch(() => notifyError("💀 Oops, There was a server error"));
  };

  return (
    <div className={styles["event-card"]}>
      <img src={image} className={styles["event-image"]} alt={name} />
      <div className={styles["card-body"]}>
        <h2 className={styles["event-title"]}>{name}</h2>
        <p className={styles["event-description"]}>{description}</p>
        {link ? (
          <Button variant="dark" className={styles.button} onClick={handleShow}>
            Register
          </Button>
        ) : null}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className={styles["form-flex"]}>
              <InputGroup className={styles["input-group"]}>
                <InputGroup.Prepend>
                  <InputGroup.Text className={styles["input-icon"]}>
                    Name :
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="Abdul Kalam"
                  className={styles["input"]}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, name: e.target.value })
                  }
                  value={formDetails.name}
                />
              </InputGroup>

              <InputGroup className={styles["input-group"]}>
                <InputGroup.Prepend>
                  <InputGroup.Text className={styles["input-icon"]}>
                    Number :
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="9876543210"
                  className={styles["input"]}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, number: e.target.value })
                  }
                  value={formDetails.number}
                />
              </InputGroup>

              <InputGroup className={styles["input-group"]}>
                <InputGroup.Prepend>
                  <InputGroup.Text className={styles["input-icon"]}>
                    Email :
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="ecellsastrauniv@gmail.com"
                  className={styles["input"]}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, email: e.target.value })
                  }
                  value={formDetails.email}
                />
              </InputGroup>

              <InputGroup className={styles["input-group"]}>
                <InputGroup.Prepend>
                  <InputGroup.Text className={styles["message-icon"]}>
                    College :
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="SASTRA, NIT-Trichy..."
                  className={styles["input"]}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, college: e.target.value })
                  }
                  value={formDetails.college}
                />
              </InputGroup>

              <InputGroup className={styles["input-group"]}>
                <InputGroup.Prepend>
                  <InputGroup.Text className={styles["input-icon"]}>
                    Location :
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="Thanjavur, Chennai"
                  className={styles["input"]}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, location: e.target.value })
                  }
                  value={formDetails.location}
                />
              </InputGroup>

              <InputGroup className={styles["input-group"]}>
                <InputGroup.Prepend>
                  <InputGroup.Text className={styles["input-icon"]}>
                    Year :
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="1, 2, 3..."
                  className={styles["input"]}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, year: e.target.value })
                  }
                  value={formDetails.year}
                />
              </InputGroup>

              <InputGroup className={styles["input-group"]}>
                <InputGroup.Prepend>
                  <InputGroup.Text className={styles["input-icon"]}>
                    Department :
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  placeholder="Computer Science, Mechanical, Chemical..."
                  className={styles["input"]}
                  onChange={(e) =>
                    setFormDetails({ ...formDetails, dept: e.target.value })
                  }
                  value={formDetails.dept}
                />
              </InputGroup>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}
