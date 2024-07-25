import { View,Modal,Image,TouchableOpacity,Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import React from 'react'



const Bottomsheet = (props) => {
  const { open, closeModal } = props;

  const handleModel = () => {
    console.log("check",closeModal);
    closeModal();
  };

  return (
  <View>
  <Modal 
        animationType='slide'
        transparent={false}
        visible={open}
        onRequestClose={closeModal}
       >
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <View style={{backgroundColor:'#fff',height:'100%',width:'100%',top:10}}>
                <TouchableOpacity onPress={handleModel} style={{position:'absolute'}}>
                   <Image style={{alignSelf:'center',height:50,width:50}}
                      source={require('../assets/modelclose.png')}/>
                  <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity style={{flexDirection:'row',gap:10,paddingVertical:15}}>
                        <Feather name="settings" size={26} color="black" />
                        <Text style={{fontSize:18,paddingHorizontal:15}}>Setting and Privacy</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity style={{flexDirection:'row',gap:10,paddingVertical:15}}>
                        <Feather name="activity" size={26} color="black" />
                        <Text style={{fontSize:18,paddingHorizontal:15}}>Your activity</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity style={{flexDirection:'row',gap:10,paddingVertical:15}}>
                        <Feather name="archive" size={26} color="black" />
                        <Text style={{fontSize:18,paddingHorizontal:15}}>Archive</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity style={{flexDirection:'row',gap:10,paddingVertical:15}}>
                        <Feather name="save" size={26} color="black" />
                        <Text style={{fontSize:18,paddingHorizontal:15}}>Saved</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity style={{flexDirection:'row',gap:10,paddingVertical:15}}>
                       <FontAwesome6 name="meta" size={24} color="black" />
                        <Text style={{fontSize:18,paddingHorizontal:15}}>Meta Varified</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity style={{flexDirection:'row',gap:10,paddingVertical:15}}>
                        <Feather name="list" size={26} color="black" />
                        <Text style={{fontSize:18,paddingHorizontal:15}}>Close Friends</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity style={{flexDirection:'row',gap:10,paddingVertical:15}}>
                        <Fontisto name="favorite" size={24} color="black" />
                        <Text style={{fontSize:18,paddingHorizontal:15}}>Favourites</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
            </View>
        </View>
       </Modal>
    </View>
  )
}

export default Bottomsheet
