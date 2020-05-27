import React from 'react';
import {Route} from 'react-router-dom';
import TaskList from './containers/TaskList';
import Login from './components/Users/Login';
import SignUp from './components/Users/SignUp';
import UpdateProfile from './components/Users/UpdateProfile';
import UserProfile from './components/Users/UserProfile';
import ResetProfile from './components/Users/ResetProfile';
import OtpPage from './components/Users/OtpPage';
import AddTask from './components/Tasks/AddTask';
import EditTask from './components/Tasks/EditTask';
import AddTeamTask from './components/Teams/AddTeamTask';
import CreateTeam from './components/Teams/CreateTeam';
import Invite from './components/Teams/Invite';
import JoinTeam from './components/Teams/JoinTeam';
import TeamProfile from './components/Teams/TeamProfile';
import TeamBoard from './containers/TeamBoard';

const BaseRouter=()=>(
    <div>
        <Route exact path='/' component={TaskList} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={SignUp} />
        <Route exact path='/update/' component={UpdateProfile} />
        <Route exact path='/profile/' component={UserProfile} />
        <Route exact path='/forgotpassword/' component={ResetProfile} />
        <Route exact path='/resetpassword/:ID/' component={OtpPage} />
        <Route exact path='/tasks/:LABEL/' component={TaskList} />
        <Route exact path='/addtask/' component={AddTask} />
        <Route exact path='/jointeam/' component={JoinTeam} />
        <Route exact path='/team/:ID/' component={TeamBoard} />
        <Route exact path='/createteam/' component={CreateTeam} />
        <Route exact path='team/:ID/addtask/' component={AddTeamTask} />
        <Route exact path='team/:ID/invite/' component={Invite} />
        <Route exact path='/team/:ID/profile/' component={TeamProfile} />
        <Route exact path='/:ID/update/' component={EditTask} />

    </div>
);

export default BaseRouter;