import {useState, useContext} from "react";
import { Alert } from "react-native";

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";


function LoginScreen() {
  const authCtx = useContext(AuthContext)
  const [isAuth, setIsAuth] = useState(false);

  const loginHandler = async ({email, password}) => {
    setIsAuth(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Auth failed", "Could not log you in");
      setIsAuth(false);
    }
  }

  if(isAuth) {
    return <LoadingOverlay message="Logging in..." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;