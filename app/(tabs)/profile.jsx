import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

// const { MongoClient } = require('mongodb');
axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;
import axios from "axios";

// const uri = 'mongodb://localhost:27017';
// const client = new MongoClient(uri);


const profile = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      
      try {
        // Replace with your logic to get the user ID dynamically

      // const response=  await client.connect();
      //   const database = client.db('imagegallery');
      //   const usersCollection = database.collection('users');
      //   const user = await usersCollection.findOne({ email: email }, { projection: { _id: 1 } });

        // const userId = user._id; // Example MongoDB ObjectID
        
        // Fetch user details using the MongoDB ObjectID
        // const { data } = await axios.get(`/user/getuser/${userId}`);
        setEmail(data.email); // Assuming `email` is a field in the response
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email}</Text>
    </View>
  );
};

  


export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});