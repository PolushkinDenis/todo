const defaultState = {
    todos: []

}

export const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TODO": // добавление нового todo с проверкой на повторение текста задания

            if ((state.todos.filter(todo => todo.text === action.payload.text)).length > 0) {
                return state
            }
            else {
                return { ...state, todos: [...state.todos, action.payload] }
            }
        case "REMOVE_TODO":
            return { ...state, todos: state.todos.filter(todo => todo.dataTime !== action.payload) } // фильтрация для исключения из состояния выбранного todo
        case "CHANGE_TODO":  //изменение текста todo, с проверкой на повторение текста задания
            if ((state.todos.filter(todo => todo.text === action.payload.text)).length > 0) {
                return state
            }
            else {
                return {
                    ...state, todos: state.todos.map(todos =>
                        (todos.dataTime === action.payload.dataTime)
                            ? { ...todos, text: action.payload.text }
                            : todos
                    )
                }
            }
        case "COMPLETE_TODO": //изменение состояния выполненности
            return {
                ...state, todos: state.todos.map(todos =>
                    (todos.dataTime === action.payload)
                        ? { ...todos, isComplete: !todos.isComplete }
                        : todos
                )
            }
        default:
            return state
    }
}