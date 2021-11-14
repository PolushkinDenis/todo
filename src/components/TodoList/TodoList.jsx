import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeApi } from "../TimeApi/TimeApi";

import styled from 'styled-components/native';
import { Button, TextInput, StyleSheet, Text, View } from "react-native";


import TodoItem from "../TodoItem/TodoItem.jsx"

// список всех todo
const TodoList = () => {
    const [text, setText] = useState('')
    const [error, setError] = useState(true) //переменная для блокировки кнопки добавления (защита от добавления пустого todo)
    const [timeApi, setTimeApi] = useState()
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

    //получение времени по api
    async function getTime() {
        try {
            const myTime = await getTimeApi()
            setTimeApi(`${myTime.slice(11, 16)} ${myTime.slice(8, 10)}.${myTime.slice(5, 7)}.${myTime.slice(0, 4)} `)
        }
        catch (e) {
            console.log(e)
        }
    }

    // использование useEffect для изменения переменной блокировки (error)
    useEffect(() => {
        if (text.length > 0) {
            setError(false)
        }
        else (setError(true))
    });

    useEffect(() => {
        getTime()
    }, [])

    const Text = styled.Text`
        fontSize: 1.5rem;
        fontWeight: bold;
        marginTop: 4;
        color: #2196f3;
  `;

    const TextInput = styled.TextInput`
      height: 50px;
      margin: 10px;
      padding: 10px;
      borderWidth: 1px;
      borderColor: #2196f3;
`;

    return (
        <View>
            <Text >
                TODO List
            </Text>
            <TextInput
                autoFocus
                placeholder="Задача"
                value={text}
                onChange={onchangeHandler}
            />
            <Button
                disabled={error}
                style={styles.button}
                onPress={addTodo}
                title="Добавить"
            />
            {todo.length > 0 ? (
                    todo.map((todo) => (
                        <TodoItem key={todo.dataTime} todo={todo} />
                    ))
            ) : (
                <Text style={styles.textEmpty}>
                    Список дел пуст
                </Text>
            )
            }
            <Text >
                Today: {timeApi}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        maxWidth: 300,
        margin: 10,

    },
    textEmpty: {
        fontSize: " 1rem",
        marginTop: 10,
    }
});


export default TodoList