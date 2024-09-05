import { FlatList, View, } from 'react-native'
import React, { useRef } from 'react'
import Slides from '../../components/Onboard/Slides';

const Onboarding = () => {
  const slidesRef = useRef(null);
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/vjfWwf1/1.png",
      header: "Projectxwire Hoşgeldiniz",
      title: "Projectxwire ile Projelerinizin Kontrolü Sizde!",
    },
    {
      id: 2,
      image: "https://i.ibb.co/pXTrYCV/2.png",
      header: "Projectxwire Hoşgeldiniz",
      title: "Projectxwire ile Projelerinizin Kontrolü Sizde!",
    },
    {
      id: 3,
      image: "https://i.ibb.co/Hznpv2S/3.png",
      header: "Projectxwire Hoşgeldiniz",
      title: "Projectxwire ile Projelerinizin Kontrolü Sizde!",
    },
  ];

  const goToNextSlide = (index) => {
    slidesRef.current.scrollToIndex({ index: index + 1 });
  };

 return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <FlatList 
      ref={slidesRef}
      pagingEnabled
      horizontal
      showHorizontalScrollIndicator={false}
      data={slides}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
      <Slides item={item} slides={slides} goToNextSlide={() => goToNextSlide(index)} />)}
    />
    </View>
  );
}

export default Onboarding

