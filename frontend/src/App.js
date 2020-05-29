import React from 'react';
import './App.css';
import Layout from './containers/Layout';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import LayoutCopy from './containers/LayoutCopy';

function App() {
  return (
    <div className="App">
    <Router>

      <Layout>
        <BaseRouter />
      </Layout>
    </Router>
    </div>
  );
}

export default App;

