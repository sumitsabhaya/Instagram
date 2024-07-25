import {ScrollView,StatusBar,TouchableOpacity, View,Dimensions,Image,Text} from 'react-native'
import React, { useState } from 'react'
import SearchBox from '../../componets/SearchBox'
import SearchContent from '../../componets/SearchContent'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Search = () => {
    const[image, setImage] = useState(null);

    const getData = data => {
      setImage(data);
    };

   const windowWidth = Dimensions.get('window').width
   const windowHeight = Dimensions.get('window').height

  return (
    <View style={{
      width:'100%',
      height:'100%',
      backgroundColor:'white',
      position:'relative'
    }}>
      <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBox/>
          <SearchContent data={getData}/>
          <TouchableOpacity style={{margin:25,alignItems:'center',justifyContent:'center'}}>
          <AntDesign name="pluscircleo" size={24} style={{opacity:0.5}}/>
          </TouchableOpacity>
      </ScrollView>
      {
        image ?
        (
          <View style={{
            position:'absolute',
            zIndex:1,
            width:'100%',
            height:'100%',
            backgroundColor:'rgba(52,52,52,0.8)',

          }}>
             <StatusBar backgroundColor="#525252" barStyle="dark-content"/>
             <View style={{
              position:'absolute',
              top:windowHeight/6,
              left:windowWidth/18,
              backgroundColor:'white',
              width:350,
              height:465,
              borderRadius:15,
              zIndex:1,
              elevation:50,
              }}>
              <View style={{flexDirection:'row',
                 alignItems:'center',
                 paddingVertical:10,
                 paddingHorizontal:15}}>
                 <Image source={image} style={{
                  width:30,
                  height:30,
                  borderRadius:100
                 }}/>
                 <View style={{paddingLeft:8}}>
                   <Text style={{fontSize:12,fontWeight:'600'}}>
                      The_anonymous_guy
                   </Text>
                 </View>
              </View>
              <Image source={image} style={{width:'100%',height:'80%'}}/>
              <View style={{justifyContent:'space-around',width:'100%',flexDirection:'row',alignItems:'center',padding:8}}>
              <Entypo name="heart-outlined" size={26}  />
              <Ionicons name="person-circle-outline" size={26}  />
              <Feather name="navigation" size={26}  />
              <MaterialIcons name="more-vert" size={26}  />
              </View>
             </View>
          </View>
        ):null
      }
    </View>
  )
}

export default Search
