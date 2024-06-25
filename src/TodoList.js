import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoList = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);

    function create() {
        axios.post('http://localhost:5000/posting', { todo })
            .then(() => {
                alert('Data has been posted successfully');
                setTodo('');
            })
            .catch(() => {
                alert('Failed to post data');
            });
    }

    function getData() {
        axios.get('http://localhost:5000/getting')
            .then((response) => {
                setTodos(response.data);
            })
            .catch(() => {
                alert('Failed to retrieve data');
            });
    }

    const updatedTodo = (id, updatedData) => {
        axios.put(`http://localhost:5000/updating/${id}`, { todo: updatedData })
            .then(() => {
                console.log('Todo updated successfully');
                getData();
            })
            .catch((error) => {
                console.error('Failed to update todo:', error);
                alert('Failed to update todo');
            });
    };

    const handleEditButtonClick = (id) => {
        const newdata = prompt("Enter the new data");

        if (newdata === null || newdata.trim() === '') {
            alert("Please enter valid new data");
            return;
        }

        updatedTodo(id, newdata.trim());
    };

    function deleteTodo(id) {
        axios.delete(`http://localhost:5000/deleting/${id}`)
            .then(() => {
                getData();
            })
            .catch(() => {
                alert("data cannot change")
            });
    }

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <h2 style={{fontFamily:"serif"}}>Simple Todo List</h2>
                <label> </label>
                <div className="col-md-8 offset-md-2 d-flex align-items-center">
                    <TextField
                        id="todo"
                        label="Todo"
                        variant="outlined"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="flex-grow-1"
                    />
                    <Button variant="contained" color="primary" onClick={create} className="ml-2">
                        Post
                    </Button>
                    <Button variant="contained" color="secondary" onClick={getData} className="ml-2">
                        Get All
                    </Button>
                </div>
            </div>
            <ul className="list-group">
                {todos.map((item) => (
                    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.todo}
                        <div>
                            <Button variant="contained" color="primary" onClick={() => handleEditButtonClick(item._id)} className="mr-2">
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => deleteTodo(item._id)}>
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
