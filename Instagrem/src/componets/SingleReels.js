import React, {useState,useRef} from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image,Text } from 'react-native';
// import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SingleReels=({item,index,currentIndex})=> {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isMuted,setisMuted]=React.useState(false);

  const [like, setLike] = React.useState(item.isLike);

  return (
    <View style={{height:windowHeight,width:windowWidth,position:'relative'}}>
    <TouchableOpacity
     activeOpacity={0.9} 
    style={{height:'100%',width:'100%',position:'absolute'}} onPress={()=>setisMuted(!isMuted)}>
    </TouchableOpacity>
    <Ionicons name="volume-mute" style={{ position:'absolute',top:windowHeight/2.3,left:windowWidth/2.3,backgroundColor:'rgba(52,52,52,0.9)',padding:isMuted ? 25 :0,borderRadius:100}} size={isMuted ? 25 :0} color="white" />
    <View style={{position:'absolute',width:windowWidth,zIndex:1,bottom:80,padding:10}}>
         <View>
             <TouchableOpacity style={{width:150}}>
                  <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                       <View style={{width:35,height:35,borderRadius:100,margin:10}}>
                           <Image source={item.postProfile} style={{width:'100%',height:'100%',resizeMode:'cover',borderRadius:100}}/>
                       </View>
                       <Text style={{color:'white',fontSize:16}}>{item.title}</Text>
                  </View>
             </TouchableOpacity>
             <Text style={{color:'white',fontSize:14,marginHorizontal:10}}>{item.description}
             </Text>
             <View style={{flexDirection:'row',padding:10}}>
                 <Ionicons name="musical-note" size={18} color="white" />
                 <Text style={{color:'white'}}>Original Audio</Text>
             </View>
         </View>
    </View>
    <View style={{position:'absolute',bottom:100,right:0}}>
        <TouchableOpacity onPress={() => setLike(!like)} style={{padding:10}}>
            <AntDesign name={like ? 'heart' : 'hearto'} size={28} style={{color: like ? 'red' : 'white'}} />
            <Text style={{color:'white'}}>{item.like}</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={{padding:10}}>
             <Ionicons name="chatbubble-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity  style={{padding:10}}>
            <Ionicons name="paper-plane-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity  style={{padding:10}}>
             <Feather name="more-vertical" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={{width:30,height:30,borderRadius:10,borderWidth:2,borderColor:'white',margin:10}}>
           <Image source={item.postProfile} style={{width:'100%',height:'100%',borderRadius:10,resizeMode:'cover'}}/>
        </View>
    </View>
  </View> 
  );
}


const styles = StyleSheet.create({
  video: {
    height:'100%',width:'100%'
  },
});

export default SingleReels
