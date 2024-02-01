import React, { useState, useEffect, useContext } from "react";
import styles from "./Events.module.css";
import EventCard from "./EventCard";
import Pagination from "react-bootstrap/Pagination";
import { EventContext } from "../context/EventContext";
import { useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Events(props) {
  const [events, setEvents] = useContext(EventContext);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();
  useEffect(() => {
    if (!events) {
      fetch(process.env.REACT_APP_BACKEND + "/events")
        .then((res) => res.json())
        .then((data) => {
          setEvents({
            data,
            noOfPages: ~~(data.length / 5) + !(data.length % 5 === 0),
          });
        });
    }
  }, [events, setEvents]);

  useEffect(() => {
    !location.hash && setTimeout(() => window.scrollTo(0, 0), 0);
  }, [currentPage]);

  const changePage = (i) => {
    location.hash = "";
    setCurrentPage(i);
  };

  return !events ? (
    <Loading />
  ) : (
    <>
      <style type="text/css">
        {`
          .page-item.active > .page-link{
            background-color: #393939;
            color: white;
            border-color: var(--black);
            box-shadow: none;
          }
          .page-item > .page-link{
            color: var(--black);
            box-shadow: none;
          }          
        `}
      </style>
      <div className={styles["landing-page"]}>
        <h2>EVENTS</h2>
      </div>
      {events.length !== 0 ? (
        <div className={styles.events}>
          {events.data
            .slice(currentPage * 5, (currentPage + 1) * 5)
            .map(({ image, name, description, link }, index) => {
              return (
                <div id={`${index}`}>
                  <EventCard
                    description={description}
                    name={name}
                    image={image}
                    link={link}
                    key={index}
                  />
                </div>
              );
            })}
          <Pagination size="lg">
            {[...Array(events.noOfPages)].map((e, i) => {
              return (
                <Pagination.Item
                  key={i}
                  active={i === currentPage}
                  onClick={() => {
                    changePage(i);
                  }}
                >
                  {i + 1}
                </Pagination.Item>
              );
            })}
          </Pagination>
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}
