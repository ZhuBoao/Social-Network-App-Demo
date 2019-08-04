import httpClient from "../../services/httpClient";
import { Photo } from "../../models/photo";
import { Dispatch } from "../store";
import { SocialAppState } from "../reducers";

// All Photo actions type merge here
export type PhotoAction = RequestPhotoAction | ReceivePhotoAction;

interface RequestPhotoAction {
    type: "REQUEST_PHOTO";
    albumId: number;
}

export const requestPhoto = (albumId: number): RequestPhotoAction => {
    return {
        type: "REQUEST_PHOTO",
        albumId
    };
};

interface ReceivePhotoAction {
    type: "RECEIVE_PHOTO";
    albumId: number;
    photo: Photo[];
    receivedAt: number;
}

export const receivePhoto = (albumId: number, photoList: Photo[]): ReceivePhotoAction => {
    return {
        type: "RECEIVE_PHOTO",
        albumId: albumId,
        photo: photoList,
        receivedAt: Date.now()
    };
};

const fetchPhoto = (albumId: number) => {
    return async (dispatch: Dispatch, getState: () => SocialAppState) => {
        dispatch(requestPhoto(albumId));
        const photoList = await httpClient.fetchPhotosOfAlbum(albumId);
        dispatch(receivePhoto(albumId, photoList));
        return photoList;
    };
};

const shouldFetchPhoto = (albumId: number, state: SocialAppState) => {
    if (!state.photo.photoAlbumMap.hasOwnProperty(albumId)) {
        return true;
    }
    else {
        return !state.photo.photoAlbumMap[albumId].isFetching;
    }
}

export const fetchPhotoIfNeeded = (albumId: number) => {
    return (dispatch: Dispatch, getState: () => SocialAppState) => {
        if (shouldFetchPhoto(albumId, getState())) {
            return dispatch(fetchPhoto(albumId));
        } else {
            return Promise.resolve();
        }
    };
};
