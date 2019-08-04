import React, { PureComponent } from "react";
import { View, StyleSheet, Image, ActivityIndicator, Text } from "react-native";
import { Album } from "../models/album";
import { SocialAppState } from "../redux/reducers";
import { NavigationScreenProps } from "react-navigation";
import { connect } from "react-redux";
import { fetchPhotoIfNeeded } from "../redux/actions/photoAction";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;
type OwnProps = {
    album: Album;
};

type AlbumCellProps = DispatchProps & StateProps & OwnProps;

class AlbumCell extends PureComponent<AlbumCellProps> {
    constructor(props: AlbumCellProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getPhotoOfAlbum(this.props.album.id);
    }

    renderAlbum = () => {};

    render() {
        if (this.props.photoObj && this.props.photoObj.photos.length > 0)
            return (
                <View style={styles.cell}>
                    <Image
                        style={styles.photo}
                        source={{ uri: this.props.photoObj.photos[0].url }}
                    />
                </View>
            );
        else if (this.props.photoObj && !this.props.photoObj.isFetching) {
            return (
                <View style={styles.cell}>
                    <Text style={styles.emptyText}>Empty Album</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.cell}>
                    <ActivityIndicator size="small" color="#ffffff" />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    cell: {
        height: 120,
        width: 120,
        borderRadius: 10,
        borderWidth: 5,

        justifyContent: "center",
        borderColor: "#CCCCCC",
        backgroundColor: "#DDDDDD"
    },
    photo: {
        height: "100%",
        width: "100%",
        borderRadius: 5
    },
    emptyText: {
        fontSize: 14,
        color: "#FFFFFF",
        textAlign: "center",
        width: "100%"
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: OwnProps) => {
    const albumId = ownProps.album.id;
    return {
        photoObj: state.photo.photoAlbumMap[albumId]
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getPhotoOfAlbum: (albumId: number) => dispatch(fetchPhotoIfNeeded(albumId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AlbumCell);
