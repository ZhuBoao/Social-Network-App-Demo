import config from "../../config.json";
import userSchema, { User } from "../models/user";
import todoSchema, { Todo } from "../models/todo";
import albumSchema, { Album } from "../models/album";
import photoSchema, { Photo } from "../models/photo";
import postSchema, { Post } from "../models/post";
import commentSchema, { Comment } from "../models/comment";
import { encodeQueryData } from "../utils/urlBuilder";

const reqParams = {
    method: "GET"
};

const httpClient = {
    async fetchUsers(): Promise<User[]> {
        try {
            const url = new URL("users", config.endPoint).href;
            const users: User[] = await fetch(url, reqParams).then(response => response.json());
            users.map(user => userSchema.validateSync(user));
            return users;
        } catch (err) {
            alert(err.message);
        }
    },

    async fetchTodosOfUser(userId: number): Promise<Todo[]> {
        let url = new URL("todos", config.endPoint).href;
        url += encodeQueryData({ userId });
        const todos: Todo[] = await fetch(url, reqParams).then(response => response.json());
        todos.map(todo => todoSchema.validateSync(todo));
        return todos;
    },

    async fetchAlbumsOfUser(userId: number): Promise<Album[]> {
        let url = new URL("albums", config.endPoint).href;
        url += encodeQueryData({ userId });
        const albums: Album[] = await fetch(url, reqParams).then(response => response.json());
        albums.map(album => albumSchema.validateSync(album));
        return albums;
    },

    async fetchPhotosOfAlbum(albumId: number): Promise<Photo[]> {
        let url = new URL("photos", config.endPoint).href;
        url += encodeQueryData({ albumId });
        const photos: Photo[] = await fetch(url, reqParams).then(response => response.json());
        photos.map(photo => photoSchema.validateSync(photo));
        return photos;
    },

    async fetchPostsOfUser(userId: number): Promise<Post[]> {
        let url = new URL("posts", config.endPoint).href;
        url += encodeQueryData({ userId });
        const posts: Post[] = await fetch(url, reqParams).then(response => response.json());
        posts.map(post => postSchema.validateSync(post));
        return posts;
    },

    async fetchCommentsOfPost(postId: number): Promise<Comment[]> {
        let url = new URL("comments", config.endPoint).href;
        url += encodeQueryData({ postId });
        const comments: Comment[] = await fetch(url, reqParams).then(response => response.json());
        comments.map(comment => commentSchema.validateSync(comment));
        return comments;
    }
};

export default httpClient;
