import React, { useState } from "react";
// import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwtDecode from "jwt-decode";
// import { useDispatch } from 'react-redux';
// import { setUserInfo } from "./redux/reducers/rootSlice";
const login = () => {
  // const dispatch = useDispatch();w
  // const navigation =  useNavigation ();
  const router = useRouter();
  // const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });

  const inputChange = (name, value) => {
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async () => {
    console.log("Button press")
    try {
      const { email, password } = formDetails;

      if (!email || !password) {
        return Alert.alert("Error", "Input fields should not be empty");
      } else if (password.length < 5) {
        return Alert.alert(
          "Error",
          "Password must be at least 5 characters long"
        );
      }

      const response  = await axios.post("/user/login", {
        email,
        password,
      });
      console.log("Response:", response.data);
      // Save token to AsyncStorage
      // await AsyncStorage.setItem("token", data.token);

      // Dispatch user info to Redux
      // const userId = jwtDecode(data.token).userId;
      // dispatch(setUserInfo(userId));

      // Fetch user details
      // await getUser(userId);
      
    //   AsyncStorage.setItem('token', response.token);
     console.log("Success", "Login successful");
    //  dispatch(setUserInfo(jwtDecode(response.token).userId));
    //  getUser(jwtDecode(response.token).userId);
    router.push("/")
    //  navigation.navigate('tabs/index');
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "Unable to log in");
    }
  };

  // const getUser = async (id) => {
  //   try {
  //     const { data } = await axios.get(`/user/getuser/${id}`);
  //     dispatch(setUserInfo(data));
     
  //     // navigation.navigate("Home"); // Adjust navigation as needed
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //     Alert.alert("Error", "Unable to fetch user details");
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign In</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={formDetails.email}
          onChangeText={(text) => inputChange("email", text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={formDetails.password}
          onChangeText={(text) => inputChange("password", text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={formSubmit}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Not a user?{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("/signup")}
        >
          SignUp
        </Text>
      </Text>
    </View>
  );
}

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
  },
  registerLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
