
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Stacknavigtor from './src/navigtor/Stacknavigtor'

const App = () => {
  return (
    <NavigationContainer>
      <Stacknavigtor/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})