import {useState, useContext} from "react";
import { Alert } from "react-native";

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { createUser } from '../util/auth';

function SignupScreen() {
  const [isAuth, setIsAuth] = useState(false);
  const authCtx = useContext(AuthContext)

  const signUpHandler = async ({email, password}) => {
    setIsAuth(true);
    try {
      
      const token = await createUser(email, password);
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert("Auth failed", "Could not create user");
      setIsAuth(false);
    }
  }

  if(isAuth) {
    return <LoadingOverlay message="Creating user..." />
  }

  return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;