import React from 'react';
import './App.css';
import AddTasksForm from './components/AddTasksForm';
import DisplayTaskList from './components/DisplayTaskList';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="form-wraper">
          <h2>Add New Task</h2>
          <AddTasksForm/>
        </div>
        <DisplayTaskList/> 
      </div>
    </div>
  );
}

export default App;
