import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/icons/ecell.png";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import cx from "classnames";

export default function Header() {
  let location = useLocation();
  let navUnderline = {};
  const routes = ["/home", "/teams", "/events", "/about"];
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={styles.navbar}
      variant="dark"
    >
      <Link to="/" className={styles.whitify}>
        <Navbar.Brand className={styles.brand}>
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top mr-3"
            alt="ecell logo"
          />
          ECELL SASTRA
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {routes.map((route) => {
            navUnderline[styles.underline] = location.pathname === route;
            navUnderline[styles["no-underline"]] = location.pathname !== route;
            return (
              <Nav.Link href="#" className={styles["nav-link"]}>
                <Link to={route} className={cx(styles.whitify, navUnderline)}>
                  {route.slice(1, 2).toUpperCase() + route.slice(2)}
                </Link>
              </Nav.Link>
            );
          })}
          <Nav.Link
            href="#"
            className={styles["nav-link"]}
            onClick={() => window.open("https://medium.com/@ecellsastrauniv")}
          >
            <Link
              className={cx(
                styles.whitify,
                styles["no-underline"],
                styles["external-link"]
              )}
            >
              Blog
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
