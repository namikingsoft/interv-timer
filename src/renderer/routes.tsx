import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { AppFrame } from './components/templates/AppFrame'
import Home from './pages/home'
import Settings from './pages/settings'

export const routes = (
  <Router>
    <AppFrame>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppFrame>
  </Router>
)
