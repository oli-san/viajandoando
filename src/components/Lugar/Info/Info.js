import React from "react";
import { View } from "react-native";
import { Text, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { Map } from "../../Shared";
import { styles } from "./Info.styles";

export function Info(props) {
  const { lugar } = props;
  console.log(lugar);

  const listInfo = [
    {
      text: lugar.address,
      iconType: "material-community",
      iconName: "map-marker",
    },
    {
      text: lugar.phone,
      iconType: "material-community",
      iconName: "phone",
    },
    {
      text: lugar.email,
      iconType: "material-community",
      iconName: "at",
    },
  ];

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el lugar</Text>
      <Map location={lugar.location} name={lugar.name} />
      {map(listInfo, (item, index) => (
        <ListItem key={index} bottomDivider>
          <Icon type={item.iconType} name={item.iconName} color="#00a680" />
          <ListItem.Content>
            <ListItem.Title>{item.text}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
}