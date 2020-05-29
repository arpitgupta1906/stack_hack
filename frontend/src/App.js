import React from 'react';
import './App.css';
import Layout from './containers/Layout';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import Testbar from './Testbar';
import LayoutCopy from './containers/LayoutCopy';

function App() {
  return (
    <div className="App">
    <Router>

      <LayoutCopy>
        <BaseRouter />
      </LayoutCopy>
    </Router>
    {/* <Testbar /> */}
    </div>
  );
}

export default App;

