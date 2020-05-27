import React, { Component } from 'react';
import SingleTask from '../components/Tasks/SingleTask';
import '../components/css/TeamBoard.css'

class TeamBoard extends Component {

    constructor(props) {
        super(props);
        this.state={
            tasks:[
                {
                    description:"Do this, Do that",
                    dueDateTime: Date.now(),
                    percentCompleted:80,
                    team:"Major lazer",
                    labels:"others",
                    completed:"completed",
                    notes:"I really want this to work",
                    overdue:"overdue"
                },
                {
                    description:"Do this, Do that",
                    dueDateTime: Date.now(),
                    percentCompleted:"10",
                    team:"Major lazer",
                    labels:"others",
                    completed:"completed",
                    notes:"I really want this to work",
                    overdue:""
                },
                {
                    description:"Do this, Do thatj;kdl; dijd 9d d d d d d d  d d d  dfdsd s f s d sd d sd s f s fs fs fs s  sf fs d d d d d  d d d d d d d d d dd d dd",
                    dueDateTime: Date.now(),
                    percentCompleted:"10",
                    team:"Major lazer",
                    labels:"others",
                    completed:"completed",
                    notes:"I really want this to work",
                    overdue:"overdue"
                },
            ],
        }
    }
    

    render() {

        const {tasks}=this.state 

        console.log(tasks)
        const tasklist=tasks.map((task)=>{
            return (
                <div>
                    <SingleTask task={task} />
                </div>
            )
        })

        return (
            <div>
            <p>

            <div >
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Add Task</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Team Profile</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Update Team</a>
            </button>
            <button type="button"  class="btn btn-primary add-task">
                <a className="task-a" href="#">Invite Members</a>
            </button>
            </div>
            </p>
                {tasklist}
            </div>
        );
    }
}

export default TeamBoard;