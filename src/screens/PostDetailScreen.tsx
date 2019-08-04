import React, { PureComponent } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { SocialAppState } from "../redux/reducers";
import { NavigationScreenProps } from "react-navigation";
import { fetchCommentIfNeeded } from "../redux/actions/commentAction";
import { connect } from "react-redux";
import { Post } from "../models/post";
import { Comment } from "../models/comment";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

interface PostDetailScreenStates {
    post: Post;
    commentReady: boolean;
}

type PostDetailScreenProps = StateProps & DispatchProps & NavigationScreenProps;

class PostDetailScreen extends PureComponent<PostDetailScreenProps, PostDetailScreenStates> {
    constructor(props) {
        super(props);
        this.state = {
            post: this.props.navigation.getParam("post"),
            commentReady: false
        };
    }
    componentDidMount() {
        this.props
            .getCommentOfPost(this.state.post.id)
            .then(() => this.setState({ commentReady: true } as PostDetailScreenStates));
    }
    renderCommentItem = (data: { item: Comment }) => {
        const comment = data.item;
        return (
            <View style={styles.commentItem}>
                <Text style={styles.commentNameText}>{comment.name + ": "}</Text>
                <Text style={styles.commentBodyText}>{comment.body}</Text>
                <Text style={styles.commentEmailText}>{comment.email}</Text>
            </View>
        );
    };
    render() {
        return (
            <View style={styles.rootView}>
                <View style={styles.section}>
                    <Text style={styles.postTitleText}>{this.state.post.title}</Text>
                    <Text style={styles.postBodyText}>{this.state.post.body}</Text>
                </View>
                {this.state.commentReady ? (
                    <View style={styles.section}>
                        <FlatList
                            data={this.props.comments}
                            renderItem={this.renderCommentItem}
                            keyExtractor={item => item.id.toString()}
                            ListFooterComponent={() => <View style={{ height: 150 }} />}
                        />
                    </View>
                ) : (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#333333" />
                    </View>
                )}
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
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 500,
        backgroundColor: "#FFFFFF"
    },
    postTitleText: {
        color: "#111111",
        fontSize: 18
    },
    postBodyText: {
        color: "#666666",
        fontSize: 14
    },
    commentItem: {
        padding: 10,
        marginVertical: 4,
        backgroundColor: "#FFFFFF"
    },
    commentNameText: {
        fontSize: 14,
        color: "blue"
    },
    commentBodyText: {
        fontSize: 14,
        color: "#333333"
    },
    commentEmailText: {
        fontSize: 14,
        color: "#999999",
        textDecorationLine: "underline"
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: NavigationScreenProps) => {
    const postId = ownProps.navigation.getParam("post").id;
    return {
        comments: state.comment.commentPostMap[postId]
            ? state.comment.commentPostMap[postId].comments
            : []
    };
};

const mapDispatchToProps = (dispatch, ownProps: NavigationScreenProps) => {
    return {
        getCommentOfPost: (postId: number) => dispatch(fetchCommentIfNeeded(postId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostDetailScreen);
