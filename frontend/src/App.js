import React from 'react';
import { Header, Ticker } from '@components';
import Index from './pages/Index.jsx';

function App() {
  return (
    <div id="app">
      <div id="page">
        <div id="header">
          <Header/>
          <Ticker/>
        </div>
        <div id="content">
          <Index/>
        </div>
      </div>
    </div>
  );
}

export default App;
