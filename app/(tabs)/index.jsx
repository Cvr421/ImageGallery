import { ScrollView ,ActivityIndicator, FlatList, Image, StyleSheet, Text, View, Platform, Pressable, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { ScrollView } from 'react-native-gesture-handler';

const index = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1)
  const [Loading, setLoading] = useState(false)

  const fetchImage = async () => {
    
      try {
          setLoading(true)
          const data = await fetch(
              `https://api.pexels.com/v1/search?query=nature&page=${page}&per_page=10`,
              {
                  headers: {
                      Authorization: process.env.EXPO_PUBLIC_Auth
                  }
              }
          );

       if(!data.ok){
          throw new Error(`HTTP error! status: ${data.status}`)
       }
       
       const imagedata=await data.json();
      //  console.log("data",imagedata)
       setImages((preImages)=>[...preImages, ...imagedata.photos]);
       setLoading(false)

      } catch (error) {
          console.error("Error while fetching data ")
          setLoading(false)
      }
  }

  useEffect(()=>{
    fetchImage()
},[page])


// const handleScroll =()=>{
//   const{scrollTop, scrollHeight, clientHeight}=document.documentElement;
//   if(scrollTop + clientHeight >= scrollHeight-5 && !Loading){
//       setPage((prepage)=>prepage+1);
//   }
// }
const handleScroll = (event) => {
  const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
  if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 20 && !Loading) {
    setPage((prevPage) => prevPage + 1);
  }
};
const handleScrollmob = (event) => {
  const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

  // Logic to detect when user is near the bottom
  if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 20 && !Loading) {
    setPage((prevPage) => prevPage + 1);
  }
};

// useEffect(()=>{
//   window.addEventListener("scroll",handleScroll);
//   return()=>window.removeEventListener("scroll", handleScroll)
// },[])

const handlepress=(item)=>{
  Linking.openURL(item.url).catch((err) => console.error('Failed to open URL:', err));
}


return (
  <ScrollView style={styles.container}
  
  onScroll={Platform.OS==='web' ? (e)=> handleScroll(e):handleScrollmob}
  
  >
    <Text style={styles.titles}>Pictures</Text>
   
    <FlatList
      data={images}
      keyExtractor={(item ) => item.id.toString()}
      numColumns={1}
      renderItem={({ item}) => (
        <View key={item.id} style={styles.imageContainer}>
          <Text style={styles.title}>Creator: {item.photographer}                      Click to Download</Text>
          <Pressable onPress={()=>handlepress(item)}>
          <Image
            source={{ uri: item.src.large2x }}
            style={styles.image}
            alt={item.alt}/>
          </Pressable>
         
            
          
         
        </View>
      )}
      contentContainerStyle={styles.imageList}
      
    />
    {Loading && <ActivityIndicator size="large" color="#0000ff" />}
  </ScrollView>
);
}

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 20,
      backgroundColor:"#0A0A0A"
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily:"fantasy",
   color:"#FFFAFA"
  },

  titles:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:"monospace",
    color:"#F5FFFA"
  },

  imageList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageContainer: {
    width: 350,
   
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },


})