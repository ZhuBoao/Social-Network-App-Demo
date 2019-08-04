import { User } from "../../models/user";
import { SocialAppAction } from "../actions";

export interface UserState {
    isFetching: boolean;
    users: User[];
    currentUser: User;
}

const initialUserState: UserState = {
    isFetching: false,
    users: [],
    currentUser: null
};

const userReducer = (state: UserState = initialUserState, action: SocialAppAction) => {
    switch (action.type) {
        case "REQUEST_USERS":
            return Object.assign({}, state, {
                isFetching: true
            });
        case "RECEIVE_USERS":
            return Object.assign({}, state, {
                isFetching: false,
                users: action.users
            });
        case "LOGIN":
            return Object.assign({}, state, {
                currentUser: action.user
            });
        case "LOGOUT":
            return Object.assign({}, state, {
                currentUser: null
            });
        default:
            return state;
    }
};

export default userReducer;
