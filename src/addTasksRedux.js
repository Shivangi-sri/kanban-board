const tasks = {
  tasks: [
    {id: 0, name: 'Coding', status: 'to_do'},
    {id: 1, name: 'Analysis', status: 'to_do'},
    {id: 2, name: 'Card Sorting',status: 'doing'},
    {id: 3, name: 'Measure', status: 'done'}
  ]
}

function addTasksRedux(state = tasks, action) {
  switch(action.type) {
    case 'ADD_TASK':
      return  {tasks: state.tasks.concat(action.task)};
    case 'CHANGE_STATUS':
      const tasks = [...action.tasks];
      return {tasks};
    default:
      return state;
  }
}

export default addTasksRedux;
