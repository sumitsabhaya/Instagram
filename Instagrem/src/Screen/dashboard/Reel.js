import {Text, View, Dimensions } from 'react-native'
import React from 'react';
import { Feather } from '@expo/vector-icons';
import ReelsComponent from "../../componets/ReelsComponent";

const Reel = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <>
    <View style={{backgroundColor:'black',justifyContent:'space-between',flexDirection:'row',padding:10}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}> Reels</Text>
           <Feather name="camera" size={26} color="#fff" />
       </View>
    {/* <ReelsComponent/> */}
    </>
  )
}

export default Reel



