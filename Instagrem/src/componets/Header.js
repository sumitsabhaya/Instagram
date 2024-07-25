import { StyleSheet, Image, View,Text, TouchableOpacity } from 'react-native'
import React from 'react'


const Header1 = () => {
  return (
    <View style={{
        top:10,
        paddingHorizontal:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:100
    }}>
       <View>
        <Image resizeMode='contain' style={{height:50,width:110}} source={require('../assets/instagramm.png')}/>
       </View>
       <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{marginRight:15}}>
            <Image source={require('../assets/like1.png')} style={{height:30,width:30}} />
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={{position:'relative'}}>
            <Image source={require('../assets/message.png')} style={{height:30,width:30}} />
            <View style={{position:'absolute',top:-5,right:0,height:20,justifyContent:'center',alignItems:'center',backgroundColor:'red',width:20,borderRadius:15}}>
            <Text style={{color:'#fff',fontSize:10,fontWeight:'bold'}}>
                5
            </Text>
            </View>
            </View>
        </TouchableOpacity>
       </View>
    </View>
  )
}

export default Header1

const styles = StyleSheet.create({})