import httpClient from "../../services/httpClient";
import { Comment } from "../../models/comment";
import { Dispatch } from "../store";
import { SocialAppState } from "../reducers";

// All Comment actions type merge here
export type CommentAction = RequestCommentAction | ReceiveCommentAction;

interface RequestCommentAction {
    type: "REQUEST_COMMENT";
    postId: number;
}

export const requestComment = (postId: number): RequestCommentAction => {
    return {
        type: "REQUEST_COMMENT",
        postId
    };
};

interface ReceiveCommentAction {
    type: "RECEIVE_COMMENT";
    postId: number;
    comment: Comment[];
    receivedAt: number;
}

export const receiveComment = (postId: number, commentList: Comment[]): ReceiveCommentAction => {
    return {
        type: "RECEIVE_COMMENT",
        postId: postId,
        comment: commentList,
        receivedAt: Date.now()
    };
};

const fetchComment = (postId: number) => {
    return async (dispatch: Dispatch, getState: () => SocialAppState) => {
        dispatch(requestComment(postId));
        const commentList = await httpClient.fetchCommentsOfPost(postId);
        dispatch(receiveComment(postId, commentList));
        return commentList;
    };
};

const shouldFetchComment = (postId: number, state: SocialAppState) => {
    if (!state.comment.commentPostMap.hasOwnProperty(postId)) {
        return true;
    }
    else {
        return !state.comment.commentPostMap[postId].isFetching;
    }
}

export const fetchCommentIfNeeded = (postId: number) => {
    return (dispatch: Dispatch, getState: () => SocialAppState) => {
        if (shouldFetchComment(postId, getState())) {
            return dispatch(fetchComment(postId));
        } else {
            return Promise.resolve();
        }
    };
};
