import React from 'react';
import Task from "./task";
import sortImg  from '../sort.png';
import { connect } from 'react-redux'
import { DropTarget, DragSource } from "react-dnd";
import update from "immutability-helper";

class Column extends React.PureComponent {
  drop = (id, status) => {
    const { tasks } = this.props;
    const task = tasks.find(task => task.id === id);
    task.status = status && status.toLowerCase();
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task }
    });

    this.props.dispatch({
      type: 'CHANGE_STATUS',
      tasks: newTasks
    })
  }

  sort = (arr) => {
    return arr.sort(function(a,b) {return (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0);} );
  }

  sortBoard = (type) => {
    let { tasks } = this.props;
    const sorted = this.sort(this.props.taskList);
    sorted.forEach(task => {
      const taskIndex = tasks.indexOf(task);
      delete tasks[taskIndex];
    })

    tasks = tasks.filter(x => x !== null)
    let resp = sorted.concat(tasks)

    this.props.dispatch({
      type: 'CHANGE_STATUS',
      tasks: resp
    })
  }

  render() {
    return (
      <KanbanColumn status={this.props.type}>
        <li className={`column ${this.props.classes}`} key={this.props.type} >
          <div className="column-header" style={{color: this.props.color}} >
            <img src={sortImg} className="sorting-img" onClick={this.sortBoard.bind(this, this.props.type)} alt="" data-status={this.props.type}/>
            <h2>{this.props.title}</h2>
          </div>
          <ul className="task-list" id={this.props.classes}>
            {
              this.props.taskList.map((task, index) => {
                return (
                  <KanbanItem id={task.id} onDrop={this.drop}>
                    <Task id={task.id} color={this.props.color} taskItem={task} />
                  </KanbanItem>
                );
              })
            }
          </ul>
        </li>
      </KanbanColumn>
    )
  }
}

const boxTarget = {
  drop(props) {
    return { name: props.status };
  }
};

class KanbanColumn extends React.Component {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

KanbanColumn = DropTarget("kanbanItem", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(KanbanColumn);

// Item

const boxSource = {
  beginDrag(props) {
    return {
      name: props.id
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onDrop(monitor.getItem().name, dropResult.name);
    }
  }
};

class KanbanItem extends React.Component {
  render() {
    return this.props.connectDragSource(<div>{this.props.children}</div>);
  }
}

KanbanItem = DragSource("kanbanItem", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(KanbanItem);


const mapStateToProps = state => {
  return { tasks: state.tasks }
}

export default connect(mapStateToProps)(Column);
