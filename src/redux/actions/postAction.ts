import httpClient from "../../services/httpClient";
import { Post } from "../../models/post";
import { Dispatch } from "../store";
import { SocialAppState } from "../reducers";

// All Post actions type merge here
export type PostAction = RequestPostAction | ReceivePostAction;

interface RequestPostAction {
    type: "REQUEST_POST";
    userId: number;
}

export const requestPost = (userId: number): RequestPostAction => {
    return {
        type: "REQUEST_POST",
        userId
    };
};

interface ReceivePostAction {
    type: "RECEIVE_POST";
    userId: number;
    post: Post[];
    receivedAt: number;
}

export const receivePost = (userId: number, postList: Post[]): ReceivePostAction => {
    return {
        type: "RECEIVE_POST",
        userId: userId,
        post: postList,
        receivedAt: Date.now()
    };
};

const fetchPost = (userId: number) => {
    return async (dispatch: Dispatch, getState: () => SocialAppState) => {
        dispatch(requestPost(userId));
        const postList = await httpClient.fetchPostsOfUser(userId);
        dispatch(receivePost(userId, postList));
        return postList;
    };
};

const shouldFetchPost = (userId: number, state: SocialAppState) => {
    if (!state.post.postUserMap.hasOwnProperty(userId)) {
        return true;
    } else if (state.post.postUserMap[userId].isFetching) {
        return false;
    }
    return state.post.postUserMap[userId].posts.length === 0;
};

export const fetchPostIfNeeded = (userId: number) => {
    return (dispatch: Dispatch, getState: () => SocialAppState) => {
        if (shouldFetchPost(userId, getState())) {
            return dispatch(fetchPost(userId));
        } else {
            return Promise.resolve();
        }
    };
};
