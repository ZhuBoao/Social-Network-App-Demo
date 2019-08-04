import React, { PureComponent } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { SocialAppState } from "../redux/reducers";
import { User } from "../models/user";
import { connect } from "react-redux";

import { login, logout } from "../redux/actions/userAction";
import IconButton from "../components/IconButton";
import { AntDesign } from "@expo/vector-icons";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

type LoginScreenProps = DispatchProps & StateProps & NavigationScreenProps;
type LoginScreenState = {
    username: string;
    password: string;
};

class LoginScreen extends PureComponent<LoginScreenProps, LoginScreenState> {
    constructor(props: LoginScreenProps) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    onLoginPress = () => {
        if (this.props.user) {
            return alert("Please logout first!");
        }
        if (!this.props.users || this.props.users.length === 0) {
            return alert("Please try again!");
        }
        for (let i = 0; i < this.props.users.length; i++) {
            if (this.props.users[i].username === this.state.username) {
                alert("Login Success!");
                return this.props.login(this.props.users[i]);
            }
        }
        return alert("Please check your username.");
    };

    onLogoutPress = () => {
        return this.props.logout();
    };

    render() {
        if (this.props.user) {
            return (
                <View style={styles.rootView}>
                    <View style={[styles.myInfoContainer]}>
                        <View style={styles.portrait} />
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.nameText}>{this.props.user.name}</Text>
                            <Text style={styles.usernameText}>
                                {"Username: " + this.props.user.username}
                            </Text>
                            <Text style={styles.emailText}>
                                {"mailto: " + this.props.user.email}
                            </Text>
                            <Text style={styles.phoneText}>{this.props.user.phone}</Text>
                            <Text style={styles.websiteText}>{this.props.user.website}</Text>
                        </View>
                    </View>
                    <View style={styles.btnView}>
                        <IconButton
                            icon={<AntDesign name="logout" size={26} color="#FFFFFF" />}
                            title={"Logout"}
                            onPress={this.onLogoutPress}
                        />
                    </View>
                </View>
            );
        } else {
        }
        return (
            <View style={styles.rootView}>
                <View style={styles.section}>
                    <Text style={styles.itemText}>Username: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.itemText}
                            placeholder="Please input username"
                            onChangeText={username => this.setState({ username })}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.itemText}>Password: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.itemText}
                            autoCompleteType="password"
                            placeholder="Please input password"
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                        />
                    </View>
                </View>
                <View style={styles.btnView}>
                    <IconButton
                        icon={<AntDesign name="login" size={26} color="#FFFFFF" />}
                        title={"Login"}
                        onPress={this.onLoginPress}
                    />
                </View>
                <View style={styles.tipsView}>
                    <Text style={styles.tipsText}>This page is for mocking login process.</Text>
                    <Text style={styles.tipsText}>Input ths username (has to be existed</Text>
                    <Text style={styles.tipsText}>in list) and any password to login.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: "#EEEEEE",
        alignItems: "center"
    },
    section: {
        padding: 16,
        marginVertical: 4,
        backgroundColor: "#FFFFFF",
        width: "100%",
        justifyContent: "center"
    },
    inputContainer: {
        height: 20,
        marginVertical: 5
    },
    btnView: {
        height: 40,
        marginTop: 20,
        marginBottom: 100
    },
    itemText: {
        fontSize: 18,
        color: "#000000"
    },
    tipsView: {
        position: "absolute",
        width: "100%",
        bottom: 20,
        alignItems: "center"
    },
    tipsText: {
        fontSize: 14,
        color: "#333333",
        textAlign: "center"
    },
    myInfoContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 2,
        backgroundColor: "#FFFFFF",
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
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: NavigationScreenProps) => {
    const currentUser: User = state.user.currentUser;
    const users: User[] = state.user.users;
    return {
        user: currentUser,
        users
    };
};

const mapDispatchToProps = (dispatch, ownProps: NavigationScreenProps) => {
    return {
        login: (user: User) => dispatch(login(user)),
        logout: () => dispatch(logout())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
