import React from 'react';
import './App.css';
import home_img from './components/images/home.png';

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <div id="viewport">
        <header className="App-header">
          <Header />
        </header>
        <main>
          <p>Connect to your bank, get finance recommendations and learn about the latest trends in the market</p>
          <img src={home_img} /><br />
          <button>Get Started</button>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
