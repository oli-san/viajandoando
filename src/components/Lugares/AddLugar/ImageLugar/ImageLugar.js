import { View } from "react-native";
import React from "react";
import { styles } from "./ImageLugar.styles";
import { Image } from "react-native-elements";

export function ImageLugar(props) {
  const { formik } = props;

  const primaryImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/img/image-not-found.png")
        }
        style={styles.image}
      />
    </View>
  );
}
