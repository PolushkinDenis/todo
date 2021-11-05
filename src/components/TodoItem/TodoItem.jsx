import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./TodoItem.css"

import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';

const TodoItem = ({ todo }) => {
    const [newText, setNewText] = useState(todo.text); //новый текст при изменении todo
    const [change, setChange] = useState(false) // переменная для контроля начала и конца изменения todo
    const dispatch = useDispatch()

    //удаление todo
    const removeTodo = () => {
        dispatch({ type: "REMOVE_TODO", payload: todo.dataTime })
    }
    //изменение состояния отметки (Выполнен или нет)
    const changeCompleteTodo = () => {
        dispatch({ type: "COMPLETE_TODO", payload: todo.dataTime })
    }
    //изменение todo
    const changeTodo = () => {
        setChange(false)
        if(newText.length > 0){ //проверка на не пустую строку. Если не пустая - изменяем todo
            const newTodo = {
                text: newText,
                dataTime: todo.dataTime
            }
            dispatch({ type: "CHANGE_TODO", payload: newTodo })
        }
    }

    return (
        <div className="item-flex">
            <Checkbox
                checked={todo.isComplete}
                id="isComplete"
                name="isComplete"
                onClick={changeCompleteTodo}
                sx={{ mt: 1 }}
            />
            <div style={{
                display: 'flex'
            }}>
                <BorderColorIcon 
                onClick={e => setChange(!change)}
                sx={{mt: 2, mr: 2}}
                />
                <Typography
                    sx={{
                        textDecoration: todo.isComplete ? 'line-through' : 'none',
                        display: change ? 'none' : 'flex',
                        mt: 2
                    }}
                >
                     {todo.text}
                </Typography>
                <TextField
                    label="Изменение"
                    autoFocus
                    size="small"
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                    onBlur={changeTodo}
                    sx={{ display: change ? 'flex' : 'none' }}

                />
            </div>
            <Typography
                sx={{ mt: 2 }}>
                Создан в {todo.dataTime}
            </Typography>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={e => setChange(false)}
                    sx={{ mr: 2,  display: change ? 'inline ' : 'none', }}
                >
                    Изменить
                </Button>
                <DeleteIcon
                    color="secondary"
                    onClick={removeTodo}
                    sx={{ mt: 1 }}
                >
                    Удалить
                </DeleteIcon>
            </div>
        </div>
    )
}

export default TodoItem