import React from 'react';
import { BrowserRouter as HashRouter, Route } from "react-router-dom";

import About from './components/about';
import Home from './components/home';
import Shirts from './components/shirts';

const AppRouter = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/shirts" component={Shirts} />
    </div>
  </HashRouter>
);

export default AppRouter;