import {Text, StyleSheet} from "react-native";

const Title = (props) => {
    return <Text style={styles.title}>{props.children}</Text>
};

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: "open-sans-bold",
        color: "#fff",
        textAlign: "center",
        borderWidth: 2,
        borderColor: "#fff",
        padding: 12
    },
});