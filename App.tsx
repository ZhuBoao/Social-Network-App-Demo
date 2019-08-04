import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, PureComponent } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import AppNavigator from "./src/navigation/AppNavigator";
interface Props {
    skipLoadingScreen: boolean;
}
interface State {
    isLoadingComplete: boolean;
}
export default class App extends PureComponent<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false
        };
    }
    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={loadResourcesAsync}
                    onError={handleLoadingError}
                    onFinish={() => {
                        this.setState({ isLoadingComplete: true });
                    }}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <View style={styles.container}>
                        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                        <AppNavigator />
                    </View>
                </Provider>
            );
        }
    }
}

async function loadResourcesAsync() {
    await Promise.all([]);
}

function handleLoadingError(error: Error) {
    console.warn(error);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    }
});
