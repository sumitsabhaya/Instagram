import {Text, View,Image, TouchableOpacity,Alert,Dimensions } from 'react-native';
import React,{ useRef, useState } from 'react';
import InputBox from '../../componets/InputBox';
import { Formik } from 'formik';
import CustomButton from '../../componets/CustomButton';
import * as yup from "yup";
import { TextInput } from 'react-native-paper';
import { getFirestore } from 'firebase/firestore';
import {auth,app} from "../../../FirebaseConfing";
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';  


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [isVisible, setVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [text, setText] = React.useState('');
    const auth = getAuth(app);
  const db = getFirestore(app);
    
    const toggleButton = ()=>{
        setVisible(!isVisible)
    }

    const submit = () =>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("=====================>>>>>>",user);
    AsyncStorage.setItem('user',JSON.stringify (user));  
    navigation.navigate('deshboard')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });

}
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'space-between',backgroundColor:'#fccc63'}}>
            <View style={{flex:0.8,justifyContent:'center'}}>
               <Image style={{alignSelf:'center',marginBottom:20}} source={require('../../assets/instagramm.png')}/>
               <View style={{ width:windowWidth, justifyContent: 'center', alignItems: 'center', gap: 10, }}>
                        <TextInput
                            style={{width:windowWidth*0.8}}
                            mode="outlined"
                            outlineColor='gray'
                            activeOutlineColor='#0077b5'
                            label="Email"
                            value={email}
                            onChangeText={(text)=>{
                                setEmail(text)
                            }}
                            right={<TextInput.Affix />}
                        />
                       
                        <TextInput
                            style={{width:windowWidth*0.8}}
                            mode="outlined"
                            outlineColor='gray'
                            secureTextEntry={!isVisible}
                            activeOutlineColor='#0077b5'
                            label="Password"
                            value={password}
                            onChangeText={(text)=>{
                                setpassword(text)
                            }}
                        />
                      
                        <View style={{ justifyContent:'center',flexDirection: 'row',marginBottom: 20, width:windowWidth, paddingVertical: 10 }}>
                            <TouchableOpacity>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => submit()} style={{ alignItems: 'center', justifyContent: 'center', height: 50, width:windowWidth*0.6, backgroundColor: '#405DE6', borderRadius: 30 }}>
                        <Text style={{ color: '#fff',fontSize: 22 }}>Log In</Text>
                    </TouchableOpacity>
                    </View>
            </View>
            <View style={{justifyContent:'flex-end'}}>
                <TouchableOpacity style={{marginBottom:20,alignSelf:'center'}} onPress={()=>navigation.navigate('SignUp')}>
                   <Text style={{fontSize:16,fontWeight:'bold'}}>Create new account</Text>
                </TouchableOpacity>
            </View>
        </View>
   
  )
}

export default Login




