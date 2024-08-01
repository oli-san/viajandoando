import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { doc, deleteDoc } from "firebase/firestore";
import { db, screen } from "../../../utils";
import { styles } from "./LugarFavorite.styles";

export function LugarFavorite(props) {
  const { lugar } = props;
  const navigation = useNavigation();

  const goToLugar = () => {
    navigation.navigate(screen.lugar.tab, {
      screen: screen.lugar.lugar,
      params: {
        id: lugar.id,
      },
    });
  };

  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", lugar.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToLugar}>
      <View style={styles.content}>
        <Image source={{ uri: lugar.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{lugar.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}