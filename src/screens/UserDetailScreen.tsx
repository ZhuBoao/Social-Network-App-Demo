import React, { PureComponent } from "react";
import { ScrollView, View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Ionicons, Feather } from "@expo/vector-icons";
import { User } from "../models/user";
import { Album } from "../models/album";
import { Photo } from "../models/photo";
import { connect } from "react-redux";
import { fetchTodoIfNeeded } from "../redux/actions/todoAction";
import { fetchAlbumIfNeeded } from "../redux/actions/albumAction";
import { SocialAppState } from "../redux/reducers";
import { fetchPhotoIfNeeded } from "../redux/actions/photoAction";
import { fetchPostIfNeeded } from "../redux/actions/postAction";
import PhotoPlaceholder from "../components/PhotoPlaceHolder";
import Placeholder from "../components/Placeholder";
import IconButton from "../components/IconButton";
import Layout from "../constants/Layout";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

interface UserDetailScreenState {
    photos: Photo[];
    user: User;
    postReady: boolean;
    todoReady: boolean;
    addressModalVisible: boolean;
    companyModalVisible: boolean;
}

type UserDetailScreenProps = StateProps & DispatchProps & NavigationScreenProps;

class UserDetailScreen extends PureComponent<UserDetailScreenProps, UserDetailScreenState> {
    constructor(props: UserDetailScreenProps) {
        super(props);
        const user = this.props.navigation.getParam("user");
        this.state = {
            photos: [],
            user,
            postReady: false,
            todoReady: false,
            addressModalVisible: false,
            companyModalVisible: false
        };
    }

    // Extract some photos from user's albums.
    async getPhotosFromAlbums(albums: Album[], count: number): Promise<Photo[]> {
        if (albums.length === 0) {
            return Promise.resolve([]);
        }
        let outPhotos = [];
        for (let i = 0; i < albums.length; i++) {
            const photos: Photo[] = await this.props.getPhotoOfAlbum(albums[i].id);
            outPhotos = outPhotos.concat(photos);
            if (outPhotos.length >= count) {
                return outPhotos.slice(0, count);
            }
        }
        return outPhotos;
    }

    componentDidMount() {
        this.props.getAlbumOfUser().then(() => {
            this.getPhotosFromAlbums(this.props.albums.albums, 4).then(photos => {
                this.setState({ photos } as UserDetailScreenState);
            });
        });
        this.props.getTodoOfUser().then(() => {
            this.setState({ todoReady: true } as UserDetailScreenState);
        });
        this.props.getPostOfUser().then(() => {
            this.setState({ postReady: true } as UserDetailScreenState);
        });
    }

    onPhotosPress = () => {
        this.props.navigation.navigate("Photos", { user: this.state.user });
    };

    onPostPress = () => {
        this.props.navigation.navigate("Posts", { user: this.state.user });
    };

    onTodoPress = () => {
        this.props.navigation.navigate("Todos", { user: this.state.user });
    };

    onAddressPress = () => {
        this.setState({ addressModalVisible: true } as UserDetailScreenState);
    };
    hideAddressModel = () => {
        this.setState({ addressModalVisible: false } as UserDetailScreenState);
    };

    onCompanyPress = () => {
        this.setState({ companyModalVisible: true } as UserDetailScreenState);
    };
    hideCompanyModel = () => {
        this.setState({ companyModalVisible: false } as UserDetailScreenState);
    };

