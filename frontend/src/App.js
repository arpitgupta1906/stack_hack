import React from 'react';
import './App.css';
import Layout from './containers/Layout';
// import Login from './components/Login';
// import SignUp from './components/SignUp';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <Layout>
        <UserProfile />
      </Layout>
    </div>
  );
}

export default App;
