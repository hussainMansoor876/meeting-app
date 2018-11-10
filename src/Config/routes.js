import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Link} from "react-router-dom";
import {Dashboard,User,Meeting} from '../Screens'
import Navbar from '../Containers/Navbar/Navbar'
import Navbar2 from '../Containers/Navbar2/Navbar'

const Routes = () => (
    <Router>
        <div>
        <Route exact path="/" component={Navbar} />
        <Route exact path="/:value" component={Navbar2} />
        <Route exact path="/user" component={User} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/meeting" component={Meeting} />
        {/* <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} /> */}
      </div>
    </Router>
  );

  export default Routes;