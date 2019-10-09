import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Home from './components/Home';
import ConnectBank from './components/ConnectBank';
import LoginBank from './components/LoginBank';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <div id="viewport">
          <header className="App-header">
            <Header />
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/connect-bank" component={ConnectBank} />
              <Route path="/login-bank" component={LoginBank} />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
