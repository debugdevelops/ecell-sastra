import React, { useContext, useEffect } from "react";
import styles from "./Home.module.css";
import logo from "../../assets/icons/ecell.png";
import { EventContext } from "../context/EventContext";
import Carousel from "./Carousel";
import { HashLink } from "react-router-hash-link";
import Typist from "react-typist";
import downArrow from "../../assets/icons/down-arrow.svg";

export default function Home() {
  const [events, setEvents] = useContext(EventContext);

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

  return (
    <>
      <div className={styles["landing-page"]}>
        <img src={logo} className={styles.logo} alt="ecell" />
        <h1>
          <span className={styles.envision}>Envision</span>
          <span className={styles.execute}>Execute</span>
          <span className={styles.expand}>Expand</span>
        </h1>
        <h2>
          <Typist
            cursor={{
              show: false,
            }}
            className={styles.typist}
            avgTypingDelay={100}
            stdTypingDelay={0}
          >
            <Typist.Delay ms={6000} />
            Envision, Execute, Expand.
          </Typist>
        </h2>
        <div>
          <HashLink to="#know-more">
            <div variant="outline-light" className={styles.down}>
              <img src={downArrow} alt="down arrow" width="25px" />
            </div>
          </HashLink>
        </div>
      </div>

      <div className={styles["info-para"]} id="know-more">
        <p>
          We at Entrepreneurship Cell, SASTRA firmly believe that
          entrepreneurship is the key to a powerful economy and a nation's
          development.We are passionate about building sustainable and
          successful ventures. We serve as a learning and support platform for
          all those potential entrepreneurs out there!
        </p>
      </div>

      <div className={styles["recent-events"]}>
        <h2>Recent Events</h2>
        {!events ? (
          "Loading"
        ) : (
          <div className={styles["event-cards"]}>
            {[1, 2, 3, 4, 5].map((_, i) => {
              return (
                <div
                  className={styles["event-card"]}
                  key={events.data[i].heading}
                >
                  <img
                    src={events.data[i].image}
                    alt={events.data[i].heading}
                  />
                  <h2>{events.data[i].name}</h2>
                  <p>
                    {events.data[i].description.split(" ").length < 20
                      ? events.data[i].description
                      : events.data[i].description
                          .split(" ")
                          .slice(0, 30)
                          .join(" ") + "..."}
                    <HashLink to={"/events#" + i}>(know more)</HashLink>
                  </p>
                </div>
              );
            })}
            <div className={styles["space-maker"]} />
          </div>
        )}
      </div>
      <div className={styles.quote}>
        <h2>Innovation distinguishes between a leader and follower.</h2>
        <p>-Steve Jobs</p>
      </div>

      <div className={styles["info-para"]}>
        <p>
          Our predecessors had pioneered, paved and pursued the path of
          entrepreneurial excellence. Their experience could fill up volumes;
          their experience could inspire brains and trigger ideas. This event is
          to rekindle the camaraderie between alumni and current members, just
          to listen to their experience and learn wonderful things.
        </p>
      </div>

      <Carousel />
    </>
  );
}
