import React from 'react';
import './App.css';
import Layout from './containers/Layout';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Layout>
        <Login />
      </Layout>
    </div>
  );
}

export default App;
