import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Text,
  View,
  Alert,
  Keyboard,
  StatusBar,
  Platform,
} from "react-native";

import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

import styles from './style';

import { loginSuccess } from '../../../Redux/store/action-creators/actions';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

import SplashScreen from 'react-native-splash-screen';

function SignInScreen({navigation}, props) {
  useEffect(()=>{SplashScreen.hide()},[])

  //----just-for-button----------------------------------------
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const _keyboardDidShow = () => setKeyboardStatus("Shown");
  const _keyboardDidHide = () => setKeyboardStatus("Hidden");

  const key = () => {
    if (keyboardStatus == "Shown") {
      return Platform.OS === "ios" ? "130%" : "110%";
    } else {
      return Platform.OS === "ios" ? "160%" : "135%";
    }
  };
  //-----------------------------------------------------------
  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    pressed: false,
  });

  const dispatch = useDispatch();
  const exToken = useSelector((state) => state.auth.userToken);

  const textInputChange = (val) => {
    if (val.length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.length >= 4) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async (userName, password) => {
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty",
        [{ text: "Okay" }]
      );
      return;
    }
    if (userName.includes("@itechart-group.com") && password == "admin") {
      const userToken =
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6ImEuc2hjaGVyYmFrb3VAaXRlY2hhcnQtZ3JvdXAuY29tIiwiYWRtaW4iOnRydWV9.2USxzcjFSQHZfHwn2ZMW0qYzVP6FNl12ltaKz5FR7xx0M_YPnKV17zGin1yYhZc_v4Pf7UgFzvzhvjKFAajPJw";
      const foundUser = { userName, password, userToken };
      setData({
        ...data,
        pressed: true,
      });
      dispatch(loginSuccess(foundUser));
    } else {
      Alert.alert(
        "Wrong Input!",
        "Username or password field, bc u a not admin",
        [{ text: "Okay" }]
      );
      return;
    }
  };
  const Indicator = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
      <View style={styles.topPart}>
        <View style={styles.login}>
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View>
          <Text style={styles.emailPasswordText}>Email</Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Your email address"
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMess}>
              Username must be 4 characters long
            </Text>
          </Animatable.View>
        )}
        <View>
          <Text style={styles.emailPasswordText}>Password</Text>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMess}>
                Password must be 5 characters long
              </Text>
            </Animatable.View>
          )}
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>FORGOT PASSWORD</Text>
        </TouchableOpacity>
      </View>
      <View style={{ ...styles.footer, marginTop: key() }}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={async () => {
            loginHandle(data.username, data.password);
          }}
        >
          {data.pressed == true ? (
            <Indicator />
          ) : (
            <Text style={styles.loginButtonText}>LOGIN</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.twoWaysLogIn}>Lets test 2 ways to log in</Text>
        <View style={styles.ID}>
          <TouchableOpacity style={styles.buttonID}>
            <View style={styles.viewImage}>
              <Image
                source={require("../../../Assets/Images/icons8-touch-id-50.png")}
                style={styles.image}
              />
              <Text>Touch ID</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonID}>
            <View style={styles.viewImage}>
              <Image
                source={require("../../../Assets/Images/icons8-face-id-50.png")}
                style={styles.image}
              />
              <Text>Touch ID</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


export default SignInScreen;
