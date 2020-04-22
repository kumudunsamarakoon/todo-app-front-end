import React, { useState, useEffect , dispatch} from "react";
import axios from 'axios';
import DefaultModal from "./DefaultModal";


export default function DisplayTaskList() {

    const [data, setData] = useState({ data: [] });
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] =  useState([]);

    useEffect(() => {
        let ignore = false;
    
        async function fetchData() {
          const result = await axios('http://todoapp.local/tasks');
          console.log(result.data.data);
           if (!ignore) setData(result.data);
        }
    
         fetchData();
        return () => { ignore = true; }
    }, []);

    const editTask = (event, id) => {

        setShowModal(true);
        
        let ignore = false;

        async function fetchData() {
          const result = await axios('http://todoapp.local/tasks/' + id);
          if (!ignore) setTask(result.data.data);
        }
    
        fetchData();
        return (id) => { ignore = true; }
    };

    const handleSubmit = (event, id) => {

        setShowModal(false);
        const headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
    
          async function saveData() {
            axios.put('http://todoapp.local/tasks/' + id , data, {
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
    };

    return (

    <div className="table-wrapper">
        <h2>Todo List</h2>
        <table className="table-task">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Statu</th>
                    <th>Action</th> 
                </tr>
            </thead>
            <tbody>
            {data.data.map(item => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                    <td><button onClick={e => editTask(e, item.id)}>Edit</button></td>
                </tr>
            ))}
            </tbody>
        </table>
        <DefaultModal
            show={showModal}
            modalClassNames=""
            title={"Edit Task"}
            onHide={() => {
                setShowModal(false);
            }}
        >
            
            <label>{task.name}</label>
            <label>{task.id}</label>

            <form className="form-task" onSubmit = {e => handleSubmit(e, task.id)}>
                <div className="form-group">
                    <input className="form-control" type="text" placeholder ="Add the new task" value={task.name}
                    onChange={e => setTask({"name" : e.target.value})} 
                    />
                </div>
                <input className="btn btn-primary" type="submit" value="Submit" />
            </form>
        </DefaultModal>
    </div>
    );

}
