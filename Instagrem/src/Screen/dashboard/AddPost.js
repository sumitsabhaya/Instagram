import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Alert, Image, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll
} from "firebase/storage"
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app, auth } from '../../../FirebaseConfing'; // Assuming firebaseConfig is imported correctly
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddPost = ({ navigation }) => {
  const db = getFirestore(app);
  const [Caption, setCaption] = useState('');
  const currentUser = auth.currentUser;
  const [Comment, setComment] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const storage = getStorage(app);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      }).format(now);

      setCurrentDate(formattedDate);
    };

    getCurrentDate();
    const intervalId = setInterval(getCurrentDate, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    listData();
    usersCollection();
  }, []);

  const usersCollection = async () => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const data = await AsyncStorage.getItem('user');

        console.log("User data:", data);

        const citiesRef = db.collection('users');
        const snapshot = await citiesRef.doc(currentUser.uid).get();

        if (snapshot.exists()) {
          console.log("User document data:", snapshot.data());
        } else {
          console.log('No matching documents for the user.');
        }
      } else {
        console.log('No user is currently authenticated.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const listData = async () => {
    listFiles().then((listResp) => {
      const initialFiles = listResp.map((value) => {
        return { name: value.fullPath };
      });
      setFiles(initialFiles);
    });
  };

  const togglemodel = () => {
    setModalVisible(!modalVisible);
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

  const addPostt = async () => {
    if (selectedImageUrl && Caption) {
      try {
        const docRef = await addDoc(collection(db, 'Feed'), {
          Picture: selectedImageUrl,
          Caption: Caption,
          Timestamp: currentDate,
          uid: currentUser.uid,
          likes: 0,
          Comment: Comment
        });

        console.log('Post added successfully');
        
        // Additional actions or navigation if needed after post added

      } catch (error) {
        console.error('Error adding post:', error);
        // Handle the error accordingly
      }
    } else {
      Alert.alert('Please select an image and provide a caption');
    }
  };

  const pickImage = async (type) => {
    try {
      let result;

      if (type === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [5, 7],
        });
      } else {
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

        listFiles().then((listResp) => {
          const updatedFiles = listResp.map((value) => {
            return { name: value.fullPath };
          });
          setFiles(updatedFiles);
        });

        // Set the selected image URL
        setSelectedImageUrl(uploadResp.downloadUrl);
      }
    } catch (e) {
      Alert.alert('Error Uploading Image ' + e.message);
    }
  };

  return (
    <ScrollView style={{ height: '100%', width: '100%' }}>
      <View style={{ height: windowHeight, paddingTop: 50, paddingHorizontal: 10, backgroundColor: '#000' }}>
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 5 }}>
          <TouchableOpacity>
            <AntDesign name="close" size={29} color="#ffff" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffff' }}>New post</Text>
          <TouchableOpacity onPress={() => addPostt()}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#ffff' }}>Post</Text>
          </TouchableOpacity>
        </View>
        {selectedImageUrl ? (
          <Image
            source={{ uri: selectedImageUrl }}
            style={{ height: 500, width: '100%', marginVertical: 10, backgroundColor: 'yellow', marginVertical: 10 }}
          />
        ) : <View style={{ backgroundColor: 'red', height: 500, width: '100%' }} />}
        <TouchableOpacity onPress={togglemodel} style={{ padding: 15, width: '100%', marginRight: 15, alignItems: 'flex-end' }}>
          <Ionicons name="image" size={30} color="#ffffff60" />
          <Text style={{ color: '#fff' }}>{currentDate}</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={{ width: windowWidth * 0.9, backgroundColor: '#fff', height: windowHeight * 0.05 }}
            placeholder='Caption'
            value={Caption}
            onChangeText={(text) => {
              setCaption(text)
            }} />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={{ justifyContent: 'center', backgroundColor: '#fff', height: '100%', alignItems: 'center', gap: 10 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>
              <TouchableOpacity onPress={togglemodel} style={{ padding: 15, backgroundColor: 'blue', marginRight: 15 }}>
                <Text style={{ color: '#fff', fontSize: 14 }}>Close Model</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => pickImage("Gallery")} style={{ padding: 15, backgroundColor: 'blue', marginRight: 15 }}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>Open Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickImage("camera")} style={{ padding: 15, backgroundColor: 'blue', marginRight: 15 }}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>Open Camera</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

export default AddPost;
