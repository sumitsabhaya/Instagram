import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileHeader from '../../componets/ProfileHeader'
import ProfileDetalis from '../../componets/ProfileDetalis'
import TopTab from '../../navigtor/Toptab'

const UserProfile = () => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <ProfileHeader/>
      <ProfileDetalis/>
      <TopTab/>
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({})