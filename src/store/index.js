import {combineReducers, createStore} from "redux"
import { todoReducer } from "./todoReducer"

const rootReducer = combineReducers({
    todo: todoReducer
})

export const store = createStore(rootReducer)
