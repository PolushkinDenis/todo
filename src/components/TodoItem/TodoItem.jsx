import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./TodoItem.css"

import DeleteIcon from '@material-ui/icons/Delete';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import styled from 'styled-components/native';
import { Button, TextInput, StyleSheet, CheckBox, Text, View } from "react-native";


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
        if (newText.length > 0) { //проверка на не пустую строку. Если не пустая - изменяем todo
            const newTodo = {
                text: newText,
                dataTime: todo.dataTime
            }
            dispatch({ type: "CHANGE_TODO", payload: newTodo })
        }
    }

    const ViewStyled = styled.View`
    justify-content: space-between
    min-height: 90px;
    border: 1px solid #2196f3;
    border-radius: 4px;
    margin-top: 5px;
`;

    const TextStyled = styled.Text`
      margin-top: 10px;
`;
    const TextToDo = styled.Text`
       margin-left: 30px;
       hyphens: auto;
       word-break: break-all;
       textDecoration: ${props => props.isComplete ? "line-through" : "none"};
       display: ${props => props.change ? "none" : "inline-block"};
`;
    const TextInput = styled.TextInput`
       display: ${props => props.change ? "flex" : "none"};
`;
    const ViewChange = styled.View`
       display: ${props => props.change ? "flex" : "none"};
`;

    return (
        <ViewStyled >
            <View style={styles.containerCheckAndChange}>
                <CheckBox
                    style={styles.checkBox}
                    value={todo.isComplete}
                    onValueChange={changeCompleteTodo}
                />
                <BorderColorIcon
                    onClick={e => setChange(!change)}
                />
            </View>
            <View>
                <TextToDo
                    isComplete={todo.isComplete}
                    change={change}
                >
                    {todo.text}
                </TextToDo>
                <TextInput
                    change={change}
                    autoFocus
                    placeholder="Изменение"
                    value={newText}
                    onChange={e => setNewText(e.target.value)}
                    onBlur={changeTodo}
                />
            </View>
            <View style={styles.containerButton}>
                <TextStyled
                    isComplete={todo.isComplete}
                >
                    Создан в {todo.dataTime}
                </TextStyled>
                <ViewChange change={change}>
                    <Button
                        onClick={e => setChange(false)}
                        title="Изменить"
                    />
                </ViewChange>
                <DeleteIcon
                    color="secondary"
                    onClick={removeTodo}
                    sx={{ mt: 1 }}
                >
                    Удалить
                </DeleteIcon>
            </View>
        </ViewStyled>
    )
}

const styles = StyleSheet.create({
    containerCheckAndChange: {
        display: "flex",
        flexDirection: "row",

    },
    checkBox: {
        margin: 5
    },
    containerButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    borderColorIcon: {
        marginTop: 10,
        marginRight: 10,
    },
});


export default TodoItem