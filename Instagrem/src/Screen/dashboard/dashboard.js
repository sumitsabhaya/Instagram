import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../componets/Header'
import Stories from '../../componets/Stories'
import Post from '../../componets/Post'
import UserProfile from './UserProfile'

const Dashboard = () => {
  return (
    <View style={{flex:1,}}>
      <Header/>
      <Stories />
      <Post/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})