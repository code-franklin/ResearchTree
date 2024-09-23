import React, { useState } from 'react';

function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.text);

    function handleChange() {
        toggleCompleted(task.id);
    }

    function handleEdit() {
        setIsEditing(true);
    }

    function handleSave() {
        editTask(task.id, newText);
        setIsEditing(false);
    }

    function handleCancel() {
        setNewText(task.text);
        setIsEditing(false);
    }

    return (
        <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input 
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
            />
            {isEditing ? (
                <input 
                    type="text"
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                />
            ) : (
                <div>
                    <p>{task.text}</p>
                    <small>{task.date}</small> {/* Display date and time */}
                </div>
            )}
            {isEditing ? (
                <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>X</button>
                </>
            )}
        </div>
    );
}

export default TodoItem;
