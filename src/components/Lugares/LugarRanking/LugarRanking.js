import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Text, Rating, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { styles } from "./LugarRanking.styles";

export function LugarRanking(props) {
  const { lugar, index } = props;
  const navigation = useNavigation();

  const goToLugar = () => {
    navigation.navigate(screen.lugar.tab, {
      screen: screen.lugar.lugar,
      params: {
        id: lugar.id,
      },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goToLugar}>
      <View style={styles.content}>
        <Image source={{ uri: lugar.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{lugar.name}</Text>
          </View>
          <Rating imageSize={15} readonly startingValue={lugar.ratingMedia} />
        </View>
        <Text style={styles.description}>{lugar.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
