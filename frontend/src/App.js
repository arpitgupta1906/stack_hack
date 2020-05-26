import React from 'react';
import './App.css';
import Layout from './containers/Layout';
// import Login from './components/Users/Login';
// import SignUp from './components//UsersSignUp';
// import UserProfile from './components//UsersUserProfile';
// import UpdateProfile from './components/Users/UpdateProfile';
import TasksList from './containers/TasksList';
import AddTask from './components/Tasks/AddTask';
// import EditTask from './components/Tasks/EditTask';
// import CreateTeam from './components/Teams/CreateTeam';
// import TeamProfile from './components/Teams/TeamProfile';
import TeamBoard from './containers/TeamBoard';

function App() {
  return (
    <div className="App">
      <Layout>
      <TeamBoard />
        {/* <AddTask team="" id="" /> */}
        {/* <TasksList /> */}
      </Layout>
    </div>
  );
}

export default App;
