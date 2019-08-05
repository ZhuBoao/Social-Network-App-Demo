import { Album } from "../../models/album";
import { SocialAppAction } from "../actions";

export interface AlbumState {
    albumUserMap: {
        [userId: number]: {
            albums: Album[];
            isFetching: boolean;
        };
    };
}

const initialAlbumState: AlbumState = {
    albumUserMap: {}
};

const albumReducer = (
    state: AlbumState = initialAlbumState,
    action: SocialAppAction
): AlbumState => {
    switch (action.type) {
        case "REQUEST_ALBUM":
            return Object.assign({}, state, {
                albumUserMap: Object.assign({}, state.albumUserMap, {
                    [action.userId]: {
                        albums: [],
                        isFetching: true
                    }
                })
            });
        case "RECEIVE_ALBUM":
            return Object.assign({}, state, {
                albumUserMap: Object.assign({}, state.albumUserMap, {
                    [action.userId]: {
                        albums: action.album,
                        isFetching: false
                    }
                })
            });
        default:
            return state;
    }
};

export default albumReducer;
