import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { screen } from "../../../utils";
import { styles } from "./LugaresScreen.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function LugaresScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const goToAddLugares = () => {
    navigation.navigate(screen.lugar.addLugar);
  };
  return (
    <View style={styles.content}>
      <Text>Estamos en la ventana de lugares</Text>
      {currentUser && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddLugares}
        />
      )}
    </View>
  );
}