    renderPosts = () => {
        if (!this.state.postReady) {
            return <Placeholder />;
        } else {
            return (
                <View style={styles.section}>
                    {[0, 1, 2, 3, 4].map(i => (
                        <View key={i} style={styles.postItem}>
                            <Text style={styles.postTitleText}>
                                {this.props.posts.posts[i].title}
                            </Text>
                            <Text style={styles.postBodyText}>
                                {this.props.posts.posts[i].body}
                            </Text>
                        </View>
                    ))}
                    <View style={{ alignSelf: "flex-end" }}>
                        <TouchableOpacity onPress={this.onPostPress}>
                            <Text style={styles.viewMoreText}>View more ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    renderTodos = () => {
        if (!this.state.todoReady) {
            return <Placeholder />;
        } else {
            return (
                <View style={styles.section}>
                    {[0, 1, 2, 3, 4].map(i => (
                        <View key={i} style={styles.todoItem}>
                            <Text
                                style={
                                    this.props.todos.todos[i].completed
                                        ? styles.todoCompleteTitle
                                        : styles.todoTitle
                                }
                            >
                                {this.props.todos.todos[i].title}
                            </Text>
                            <View style={styles.checkIcon}>
                                <Feather
                                    name={
                                        this.props.todos.todos[i].completed
                                            ? "check-circle"
                                            : "circle"
                                    }
                                    size={20}
                                    color={
                                        this.props.todos.todos[i].completed ? "#32a84e" : "#662233"
                                    }
                                />
                            </View>
                        </View>
                    ))}
                    <View style={{ alignSelf: "flex-end" }}>
                        <TouchableOpacity onPress={this.onTodoPress}>
                            <Text style={styles.viewMoreText}>View more ></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    };

    render() {
        return (
            <ScrollView style={styles.rootView}>
                {/* Basic Info */}
                <View style={[styles.sectionContainer, styles.infoContainer]}>
                    <View style={styles.portrait} />
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.nameText}>{this.state.user.name}</Text>
                        <Text style={styles.usernameText}>
                            {"Username: " + this.state.user.username}
                        </Text>
                        <Text style={styles.emailText}>{"mailto: " + this.state.user.email}</Text>
                        <Text style={styles.phoneText}>{this.state.user.phone}</Text>
                        <Text style={styles.websiteText}>{this.state.user.website}</Text>
                    </View>
                </View>
                {/* Button Info */}
                <View style={[styles.sectionContainer, styles.btnContainer]}>
                    <IconButton
                        onPress={this.onAddressPress}
                        title={"Address"}
                        icon={<Feather name="home" size={26} color="#FFFFFF" />}
                    />
                    <IconButton
                        onPress={this.onCompanyPress}
                        title={"Company"}
                        icon={<Feather name="briefcase" size={26} color="#FFFFFF" />}
                    />
                </View>
                {/* Photo Section */}
                <TouchableOpacity onPress={this.onPhotosPress}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.titleText}>Photos</Text>
                        <View style={styles.photosView}>
                            {[0, 1, 2, 3].map(i => (
                                <PhotoPlaceholder
                                    key={i}
                                    photo={this.state.photos[i]}
                                    showThumbnail={true}
                                />
                            ))}
                            <View style={styles.rightArrow}>
                                <Ionicons name={"ios-arrow-forward"} size={35} color={"#BBBBBB"} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {/* Post Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.titleText}>Posts</Text>
                    {this.renderPosts()}
                </View>
                {/* Todo Section */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.titleText}>His/Her Todos</Text>
                    {this.renderTodos()}
                </View>
                <View style={{ height: 30 }} />
                {/* Modal and background */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.addressModalVisible}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={this.hideAddressModel} style={styles.closeBtn}>
                            <Feather name="x" color="#333333" size={25} />
                        </TouchableOpacity>
                        <Text style={styles.addressText}>{this.state.user.address.suite}</Text>
                        <Text style={styles.addressText}>{this.state.user.address.street}</Text>
                        <Text style={styles.addressText}>{this.state.user.address.city}</Text>
                        <Text style={styles.addressText}>{this.state.user.address.zipcode}</Text>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.companyModalVisible}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={this.hideCompanyModel} style={styles.closeBtn}>
                            <Feather name="x" color="#333333" size={25} />
                        </TouchableOpacity>
                        <Text style={styles.companyText}>
                            {"Name: \t" + this.state.user.company.name}
                        </Text>
                        <Text style={styles.companyText}>
                            {"Business: \t" + this.state.user.company.bs}
                        </Text>
                        <Text style={styles.companyText}>
                            {"Catch Phrase: \t" + this.state.user.company.catchPhrase}
                        </Text>
                    </View>
                </Modal>
                {(this.state.companyModalVisible || this.state.addressModalVisible) && (
                    <View style={styles.modalBackground} />
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    modal: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        left: Layout.window.width * 0.15,
        top: Layout.window.height * 0.4,
        width: Layout.window.width * 0.7,
        height: Layout.window.height * 0.2,
        borderRadius: 15,
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    modalBackground: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        left: 0,
        top: 0,
        width: Layout.window.width,
        height: Layout.window.height
    },
    sectionContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 2,
        backgroundColor: "#FFFFFF",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    btnContainer: {
        width: "100%",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center"
    },
    portrait: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#DDDDDD",
        marginRight: 20
    },
    nameText: {
        fontSize: 22,
        fontWeight: "bold"
    },
    usernameText: {
        fontSize: 16,
        color: "#333333"
    },
    emailText: {
        fontSize: 16,
        color: "blue",
        textDecorationLine: "underline"
    },
    phoneText: {
        fontSize: 16,
        color: "#333333"
    },
    websiteText: {
        fontSize: 16,
        color: "blue",
        textDecorationLine: "underline"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    rightArrow: {
        position: "absolute",
        right: 10
    },
    photosView: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center"
    },
    photo: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        backgroundColor: "#eeeeee",
        justifyContent: "center",
        borderRadius: 5
    },
    section: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    postItem: {
        width: "100%",
        padding: 3,
        marginBottom: 5,
        borderRadius: 3,
        backgroundColor: "#EEEEEE"
    },
    postTitleText: {
        color: "#222222",
        fontSize: 14
    },
    postBodyText: {
        color: "#666666",
        fontSize: 12
    },
    viewMoreText: {
        marginTop: 10,
        fontSize: 18
    },
    todoItem: {
        width: "100%",
        padding: 3,
        marginVertical: 5,
        borderRadius: 3,
        justifyContent: "center"
    },
    todoCompleteTitle: {
        fontSize: 18,
        marginRight: 25,
        color: "#32a84e"
    },
    todoTitle: {
        fontSize: 18,
        marginRight: 25,
        color: "#662233"
    },
    checkIcon: {
        position: "absolute",
        right: 5
    },
    addressText: {
        fontSize: 22,
        color: "#333333"
    },
    companyText: {
        fontSize: 16,
        alignSelf: "flex-start",
        color: "#333333"
    },
    closeBtn: {
        position: "absolute",
        right: 13,
        top: 13
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: NavigationScreenProps) => {
    const userId = ownProps.navigation.getParam("user").id;
    return {
        todos: state.todo.todoUserMap[userId],
        albums: state.album.albumUserMap[userId],
        posts: state.post.postUserMap[userId]
    };
};

const mapDispatchToProps = (dispatch, ownProps: NavigationScreenProps) => {
    const userId = ownProps.navigation.getParam("user").id;
    return {
        getTodoOfUser: () => dispatch(fetchTodoIfNeeded(userId)),
        getAlbumOfUser: () => dispatch(fetchAlbumIfNeeded(userId)),
        getPhotoOfAlbum: (albumId: number) => dispatch(fetchPhotoIfNeeded(albumId)),
        getPostOfUser: () => dispatch(fetchPostIfNeeded(userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetailScreen);
