import React from 'react';
import './App.css';
import Layout from './containers/Layout';
import Login from './components/Users/Login';
import SignUp from './components/Users/SignUp';
// import UserProfile from './components//UsersUserProfile';
import UpdateProfile from './components/Users/UpdateProfile';
import TasksList from './containers/TasksList';
import AddTask from './components/Tasks/AddTask';
import EditTask from './components/Tasks/EditTask';
import CreateTeam from './components/Teams/CreateTeam';
import TeamProfile from './components/Teams/TeamProfile';
import TeamBoard from './containers/TeamBoard';
import ResetProfile from './components/Users/ResetProfile';
// import Invite from './components/Teams/Invite';

import JoinTeam from './components/Teams/JoinTeam';

function App() {
  return (
    <div className="App">
      <Layout>
      {/* <AddTask team=""/> */}
    {/* <TeamProfile /> */}
    {/* <ResetProfile /> */}
        {/* <AddTask team="" id="" /> */}
        <TasksList />
      </Layout>
    </div>
  );
}

export default App;


//signup
//login
//edit task
//single task
//tasklist
//updateprofile
//add task
//join team
// password reset
//create team
//add member
//team profile