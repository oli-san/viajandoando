import { View } from "react-native";
import React from "react";
import { styles } from "./Carousel.styles";
import CarouselSnap from "react-native-snap-carousel";
import { Image } from "react-native-elements";

export function Carousel(props) {
  const { arrayImages, width, height } = props;
  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );
  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
      />
    </View>
  );
}
