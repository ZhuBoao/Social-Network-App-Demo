import React, { PureComponent } from "react";
import { ScrollView, View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Album } from "../models/album";
import { Photo } from "../models/photo";
import { connect } from "react-redux";
import { SocialAppState } from "../redux/reducers";
import { fetchPhotoIfNeeded } from "../redux/actions/photoAction";
import Layout from "../constants/Layout";
import PhotoPlaceHolder from "../components/PhotoPlaceHolder";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

interface AlbumDetailScreenStates {
    album: Album;
}

type AlbumDetailScreenProps = StateProps & DispatchProps & NavigationScreenProps;

class AlbumDetailScreen extends PureComponent<AlbumDetailScreenProps, AlbumDetailScreenStates> {
    constructor(props: AlbumDetailScreenProps) {
        super(props);
        const album = props.navigation.getParam("album");
        this.state = {
            album
        };
    }

    componentDidMount() {
        this.props.getPhotoOfAlbum(this.state.album.id);
    }

    renderPhoto = (data: { item: Photo }) => {
        const photo = data.item;
        return (
            <View style={styles.photo}>
                <PhotoPlaceHolder photo={photo} size={Layout.window.width * 0.9} />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.rootView}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.props.photos}
                    renderItem={this.renderPhoto}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center"
    },
    photo: {
        marginVertical: 10
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: NavigationScreenProps) => {
    const albumId = ownProps.navigation.getParam("album").id;
    return {
        photos: state.photo.photoAlbumMap[albumId] ? state.photo.photoAlbumMap[albumId].photos : []
    };
};

const mapDispatchToProps = (dispatch, ownProps: NavigationScreenProps) => {
    return {
        getPhotoOfAlbum: (albumId: number) => dispatch(fetchPhotoIfNeeded(albumId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumDetailScreen);
