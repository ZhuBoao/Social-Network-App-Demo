import React, { Component } from "react";
import { StyleSheet, View, Image, ActivityIndicator } from "react-native";

import { Photo } from "../models/photo";

type PhotoPlaceHolderProps = {
    photo: Photo;
    size: number;
    showThumbnail: boolean;
};

export default class PhotoPlaceHolder extends Component<PhotoPlaceHolderProps> {
    public static defaultProps = {
        size: 60,
        showThumbnail: false
    };
    render() {
        return this.props.photo ? (
            <Image
                style={[styles.photo, { width: this.props.size, height: this.props.size }]}
                source={{
                    uri: this.props.showThumbnail
                        ? this.props.photo.thumbnailUrl
                        : this.props.photo.url
                }}
            />
        ) : (
            <View style={styles.photo}>
                <ActivityIndicator size="small" color="#ffffff" />
            </View>
        );
    }
}

PhotoPlaceHolder.defaultProps;

const styles = StyleSheet.create({
    photo: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        backgroundColor: "#eeeeee",
        justifyContent: "center",
        borderRadius: 5
    }
});
