import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './Styles.css';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [error, setError] = useState(''); // State for error message

    function addTask(text) {
        if (text.trim() === '') {
            setError('Task cannot be empty'); // Set error if input is empty
            return;
        }
        const newTask = {
            id: Date.now(),
            text,
            completed: false,
            date: new Date().toLocaleString()
        };
        setTasks([...tasks, newTask]);
        setText('');
        setError(''); // Clear error after adding task
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    }

    function editTask(id, newText) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, text: newText };
            } else {
                return task;
            }
        }));
    }

    return (
        <div className="todo-list">
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                    editTask={editTask}
                />
            ))}
            <div className="task-input">
                <input
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={() => addTask(text)}>Add</button>
            </div>
            {error && <p className="error">{error}</p>} {/* Display error message */}
        </div>
    );
}

export default TodoList;
