import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import {
  Header,
  Footer,
  Home,
  Events,
  About,
  Teams,
  EventProvider,
  TeamProvider,
} from "./components";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <EventProvider>
      <TeamProvider>
        <Router>
          <Route path={["/home", "/about", "/teams"]} component={ScrollToTop} />
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/events" component={Events} />
            <Route path="/teams" component={Teams} />
          </Switch>
          <Footer />
        </Router>
      </TeamProvider>
    </EventProvider>
  );
}

export default App;
