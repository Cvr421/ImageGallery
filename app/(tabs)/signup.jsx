import { StyleSheet,
   Text, 
   View ,
   Linking,
   TextInput,
   Button,
   Alert,
   TouchableOpacity,

} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import axios from "axios";
// import { API_URL } from '.../env';
// import Constants from 'expo-constants';
// import * as Manifests from 'expo-manifests';
const apiUrl=process.env.EXPO_PUBLIC_API_URL;
axios.defaults.baseURL = apiUrl;
// const apiUrl = Constants.webManifest.extra.apiUrl;
console.log("api",apiUrl);


export default function SingUp() {
  const [file, setFile] = useState("");
  // const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
     email: "",
    password: "",
    confpassword: "",
  });


  const navigation =  useNavigation ();

  // const inputChange = (e) => {
  //   const { name, value } = e.target;
  //   return setFormDetails({
  //     ...formDetails,
  //     [name]: value,
  //   });
  // };

  const inputChange = (name, value) => {
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };
  



  const formSubmit = async (e) => {

    console.log("Button pressed");
    // e.preventDefault(); // Prevent form default behavior if used in web
  
    // // if (loading) return; // Don't allow multiple submissions while loading
    // // setLoading(true); // Set loading to true when starting the submission process
  
    // const { email, password, confpassword } = formDetails;
  
    // // Validation checks
    if (!formDetails.email || !formDetails.password || !formDetails.confpassword) {
      return Alert.alert('Error', 'Input fields should not be empty');
    }
    // if (password.length < 5) {
    //   return Alert.alert('Error', 'Password must be at least 5 characters long');
    // }
    // if (password !== confpassword) {
    //   return Alert.alert('Error', 'Passwords do not match');
    // }
    // if (file === "") {
    //   return Alert.alert('Error', 'Please upload a file'); // Handle file validation if required
    // }
  
    try {
    //   // Perform the registration API call

    const response = await axios.post("/user/register", formDetails);
    console.log("Response:", response.data);
    Alert.alert("Success", "User registered successfully!");
    //  axios.post("http://localhost:500/api/user/register", {
    //     email,
    //     password,
        
    //   }).then(function(response){
    //     console.log(response)
    //   })  .catch(function (error) {
    //     console.log(error);
    //   });
  
    //   // Handle success
    //   Alert.alert('Success', 'User registered successfully');
    //   console.log("Form submitted:", formDetails);
      
    //   // Navigate to login page after successful registration
      navigation.navigate("login");
      
    } catch (error) {
    //   // Handle errors
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to register user');
    } 
    // finally {
    //   setLoading(false); // Reset loading state after submission attempt
    // }
  };
  


  // console.log("Form submitted:", formDetails);




  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
           name="email"
          value={formDetails.email}
          onChangeText={(text) => inputChange('email', text)}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          name="password"
          value={formDetails.password}
          onChangeText={(text) => inputChange('password', text)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
           name="confpassword"
          value={formDetails.confpassword}
          onChangeText={(text) => inputChange('confpassword', text)}
          secureTextEntry
        />

        <Button
          title='Sign Up'
          onPress={formSubmit}
          // disabled={loading}
        />
      </View>
      <Text style={styles.footerText}>
        Already a user?{' '}
        <Link href="/login">
          <Text style={styles.loginLink}>Log in</Text>
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
  },
  loginLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});