import { StyleSheet,TextInput, View,Text } from 'react-native'
import React from 'react'

const InputBox = ({
  placeholder,
  onBlur,
  onChangeText,
  value,
  touched,
  secureTextEntry,
  keyboardType,
  maxLength,
  errors
}) => {
  return (
    <View style={styles.mainContainer}>
      <TextInput
      style={styles.TextInput}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onBlur={onBlur}
      value={value}
      touched={touched}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      maxLength={maxLength}
      />
    {errors && touched && <Text style={{color:'red'}}>{errors}</Text>}

    </View>
  )
}

export default InputBox

const styles = StyleSheet.create({
  mainContainer:{
    height:74,
    justifyContent:'center',
    alignItems:'center'
  },
  TextInput:{
    borderWidth:1,
    width:'90%',
    height:50,
    borderColor:'black',
    borderRadius:5,
    paddingHorizontal:10
  }
})