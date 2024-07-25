import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserData } from '../../utils/Userdata'
import StoriesViews from './StoriesViews'
import { useNavigation } from '@react-navigation/native'

import { addDoc, collection, getFirestore, updateDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { app, auth, firebaseConfig } from '../../FirebaseConfing';
const Stories = ({updateImages}) => {

  
  useEffect(() => {
    fetchuser();
    console.log("check");
  }, [])

  const [user,setuser] = useState()
  console.log('=====================>',user);
  const currentUser = auth.currentUser;
  const db = getFirestore(app);
  const fetchuser = async () => {
    const userDocRef = doc(db, 'users', currentUser.uid);

    // Get the user document
    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // The user document exists, you can access the data
        const userData = userDocSnapshot.data();
        setuser(userData)
        console.log('User Data:', userData);
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.error('Error getting user document:', error);
    }
  }

  const addPostt = async () => {
    console.log("Asdas");
    const userDocRef = await doc(db, "users", currentUser.uid);
    console.log("asdasd", userDocRef);
    try {
      await setDoc(userDocRef, { profileImages: selectedImageUrl }, { merge: true });
      console.log("Document updated successfully");
      setModalVisible(false)
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  const navigation=useNavigation()
  const handle =()=>{-
    <StoriesViews/>
  }
  return (
    <View style={{flexDirection:'row',marginTop:8,marginHorizontal:10}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity ><Image style={{ height: 70, width: 70, borderRadius: 50 }} source={user?.profileImages == null || undefined?{uri: 'https://reactnative.dev/img/tiny_logo.png',} : {uri:`${user?.profileImages }`}}/>
      <View ><Text>your story</Text></View></TouchableOpacity>
      {UserData.map((item) => {
        console.log(item);
        
        return(
           <View style={{marginHorizontal:10}}>
            <TouchableOpacity onPress={()=>navigation.navigate('StoriesViews',{item})} style={{height:70,width:70,borderRadius:35,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
              
              <Image resizeMode='cover' style={{height:64,width:64,borderRadius:35}} source={item.profile}/>
               
            </TouchableOpacity>
            <Text style={{textAlign:'center'}}>{item.name.length > 5? item.name.slice(0,6)+"...":item.name}</Text>
           </View>
        );
      })}
      </ScrollView>
    </View>
  )
}

export default Stories

const styles = StyleSheet.create({})
