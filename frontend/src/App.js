import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Home from './components/Home';
import ConnectBank from './components/ConnectBank';
import LoginBank from './components/LoginBank';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <div id="viewport">
          <header className="App-header">
            <Header />
          </header>
          <main>
            <Switch>
              <Route exact path="/api-hackathon-19" component={Home} />
              <Route path="/api-hackathon-19/connect-bank" component={ConnectBank} />
              {/* <Route path="/api-hackathon-19/login-bank" component={LoginBank} /> */}
              <Route path="/api-hackathon-19/dashboard" component={Dashboard} />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
