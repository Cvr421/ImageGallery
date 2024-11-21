import { ScrollView ,ActivityIndicator, FlatList, Image, StyleSheet, Text, View, Platform } from 'react-native'
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
                      Authorization: "nvrhHCuH8ePScYp7VYy9PTo0sH4cWlZVPN6rrvW48V8DOY1btAosQ9kf"
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




return (
  <ScrollView style={styles.container}
  
  onScroll={Platform.OS==='web' ? (e)=> handleScroll(e):handleScrollmob}
  
  >
    <Text style={styles.title}>Infinite scrolling: Nature Images</Text>
    <FlatList
      data={images}
      keyExtractor={(item ) => item.id.toString()}
      numColumns={1}
      renderItem={({ item}) => (
        <View key={item} style={styles.imageContainer}>
          <Image
            source={{ uri: item.src.large2x }}
            style={styles.image}
            alt={item.alt}
          />
         
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  imageContainer: {
    width: 400,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },


})