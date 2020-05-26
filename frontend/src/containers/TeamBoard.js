import React, { Component } from 'react';
import SingleTask from '../components/Tasks/SingleTask';

class TeamBoard extends Component {

    constructor(props) {
        super(props);
        this.state={
            tasks:[
                {
                    description:"Do this, Do that",
                    dueDateTime:"not accomplished this yet",
                    percentCompleted:80,
                    team:"Major lazer",
                    labels:"others",
                    completed:"completed",
                    notes:"I really want this to work",
                    overdue:"overdue"
                },
                {
                    description:"Do this, Do that",
                    dueDateTime:"not accomplished this yet",
                    percentCompleted:"10",
                    team:"Major lazer",
                    labels:"others",
                    completed:"completed",
                    notes:"I really want this to work",
                    overdue:""
                },
                {
                    description:"Do this, Do thatj;kdl; dijd 9d d d d d d d  d d d  dfdsd s f s d sd d sd s f s fs fs fs s  sf fs d d d d d  d d d d d d d d d dd d dd",
                    dueDateTime:"not accomplished this yet",
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
                {tasklist}
            </div>
        );
    }
}

export default TeamBoard;