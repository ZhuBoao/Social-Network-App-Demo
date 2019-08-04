import { Comment } from "../../models/comment";
import { SocialAppAction } from "../actions";

export interface CommentState {
    commentPostMap: {
        [postId: number]: {
            comments: Comment[];
            isFetching: boolean;
        };
    };
}

const initialCommentState: CommentState = {
    commentPostMap: {}
};

const commentReducer = (
    state: CommentState = initialCommentState,
    action: SocialAppAction
): CommentState => {
    switch (action.type) {
        case "REQUEST_COMMENT":
            return Object.assign({}, state, {
                commentPostMap: Object.assign({}, state.commentPostMap, {
                    [action.postId]: {
                        comments: [],
                        isFetching: true
                    }
                })
            });
        case "RECEIVE_COMMENT":
            return Object.assign({}, state, {
                commentPostMap: Object.assign({}, state.commentPostMap, {
                    [action.postId]: {
                        comments: action.comment,
                        isFetching: false
                    }
                })
            });
        default:
            return state;
    }
};

export default commentReducer;
