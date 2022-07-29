import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useValidation } from "react-native-form-validator";
import { saveToken } from "../../store";

const API_URL = "https://reqres.in";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState({
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { validate, isFieldInError, getErrorsInField } = useValidation({
    state: { email, password },
  });

  const handleChange = (val, type) => {
    if (type === "email") {
      setEmail(val);
    } else {
      setPassword(val);
    }
  };

  const onHandleSubmit = async () => {
    setActive({ email: false, password: false });
    const isValid = validate({
      email: { email: true, required: true },
      password: { required: true },
    });
    if (isValid) {
      setIsLoading(true);
      fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          setIsLoading(false);
          await saveToken(data.token);
          navigation.navigate("Home");
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("error message: ", error.response.data.error);
          alert(error.response.data.error);
        });
    }
  };

  const handleFocus = (type) => {
    const tmp = { ...active };
    if (type === "email") {
      setActive({ ...tmp, email: true });
    } else {
      setActive({ ...tmp, password: true });
    }
  };

  const handleBlur = (type) => {
    const tmp = { ...active };
    if (type === "email") {
      setActive({ ...tmp, email: false });
    } else {
      setActive({ ...tmp, password: false });
    }
    validate({
      email: { email: true, required: true },
      password: { required: true },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formView}>
        <View style={styles.inputView}>
          <TextInput
            testID="SignIn.emailInput"
            style={styles.TextInput}
            autoCapitalize="none"
            placeholder="Enter email address"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => handleChange(email, "email")}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
          />
        </View>
        {isFieldInError("email") && !active.email && (
          <Text style={styles.errText}>{getErrorsInField("email")[0]}</Text>
        )}
      </View>
      <View style={styles.formView}>
        <View style={styles.inputView}>
          <TextInput
            testID="SignIn.pwdInput"
            style={styles.TextInput}
            autoCapitalize="none"
            placeholder="Enter the password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => handleChange(password, "password")}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
          />
        </View>
        {isFieldInError("password") && !active.password && (
          <Text style={styles.errText}>{getErrorsInField("password")[0]}</Text>
        )}
      </View>

      <TouchableOpacity
        testID="SignIn.Button"
        style={styles.loginBtn}
        onPress={onHandleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="yellow" />
        ) : (
          <Text style={styles.loginText}>LOGIN</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  formView: {
    position: "relative",
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  inputView: {
    width: "100%",
    backgroundColor: "#F4F6F8",
    borderRadius: 30,
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    width: "100%",
    padding: 10,
    marginLeft: 20,
    textTransform: "lowercase",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },

  errText: {
    color: "#ff0000",
    fontSize: 12,
    position: "absolute",
    bottom: 2,
  },
});
