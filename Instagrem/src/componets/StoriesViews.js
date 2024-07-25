import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
  ProgressBarAndroid,
} from 'react-native';

const StoriesViews = ({ route, navigation }) => {
  const selectedItem = route.params.item;
  const currentTime = new Date();
  const currentHr = currentTime.getHours();
  const storyTime = currentHr - selectedItem.story.time;
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 1 ? prevProgress + 0.05 : 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 1) {
      navigation.navigate('Home');
    }
  }, [progress, navigation]);


  return (
    <View style={{flex:1,backgroundColor:'black'}}>
         <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress} style={{paddingVertical:10}} />
        <View style={{flexDirection:'row',paddingTop:12,paddingLeft:12,alignItems:'center',position:'relative',zIndex:1,top:5}}>
            <Image style={{height:40,width:40,borderRadius:20,marginRight:10}} source={selectedItem.profile}/>
            <Text style={{fontSize:18,fontWeight:700,color:'#fff'}}>{selectedItem.name}</Text>
            <Text style={{fontSize:18,fontWeight:600,marginLeft:10,color:'#fff'}}>{storyTime}hr</Text>
        </View>
        <View style={{position:'absolute',top:15}}>
           <Image source={selectedItem.story.image} resizeMode='contain'  style={{height:screenHeight*0.99,width:screenWidth,borderBottomRightRadius:15,borderTopLeftRadius:15,opacity:1}}/>
          
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',position:'absolute',bottom:1,paddingHorizontal:10,left:20,bottom:15}}>
              <TextInput style={{borderWidth:1,borderColor:'#fff',width:'80%',color:'#fff',borderRadius:30,paddingHorizontal:10,height:40}} 
               placeholder='Message'
               placeholderTextColor={'#fff'}
               />
               <TouchableOpacity>
                <Image style={{tintColor:'#fff',height:30,width:30}}
                source={require('../assets/messanger.png')}
                />
               </TouchableOpacity>
           </View>
    </View>
  )
}

export default StoriesViews
