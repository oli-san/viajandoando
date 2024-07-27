import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Button, Image } from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import { screen } from "../../../utils";
import {styles} from "./UserGuestScreen.styles";

export function UserGuestScreen() {
  const navigation = useNavigation();
  const goToLogin = () =>{
    navigation.navigate(screen.account.login);
  }
  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image source ={require("../../../../assets/img/user-guest.png")} style={styles.image} />
      <Text style={styles.title}>Consultar tu perfil de Lugares Favoritos</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu lugar favorito? Busca y visualiza los mejores
        lugares para pasar tus vacaciones de manera sencilla, vota cual ha sido
        de tu agrado y comenta como fue tu experiencia ahí.
      </Text>
      <Button title="Ver tu perfil" onPress={goToLogin} buttonStyle={styles.btnStyle}/>
    </ScrollView>
  )
}