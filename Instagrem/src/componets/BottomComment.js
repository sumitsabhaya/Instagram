import { Text, View, Modal, TouchableOpacity, Image, TextInput,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {app,auth} from "../../FirebaseConfing"
import { getFirestore, Firestore, addDoc, doc,collection,getDocs } from 'firebase/firestore';


let comments = [];
const BottomComment = (props) => {
    const { open, closeModal,data,cuser} = props;
    const [comment, setComment] = useState('');
    const [UserData,setUserData] =useState([]);
    const currentUser = auth.currentUser;
    const db = getFirestore(app);

    useEffect(() =>{
      FeedCollection();
    }, []);

    const postComment= async(comment)=>{ 
      
        const feedDocRef = doc(collection(db, 'Feed'), data.id);      
          console.log('Feed post written with ID:', cuser);
          
          
          const commentsCollection = collection(feedDocRef, 'comments');
          console.log("Asdasdasdasd",cuser?.profileImages);
          // Data for the new comment in the "comments" subcollection
          const newCommentData = {
            username:cuser.Name,
            user: cuser?.profileImages,
            text: comment, 
        timestamp: new Date().getTime()
            // other fields as needed
          };
          
          const commentDocRef = await addDoc(commentsCollection, newCommentData);
          
          console.log('Comment written with ID:', commentDocRef.id);
      
    }

    const FeedCollection = async () => {
      
       
        try {
           
            console.log("asaddasdsd", currentUser);
            if (currentUser) {
              const feedDocRef = doc(collection(db, 'Feed'), data.id);
              const commentsCollection = collection(feedDocRef, 'comments');
              
              const commentsSnapshot = await getDocs(commentsCollection);
        
              if (!commentsSnapshot.empty) {
                comments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Comments for the Feed document:", comments);
               setUserData(comments)
              } else {
                console.log('No comments found for the Feed document.');
              }
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }

      console.log("SDSD");
      };

    const handleModel = () => {
       
        closeModal();
    };

    return (
        <View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={open}
                onRequestClose={closeModal}
            >
                <View style={{ backgroundColor: '#fff', height:60, width: '100%',flexDirection:'row', borderBottomWidth:0.5,alignItems:'center',borderBottomColor:'#8e8e8e',justifyContent:'center'}}>
                    <TouchableOpacity onPress={handleModel} style={{ position: 'absolute', right: 20}}>
                        <Image style={{ alignSelf: 'center', height: 25, width: 25 }}
                            source={require('../assets/modelclose.png')} />
                    </TouchableOpacity>
                    <Text style={{marginLeft:15,fontSize:18,fontWeight:'bold'}}>Comments</Text>
                </View>
                <FlatList data={UserData} renderItem={({item,index}) => {
                   return(
                    <View style={{width:'100%',flexDirection:'row',height:90,alignItems:'center'}}>
                        <Image
                         source={{uri:item.user}}
                         style={{width:40,height:40,marginLeft:10,marginRight:15,borderRadius:25}}/>
                         <View style={{gap:4}}>
                          <Text style={{fontSize:14,fontWeight:'400'}}>{item.username}</Text>
                         <Text style={{fontSize:18,fontWeight:'bold'}}>{item.text}</Text>
                         </View>
                    </View>
                   )
                }}/>
                <View style={{width:'100%',height:60,position:'absolute',bottom:0,backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <TextInput 
                    value={comment}
                    onChangeText={txt => {
                        setComment(txt);
                    }}
                    placeholder='Type Comment here....' style={{width:'80%',marginLeft:20}}/> 
                    <TouchableOpacity onPress={()=> postComment(comment)} >
                        <Ionicons name="send" size={26} color="black" style={{marginRight:10}}/>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default BottomComment
