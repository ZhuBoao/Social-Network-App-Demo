import React from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { Feather, AntDesign } from "@expo/vector-icons";
import UserScreen from "../screens/UserScreen";
import UserDetailScreen from "../screens/UserDetailScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import PhotoScreen from "../screens/PhotoScreen";
import AlbumDetailScreen from "../screens/AlbumDetailScreen";
import PostScreen from "../screens/PostScreen";
import TodoScreen from "../screens/TodoScreen";
import PostDetailScreen from "../screens/PostDetailScreen";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";

const UserStack = createStackNavigator(
    {
        User: {
            screen: UserScreen,
            navigationOptions: {
                title: "Users"
            }
        },
        UserDetail: {
            screen: UserDetailScreen,
            navigationOptions: {
                title: "User Detail"
            }
        },
        Photos: {
            screen: PhotoScreen,
            navigationOptions: {
                title: "Albums"
            }
        },
        AlbumDetail: {
            screen: AlbumDetailScreen,
            navigationOptions: {
                title: "Photos"
            }
        },
        Posts: {
            screen: PostScreen,
            navigationOptions: {
                title: "Posts"
            }
        },
        PostDetail: {
            screen: PostDetailScreen,
            navigationOptions: {
                title: "Comments"
            }
        },
        Todos: {
            screen: TodoScreen,
            navigationOptions: {
                title: "Todos"
            }
        }
    },
    {
        initialRouteName: "User",
        // Hide navbar except user screen
        navigationOptions: ({ navigation }) => {
            return {
                tabBarVisible: navigation.state.routes[navigation.state.index].routeName === "User"
            };
        }
    }
);

const DiscoverStack = createStackNavigator(
    {
        Discover: {
            screen: DiscoverScreen,
            navigationOptions: {
                title: "Discover"
            }
        },
        Albums: {
            screen: PhotoScreen,
            navigationOptions: {
                title: "My Albums"
            }
        },
        AlbumDetail: {
            screen: AlbumDetailScreen,
            navigationOptions: {
                title: "Photos"
            }
        },
        Todos: {
            screen: TodoScreen,
            navigationOptions: {
                title: "My Todos"
            }
        },
        Posts: {
            screen: PostScreen,
            navigationOptions: {
                title: "My Posts"
            }
        },
        PostDetail: {
            screen: PostDetailScreen,
            navigationOptions: {
                title: "Comments"
            }
        }
    },
    {
        initialRouteName: "Discover",
        // Hide navbar except settings screen
        navigationOptions: ({ navigation }) => {
            return {
                tabBarVisible:
                    navigation.state.routes[navigation.state.index].routeName === "Discover"
            };
        }
    }
);

const LoginStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                title: "Login"
            }
        }
    },
    {
        initialRouteName: "Login"
    }
);

const tabNavigator = createBottomTabNavigator({
    UserStack: {
        screen: UserStack,
        navigationOptions: {
            tabBarLabel: "User",
            tabBarIcon: ({ focused }) => (
                <Feather
                    name={"users"}
                    size={26}
                    style={{ marginBottom: -3 }}
                    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
            )
        }
    },
    DiscoverStack: {
        screen: DiscoverStack,
        navigationOptions: {
            tabBarLabel: "Discover",
            tabBarIcon: ({ focused }) => (
                <Feather
                    name={"aperture"}
                    size={26}
                    style={{ marginBottom: -3 }}
                    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
            )
        }
    },
    LoginStack: {
        screen: LoginStack,
        navigationOptions: {
            tabBarLabel: "Login",
            tabBarIcon: ({ focused }) => (
                <AntDesign
                    name={"login"}
                    size={22}
                    style={{ marginBottom: -3 }}
                    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
                />
            )
        }
    }
});

export default tabNavigator;
