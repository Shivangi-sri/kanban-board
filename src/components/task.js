function Task(props) {
  const { id, taskItem, color} = props;

  return (
    <li className="task" style={{background: color}} key={id} id={id} >
      <p>{` T${id}:`}</p>
      <p>{`${taskItem.name.length <= 8 ? taskItem.name : taskItem.name.substring(0, 8) + '...'}`}</p>
    </li>
  )
}

export default Task;
