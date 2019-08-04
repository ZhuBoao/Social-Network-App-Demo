import httpClient from "../../services/httpClient";
import { Album } from "../../models/album";
import { Dispatch } from "../store";
import { SocialAppState } from "../reducers";

// All Album actions type merge here
export type AlbumAction = RequestAlbumAction | ReceiveAlbumAction;

interface RequestAlbumAction {
    type: "REQUEST_ALBUM";
    userId: number;
}

export const requestAlbum = (userId: number): RequestAlbumAction => {
    return {
        type: "REQUEST_ALBUM",
        userId
    };
};

interface ReceiveAlbumAction {
    type: "RECEIVE_ALBUM";
    userId: number;
    album: Album[];
    receivedAt: number;
}

export const receiveAlbum = (userId: number, albumList: Album[]): ReceiveAlbumAction => {
    return {
        type: "RECEIVE_ALBUM",
        userId: userId,
        album: albumList,
        receivedAt: Date.now()
    };
};

const fetchAlbum = (userId: number) => {
    return async (dispatch: Dispatch, getState: () => SocialAppState) => {
        dispatch(requestAlbum(userId));
        const albumList = await httpClient.fetchAlbumsOfUser(userId);
        dispatch(receiveAlbum(userId, albumList));
        return albumList;
    };
};

const shouldFetchAlbum = (userId: number, state: SocialAppState) => {
    if (!state.album.albumUserMap.hasOwnProperty(userId)) {
        return true;
    } else if (state.album.albumUserMap[userId].isFetching) {
        return false;
    }
    return state.album.albumUserMap[userId].albums.length === 0;
};

export const fetchAlbumIfNeeded = (userId: number) => {
    return (dispatch: Dispatch, getState: () => SocialAppState) => {
        if (shouldFetchAlbum(userId, getState())) {
            return dispatch(fetchAlbum(userId));
        } else {
            return Promise.resolve();
        }
    };
};
