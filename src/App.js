import React from 'react'
import './App.css'
import Sidebar from './Sidebar'
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom"
import NotFoundPage from './404'
import CompletedAnime from './CompletedAnime'

import { HashRouter, Route, Link } from "react-router-dom";

class App extends React.Component{

  render(){
      return (
        //HashRouter will read everything after the # in the URL
        <HashRouter> 
          <Switch>
          <Route exact path="/" component={Sidebar} />
          <Route path="/completedanime" component={CompletedAnime} />
          {/* <Route exact path="/404"  component={NotFoundPage} />
          <Redirect to="/404" /> Has to be last */}
          </Switch>
        </HashRouter>
      )
  }
}

export default App;
