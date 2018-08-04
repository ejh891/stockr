import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Search from './pages/Search';
import Symbol from './pages/Symbol';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Search} />
        <Route path="/symbol/:symbol" component={Symbol} />
      </Switch>
    </BrowserRouter>
  );
}

Router.propTypes = {};
