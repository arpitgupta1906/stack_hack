import React, { Component } from 'react';
import '../css/SingleTask.css'


/////Add toggle switch to mark as completed

class SingleTask extends Component {

    
    render() {
        const {task}=this.props

        return (
            <div className="singletask">
            <li className="list-group-item">
                <p className="duedate">{task.dueDateTime}</p>
                <p className="labels">{task.labels}</p>
                <p className="completed">{task.completed}</p>
                {task.overdue.length>0 ? 
                <p className="overdue">{task.overdue}</p>
                : ""
                }
                <p className="content">{task.description}</p>
                <p className="content">{task.notes}</p>
                <p>
                    
                <label for="customRange3">Percentage Completed:</label>
                <input type="range"  defaultValue={task.percentCompleted} class="custom-range" name="percentCompleted" min="0" max="100" step="1" id="customRange3" />

                </p>
                <p className="content">
                <button type="button" class="btn btn-success">
                Done?
                </button>
                <button type="button"  class="btn btn-primary">
                <a className="task-a" href="#">Update</a>
                </button>

                <button type="button" class="btn btn-danger">
                Delete
                </button>
                </p>
            </li>
            </div>
        );
    }
}

export default SingleTask;