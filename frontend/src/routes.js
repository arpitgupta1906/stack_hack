import React from 'react';
import {Route} from 'react-router-dom';
import TaskList from './containers/TaskList';
import Login from './components/Users/Login';
import SignUp from './components/Users/SignUp';


const BaseRouter=()=>(
    <div>
        <Route exact path='/' component={TaskList} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={SignUp} />
        {/* <Route exact path='/' component={TaskList} /> */}
    </div>
);

export default BaseRouter;