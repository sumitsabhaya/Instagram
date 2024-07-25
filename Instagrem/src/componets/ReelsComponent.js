import { Dimensions, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { videoData } from './Database';
import SingleReels from './SingleReels';

const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  return (
    <View style={{height:windowHeight,width:windowWidth}}>
    <SwiperFlatList
      data={videoData}
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      renderItem={({ item, index }) => (
        <View style={{height:windowHeight,width:windowWidth}}>
        <SingleReels item={item} index={index} currentIndex={currentIndex} />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
  );
};

export default ReelsComponent;
