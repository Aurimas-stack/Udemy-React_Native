import {useEffect, useState, useContext} from "react";

import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [message, setMessage] = useState(null);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    const getMessage = async () => {
      const response = await fetch("https://native-auth-fb59e-default-rtdb.firebaseio.com/message.json?auth=" + token);
      const data = await response.json();
      setMessage(data)
    };
    getMessage();
  },[token])

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>
        {message}
      </Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});