import React, { useState, dispatch } from "react";
import axios from 'axios';


export default function AddTasksFrom() {

  const [data, setData] = useState({"name" :""});
  
    const handleSubmit = (event) => {
      const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }

      async function saveData() {
        axios.post('http://todoapp.local/tasks', data, {
          headers:headers
        })
        .then((response) => {
          dispatch({
            data: response.data[0]
          })
        })
        .catch((error) => {
          // dispatch({
            
          // })
          console.log(error);
        })
      }
  
      saveData();
      console.log(data);
      event.preventDefault();
    }

      return (
        <form className="form-task" onSubmit = {handleSubmit}>
          <div className="form-group">
            <input className="form-control" type="text" placeholder ="Add the new task" value={data.name}
             onChange={e => setData(e.target.value)} 
             />
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      );

}
