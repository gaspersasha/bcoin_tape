import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import {
  NotFoundPage,
  About,
  Game,
  History,
  Home,
} from '@pages';


export const Index = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/history">
          <History />
        </Route>

        <Route exact path="/game/:id" children={<Game />} /> 

        <Route path="*">
            <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  )
};

export default Index;