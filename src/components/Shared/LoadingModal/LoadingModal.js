import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Overlay } from "react-native-elements";
import { styles } from "./LoadingModal.styles";

export function LoadingModal(props) {
    const {show, text} = props;
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
        <View style={styles.view}>
            <ActivityIndicator size="large" color="#00a680" />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    </Overlay>
  )
}
LoadingModal.defaultProps = {
    show: false,
};