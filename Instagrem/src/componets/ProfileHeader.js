import { Text,Image, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState } from 'react';
import Bottomsheet from './Bottomsheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ProfileHeader = () => {
  const [open, setOpen] = useState(false);
   
   const handleModel = () => {
    console.log("check", open);
    setOpen(!open);
  };
    
  return (
    <GestureHandlerRootView>
    <View style={{paddingHorizontal:15,paddingTop:20}}>
       <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
           <Text style={{fontSize:24,fontWeight:'500',color:'black'}}>Sabhaya Henil</Text>
           <View style={{flexDirection:'row',alignItems:'center'}}>
             <TouchableOpacity style={{marginRight:15}}>
             <Image style={{height:20,width:20}} source={require('../assets/addpost.png')}/>
             </TouchableOpacity>
             <TouchableOpacity onPress={handleModel}>
             <Image style={{height:20,width:20}} source={require('../assets/menu.png')}/>
             </TouchableOpacity>
           </View>
       </View>
       <Bottomsheet open={open} closeModal={() => setOpen(false)} />
    </View>
  </GestureHandlerRootView>
  )
}

export default ProfileHeader
