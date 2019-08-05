import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { SocialAppState } from "../redux/reducers";
import { connect } from "react-redux";
import { User } from "../models/user";
import { Ionicons } from "@expo/vector-icons";

type StateProps = ReturnType<typeof mapStateToProps>;

type DiscoverScreenProps = StateProps & NavigationScreenProps;

class DiscoverScreen extends PureComponent<DiscoverScreenProps> {
    checkLogin = () => {
        if (!this.props.user) {
            alert("Please login!");
            return false;
        }
        return true;
    };
    onTodoTouch = () => {
        if (this.checkLogin()) {
            this.props.navigation.navigate("Todos", { user: this.props.user });
        }
    };
    onAlbumTouch = () => {
        if (this.checkLogin()) {
            this.props.navigation.navigate("Albums", { user: this.props.user });
        }
    };
    onPostTouch = () => {
        if (this.checkLogin()) {
            this.props.navigation.navigate("Posts", { user: this.props.user });
        }
    };

    renderItem = (title: string, onPress: () => void) => {
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.section}>
                    <Text style={styles.itemText}>{title}</Text>
                    <View style={styles.rightArrow}>
                        <Ionicons name={"ios-arrow-forward"} size={24} color={"#BBBBBB"} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={styles.rootView}>
                {this.renderItem("My Todos", this.onTodoTouch)}
                {this.renderItem("My Albums", this.onAlbumTouch)}
                {this.renderItem("My Posts", this.onPostTouch)}
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
        padding: 18,
        marginVertical: 4,
        backgroundColor: "#FFFFFF",
        width: "100%",
        justifyContent: "center"
    },
    itemText: {
        fontSize: 18
    },
    rightArrow: {
        position: "absolute",
        right: 20
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: NavigationScreenProps) => {
    const currentUser: User = state.user.currentUser;
    return {
        user: currentUser
    };
};

export default connect(mapStateToProps)(DiscoverScreen);
