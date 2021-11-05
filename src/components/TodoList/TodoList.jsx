import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TodoItem from "../TodoItem/TodoItem.jsx"

// список всех todo
const TodoList = () => {
    const [text, setText] = useState('') 
    const [error, setError] = useState(true) //переменная для блокировки кнопки добавления (защита от добавления пустого todo)

    const dispatch = useDispatch()
    const todo = useSelector(state => state.todo.todos) //получаем данные из reducer

    //добавление посимвольно текста todo с помощью useState
    const onchangeHandler = (event) => {
        setText(event.target.value)
    }

    // добавление нового todo в state redux
    const addTodo = () => {
        setText('')
        const dateInMs = Date.now()
        const time = new Date(dateInMs).toLocaleTimeString()
        const newTodo = {
            text,
            dataTime: time,
            isComplete: false
        }
        dispatch({ type: "ADD_TODO", payload: newTodo })
    }

    // использование useEffect для изменения переменной блокировки (error)
    useEffect(() => {
        if (text.length > 0) {
            setError(false)
        }
        else (setError(true))
    });
 
    return (
        <div>
            <Typography component="h1" variant="h4"
            color="primary"
                sx={{
                    marginTop: 4,
                    textAlign: "center",
                }}
            >
                TODO List
            </Typography>
            <div>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <TextField
                            size="medium"
                            margin="normal"
                            id="text"
                            label="Задача"
                            name="text"
                            value={text}
                            autoComplete="text"
                            autoFocus
                            onChange={onchangeHandler}
                        />
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            disabled={error}
                            onClick={addTodo}
                            sx={{ mt: 3, ml: 2 }}
                        >
                            Добавить
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {todo.length > 0 ? (
                <div>
                    {todo.map((todo) => (
                        <TodoItem key={todo.dataTime} todo={todo} />
                    ))}
                </div>
            ) : (
                <Typography 
                    sx={{
                        marginTop: 4,
                        textAlign: "center",
                    }}
                >
                    Список дел пуст
                </Typography>
            )
            }
        </div>
    )
}


export default TodoList