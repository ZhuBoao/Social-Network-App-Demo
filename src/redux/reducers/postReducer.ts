import { Post } from "../../models/post";
import { SocialAppAction } from "../actions";

export interface PostState {
    postUserMap: {
        [userId: number]: {
            posts: Post[];
            isFetching: boolean;
        };
    };
}

const initialPostState: PostState = {
    postUserMap: {}
};

const postReducer = (state: PostState = initialPostState, action: SocialAppAction): PostState => {
    switch (action.type) {
        case "REQUEST_POST":
            return Object.assign({}, state, {
                postUserMap: Object.assign({}, state.postUserMap, {
                    [action.userId]: {
                        posts: [],
                        isFetching: true
                    }
                })
            });
        case "RECEIVE_POST":
            return Object.assign({}, state, {
                postUserMap: Object.assign({}, state.postUserMap, {
                    [action.userId]: {
                        posts: action.post,
                        isFetching: false
                    }
                })
            });
        default:
            return state;
    }
};

export default postReducer;
