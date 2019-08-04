import React, { PureComponent } from "react";
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { fetchUsersIfNeeded } from "../redux/actions/userAction";
import { User } from "../models/user";
import { NavigationScreenProps } from "react-navigation";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

type UserScreenState = {
    userReady: boolean;
};

type UserScreenProps = DispatchProps & StateProps & NavigationScreenProps;

class UserScreen extends PureComponent<UserScreenProps, UserScreenState> {
    constructor(props: UserScreenProps) {
        super(props);
        this.state = {
            userReady: false
        };
    }

    componentDidMount() {
        this.props.getUsers().then(() => this.setState({ userReady: true }));
    }

    private onUserPress = (user: User) => {
        this.props.navigation.navigate("UserDetail", { user });
    };

    private renderUserWidget = (data: { item: User }) => {
        return (
            <TouchableOpacity onPress={() => this.onUserPress(data.item)}>
                <View style={styles.userWidgetContainer}>
                    <View style={styles.portrait} />
                    <View>
                        <Text style={styles.nameText}>{data.item.name}</Text>
                        <Text style={styles.companyText}>{data.item.company.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View style={styles.rootView}>
                {this.state.userReady ? (
                    <FlatList
                        data={this.props.users}
                        renderItem={this.renderUserWidget}
                        ItemSeparatorComponent={() => <View style={styles.userListSeparator} />}
                        keyExtractor={item => item.id.toString()}
                    />
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
        backgroundColor: "#fff"
    },
    userWidgetContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    userListSeparator: {
        marginHorizontal: "3%",
        width: "94%",
        height: 1,
        backgroundColor: "#DDDDDD"
    },
    portrait: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#eeeeee",
        marginRight: 10
    },
    nameText: {
        fontSize: 18
    },
    companyText: {
        color: "#333333"
    },
    loadingContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
});

const mapStateToProps = state => {
    return {
        users: state.user.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(fetchUsersIfNeeded())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserScreen);
