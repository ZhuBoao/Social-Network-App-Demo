import httpClient from "../../services/httpClient";
import { User } from "../../models/user";
import { Dispatch } from "../store";

// All User actions type merge here
export type UserAction = RequestUsersAction | ReceiveUsersAction | LoginAction | LogoutAction;

interface RequestUsersAction {
    type: "REQUEST_USERS";
}

export const requestUsers = (): RequestUsersAction => {
    return {
        type: "REQUEST_USERS"
    };
};

interface ReceiveUsersAction {
    type: "RECEIVE_USERS";
    users: User[];
    receivedAt: number;
}

export const receiveUsers = (userList: User[]): ReceiveUsersAction => {
    return {
        type: "RECEIVE_USERS",
        users: userList,
        receivedAt: Date.now()
    };
};

interface LoginAction {
    type: "LOGIN";
    user: User;
}

export const login = (user: User): LoginAction => {
    return {
        type: "LOGIN",
        user: user
    };
};

interface LogoutAction {
    type: "LOGOUT";
}

export const logout = (): LogoutAction => {
    return {
        type: "LOGOUT"
    };
};

const fetchUsers = (): ((dispatch: Dispatch) => Promise<User[]>) => {
    return async dispatch => {
        dispatch(requestUsers());
        const userList = await httpClient.fetchUsers();
        dispatch(receiveUsers(userList));
        return userList;
    };
};

const shouldFetchUsers = state => {
    if (state.user.isFetching) {
        return false;
    } else {
        return state.user.users.length === 0;
    }
};

export const fetchUsersIfNeeded = () => {
    return (dispatch, getState) => {
        if (shouldFetchUsers(getState())) {
            return dispatch(fetchUsers());
        } else {
            return Promise.resolve();
        }
    };
};
