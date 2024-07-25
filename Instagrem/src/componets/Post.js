import { Dimensions, Image, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { UserData } from '../../utils/Userdata'
import { initializeApp } from 'firebase/app'
import { auth, firebaseConfig, app } from "../../FirebaseConfing";
import { getStorage } from 'firebase/storage'
import { collection, getFirestore, onSnapshot, getDoc, doc, setDoc } from 'firebase/firestore'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import BottomComment from './BottomComment';
const storage = getStorage(app);
const db = getFirestore(app);

const Post2 = () => {
  useEffect(() => {
    const unsubscribe = onPostAdded();
    return () => unsubscribe(); // Cleanup function to unsubscribe when component unmounts
  }, []);

  const [open, setOpen] = useState(false);
  const [selected,setSelected] =useState([])
  const handleModel = (da) => {
    console.log("asdasd",da);
    setSelected(da)
    // console.log("check", open);
    setOpen(!open);
  };
 
  const onPostAdded = () => {
    const unsubscribe = onSnapshot(collection(db, 'Feed'), async (snapshot) => {
      const posts = [];
      for (const postDoc of snapshot.docs) {
        const postData = postDoc.data();
        const userId = postData.userId;
        const userDoc = await getDoc(doc(db, 'users', userId));
        const userData = userDoc.data()
        console.log('66666666666=======================================666666666666666666', userData.data);
        // userData.map((user)=>{


        // })
        const postWithUserName = {
          id: postDoc.id,
          data: postData,
          userId: userId,
          userName: userData?.name || 'Unknown', // Use the user's name if available, otherwise default to 'Unknown'
        };
        posts.push(postWithUserName);
      }
      setFeedData(posts);
    });
    return unsubscribe;
  };

  const [likesArray, setLikesArray] = useState([]);
  const [countsArray, setCountsArray] = useState([]);

  const handleCount = async (postId) => {
    const userDoc = await getDoc(doc(db, 'Feed', postId));
    const userDocRef = await doc(db, "Feed", postId);
    console.log("asdssasd", userDoc.data());
    if (userDoc.data()?.likedby?.includes(currentUser?.uid)) {


      try {
        // const arr = userDoc.data().likedby.filter(currentUser.uid)
        console.log("asas", `"${currentUser.uid}"`);

        const arr = userDoc.data().likedby.filter(id => id !== currentUser?.uid)
        console.log(userDoc.data().likedby, "asdaddsd", arr);
        await setDoc(userDocRef, { likes: userDoc.data().likes - 1, likedby: [...arr] }, { merge: true });
        console.log("Document updated successfullyssss");
      } catch (error) {
        console.error("Error updating document:", error);
      }

    }
    else {
      console.log("Sdfsd");
      if (userDoc.data()?.likes == 0) {
        try {
          await setDoc(userDocRef, { likes: userDoc.data().likes + 1, likedby: [currentUser?.uid] }, { merge: true });
          console.log("Document updated successfully");
          //   setModalVisible(false)
        } catch (error) {
          console.error("Error updating document:", error);
        }
      } else {
        try {
          await setDoc(userDocRef, { likes: userDoc.data().likes + 1, likedby: [...userDoc.data().likedby, currentUser.uid] }, { merge: true });
          console.log("Document updated successfullyssss");
          //   setModalVisible(false)
        } catch (error) {
          console.error("Error updating document:", error);
        }
      }
    }
  }


  const screenWidth = Dimensions.get('window').width;
  const [data, setData] = useState([]);
  const [userdata, setUserData] = useState([]);

  const [process, setProcess] = useState("");
  const [files, setFiles] = useState([]);
  const [feedData, setFeedData] = useState([]);

  const currentUser = auth.currentUser;

  const userDocRef = doc(collection(db, 'users'),  currentUser?.uid);

// Retrieve user data
const getUserData = async () => {
  try {
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      setUserData(userData);
      console.log('User data:', userData);
    } else {
      console.log('User document not found.');
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
  }
};

  useEffect(() => {
    getUserData()
    const ref = collection(db, "Feed");

    onSnapshot(ref, async (Feed) => {
      try {
        const updatedFeedData = await Promise.all(Feed.docs.map(async (cat) => {
          const feedData = cat.data();
          const userId = feedData.uid;

          console.log("asdasdasdasdas", userId);


          // Fetch user data from the 'users' collection using userId
          const userDoc = await getDoc(doc(db, 'users', userId));

          if (userDoc && userDoc.exists()) {
            const userData = userDoc.data();
            console.log(feedData, "useree", userData);

            return {
              id: cat.id,
              data: { ...feedData, user: userData },
            };
          } else {
            console.error(`User document not found for userId: ${userId}`);
            return null;
          }
        }));
        console.log("Asdasd", updatedFeedData);

        // Filter out any potential null values from the array
        const filteredFeedData = updatedFeedData.filter(item => item !== null);

        setFeedData(filteredFeedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  }, []);



  
  async function readData() {
    try {
      const querySnapshot = await getDocs(todoRef);
          const newData = querySnapshot.docs.map((doc) => {
console.log("Asdasd",doc);
        const userdata = db.collection('users').doc(`${doc.data().uid}`).get()
        console.log("asdasdads", userdata);

        return {
          Picture: doc.data().Pictures,
          Caption: doc.data().CaptionText,
          TimeStamp: doc.data().TimeStamp,

        };
      });
      setData(newData);
      console.log("gfgrffrfrf", newData);
    } catch (error) {
      console.log('Error:', error);
    }
  }


  const uploadToFirebase = async (uri, name, onProgress) => {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(storage, `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress && onProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({
            downloadUrl,
            metadata: uploadTask.snapshot.metadata,
          });
        }
      );
    });
  };

  const listFiles = async () => {
    const storage = getStorage();
    const listRef = ref(storage, "images");
    const listResp = await listAll(listRef);
    return listResp.items;
  };

  const pickImage = async (type) => {
    try {
      if (!result.canceled) {
        const { uri } = result.assets[0];
        const fileName = uri.split("/").pop();
        console.log("asdasdasd", fileName);
        const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
          console.log("check", v)
        );
        console.log("upload", uploadResp);

        listFiles().then((listResp) => {
          console.log("aas", listResp);
          const files = listResp.map((value) => {
            return { name: value.fullPath };
          });

          setFiles(files);
        });
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
    }

  }

  return (
    <ScrollView>

      <View style={{ marginTop: 2, height: '100%' }}>
        {feedData && feedData.map((item, index) => {

          return (
            <View style={{ marginTop: 10 }} key={item.id}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginBottom: 8 }}>
                <Image style={{ height: 30, width: 30, borderRadius: 15 }} source={{ uri: item.data.user.profileImages }} />
                <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: '600', color: 'black' }}>{item.data.user.password}</Text>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>{item.data.user.Name}{' '}</Text>
              </View>
              <View>
                <Image style={{ height: 400, width: screenWidth }} source={{ uri: item.data.Picture }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 150 }}>
                  <TouchableOpacity onPress={() => handleCount(item.id)}>
                    <AntDesign
                      name={item.data?.likedby?.includes(currentUser.uid) ? 'heart' : 'hearto'}
                      size={26}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> handleModel(item)}>
                    <FontAwesome6 name="comment" size={26} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name="send" size={26} color="black" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Image style={{ height: 26, width: 26, }} source={require('../assets/save.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }} key={item.id}>
                <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: '600', color: 'black' }}>
                  {item?.data.likes == undefined ? 0 : item?.data.likes} Likes
                </Text>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ color: 'black', fontSize: 16 }}>{item.data.Caption}</Text>
                  <Text style={{ color: 'black', fontSize: 16 }}>{item.data.Timestamp}</Text>
                </View>
              </View>
              { selected &&
              <BottomComment open={open} cuser={userdata}  data={selected} closeModal={() => setOpen(false)} />
        }
            </View>
          );
        })}
      </View>
    </ScrollView>
  )
};

export default Post2;
