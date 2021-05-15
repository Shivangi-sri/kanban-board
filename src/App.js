import './App.css';
import Board from './components/Board';
import { Provider } from 'react-redux';
import addTasksRedux from './addTasksRedux';
import { createStore } from 'redux';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const store = createStore(addTasksRedux)

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
            <Board />
        </div>
      </DndProvider>
  </Provider>
  );
}

export default App;
