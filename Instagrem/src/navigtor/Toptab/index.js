
import { ScrollView, Text, View,FlatList,Image, TouchableOpacity,} from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();

const ProfilePosts = [
    {
      id: 1,
      Post:require('../../assets/post1.png'),
      Reels:require('../../assets/Video/video1.mp4'), 
      Tags:require('../../assets/search1.png')
    },
    {
        id: 2,
        Post:require('../../assets/post2.png'),
        Reels:require('../../assets/Video/video2.mp4'), 
        Tags:require('../../assets/search2.png')
    },
    {
        id: 3,
        Post:require('../../assets/post3.png'),
        Reels:require('../../assets/Video/video3.mp4'),
        Tags:require('../../assets/search3.png') 
    },
    {
        id: 4,
        Post:require('../../assets/post4.png'),
        Reels:require('../../assets/Video/video4.mp4'),
        Tags:require('../../assets/search4.png') 
    },
    {
        id: 5,
        Post:require('../../assets/post5.png'),
        Reels:require('../../assets/Video/video5.mp4'),
        Tags:require('../../assets/search5.png') 
    },
    {
        id: 6,
        Post:require('../../assets/post6.png'),
        Reels:require('../../assets/Video/video6.mp4'),
        Tags:require('../../assets/search6.png') 
    },
    {
        id: 7,
        Post:require('../../assets/post7.png'),
        Reels:require('../../assets/Video/video7.mp4'),
        Tags:require('../../assets/search7.png') 
      },
];

export const Posts = () => {
    return(
        <View>
            <FlatList
        data={ProfilePosts}
        numColumns={3}
        renderItem={({item}) =>{
          return(
          <Image source={item.Post}  resizeMode="stretch" style={{ width: 135, height: 150 ,margin:2}} />
          )
        }        
        }
     />
        </View>
    )
}
export const Reels = () => {
    const video = React.useRef(null);
    return(
        <View>
        {/* <FlatList
        data={ProfilePosts}
        numColumns={3}
        renderItem={({item}) =>{
          return(
          <Video ref={video} source={item.Reels} resizeMode="stretch"  style={{width:135,height:190,margin:2}}/>
          )
        }        
        }
     /> */}
        </View>
    )
}
export const Tags = () => {
    return(
        <View>
            <FlatList
        data={ProfilePosts}
        numColumns={3}
        renderItem={({item}) =>{
          return(
          <Image source={item.Tags}  resizeMode="stretch" style={{ width: 135, height: 150 ,margin:2}} />
          )
        }        
        }
     />
        </View>
    )
}

const TopTab = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
        tabBarShowLabel:false,
        tabBarIndicatorStyle:{
            backgroundColor:'black',
            height:1.5
        },
        tabBarIcon:({focused,colour}) => {
            let iconName;
            if(route.name === "Posts"){
                iconName = focused ? "grid" : "grid";
                colour = focused ? "black" : "gray"
            }else if(route.name === "Reels"){
                iconName = focused ? "play-circle" : "play-circle";
                colour = focused ? "black" : "gray"
            }else if(route.name === "Tags"){
                iconName = focused ? "users" : "users";
                colour = focused ? "black" : "gray"
            }
            return <Feather name={iconName} color={colour} size={25}/>
        }
    })}>
      <Tab.Screen name="Posts" component={Posts}/>
      <Tab.Screen name="Reels" component={Reels}/>
      <Tab.Screen name="Tags" component={Tags}/>
  </Tab.Navigator>
  
  );
};

export default TopTab

