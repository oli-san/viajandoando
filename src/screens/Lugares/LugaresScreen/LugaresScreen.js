import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { screen, db } from "../../../utils";
import { styles } from "./LugaresScreen.styles";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/Shared";
import { ListLugar } from "../../../components/Lugares";

export function LugaresScreen(props) {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [lugares, setLugares] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "lugares"), orderBy("createdAt", "desc"));

    onSnapshot(q, (snapshot) => {
      setLugares(snapshot.docs);
    });
  }, []);

  const goToAddLugares = () => {
    navigation.navigate(screen.lugar.addLugar);
  };
  return (
    <View style={styles.content}>
      {!lugares ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <ListLugar lugares={lugares} />
      )}
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
