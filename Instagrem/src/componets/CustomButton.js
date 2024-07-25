import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({buttonTitle,onPress,disabled }) => {
  return (
    <View style={{width:'100%', justifyContent:'center',
    alignItems:'center'}}>
    <TouchableOpacity onPress={onPress} disabled={disabled} style={{width:'90%',backgroundColor:'#3797FE',borderRadius:5, justifyContent:'center',
    alignItems:'center'}}>
      
            <Text style={{color:'#fff',paddingVertical:12,fontSize:18}}>{buttonTitle}</Text>
       
    </TouchableOpacity>
    </View>
  )
}

export default CustomButton
