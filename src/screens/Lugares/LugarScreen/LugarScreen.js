import { ScrollView, Dimensions, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./LugarScreen.styles";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
//import { Carousel } from "../../../components/Shared";

const {width}= Dimensions.get("window")

export function LugarScreen(props) {
  const { route } = props;
  const [lugar, setLugar] = useState(null);
  //console.log(lugar);

  useEffect(() => {
    setLugar(null);
    onSnapshot(doc(db, "lugares", route.params.id), (doc) => {
      setLugar(doc.data());
    });
  }, [route.params.id]);

  //if (!lugar) return null;

  return (
    <ScrollView style={styles.content}>
      <Text>LugarScreen</Text>
      {/*<Carousel arrayImages={lugar.images} height={250} width={300} />*/}
    </ScrollView>
  );
}
