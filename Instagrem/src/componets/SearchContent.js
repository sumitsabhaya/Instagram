import { Image,TouchableOpacity, View, } from 'react-native'
import React from 'react'

const SearchContent = (props) => {

  const searchData=[
    {
        id:0,
        images: [
            require('../assets/search1.png'),
            require('../assets/search2.png'),
            require('../assets/search3.png'),
            require('../assets/search4.png'),
            require('../assets/search5.png'),
            require('../assets/search6.png'),
        ]
    },
    {
        id:1,
        images:[
            require('../assets/search7.png'),
            require('../assets/search8.png'),
            require('../assets/search9.png'),
            require('../assets/search10.png'),
            require('../assets/search11.png'),
            require('../assets/search12.png'),
        ]
    },
    {
        id:2,
        images:[
             require('../assets/search13.png'),
             require('../assets/search14.png'),
             require('../assets/search15.png'),
        ]
    }
  ];

  return (
    <View>
     {
        searchData.map((data,index) => {
           return(
             <>
             {data.id === 0 ? (
                  <View style={{
                    flexDirection:'row',
                    flexWrap:'wrap',
                    justifyContent:'space-between',
                  }}>
                  {
                    data.images.map((imageData, imgIndex) => {
                        return(
                            <TouchableOpacity
                            onLongPress={()=>props.data(imageData)}
                            onPressOut={() => props.data(null)}
                            style={{paddingBottom:2}}>
                                <Image source={imageData} style={{width:129,height:150}}/>
                            </TouchableOpacity>
                        )
                    })
                  }
                  </View>
              ) : null}
              {
                data.id === 1 ?
                (
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',flexWrap:'wrap',width:261,justifyContent:'space-between'}}>
                            {
                                data.images.slice(0,4).map((imageData, imgIndex) =>{
                                    return(
                                        <TouchableOpacity
                                        onLongPress={()=>props.data(imageData)}
                                        onPressOut={() => props.data(null)} 
                                        style={{paddingBottom:2}}>
                                           <Image source={imageData} style={{width:129,height:150}}/> 
                                        </TouchableOpacity>
                                    );
                          })}
                        </View>
                        <TouchableOpacity
                       onLongPress={()=>props.data(data.images[5])}
                        onPressOut={() => props.data(null)}
                         style={{marginLeft:2}}>
                            <Image source={data.images[5]} style={{width:129,height:300}}/>
                        </TouchableOpacity>
                    </View>
                ):null}
                {
                    data.id === 2 ? (
                        <View style={{flexDirection:'row',justifyContent:'space-betwee'}}>
                           <TouchableOpacity
                           onLongPress={()=>props.data(data.images[2])}
                           onPressOut={() => props.data(null)}
                           style={{paddingRight:2}}>
                                <Image source={data.images[2]}style={{width:260,height:300}}/>
                           </TouchableOpacity>
                           <View style={{flexDirection:'row',flexWrap:'wrap',width:130,justifyContent:'space-between'}}>
                            {
                                data.images.slice(0,2).map((imageData,imgIndex) => {
                                    return <TouchableOpacity 
                                    onLongPress={()=>props.data(imageData)}
                                    onPressOut={() => props.data(null)}
                                    style={{paddingBottom:2}}>
                                        <Image source={imageData} style={{width:129,height:150}}/>
                                  </TouchableOpacity> 
                                })}
                           </View>
                        </View>
                    ):null}
             </>
           ) 
        })
     }
    </View>
  )
}

export default SearchContent
