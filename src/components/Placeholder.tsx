import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Layout from "../constants/Layout";

export default class Placeholder extends Component {
    render() {
        return (
            <View style={styles.sectionPlaceHolder}>
                <ActivityIndicator size="large" color="#BBBBBB" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sectionPlaceHolder: {
        height: 60,
        width: Layout.window.width,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center"
    }
});
