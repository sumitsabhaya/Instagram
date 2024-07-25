import { TextInput, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const SearchBox = () => {
  return (
    <View style={{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        paddingVertical:20,
        position:'relative'
    }}>
      <FontAwesome name="search" style={{opacity:0.7,position:'absolute',zIndex:1,left:25}} size={25} color="black" />
      <TextInput 
        placeholder="Search"
        placeholderTextColor="#909090"
        style={{
            width:'94%',
            backgroundColor:'#EBEBEB',
            borderRadius:10,
            alignItems:'center',
            justifyContent:'center',
            fontSize:15,
            padding:4,
            paddingLeft:40,
        }}
      />
    </View>
  )
}

export default SearchBox

