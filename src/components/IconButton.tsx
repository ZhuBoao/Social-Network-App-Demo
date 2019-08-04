import React, { PureComponent, Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

type IconButtonProps = {
    title: string;
    icon: any;
    color: string;
    onPress: () => void;
};

export default class IconButton extends PureComponent<IconButtonProps> {
    public static defaultProps = {
        color: "#FFFFFF"
    };
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styles.rootView}>
                    {this.props.icon}
                    <Text style={[styles.text, { color: this.props.color }]}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 5,
        width: 115,
        backgroundColor: "#AAAAAA"
    },
    text: {
        marginLeft: 4,
        fontSize: 16
    }
});
