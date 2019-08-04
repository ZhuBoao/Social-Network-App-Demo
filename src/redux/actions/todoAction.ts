import httpClient from "../../services/httpClient";
import { Todo } from "../../models/todo";
import { Dispatch } from "../store";
import { SocialAppState } from "../reducers";

// All Todo actions type merge here
export type TodoAction = RequestTodoAction | ReceiveTodoAction;

interface RequestTodoAction {
    type: "REQUEST_TODO";
    userId: number;
}

export const requestTodo = (userId: number): RequestTodoAction => {
    return {
        type: "REQUEST_TODO",
        userId
    };
};

interface ReceiveTodoAction {
    type: "RECEIVE_TODO";
    userId: number;
    todo: Todo[];
    receivedAt: number;
}

export const receiveTodo = (userId: number, todoList: Todo[]): ReceiveTodoAction => {
    return {
        type: "RECEIVE_TODO",
        userId: userId,
        todo: todoList,
        receivedAt: Date.now()
    };
};

const fetchTodo = (userId: number) => {
    return async (dispatch: Dispatch, getState: () => SocialAppState) => {
        dispatch(requestTodo(userId));
        const todoList = await httpClient.fetchTodosOfUser(userId);
        dispatch(receiveTodo(userId, todoList));
        return todoList;
    };
};

const shouldFetchTodo = (userId: number, state: SocialAppState) => {
    if (!state.todo.todoUserMap.hasOwnProperty(userId)) {
        return true;
    } else if (state.todo.todoUserMap[userId].isFetching) {
        return false;
    }
    return state.todo.todoUserMap[userId].todos.length === 0;
};

export const fetchTodoIfNeeded = (userId: number) => {
    return (dispatch: Dispatch, getState: () => SocialAppState) => {
        if (shouldFetchTodo(userId, getState())) {
            return dispatch(fetchTodo(userId));
        } else {
            return Promise.resolve();
        }
    };
};
