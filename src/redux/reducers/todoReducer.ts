import { Todo } from "../../models/todo";
import { SocialAppAction } from "../actions";

export interface TodoState {
    todoUserMap: {
        [userId: number]: {
            todos: Todo[];
            isFetching: boolean;
        };
    };
}

const initialTodoState: TodoState = {
    todoUserMap: {}
};

const todoReducer = (state: TodoState = initialTodoState, action: SocialAppAction): TodoState => {
    switch (action.type) {
        case "REQUEST_TODO":
            return Object.assign({}, state, {
                todoUserMap: Object.assign({}, state.todoUserMap, {
                    [action.userId]: {
                        todos: [],
                        isFetching: true
                    }
                })
            });
        case "RECEIVE_TODO":
            return Object.assign({}, state, {
                todoUserMap: Object.assign({}, state.todoUserMap, {
                    [action.userId]: {
                        todos: action.todo,
                        isFetching: false
                    }
                })
            });
        default:
            return state;
    }
};

export default todoReducer;
