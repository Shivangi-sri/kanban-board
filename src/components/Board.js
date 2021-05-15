import React from 'react';
import Column from './Column';
import constants  from '../constants';
import { connect } from 'react-redux'

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      toDo: props.tasks.filter(task => task.status === 'to_do'),
      doing: props.tasks.filter(task => task.status === 'doing'),
      done: props.tasks.filter(task => task.status === 'done')
    }
  }

  addTask = () => {
    let task = document.getElementById('taskText').value;

    if(task) {
      const duplicate = this.props.tasks.filter(function(item){ return item.name.toLowerCase() === task.toLowerCase() });

      if(duplicate.length > 0) {
        this.setState({error: 'Task with duplicate name' });
      }else {
        this.props.dispatch({
          type: 'ADD_TASK',
          task: [{
            id: this.props.tasks.length,
            name: task,
            status: 'to_do'
          }]
        })
      }

      document.getElementById('taskText').value = '';
    }
    else {
      this.setState({error: 'Please Enter Task.' });
    }
  }

  shouldComponentUpdate(nextProps) {
    const nextToDoLength = nextProps.tasks.filter(task => task.status === 'to_do').length;
    const nextDoingLength = nextProps.tasks.filter(task => task.status === 'doing').length;
    const nextDoneLength = nextProps.tasks.filter(task => task.status === 'done').length;
    const { toDo, doing, done} = this.state;

    if(nextToDoLength !== toDo.length || nextDoingLength !== doing.length || nextDoneLength !== done.length) {
      const toDo = nextProps.tasks.filter(task => task.status === 'to_do')
      const doing = nextProps.tasks.filter(task => task.status === 'doing')
      const done = nextProps.tasks.filter(task => task.status === 'done')
      this.setState({toDo ,doing, done});
    }

    return true;
  }

  percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  }

  handleProgressbar = () => {
    const totalTasks = this.props.tasks.length;
    const percen = this.percentage(this.state.done.length, totalTasks);
    const ele = document.getElementById('myBar')
    ele.style.width = percen.toFixed(1) + '%';
    ele.innerText = percen.toFixed(1) + '%';
  }

  componentDidUpdate() {
    this.handleProgressbar();
  }

  componentDidMount() {
    this.handleProgressbar();
  }

  render() {
    const { toDo, doing, done, error } = this.state;

    return (
      <div>
        <h1> Kanban Board</h1>
        <div className="add-task-container">
          <input type="text" className="task-input" maxLength="12" id="taskText" placeholder="Add Task..."/>
          <button id="add" className="button add-button" onClick={this.addTask}>Add New Task</button>
        </div>
        <br/>
        <span className='error-msg'>{error ? error : ''}</span>
        <div className="progress-section">
          <div id="progressLabel"> Progress</div>
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
        </div>
        <div className="main-container">
          <ul className="columns">
            <Column title="To Do" taskList={toDo} color={constants.TO_DO_COLOR} classes='to-do-column' type="to_do" />
            <Column title="Doing" taskList={doing} color={constants.DOING_COLOR} classes='doing-column' type="doing" />
            <Column title="Done" taskList={done} color={constants.DONE_COLOR} classes='done-column' type="done" />
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { tasks: state.tasks }
}

export default connect(mapStateToProps)(Board);
