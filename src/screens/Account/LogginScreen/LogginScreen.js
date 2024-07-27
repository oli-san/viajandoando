import React from 'react';
import { View, ScrollView } from 'react-native';
import {Text, Image} from "react-native-elements";
import {useNavigation} from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth/";
import {screen} from "../../../utils";
import {styles} from "./LogginScreen.styles";

export function LogginScreen() {
  const navigation = useNavigation();

  const goToRegister = () =>{
    navigation.navigate(screen.account.register);
  };
  return (
    <ScrollView>
      <Image source={require("../../../../assets/img/viajandoAndo.png")} style={styles.image} />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister}>¿Aún no tienes cuenta? <Text onPress={goToRegister} style={styles.btnRegister}>Registrate aquí</Text></Text>
      </View>
      
    </ScrollView >
  )
}