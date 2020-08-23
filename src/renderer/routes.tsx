import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AppFrame } from './components/templates/AppFrame'
import Home from './pages/home'
import Settings from './pages/settings'

export const routes = (
  <Router>
    <AppFrame>
      <Switch>
        <Route exact path="/settings" component={Settings} />
        <Route component={Home} />
      </Switch>
    </AppFrame>
  </Router>
)
