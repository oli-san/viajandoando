import { View, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./ListLugar.styles";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function ListLugar(props) {
  const { lugares } = props;
  const navigation = useNavigation();

  const goToLugar = (lugar) => {
    navigation.navigate(screen.lugar.lugar, { id: lugar.id });
  };
  return (
    <FlatList
      data={lugares}
      renderItem={(doc) => {
        const lugar = doc.item.data();
        return (
          <TouchableOpacity onPress={() => goToLugar(lugar)}>
            <View style={styles.lugar}>
              <Image source={{ uri: lugar.images[0] }} style={styles.image} />
              <View>
                <Text style={styles.name}>{lugar.name}</Text>
                <Text style={styles.info}>{lugar.address}</Text>
                <Text style={styles.info}>
                  {lugar.description.length >= 70
                    ? lugar.description.substring(0, 70) + "...."
                    : lugar.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
