import React, { PureComponent } from "react";
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SocialAppState } from "../redux/reducers";
import { NavigationScreenProps } from "react-navigation";
import { fetchPostIfNeeded } from "../redux/actions/postAction";
import { connect } from "react-redux";
import { User } from "../models/user";
import { Post } from "../models/post";
import { Ionicons } from "@expo/vector-icons";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

interface PostScreenStates {
    user: User;
}

type PostScreenProps = StateProps & DispatchProps & NavigationScreenProps;

class PostScreen extends PureComponent<PostScreenProps, PostScreenStates> {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.getParam("user")
        };
    }
    componentDidMount() {
        this.props.getPostOfUser(this.state.user.id);
    }
    onPostPress = (post: Post) => {
        this.props.navigation.navigate("PostDetail", { post });
    };
    renderPostItem = (data: { item: Post }) => {
        const post = data.item;
        return (
            <TouchableOpacity onPress={() => this.onPostPress(post)}>
                <View style={styles.postItem}>
                    <Text style={styles.postTitleText}>{post.title}</Text>
                    <Text style={styles.postBodyText}>{post.body}</Text>
                    <View style={styles.rightArrow}>
                        <Ionicons name={"ios-arrow-forward"} size={25} color={"#BBBBBB"} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    render() {
        return (
            <View style={styles.rootView}>
                <View style={styles.section}>
                    <Text style={styles.userText}> {this.state.user.name} </Text>
                </View>
                <FlatList
                    data={this.props.posts}
                    renderItem={this.renderPostItem}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: "#EEEEEE"
    },
    section: {
        padding: 10,
        marginVertical: 4,
        backgroundColor: "#FFFFFF"
    },
    userText: {
        color: "#111111",
        fontSize: 18,
        fontWeight: "bold"
    },
    postItem: {
        padding: 10,
        paddingRight: 25,
        marginVertical: 4,
        backgroundColor: "#FFFFFF",
        width: "100%",
        borderRadius: 3,
        justifyContent: "center"
    },
    postTitleText: {
        color: "#111111",
        fontSize: 18
    },
    postBodyText: {
        color: "#666666",
        fontSize: 14
    },
    rightArrow: {
        position: "absolute",
        right: 15
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: NavigationScreenProps) => {
    const userId = ownProps.navigation.getParam("user").id;
    return {
        posts: state.post.postUserMap[userId] ? state.post.postUserMap[userId].posts : []
    };
};

const mapDispatchToProps = (dispatch, ownProps: NavigationScreenProps) => {
    return {
        getPostOfUser: (userId: number) => dispatch(fetchPostIfNeeded(userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostScreen);
