import {Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../Screen/Loginscreen/Login'
import BottomNavigation from './BottomNavigation'
import StoriesViews from '../componets/StoriesViews'
import Signup from '../Screen/SignUpScreen/SignUp'


const Stack = createNativeStackNavigator()

const Stacknavigtor = () => {

  return (
   
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={Signup}/> 
            <Stack.Screen name='deshboard' component={BottomNavigation}/>
            <Stack.Screen name='StoriesViews' component={StoriesViews}/>           
            
            
        </Stack.Navigator>
   
  )
}

export default Stacknavigtor
