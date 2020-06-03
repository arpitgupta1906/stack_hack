import React from 'react';
import './App.css';
import Layout from './containers/Layout';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';

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

///////////double tasks are created in teams