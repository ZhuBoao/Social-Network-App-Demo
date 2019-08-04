import { Photo } from "../../models/photo";
import { SocialAppAction } from "../actions";

export interface PhotoState {
    photoAlbumMap: {
        [albumId: number]: {
            photos: Photo[];
            isFetching: boolean;
        };
    };
}

const initialPhotoState: PhotoState = {
    photoAlbumMap: {}
};

const photoReducer = (state: PhotoState = initialPhotoState, action: SocialAppAction): PhotoState => {
    switch (action.type) {
        case "REQUEST_PHOTO":
            return Object.assign({}, state, {
                photoAlbumMap: Object.assign({}, state.photoAlbumMap, {
                    [action.albumId]: {
                        photos: [],
                        isFetching: true
                    }
                })
            });
        case "RECEIVE_PHOTO":
            return Object.assign({}, state, {
                photoAlbumMap: Object.assign({}, state.photoAlbumMap, {
                    [action.albumId]: {
                        photos: action.photo,
                        isFetching: true
                    }
                })
            });

        default:
            return state;
    }
};

export default photoReducer;
