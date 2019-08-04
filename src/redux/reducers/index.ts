import { combineReducers } from "redux";

import todo, { TodoState } from "./todoReducer";
import user, { UserState } from "./userReducer";
import album, { AlbumState } from "./albumReducer";
import post, { PostState } from "./postReducer";
import photo, { PhotoState } from "./photoReducer";
import comment, { CommentState } from "./commentReducer";

// Root state interface for this demo app
export interface SocialAppState {
    user: UserState;
    todo: TodoState;
    album: AlbumState;
    post: PostState;
    photo: PhotoState;
    comment: CommentState;
}

export default combineReducers<SocialAppState>({
    todo,
    user,
    album,
    post,
    photo,
    comment
});
