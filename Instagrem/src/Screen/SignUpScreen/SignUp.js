import { Text, View, TouchableOpacity,Dimensions, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import React, { useState } from 'react';
import { getFirestore, addDoc, collection,setDoc,doc } from 'firebase/firestore';
import { auth, app } from "../../../FirebaseConfing";
import { createUserWithEmailAndPassword,getAuth, } from "firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Signup = ({ navigation }) => {
  const [Name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [isVisible, setVisible] = useState(false);
  const [text, setText] = React.useState('');
  const auth = getAuth(app);
  const db = getFirestore(app);

 const toggleButton = ()=>{
  setVisible(!isVisible)
}

const submit = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("------------------>",user);
    const usersCollection = collection(db, 'users');
    const userDocRef = doc(usersCollection, user.uid);
;
    const userData = {
      Name: Name,
      phone: phone,
      email: email,
      password: password,
    };

    await setDoc(userDocRef, userData);
 navigation.navigate('Login');

  } catch (error) {
    console.error('Error signing up:', error);
  }
 
};
  return (
    <ScrollView style={{height:'100%',backgroundColor:'#fccc63',paddingVertical:30}}>
     
      <View style={{  justifyContent: 'center',alignItems:'center',height:windowHeight*0.95}}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 20 }}>Signup with your mobile number</Text>
        <View style={{ width:windowWidth, justifyContent: 'center', alignItems: 'center', gap: 10, paddingVertical: 10 }}>
                        <TextInput
                            style={{ width:windowWidth*0.8}}
                            mode="outlined"
                            outlineColor='black'
                            activeOutlineColor='#0077b5'
                            label="Enter your Name"
                            value={Name}
                            onChangeText={(text)=>{
                                setName(text)
                            }}
                            right={<TextInput.Affix />}
                        />
                        <TextInput
                            style={{width:windowWidth*0.8 }}
                            mode="outlined"
                            outlineColor='black'
                            activeOutlineColor='#0077b5'
                            label="phone number"
                            value={phone}
                            onChangeText={(text)=>{
                                setphone(text)
                            }}
                            right={<TextInput.Affix />}
                        />
                        <TextInput
                            style={{ width:windowWidth*0.8}}
                            mode="outlined"
                            outlineColor='black'
                            activeOutlineColor='#0077b5'
                            label="Email "
                            value={email}
                            onChangeText={(text)=>{
                                setEmail(text)
                            }}
                            right={<TextInput.Affix />}
                        />
                        <View  style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                        <TextInput
                            style={{ width:windowWidth*0.8}}
                            mode="outlined"
                            outlineColor='black'
                            secureTextEntry={!isVisible}
                            activeOutlineColor='#0077b5'
                            label="Password "
                            value={password}
                            onChangeText={(text)=>{
                                setpassword(text)
                            }}
                         />
                        </View>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => submit()} style={{ alignItems: 'center', justifyContent: 'center', height: 50, width:windowWidth*0.6, backgroundColor: '#405DE6', borderRadius: 30, marginVertical: 10 }}>
                        <Text style={{ color: '#fff', fontSize: 22}}>Sign Up</Text>
                    </TouchableOpacity>
                    </View>
        <TouchableOpacity style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16, textAlign: 'center',fontWeight:'bold'}}>Sign up with email</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{position:'absolute',bottom:1}}>
          <Text style={{ fontSize: 16, textAlign: 'center',fontWeight:'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Signup;


