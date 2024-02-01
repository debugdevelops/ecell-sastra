import React, { useEffect, useContext } from "react";
import styles from "./Teams.module.css";
import { Switch, Route, Link } from "react-router-dom";
import Team from "./Team";
import { TeamContext } from "../context/TeamContext";
import Loading from "../Loading/Loading";

export default function Teams() {
  const [teams, setTeams] = useContext(TeamContext);

  useEffect(() => {
    if (teams.length === 0) {
      fetch(process.env.REACT_APP_BACKEND + "/teams")
        .then((res) => res.json())
        .then((data) => {
          if (!data.statusCode) {
            data[0]["team"].sort((a, b) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            );
            setTeams(data[0]);
          }
        });
    }
  }, []);

  return teams.length === 0 ? (
    <Loading />
  ) : (
    <Switch>
      <Route
        exact
        path="/teams/:team"
        render={(props) => <Team {...props} teams={teams} />}
      />
      <Route exact path="/teams">
        <div className={styles["landing-page"]}>
          <h2>TEAMS</h2>
        </div>
        <div className={styles.main}>
          <div className={styles.chairman}>
            <img src={teams.chairPerson.image} alt="Chairman" />
            <div>
              <h2>{teams.chairPerson.name}</h2>
              <p>Chairman</p>
            </div>
          </div>
          <div className={styles.chairman}>
            <img src={teams.viceChairPerson.image} alt="Vice Chairman" />
            <div>
              <h2>{teams.viceChairPerson.name}</h2>
              <p>Vice - Chairman</p>
            </div>
          </div>
          {/* <div className={styles.chairman}>
            <img src={teams.treasurer.image} alt="Treasurer" />
            <div>
              <h2>{teams.treasurer.name}</h2>
              <p>Treasurer</p>
            </div>
          </div> */}
          {/* <div className={styles.coordinators}>
            <h2>Student Coordinators</h2>
            <div>
              {teams.coordinator.map((coordinator, i) => (
                <div className={styles.coordinator} key={i}>
                  <img src={coordinator.image} alt="coordinator" />
                  <p>{coordinator.name}</p>
                </div>
              ))}
            </div>
          </div> */}
          <div className={styles.coordinators}>
            <div>
              {teams.treasurer.map((treasurer, i) => (
                <div className={styles.coordinator} key={i}>
                  <img src={treasurer.image} alt="treasurer" />
                  <h2>{treasurer.name}</h2>
                  <p>Treasurer</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles["teams-heading"]}>
            <h2>THE TEAMS</h2>
          </div>
          <div className={styles.teams}>
            {teams.team.map((team, i) => (
              <Link
                to={`/teams/${i}`}
                style={{ textDecoration: "none" }}
                key={i}
              >
                <div className={styles.team}>
                  <p>{team.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Route>
    </Switch>
  );
}
