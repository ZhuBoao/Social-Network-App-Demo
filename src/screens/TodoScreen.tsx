import React, { PureComponent } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { SocialAppState } from "../redux/reducers";
import { NavigationScreenProps } from "react-navigation";
import { fetchTodoIfNeeded } from "../redux/actions/todoAction";
import { connect } from "react-redux";
import { User } from "../models/user";
import { Todo } from "../models/todo";
import { Feather } from "@expo/vector-icons";
import PlaceHolder from "../components/Placeholder";

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type StateProps = ReturnType<typeof mapStateToProps>;

interface TodoScreenStates {
    user: User;
    todoReady: boolean;
}

type TodoScreenProps = StateProps & DispatchProps & NavigationScreenProps;

class TodoScreen extends PureComponent<TodoScreenProps, TodoScreenStates> {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.getParam("user"),
            todoReady: false
        };
    }
    componentDidMount() {
        this.props.getTodoOfUser(this.state.user.id).then(this.setState({ todoReady: true }));
    }
    renderTodoItem = (data: { item: Todo }) => {
        const todo = data.item;
        return (
            <View style={styles.todoItem}>
                <Text style={todo.completed ? styles.todoCompleteTitle : styles.todoTitle}>
                    {todo.title}
                </Text>
                <View style={styles.checkIcon}>
                    <Feather
                        name={todo.completed ? "check-circle" : "circle"}
                        size={20}
                        color={todo.completed ? "#32a84e" : "#662233"}
                    />
                </View>
            </View>
        );
    };
    render() {
        return (
            <View style={styles.rootView}>
                <View style={styles.section}>
                    <Text style={styles.userText}> {this.state.user.name} </Text>
                </View>
                {this.state.todoReady ? (
                    <View style={styles.section}>
                        <FlatList
                            data={this.props.todos}
                            renderItem={this.renderTodoItem}
                            keyExtractor={item => item.id.toString()}
                            ListFooterComponent={() => <View style={{ height: 50 }} />}
                        />
                    </View>
                ) : (
                    <PlaceHolder />
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
    userText: {
        color: "#111111",
        fontSize: 18,
        fontWeight: "bold"
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
    }
});

const mapStateToProps = (state: SocialAppState, ownProps: NavigationScreenProps) => {
    const userId = ownProps.navigation.getParam("user").id;
    return {
        todos: state.todo.todoUserMap[userId] ? state.todo.todoUserMap[userId].todos : []
    };
};

const mapDispatchToProps = (dispatch, ownProps: NavigationScreenProps) => {
    return {
        getTodoOfUser: (userId: number) => dispatch(fetchTodoIfNeeded(userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoScreen);
