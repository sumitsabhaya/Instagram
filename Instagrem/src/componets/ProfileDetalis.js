import { Image, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll
} from "firebase/storage"
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, getFirestore, updateDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { app, auth, firebaseConfig } from '../../FirebaseConfing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stories from './Stories';



const ProfileDetalis = () => {
  const db = getFirestore(app);
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [user, setuser] = useState()
  const currentUser = auth.currentUser;
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const storage = getStorage(app);


  useEffect(() => {
    fetchuser();
  }, [])

  useEffect(() => {
    console.log("asasasa", currentUser?.uid);


    // Create a reference to the user document

    const fetchData = async () => {
      console.log("========================");

      const data = await AsyncStorage.getItem('user')

      console.log("ssda", data);
      const citiesRef = db.collection('users');
      const snapshot = await citiesRef.doc(userCredential.user).get();
      console.log(snapshot);
      if (snapshot.empty) {
        console.log('No matching documents.');
        return null;
      }
      snapshot.forEach((doc) => {
        console.log("asdasd", doc.id, '=>', doc.data());
      });
    };
  }, [])

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
  useEffect(() => {
    const fetchFiles = async () => {
      const listResp = await listFiles();
      const initialFiles = listResp.map((value) => {
        return { name: value.fullPath };
      });
      setFiles(initialFiles);
    };
    fetchFiles();
  }, []);

  const togglemodel = () => {
    setModalVisible(!modalVisible)
  }

  const updateImages = async (profileImage) => {
    setuser(profileImage);
    setSelectedImageUrl(profileImage.profileImages); // Added this line to set the selected image URL

    // Update story image as well using the same logic
    const storyImageRef = doc(db, "stories", currentUser.uid);
    await setDoc(storyImageRef, { storyImage: profileImage.profileImages }, { merge: true });
  };

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
    const listRef = ref(storage, "images");
    const listResp = await listAll(listRef);
    return listResp.items;
  };

  const pickImage = async (type) => {
    try {
      if (type === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [5, 7],
        });
      }
      else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [5, 7],
        });
      }

      if (!result.canceled) {
        const { uri } = result.assets[0];
        const fileName = uri.split("/").pop();
        console.log("asdasdasd", fileName);
        const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
          console.log("check", v)
        );
        console.log("upload", uploadResp);

        const listResp = await listFiles();
        const updatedFiles = listResp.map((value) => {
          return { name: value.fullPath };
        });
        setFiles(updatedFiles);
        setSelectedImageUrl(uploadResp.downloadUrl);
      }
    } catch (e) {
      Alert.alert('Error Uploading Image ' + e.message);
    }
  };

  const addPostt = async () => {
    console.log("Asdas");
    const userDocRef = await doc(db, "users", currentUser.uid);
    console.log("asdasd", userDocRef);
    try {
      await setDoc(userDocRef, { profileImages: selectedImageUrl }, { merge: true });
      console.log("Document updated successfully");
      setModalVisible(false)
      updateImages({ profileImages: selectedImageUrl });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  let circuls = [];
  let numberofcircels = 10

  for (let index = 0; index < numberofcircels; index++) {
    circuls.push(
      <View key={index}>
        {
          index === 0 ? (
            <View style={{ width: 60, height: 60, borderRadius: 100, borderWidth: 1, opacity: 0.7, marginHorizontal: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Entypo name="plus" size={40} color="black" />
            </View>
          ) : (
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: 'black',
              opacity: 0.1,
              marginHorizontal: 5

            }}>
            </View>
          )
        }
      </View>
    )
  }


  return (
    <View style={{ paddingHorizontal: 15, paddingTop: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={togglemodel}><Image style={{ height: 80, width: 80, borderRadius: 50 }} source={user?.profileImages == null || undefined ? { uri: 'https://reactnative.dev/img/tiny_logo.png', } : { uri: `${user?.profileImages}` }} /></TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}

        >

          <View style={{ justifyContent: 'center', backgroundColor: '#fff', height: '100%', alignItems: 'center', gap: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity onPress={togglemodel} style={{ padding: 15, backgroundColor: 'blue', marginRight: 15 }}>
                <Text style={{ color: '#fff', fontsize: 14 }}>Close Model</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => pickImage("Gallery")} style={{ padding: 15, backgroundColor: 'blue', marginRight: 15 }}>
                  <Text style={{ color: '#fff', fontsize: 14 }}>Open Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickImage("camera")} style={{ padding: 15, backgroundColor: 'blue', marginRight: 15 }}>
                  <Text style={{ color: '#fff', fontsize: 14 }}>Open Cemera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addPostt()} style={{ padding: 15, backgroundColor: 'blue', marginRight: 15 }}>
                  <Text style={{ color: '#fff', fontsize: 14 }}>Upload Img</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
        <View style={{ width: 75, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>5</Text>
          <Text style={{ fontSize: 16, color: 'black' }}>Posts</Text>
        </View>
        <View style={{ width: 75, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>1100</Text>
          <Text style={{ fontSize: 16, color: 'black' }}>Followers</Text>
        </View>
        <View style={{ width: 75, alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '400', color: 'black' }}>800</Text>
          <Text style={{ fontSize: 16, color: 'black' }}>Following</Text>
        </View>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '500', color: 'black', marginTop: 10 }}>Mr.Sabhaya</Text>
      <Text style={{ color: 'black' }}>JAY DWARKADHISH🙏</Text>
      <Text style={{ color: 'black' }}>Secure your investments with crypto 🔐</Text>
      <Text style={{ color: 'black' }}>[Scorpions]</Text>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>See Translation</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, marginHorizontal: 10 }}>
        <TouchableOpacity>
          <Text style={{ backgroundColor: '#E1E1E1', width: 150, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, textAlign: 'center', color: 'black' }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ backgroundColor: '#E1E1E1', width: 150, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, textAlign: 'center', color: 'black' }}>Share Profile</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ padding: 10, letterSpacing: 1, fontSize: 15 }}> Story Highlights</Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
        {circuls}
      </ScrollView>
    </View>
  )
}

export default ProfileDetalis

