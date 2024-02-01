import React, { createContext, useState } from "react";

export const TeamContext = createContext([]);

export const TeamProvider = (props) => {
  const [teams, setTeams] = useState([]);
  return (
    <TeamContext.Provider value={[teams, setTeams]}>
      {props.children}
    </TeamContext.Provider>
  );
};
