import { UserAction } from "./userAction";
import { TodoAction } from "./todoAction";
import { AlbumAction } from "./albumAction";
import { PostAction } from "./postAction";
import { PhotoAction } from "./photoAction";
import { CommentAction } from "./CommentAction";

// Root Action type
export type SocialAppAction =
    | UserAction
    | TodoAction
    | AlbumAction
    | PostAction
    | PhotoAction
    | CommentAction;
