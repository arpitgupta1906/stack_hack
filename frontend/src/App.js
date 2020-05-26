import React from 'react';
import './App.css';
import Layout from './containers/Layout';
// import Login from './components/Users/Login';
// import SignUp from './components//UsersSignUp';
// import UserProfile from './components//UsersUserProfile';
// import UpdateProfile from './components/Users/UpdateProfile';
import TasksList from './containers/TasksList';
import AddTask from './components/Tasks/AddTask';

function App() {
  return (
    <div className="App">
      <Layout>
        <AddTask />
        {/* <TasksList /> */}
      </Layout>
    </div>
  );
}

export default App;
