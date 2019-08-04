import React, { PureComponent } from "react";
import { ScrollView, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { User } from "../models/user";
import { Album } from "../models/album";
import { Photo } from "../models/photo";
import { connect } from "react-redux";
import { SocialAppState } from "../redux/reducers";
import AlbumCell from "../components/AlbumCell";
import Layout from "../constants/Layout";
import { fetchAlbumIfNeeded } from "../redux/actions/albumAction";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

interface PhotoScreenStates {
    photos: Photo[];
    user: User;
}

type PhotoScreenProps = StateProps & DispatchProps & NavigationScreenProps;

class PhotoScreen extends PureComponent<PhotoScreenProps, PhotoScreenStates> {
    constructor(props: PhotoScreenProps) {
        super(props);
        this.state = {
            photos: [],
            user: this.props.navigation.getParam("user")
        };
    }

    componentDidMount() {
        this.props.getAlbumOfUser(this.state.user.id);
    }

    onAlbumPress = (album: Album) => {
        this.props.navigation.navigate("AlbumDetail", { album });
    };

    renderAlbum = (data: { item: Album }) => {
        const album: Album = data.item;
        return (
            <TouchableOpacity
                style={styles.albumContainer}
                onPress={() => this.onAlbumPress(album)}
            >
                <AlbumCell album={album} />
                <Text style={styles.albumNameText}>{album.title}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <ScrollView style={styles.rootView}>
                <FlatList
                    data={this.props.albums}
                    renderItem={this.renderAlbum}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    albumContainer: {
        padding: 10,
        width: Layout.window.width * 0.5,
        height: 200,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    albumNameText: {
        position: "absolute",
        top: 170,
        fontSize: 14,
        color: "#666666",
        textAlign: "center"
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: NavigationScreenProps) => {
    const userId = ownProps.navigation.getParam("user").id;
    return {
        albums: state.album.albumUserMap[userId] ? state.album.albumUserMap[userId].albums : []
    };
};

const mapDispatchToProps = (dispatch, ownProps: NavigationScreenProps) => {
    const userId = ownProps.navigation.getParam("user").id;
    return {
        getAlbumOfUser: (userId: number) => dispatch(fetchAlbumIfNeeded(userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoScreen);
