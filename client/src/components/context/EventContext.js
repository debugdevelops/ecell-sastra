import React, { createContext, useState } from "react";

export const EventContext = createContext();
export const EventProvider = (props) => {
  const [events, setEvents] = useState(null);
  return (
    <EventContext.Provider value={[events, setEvents]}>
      {props.children}
    </EventContext.Provider>
  );
};
