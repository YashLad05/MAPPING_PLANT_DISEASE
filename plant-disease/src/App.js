import React from 'react';
import { Navbar } from './components';
import { Header, Results } from './container';
import './App.css';

const App = () => (
    <div>
      <Navbar />
      <Header />
      <Results />
    </div>
)

export default App;
