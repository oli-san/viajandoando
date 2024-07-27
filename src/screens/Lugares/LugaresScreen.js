import React from "react";
import {View, Text} from "react-native";
import {Button} from "react-native-elements";
import {screen} from "../../utils"

export function LugaresScreen(props){

    const {navigation} = props;
    const goToAddLugares=()=>{
        //navigation.navigate(screen.lugar.addLugar); cunado viajas en el mismo stack
        navigation.navigate(screen.account.tab,{screen: screen.account.account});//cuando viajas entre diferentes stack
    }
    return(
        <View>
            <Text>Estamos en la ventana de lugares</Text>
            <Button title="Crear Lugar" onPress={goToAddLugares}/>
        </View>
    );
}