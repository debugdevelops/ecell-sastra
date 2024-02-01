import React from "react";
import { useParams } from "react-router-dom";

import styles from "./Team.module.css";

export default function Team(props) {
  const { team: teamNumber } = useParams();
  const team = props.teams && props.teams.team[teamNumber];

  return !team ? (
    "Loading"
  ) : (
    <>
      <div className={styles["landing-page"]}>
        <h2>{team.name.toUpperCase()}</h2>
        <p>{team.description}</p>
      </div>
      <div className={styles.main}>
        {team.head.map((head) => (
          <div className={styles.head}>
            <img src={head.image} alt="Chairman" />
            <div>
              <h2>{head.name}</h2>
              <p>Head</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.members}>
        {team.members.map((member, i) => (
          <div className={styles.member} key={i}>
            <img src={member.image} alt="member" />
            <h2>{member.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
